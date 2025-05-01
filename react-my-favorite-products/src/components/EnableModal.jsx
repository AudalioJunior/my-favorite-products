import React, { useState, useEffect } from 'react';
import favoritesService from '../services/favoritesService';

export default function EnableModal({ onClose, onEnable, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleConfirm = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))?.data;
      const userId = user?.id;

      if (!userId) {
        alert('Usuário não encontrado. Faça login novamente.');
        return;
      }

      let result;

      if (initialData?.id) {
        result = await favoritesService.updateList(initialData.id, {
          title,
          description,
        });
      } else {
        result = await favoritesService.createFavoriteList({
          title,
          description,
          userId,
        });
      }

      localStorage.setItem('favoriteList', JSON.stringify(result));
      console.log("result", result)
      onEnable({
        id: result.data?.id,
        title: result.data?.title,
        description: result.data?.description,
      });
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      const message = Array.isArray(backendMessage)
        ? backendMessage.join('\n')
        : backendMessage || 'Erro ao processar a lista. Tente novamente.';
      alert(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData?.id ? 'Editar Lista de Favoritos' : 'Habilitar Lista de Favoritos'}</h2>

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
          <button className="btn primary" onClick={handleConfirm}>
            {initialData?.id ? 'Salvar' : 'Habilitar'}
          </button>
        </div>
      </div>
    </div>
  );
}
