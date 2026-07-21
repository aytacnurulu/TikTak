'use client';

import { useState } from 'react';
import Button from '../Button/Button';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import type { Product } from '../ProductCard/ProductCard.types';

interface AddToCartControlProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

const AddToCartControl = ({ product, onAddToCart }: AddToCartControlProps) => {
  const [inCart, setInCart] = useState(false);

  const handleAdd = () => {
    setInCart(true);
    onAddToCart?.(product, 1);
  };

  const handleQuantityChange = (value: number) => {
    if (value === 0) setInCart(false);
    onAddToCart?.(product, value);
  };

  return !inCart ? (
    <Button variant="primary" size="sm" fullWidth onClick={handleAdd}>
      Sabətə əlavə et
    </Button>
  ) : (
    <QuantitySelector initialValue={1} onChange={handleQuantityChange} />
  );
};

export default AddToCartControl;