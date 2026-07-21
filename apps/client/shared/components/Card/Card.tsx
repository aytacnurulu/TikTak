import { forwardRef } from 'react';
import type { CardProps } from './Card.types';

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...rest }, ref) => {
    const classes = [
      'bg-white rounded-[10px] border border-gray-100 shadow-sm',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;