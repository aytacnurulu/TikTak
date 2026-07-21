'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  initialValue?: number;
  min?: number;
  onChange?: (value: number) => void;
}

const QuantitySelector = ({ initialValue = 1, min = 0, onChange }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleDecrease = () => {
    const newValue = Math.max(min, quantity - 1);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center bg-primary rounded-full overflow-hidden">
      <button onClick={handleDecrease} className="px-3 py-2 text-white">−</button>
      <span className="px-2 text-white text-sm">{quantity} kq</span>
      <button onClick={handleIncrease} className="px-3 py-2 text-white">+</button>
    </div>
  );
};

export default QuantitySelector;