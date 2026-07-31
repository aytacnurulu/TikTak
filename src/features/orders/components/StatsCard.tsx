interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: string;
  trend?: "up" | "down";
}

export function StatsCard({ label, value, icon, iconColor, trend }: StatsCardProps) {
  return (
    <div className="flex-1 border border-gray-100 rounded-xl px-5 py-4 flex flex-col gap-2 bg-white">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
        <span className={iconColor}>{icon}</span>
        <span>{value}</span>
        {trend === "up" && <span className="text-green-500 text-sm">↑</span>}
      </div>
    </div>
  );
}