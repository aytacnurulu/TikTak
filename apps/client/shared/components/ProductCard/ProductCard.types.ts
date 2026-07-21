export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string; 
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}