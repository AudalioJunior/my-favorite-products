import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import EnableModal from './EnableModal';
import productService from '../services/productService';
import favoritesService from '../services/favoritesService';

export default function Dashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listInfo, setListInfo] = useState({ title: '', description: '' });

  useEffect(() => {
    async function load() {
      try {
        const all = await productService.getAll();
        setProducts(all);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    }
    load();
  }, []);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')).data;
    if (user?.id) {
      favoritesService
        .getListByUserId(user.id)
        .then(data => {
          setListInfo({ title: data.title, description: data.description });
          setEnabled(true);
        })
        .catch(() => {
          setEnabled(false); 
        });
    }
  }, []);

  const handleToggle = async id => {
    if (!enabled) return;
    try {
      await favoritesService.toggleFavorite(id);
      setFavIds(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    } catch (err) {
      console.error('Erro ao favoritar:', err);
    }
  };

  const handleDeleteList = () => {
    setEnabled(false);
    setFavIds([]);
    setListInfo({ title: '', description: '' });
    setTab('products');
  };

  const handleEditList = () => {
    setShowModal(true);
  };

  const displayedList =
    tab === 'products'
      ? products
      : products.filter(p => favIds.includes(p.id));

  return (
    <div className="dashboard-container">
      <div
        className="enable-banner"
        style={{ justifyContent: 'flex-end', display: 'flex', gap: '0.5rem' }}
      >
        {enabled ? (
          <>
            <button className="btn" onClick={handleEditList}>
              Editar
            </button>
            <button className="btn danger" onClick={handleDeleteList}>
              Excluir
            </button>
          </>
        ) : (
          <button className="btn enable-list" onClick={() => setShowModal(true)}>
            <span className="icon">➕</span> Habilitar Lista
          </button>
        )}
      </div>

      <div className="tabs">
        <button
          className={tab === 'products' ? 'active' : ''}
          onClick={() => setTab('products')}
        >
          <span className="tab-icon">🛍️</span> Produtos
        </button>
        <button
          className={tab === 'favorites' ? 'active' : ''}
          onClick={() => enabled && setTab('favorites')}
          disabled={!enabled}
        >
          <span className="tab-icon">❤️</span> Favoritos
        </button>
      </div>
      <div className="products-wrapper">
        {enabled && tab === 'favorites' && (
          <div className="list-info" style={{ marginBottom: '1rem' }}>
            <h3>{listInfo.title}</h3>
            <p>{listInfo.description}</p>
          </div>
        )}

        <div className="products-grid">
          {displayedList.length > 0 ? (
            displayedList.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                isFavorited={favIds.includes(prod.id)}
                onFavorite={handleToggle}
              />
            ))
          ) : (
            <p className="empty-text">Nenhum item aqui.</p>
          )}
        </div>
      </div>

      {showModal && (
        <EnableModal
          onClose={() => setShowModal(false)}
          onEnable={info => {
            setListInfo(info);
            setEnabled(true);
            setShowModal(false);
          }}
          initialData={listInfo}
        />
      )}
    </div>
  );
}
