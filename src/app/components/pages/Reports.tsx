import { Download, TrendingUp, IndianRupee, Users, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '../shared/StatCard';

const dailyRevenue = [
  { date: 'Feb 8', revenue: 12500 },
  { date: 'Feb 9', revenue: 15800 },
  { date: 'Feb 10', revenue: 18200 },
  { date: 'Feb 11', revenue: 14500 },
  { date: 'Feb 12', revenue: 19800 },
  { date: 'Feb 13', revenue: 16200 },
  { date: 'Feb 14', revenue: 21500 },
];

const monthlyRevenue = [
  { month: 'Aug', revenue: 385000 },
  { month: 'Sep', revenue: 420000 },
  { month: 'Oct', revenue: 398000 },
  { month: 'Nov', revenue: 445000 },
  { month: 'Dec', revenue: 512000 },
  { month: 'Jan', revenue: 478000 },
  { month: 'Feb', revenue: 395000 },
];

const topTreatments = [
  { name: 'Root Canal', value: 45, revenue: 382500 },
  { name: 'Scaling', value: 120, revenue: 180000 },
  { name: 'Filling', value: 85, revenue: 170000 },
  { name: 'Extraction', value: 35, revenue: 52500 },
  { name: 'Whitening', value: 28, revenue: 224000 },
];

const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444'];

export function Reports() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Business insights and performance metrics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download className="w-5 h-5" />
          Export PDF
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Revenue"
          value="₹21,500"
          icon={IndianRupee}
          color="blue"
          trend={{ value: '+18% from yesterday', isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value="₹3,95,000"
          icon={TrendingUp}
          color="teal"
          trend={{ value: '+12% from last month', isPositive: true }}
        />
        <StatCard
          title="Total Patients"
          value="248"
          icon={Users}
          color="purple"
          trend={{ value: '+23 this month', isPositive: true }}
        />
        <StatCard
          title="Outstanding Dues"
          value="₹42,750"
          icon={Activity}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Daily Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Daily Revenue (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top Treatments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Treatments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topTreatments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {topTreatments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Revenue Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Treatment Revenue Breakdown</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treatment</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topTreatments.map((treatment, index) => (
                <tr key={treatment.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-gray-900">{treatment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                    {treatment.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    ₹{treatment.revenue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
