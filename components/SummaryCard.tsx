interface SummaryCardProps {
  title: string;
  value: string | number;
  variant?: "udhaar" | "collected" | "pending" | "net";
  icon?: React.ReactNode;
}

export function SummaryCard({ title, value, variant = "udhaar", icon }: SummaryCardProps) {
  const variantStyles = {
    udhaar: "border-amber-200 bg-amber-50/80 text-amber-900",
    collected: "border-emerald-200 bg-emerald-50/80 text-emerald-900",
    pending: "border-red-200 bg-red-50/80 text-red-900",
    net: "border-blue-200 bg-blue-50/80 text-blue-900",
  };

  return (
    <div
      className={`rounded-xl border-2 p-5 shadow-sm transition-shadow hover:shadow-md ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-3xl opacity-60">{icon}</div>}
      </div>
    </div>
  );
}
