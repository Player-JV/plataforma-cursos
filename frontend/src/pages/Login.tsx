import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
     
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.access_token);
      
      // 3. Lógica de Nível de Acesso (RBAC)
      // Definimos quem é o Administrador com base no e-mail principal
      if (email.toLowerCase() === 'jojo@gmail' || email.toLowerCase() === 'admin@gmail.com') {
        localStorage.setItem('tipoUsuario', 'ADMIN');
      } else {
        localStorage.setItem('tipoUsuario', 'ALUNO');
      }
      
      // 4. Redireciona para o Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErro('E-mail ou palavra-passe incorretos.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Entrar na Plataforma</h2>
      
      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Palavra-passe</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', box: 'border-box' }}
          />
        </div>
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;