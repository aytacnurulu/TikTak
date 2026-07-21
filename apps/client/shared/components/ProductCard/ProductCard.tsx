import Image from 'next/image';
import Card from '../Card/Card';
import AddToCartControl from './AddToCartControl';
import type { ProductCardProps } from './ProductCard.types';

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="relative w-[187px] p-3 shadow-[0_0_10px_rgba(0,0,0,0.11)]">
      {product.badge && (
        <span className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
          {product.badge}
        </span>
      )}

      <div className="relative w-full h-[100px] mb-2">
        <Image src={product.image} alt={product.name} fill className="object-contain" />
      </div>

      <h3 className="text-sm font-medium text-dark line-clamp-2 mb-1">
        {product.name}
      </h3>

      <p className="text-sm font-semibold text-dark mb-3">
        {product.price.toFixed(2)} AZN
      </p>

      <AddToCartControl product={product} onAddToCart={onAddToCart} />
    </Card>
  );
};

export default ProductCard;