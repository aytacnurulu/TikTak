'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  initialValue?: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange?: (value: number) => void;
}

const QuantitySelector = ({
  initialValue = 1,
  min = 0,
  max,
  unit = 'kq',
  onChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleDecrease = () => {
    const newValue = Math.max(min, quantity - 1);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleIncrease = () => {
    const newValue = max !== undefined ? Math.min(max, quantity + 1) : quantity + 1;
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const isDecreaseDisabled = quantity <= min;
  const isIncreaseDisabled = max !== undefined && quantity >= max;

  return (
    <div className="flex items-center gap-1 w-full">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isDecreaseDisabled}
        aria-label="Sayı azalt"
        className="h-9 w-9 flex items-center justify-center rounded-full bg-accent text-white text-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="flex-1 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-sm font-medium">
        {quantity} {unit}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={isIncreaseDisabled}
        aria-label="Sayı artır"
        className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white text-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;