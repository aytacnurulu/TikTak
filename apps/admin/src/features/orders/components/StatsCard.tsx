interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: string;
  trend?: "up" | "down";
  isLast?: boolean;
}

export function StatsCard({ label, value, icon, iconColor, trend, isLast }: StatsCardProps) {
  return (
    <div
      className={`flex-1 flex flex-col gap-2 px-6 py-4 ${
        !isLast ? "border-r border-gray-100" : ""
      }`}
    >
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
        <span className={iconColor}>{icon}</span>
        <span>{value}</span>
        {trend === "up" && <span className="text-green-500 text-sm">↑</span>}
      </div>
    </div>
  );
}