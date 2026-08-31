import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { matriculaService, usuarioService, cursoService } from '../services/services';
import type { Matricula, Usuario, Curso } from '../model/types';

const vazio: Matricula = { idUsuario: 0, idCurso: 0, dataConclusao: '' };

export default function Matriculas() {
  const [lista, setLista] = useState<Matricula[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [form, setForm] = useState<Matricula>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const [resMatriculas, resUsuarios, resCursos] = await Promise.all([
        matriculaService.listar(),
        usuarioService.listar(),
        cursoService.listar()
      ]);
      setLista(Array.isArray(resMatriculas.data) ? resMatriculas.data : []);
      setUsuarios(Array.isArray(resUsuarios.data) ? resUsuarios.data : []);
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

  function abrirEditar(item: Matricula & { id?: number }) {
    setForm(item);
    setEditId(item.id || null);
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (editId) await matriculaService.atualizar(editId, form);
      else await matriculaService.criar(form);
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
      await matriculaService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Matrículas</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Nova Matrícula</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhuma matrícula encontrada.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID Usuário</th>
              <th>ID Curso</th>
              <th>Data Conclusão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.idUsuario}</td>
                <td>{item.idCurso}</td>
                <td>{item.dataConclusao || 'Em andamento'}</td>
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
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Matrícula' : 'Nova Matrícula'}>
          <form onSubmit={salvar}>
            <div className="mb-3">
              <label className="form-label">Usuário</label>
              <select className="form-select" value={form.idUsuario} onChange={e => setForm({ ...form, idUsuario: Number(e.target.value) })} required>
                <option value="">Selecione...</option>
                {usuarios.map((u: any) => (
                  <option key={u.id} value={u.id}>{u.nomeCompleto}</option>
                ))}
              </select>
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
            <div className="mb-3">
              <label className="form-label">Data de Conclusão (Opcional)</label>
              <input type="date" className="form-control" value={form.dataConclusao?.toString().split('T')[0] || ''} onChange={e => setForm({ ...form, dataConclusao: e.target.value })} />
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