interface Stat {
  label: string;
  value: string;
}

// TODO: statik data — Postman collection-da bu bloka uyğun endpoint yoxdur
// (yalnız Admin > Orders > stats var, sifariş statistikası üçündür).
// Backend uyğun endpoint verəndə useQuery ilə əvəz olunacaq.
const stats: Stat[] = [
  { label: "Market sayı", value: "137" },
  { label: "Region", value: "11" },
  { label: "Məhsul sayı", value: "50000+" },
  { label: "Əməkdaş sayı", value: "5500+" },
];

const StatsSection = () => {
  return (
    <section className="border-2 border-primary rounded-[10px] p-6">
      <h2 className="text-xl font-bold text-success mb-1">
        Bizim göstəricilər
      </h2>
      <p className="text-gray-500 mb-6">
        Biz yeni imkanları axtarırıq və digərlərinin bilmədikləri yerlərə
        getməyə hazırıq.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl font-bold text-success">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
