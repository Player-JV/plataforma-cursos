import api from './api';

export const usuarioService = {
  listar: () => api.get('/usuarios'),
  buscarPorId: (id: number) => api.get(`/usuarios/${id}`),
  criar: (data: any) => api.post('/usuarios', data),
  atualizar: (id: number, data: any) => api.patch(`/usuarios/${id}`, data),
  excluir: (id: number) => api.delete(`/usuarios/${id}`),
};

export const categoriaService = {
  listar: () => api.get('/categorias'),
  buscarPorId: (id: number) => api.get(`/categorias/${id}`),
  criar: (data: any) => api.post('/categorias', data),
  atualizar: (id: number, data: any) => api.patch(`/categorias/${id}`, data),
  excluir: (id: number) => api.delete(`/categorias/${id}`),
};

export const cursoService = {
  listar: () => api.get('/cursos'),
  buscarPorId: (id: number) => api.get(`/cursos/${id}`),
  criar: (data: any) => api.post('/cursos', data),
  atualizar: (id: number, data: any) => api.patch(`/cursos/${id}`, data),
  excluir: (id: number) => api.delete(`/cursos/${id}`),
};

export const moduloService = {
  listar: () => api.get('/modulos'),
  buscarPorId: (id: number) => api.get(`/modulos/${id}`),
  criar: (data: any) => api.post('/modulos', data),
  atualizar: (id: number, data: any) => api.patch(`/modulos/${id}`, data),
  excluir: (id: number) => api.delete(`/modulos/${id}`),
};

export const aulaService = {
  listar: () => api.get('/aulas'),
  buscarPorId: (id: number) => api.get(`/aulas/${id}`),
  criar: (data: any) => api.post('/aulas', data),
  atualizar: (id: number, data: any) => api.patch(`/aulas/${id}`, data),
  excluir: (id: number) => api.delete(`/aulas/${id}`),
};

export const matriculaService = {
  listar: () => api.get('/matriculas'),
  buscarPorId: (id: number) => api.get(`/matriculas/${id}`),
  criar: (data: any) => api.post('/matriculas', data),
  atualizar: (id: number, data: any) => api.patch(`/matriculas/${id}`, data),
  excluir: (id: number) => api.delete(`/matriculas/${id}`),
};

export const trilhaService = {
  listar: () => api.get('/trilhas'),
  buscarPorId: (id: number) => api.get(`/trilhas/${id}`),
  criar: (data: any) => api.post('/trilhas', data),
  atualizar: (id: number, data: any) => api.patch(`/trilhas/${id}`, data),
  excluir: (id: number) => api.delete(`/trilhas/${id}`),
};

export const planoService = {
  listar: () => api.get('/planos'),
  buscarPorId: (id: number) => api.get(`/planos/${id}`),
  criar: (data: any) => api.post('/planos', data),
  atualizar: (id: number, data: any) => api.patch(`/planos/${id}`, data),
  excluir: (id: number) => api.delete(`/planos/${id}`),
};

export const assinaturaService = {
  listar: () => api.get('/assinaturas'),
  buscarPorId: (id: number) => api.get(`/assinaturas/${id}`),
  criar: (data: any) => api.post('/assinaturas', data),
  atualizar: (id: number, data: any) => api.patch(`/assinaturas/${id}`, data),
  excluir: (id: number) => api.delete(`/assinaturas/${id}`),
};

export const pagamentoService = {
  listar: () => api.get('/pagamentos'),
  buscarPorId: (id: number) => api.get(`/pagamentos/${id}`),
  criar: (data: any) => api.post('/pagamentos', data),
  atualizar: (id: number, data: any) => api.patch(`/pagamentos/${id}`, data),
  excluir: (id: number) => api.delete(`/pagamentos/${id}`),
};