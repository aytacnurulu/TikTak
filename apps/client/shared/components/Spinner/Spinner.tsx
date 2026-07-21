interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'primary';
}

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const colorMap: Record<NonNullable<SpinnerProps['color']>, string> = {
  white: 'border-white/30 border-t-white',
  primary: 'border-primary/30 border-t-primary',
};

const Spinner = ({ size = 'sm', color = 'white' }: SpinnerProps) => {
  return (
    <span
      className={`inline-block rounded-full border-2 animate-spin ${sizeMap[size]} ${colorMap[color]}`}
    />
  );
};

export default Spinner;