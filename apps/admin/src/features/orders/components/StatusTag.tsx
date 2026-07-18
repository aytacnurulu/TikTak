export interface StatusTagProps {
  label: string;
  color: "orange" | "blue" | "purple" | "green" | "red" | "cyan" | "default";
}

const COLOR_CLASSES: Record<StatusTagProps["color"], string> = {
  orange: "text-orange-500 border-orange-200 bg-orange-50",
  blue: "text-blue-500 border-blue-200 bg-blue-50",
  purple: "text-purple-500 border-purple-200 bg-purple-50",
  green: "text-green-600 border-green-200 bg-green-50",
  red: "text-red-500 border-red-200 bg-red-50",
  cyan: "text-cyan-600 border-cyan-200 bg-cyan-50",
  default: "text-gray-500 border-gray-200 bg-gray-50",
};

export function StatusTag({ label, color }: StatusTagProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md border text-sm font-semibold ${COLOR_CLASSES[color]}`}
    >
      {label}
    </span>
  );
}