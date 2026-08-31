import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { moduloService, cursoService } from '../services/services';
import type { Modulo, Curso } from '../model/types';

const vazio: Modulo = { titulo: '', ordem: 0, idCurso: 0 };

export default function Modulos() {
  const [lista, setLista] = useState<Modulo[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [form, setForm] = useState<Modulo>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const [resModulos, resCursos] = await Promise.all([
        moduloService.listar(),
        cursoService.listar()
      ]);
      setLista(Array.isArray(resModulos.data) ? resModulos.data : []);
      setCursos(Array.isArray(resCursos.data) ? resCursos.data : []);
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

  function abrirEditar(item: Modulo & { id?: number }) {
    setForm(item);
    setEditId(item.id || null);
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (editId) await moduloService.atualizar(editId, form);
      else await moduloService.criar(form);
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
      await moduloService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Módulos</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Novo Módulo</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhum módulo encontrado.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Título</th>
              <th>ID Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.ordem}</td>
                <td>{item.titulo}</td>
                <td>{item.idCurso}</td>
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
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Módulo' : 'Novo Módulo'}>
          <form onSubmit={salvar}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input type="text" className="form-control" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Ordem</label>
              <input type="number" className="form-control" value={form.ordem} onChange={e => setForm({ ...form, ordem: Number(e.target.value) })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Curso</label>
              <select className="form-select" value={form.idCurso} onChange={e => setForm({ ...form, idCurso: Number(e.target.value) })} required>
                <option value="">Selecione...</option>
                {cursos.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.titulo}</option>
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