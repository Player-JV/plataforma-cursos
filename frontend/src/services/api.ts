import axios from 'axios';

const api = axios.create({
  baseURL: 'https://friendly-cod-69r7px6j5q643xr6g-3000.app.github.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercetor de pedido: adiciona o token JWT antes de comunicar com o backend
api.interceptors.request.use(
  (config) => {
    // Procura o token guardado no navegador após o login
    const token = localStorage.getItem('token');
    
    // Se o token existir, injeta-o no cabeçalho de Autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercetor de resposta: ajuda no debug (mostra no console se der erro)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;