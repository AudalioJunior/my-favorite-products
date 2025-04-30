import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await authService.register({ name, email, password });
      // navegar após cadastro
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <div className="logo">FavoList</div>
      <h2>Cadastro</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

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

        <button type="submit">Cadastrar</button>
      </form>

      <p className="bottom-text">
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}
