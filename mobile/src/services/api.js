import axios from 'axios';

export const API_URL = 'https://jubilant-succotash-x59q4g6jp7q6fp4jp-3000.app.github.dev';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Anexa o token JWT automaticamente em todas as requisições após o login
export function definirToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}