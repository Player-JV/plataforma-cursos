import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { planoService } from '../services/services';
import type { Plano } from '../model/types';

const vazio: Plano = { nome: '', descricao: '', preco: 0, duracaoMeses: 1 };

export default function Planos() {
  const [lista, setLista] = useState<Plano[]>([]);
  const [form, setForm] = useState<Plano>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const res = await planoService.listar();
      setLista(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setErro('Erro ao carregar. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  function abrirNovo() {
    setForm(vazio);
    setEditId(null);
    setModal(true);
  }

  function abrirEditar(item: Plano & { id?: number }) {
    setForm(item);
    setEditId(item.id || null);
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (editId) await planoService.atualizar(editId, form);
      else await planoService.criar(form);
      setModal(false);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao salvar os dados.');
      setLoading(false);
    }
  }

  async function excluir(id: number) {
    if (!window.confirm('Deseja realmente excluir?')) return;
    setLoading(true);
    setErro(null);
    try {
      await planoService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Planos</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Novo Plano</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhum plano encontrado.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço (R$)</th>
              <th>Duração (Meses)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{Number(item.preco).toFixed(2)}</td>
                <td>{item.duracaoMeses}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => abrirEditar(item)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => excluir(item.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && (
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Plano' : 'Novo Plano'}>
          <form onSubmit={salvar}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input type="text" className="form-control" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea className="form-control" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} rows={2}></textarea>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Preço</label>
                <input type="number" step="0.01" className="form-control" value={form.preco} onChange={e => setForm({ ...form, preco: Number(e.target.value) })} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Duração (Meses)</label>
                <input type="number" className="form-control" value={form.duracaoMeses} onChange={e => setForm({ ...form, duracaoMeses: Number(e.target.value) })} required />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success" disabled={loading}>Salvar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}