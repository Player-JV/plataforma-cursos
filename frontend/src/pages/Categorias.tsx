import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { categoriaService } from '../services/services';
import type { Categoria } from '../model/types';

const vazio: Categoria = { nome: '', descricao: '' };

export default function Categorias() {
  const [lista, setLista] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Categoria>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const res = await categoriaService.listar();
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

  function abrirEditar(item: Categoria & { id?: number }) {
    setForm(item);
    setEditId(item.id || null);
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (editId) {
        await categoriaService.atualizar(editId, form);
      } else {
        await categoriaService.criar(form);
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
      await categoriaService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Categorias</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Nova Categoria</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhuma categoria encontrada.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
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
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Categoria' : 'Nova Categoria'}>
          <form onSubmit={salvar}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input type="text" className="form-control" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea className="form-control" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} rows={3}></textarea>
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