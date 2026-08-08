import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

const trendData = [
  { month: 'Jan', complaints: 480 },
  { month: 'Feb', complaints: 520 },
  { month: 'Mar', complaints: 560 },
  { month: 'Apr', complaints: 610 },
  { month: 'May', complaints: 680 },
  { month: 'Jun', complaints: 720 }
];

const clusterData = [
  { type: 'Road damage', count: 29 },
  { type: 'Water outage', count: 23 },
  { type: 'Power failure', count: 19 }
];

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-niraivu-600">AI Analytics</p>
          <h1 className="text-3xl font-semibold text-slate-900">Predictive performance and complaint trends.</h1>
          <p className="max-w-2xl text-slate-600">Analyze recurring issues, forecast hotspots, and understand department workload with AI-driven metrics.</p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Issue forecast</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">+18% next quarter</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Recurring hotspots</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">6 zones identified</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Duplicate clusters</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">15 grouped issues</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Complaint trend analysis</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="complaints" stroke="#2563eb" fill="url(#areaGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Duplicate complaint clusters</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clusterData} layout="vertical" margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" width={110} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" radius={[12, 12, 12, 12]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
