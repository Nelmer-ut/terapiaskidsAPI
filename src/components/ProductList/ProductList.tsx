import React from 'react';
import { Product } from '../../types/product';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return <p className="product-list-empty">No se encontraron programas con esos filtros.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
