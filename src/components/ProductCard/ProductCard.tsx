import React, { useState } from 'react';
import { Product } from '../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAddToCart(product, 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onAddToCart(product, -1);
    }
  };

  return (
    <article className="product-card">
      <div className="card-badge">{product.category}</div>
      
      <img src={product.image} alt={product.name} className="product-card-image" />
      
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        
        <div className="card-metadata-row">
          <span className="meta-tag age">👦 {product.ageGroup}</span>
          <span className="meta-tag target">🎯 {product.target}</span>
          <span className="meta-tag duration">⏱️ {product.duration}</span>
          <span className="meta-tag modality">📍 {product.modality}</span>
        </div>
        
        <p className="product-card-description">{product.description}</p>
        
        <ul className="features-list">
          {product.features.map((feat, idx) => (
            <li key={idx} className="feature-item">🌸 {feat}</li>
          ))}
        </ul>
        
        <div className="product-card-footer">
          <div className="price-box">
            <span className="price-label">Inversión</span>
            <span className="product-card-price">${product.price.toLocaleString('es-CL')} CLP</span>
          </div>
          
          <div className="card-actions">
            {quantity === 0 ? (
              <button className="btn-add" onClick={handleIncrement}>
                Matricularse
              </button>
            ) : (
              <div className="quantity-controls">
                <button className="btn-qty" onClick={handleDecrement}>-</button>
                <span className="qty-value">{quantity}</span>
                <button className="btn-qty" onClick={handleIncrement}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
