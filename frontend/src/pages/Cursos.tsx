import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { cursoService, categoriaService } from '../services/services';
import type { Curso, Categoria } from '../model/types';

const vazio: Curso = { titulo: '', descricao: '', nivel: 'Iniciante', totalAulas: 0, totalHoras: 0, idInstrutor: 0, idCategoria: 0 };

export default function Cursos() {
  const [lista, setLista] = useState<Curso[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Curso>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const [resCursos, resCategorias] = await Promise.all([
        cursoService.listar(),
        categoriaService.listar()
      ]);
      setLista(Array.isArray(resCursos.data) ? resCursos.data : []);
      setCategorias(Array.isArray(resCategorias.data) ? resCategorias.data : []);
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

  function abrirEditar(item: Curso & { id?: number }) {
    setForm(item);
    setEditId(item.id || null);
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (editId) await cursoService.atualizar(editId, form);
      else await cursoService.criar(form);
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
      await cursoService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Cursos</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Novo Curso</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhum curso encontrado.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Título</th>
              <th>Nível</th>
              <th>Aulas (H)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>{item.nivel}</td>
                <td>{item.totalAulas} ({item.totalHoras}h)</td>
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
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Curso' : 'Novo Curso'}>
          <form onSubmit={salvar}>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Nível</label>
                <select className="form-select" value={form.nivel} onChange={e => setForm({ ...form, nivel: e.target.value })} required>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea className="form-control" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} rows={2}></textarea>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Total Aulas</label>
                <input type="number" className="form-control" value={form.totalAulas} onChange={e => setForm({ ...form, totalAulas: Number(e.target.value) })} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Total Horas</label>
                <input type="number" className="form-control" value={form.totalHoras} onChange={e => setForm({ ...form, totalHoras: Number(e.target.value) })} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">ID Instrutor</label>
                <input type="number" className="form-control" value={form.idInstrutor} onChange={e => setForm({ ...form, idInstrutor: Number(e.target.value) })} required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <select className="form-select" value={form.idCategoria} onChange={e => setForm({ ...form, idCategoria: Number(e.target.value) })} required>
                <option value="">Selecione...</option>
                {categorias.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
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