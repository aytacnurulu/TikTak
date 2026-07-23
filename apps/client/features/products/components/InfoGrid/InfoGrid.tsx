import { ReactNode } from 'react';

interface InfoGridProps {
  children: ReactNode;
  columns?: number;
  className?: string;
  ariaLabel?: string;
}

export default function InfoGrid({
  children,
  columns = 6,
  className = '',
  ariaLabel,
}: InfoGridProps) {
  return (
    <div
      role="list"
      aria-label={ariaLabel}
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}