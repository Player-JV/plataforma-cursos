import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { planoService, assinaturaService, pagamentoService, usuarioService } from '../services/services';
import type { Plano, Usuario } from '../model/types';

interface CheckoutForm {
  idUsuario: number;
  metodoPagamento: string;
  idPlano: number;
}

const vazio: CheckoutForm = { idUsuario: 0, metodoPagamento: 'Cartão de Crédito', idPlano: 0 };

export default function Financeiro() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<CheckoutForm>(vazio);
  const [planoSelecionado, setPlanoSelecionado] = useState<Plano | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const [resPlanos, resUsuarios] = await Promise.all([
        planoService.listar(),
        usuarioService.listar()
      ]);
      setPlanos(Array.isArray(resPlanos.data) ? resPlanos.data : []);
      setUsuarios(Array.isArray(resUsuarios.data) ? resUsuarios.data : []);
    } catch (error) {
      console.error(error);
      setErro('Erro ao carregar dados. Verifique o backend.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  function abrirCheckout(plano: Plano & { id?: number }) {
    setPlanoSelecionado(plano);
    setForm({ ...vazio, idPlano: plano.id || 0 });
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!planoSelecionado) return;
    setLoading(true);
    setErro(null);

    try {
      // 1. Cria a assinatura
      const resAssinatura = await assinaturaService.criar({
        idUsuario: form.idUsuario,
        idPlano: form.idPlano,
        dataFim: new Date(new Date().setMonth(new Date().getMonth() + planoSelecionado.duracaoMeses)).toISOString()
      });

      // 2. Cria o pagamento associado
      await pagamentoService.criar({
        idAssinatura: resAssinatura.data.id,
        valorPago: planoSelecionado.preco,
        metodoPagamento: form.metodoPagamento,
        idTransacaoGateway: 'TRANSACAO_MOCK_123'
      });

      alert('Assinatura e Pagamento realizados com sucesso!');
      setModal(false);
    } catch (error) {
      console.error(error);
      setErro('Erro ao processar checkout.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Assinaturas / Financeiro</h2>
      <p className="text-muted">Selecione um plano abaixo para realizar a assinatura.</p>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      
      {!loading && planos.length === 0 && !erro && <div className="alert alert-info">Nenhum plano disponível no momento.</div>}

      <div className="row mt-4">
        {!loading && planos.map((plano: any) => (
          <div className="col-md-4 mb-4" key={plano.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header text-center bg-primary text-white">
                <h4 className="my-0 font-weight-normal">{plano.nome}</h4>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h1 className="card-title pricing-card-title">
                  R$ {Number(plano.preco).toFixed(2)}<small className="text-muted"> / {plano.duracaoMeses} {plano.duracaoMeses === 1 ? 'mês' : 'meses'}</small>
                </h1>
                <p className="mt-3 mb-4 flex-grow-1">{plano.descricao}</p>
                <button type="button" className="btn btn-lg btn-outline-primary mt-auto" onClick={() => abrirCheckout(plano)}>
                  Assinar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && planoSelecionado && (
        <Modal isOpen={modal} onClose={() => setModal(false)} title={`Checkout: ${planoSelecionado.nome}`}>
          <form onSubmit={salvar}>
            <div className="alert alert-secondary">
              <strong>Total a pagar:</strong> R$ {Number(planoSelecionado.preco).toFixed(2)}
            </div>
            
            <div className="mb-3">
              <label className="form-label">Selecione o Usuário</label>
              <select className="form-select" value={form.idUsuario} onChange={e => setForm({ ...form, idUsuario: Number(e.target.value) })} required>
                <option value="">Selecione...</option>
                {usuarios.map((u: any) => (
                  <option key={u.id} value={u.id}>{u.nomeCompleto}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Método de Pagamento</label>
              <select className="form-select" value={form.metodoPagamento} onChange={e => setForm({ ...form, metodoPagamento: e.target.value })} required>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="PIX">PIX</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>
            
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success" disabled={loading}>Confirmar Pagamento</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}