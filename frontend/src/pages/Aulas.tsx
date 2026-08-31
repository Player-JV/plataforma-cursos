import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { aulaService, moduloService } from '../services/services';
import type { Aula, Modulo } from '../model/types';

const vazio: Aula = { titulo: '', tipoConteudo: 'Vídeo', urlConteudo: '', duracaoMinutos: 0, ordem: 0, idModulo: 0 };

export default function Aulas() {
  const [lista, setLista] = useState<Aula[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [form, setForm] = useState<Aula>(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const [resAulas, resModulos] = await Promise.all([
        aulaService.listar(),
        moduloService.listar()
      ]);
      setLista(Array.isArray(resAulas.data) ? resAulas.data : []);
      setModulos(Array.isArray(resModulos.data) ? resModulos.data : []);
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

  function abrirEditar(item: Aula & { id?: number }) {
    setForm(item);
    setEditId(item.id || null);
    setModal(true);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (editId) await aulaService.atualizar(editId, form);
      else await aulaService.criar(form);
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
      await aulaService.excluir(id);
      carregar();
    } catch (error) {
      console.error(error);
      setErro('Erro ao excluir o registro.');
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Aulas</h2>
      <button className="btn btn-primary mb-3" onClick={abrirNovo}>Nova Aula</button>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>}
      {!loading && lista.length === 0 && !erro && <div className="alert alert-info">Nenhuma aula encontrada.</div>}

      {!loading && lista.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Duração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item: any) => (
              <tr key={item.id}>
                <td>{item.ordem}</td>
                <td>{item.titulo}</td>
                <td>{item.tipoConteudo}</td>
                <td>{item.duracaoMinutos} min</td>
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
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Editar Aula' : 'Nova Aula'}>
          <form onSubmit={salvar}>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Tipo Conteúdo</label>
                <select className="form-select" value={form.tipoConteudo} onChange={e => setForm({ ...form, tipoConteudo: e.target.value })} required>
                  <option value="Vídeo">Vídeo</option>
                  <option value="Texto">Texto</option>
                  <option value="Quiz">Quiz</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">URL do Conteúdo</label>
              <input type="text" className="form-control" value={form.urlConteudo} onChange={e => setForm({ ...form, urlConteudo: e.target.value })} />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Duração (Minutos)</label>
                <input type="number" className="form-control" value={form.duracaoMinutos} onChange={e => setForm({ ...form, duracaoMinutos: Number(e.target.value) })} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Ordem</label>
                <input type="number" className="form-control" value={form.ordem} onChange={e => setForm({ ...form, ordem: Number(e.target.value) })} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Módulo</label>
                <select className="form-select" value={form.idModulo} onChange={e => setForm({ ...form, idModulo: Number(e.target.value) })} required>
                  <option value="">Selecione...</option>
                  {modulos.map((m: any) => (
                    <option key={m.id} value={m.id}>{m.titulo}</option>
                  ))}
                </select>
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