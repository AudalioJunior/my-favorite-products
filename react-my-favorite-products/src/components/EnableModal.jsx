import React, { useState } from 'react';
import favoritesService from '../services/favoritesService';

export default function EnableModal({ onClose, onEnable }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleConfirm = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')).data;

      const userId = user.id;

      const result = await favoritesService.createFavoriteList({ title, description, userId });
      onEnable({ title: result.title, description: result.description });
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      const message = Array.isArray(backendMessage)
        ? backendMessage.join('\n')
        : backendMessage || 'Erro ao criar lista. Tente novamente.';
      alert(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Habilitar Lista de Favoritos</h2>
        <label>Título</label>
        <input
          type="text"
          placeholder="Nome da sua lista"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Descrição</label>
        <textarea
          placeholder="Uma breve descrição..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={handleConfirm}>Habilitar</button>
        </div>
      </div>
    </div>
  );
}