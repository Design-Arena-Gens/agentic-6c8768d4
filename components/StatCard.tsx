interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

export default function StatCard({ title, value, icon, trend, colorClass = 'bg-primary-500' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-full ${colorClass} flex items-center justify-center text-white text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
