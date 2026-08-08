import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const departmentAnalytics = [
  { department: 'Roads', complaints: 240 },
  { department: 'Water Board', complaints: 190 },
  { department: 'Electricity', complaints: 150 },
  { department: 'Municipal', complaints: 120 }
];

const districtDistribution = [
  { district: 'North', count: 92 },
  { district: 'East', count: 74 },
  { district: 'South', count: 120 },
  { district: 'West', count: 58 }
];

const performanceTrend = [
  { week: 'W1', resolved: 85 },
  { week: 'W2', resolved: 78 },
  { week: 'W3', resolved: 92 },
  { week: 'W4', resolved: 88 }
];

export default function AdminDashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const deptRecords = useMemo(() => departmentAnalytics, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-niraivu-600">Admin Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900">Department insights and civic performance monitoring.</h1>
          </div>
          <select
            value={selectedDepartment}
            onChange={(event) => setSelectedDepartment(event.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none"
          >
            {['All', 'Roads', 'Water Board', 'Electricity', 'Municipal'].map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Department workload</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">700 complaints open</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Average resolution time</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">22 hrs</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Critical escalations</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">18 active</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Department analytics</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptRecords}>
                  <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="complaints" fill="#2563eb" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Resolution trend</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="resolved" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">District distribution</h2>
            <div className="mt-6">
              {districtDistribution.map((district) => (
                <div key={district.district} className="mb-4 rounded-3xl bg-white p-4">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{district.district}</span>
                    <span>{district.count}</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-niraivu-600" style={{ width: `${district.count}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Priority heatmap snapshot</h2>
            <div className="mt-6 space-y-4">
              {['Critical', 'High', 'Medium', 'Low'].map((level, idx) => (
                <div key={level} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-3xl bg-white p-4">
                  <span className="font-medium text-slate-900">{level}</span>
                  <span className="text-slate-600">{[18, 46, 92, 68][idx]} issues</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
