import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { usuarioService } from '../services/services';
import type { Usuario } from '../model/types';

const vazio: Usuario = { nomeCompleto: '', email: '', senhaHash: '' };

export default function Usuarios() {
  const [lista, setLista] = useState<Usuario[]>([]);
  const [form, setForm] = useState<Usuario>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const res = await usuarioService.listar();
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

  function abrirEditar(item: Usuario & { id?: number }) {
    setForm({ ...item, senhaHash: '' }); // Limpa o hash pra não editar por engano
    setEditId(item.id || null);
    setModal(true);
  }

async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      // 1. Preparamos os dados comuns a ambas as ações
      const dadosParaEnviar: any = {
        email: form.email,
      };

      if (form.senhaHash && form.senhaHash.trim() !== '') {
        dadosParaEnviar.senha = form.senhaHash;
      }

      if (editId) {
        dadosParaEnviar.nomeCompleto = form.nomeCompleto;
        await usuarioService.atualizar(editId, dadosParaEnviar);
      } else {
        dadosParaEnviar.nome = form.nomeCompleto;
        await usuarioService.criar(dadosParaEnviar);
      }
      
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
      await usuarioService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Usuários</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Novo Usuário</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhum usuário encontrado.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.nomeCompleto}</td>
                <td>{item.email}</td>
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
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Usuário' : 'Novo Usuário'}>
          <form onSubmit={salvar}>
            <div className="mb-3">
              <label className="form-label">Nome Completo</label>
              <input type="text" className="form-control" value={form.nomeCompleto} onChange={e => setForm({ ...form, nomeCompleto: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input type="password" className="form-control" value={form.senhaHash} onChange={e => setForm({ ...form, senhaHash: e.target.value })} required={!editId} placeholder={editId ? 'Deixe em branco para manter a atual' : ''} />
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