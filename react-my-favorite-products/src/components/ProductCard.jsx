import React from 'react';

export default function ProductCard({ product, isFavorited, onFavorite }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">R$ {product.price.toFixed(2)}</p>
      <button
        className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
        onClick={() => onFavorite(product.id)}
      >
        {isFavorited ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
