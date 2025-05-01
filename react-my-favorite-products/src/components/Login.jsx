import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      alert('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || 'Erro inesperado no login.';
      alert(msg); 
    }
  };

  return (
    <div className="form-container">
      <div className="logo">FavoList</div>
      <h2>Login</h2>
      
      <form onSubmit={handleLogin}>
        <label>E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      <p className="bottom-text">
        Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}
