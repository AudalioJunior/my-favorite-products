import React, { useState } from 'react';

export default function EnableModal({ onClose, onEnable }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleEnable = () => {
    if (!title.trim()) return;
    onEnable({ title: title.trim(), description: description.trim() });
    onClose();
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
          <button className="btn primary" onClick={handleEnable}>Habilitar</button>
        </div>
      </div>
    </div>
  );
}