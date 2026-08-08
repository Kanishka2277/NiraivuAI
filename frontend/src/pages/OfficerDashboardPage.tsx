import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const metrics = [
  { label: 'Total complaints', value: 7824 },
  { label: 'Pending', value: 312 },
  { label: 'Resolved', value: 7248 },
  { label: 'High priority', value: 146 }
];

const summaryTiles = [
  { title: 'Top issue', value: 'Water leak in sector 12' },
  { title: 'Next assignment', value: 'Route inspection team' },
  { title: 'Average SLA', value: '18 hrs' }
];

const complaintData = [
  { name: 'Water', count: 42 },
  { name: 'Roads', count: 28 },
  { name: 'Electricity', count: 18 },
  { name: 'Sanitation', count: 12 }
];

const COLORS = ['#2563eb', '#1d4ed8', '#0f766e', '#7c3aed'];

export default function OfficerDashboardPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const filteredComplaints = useMemo(
    () => [
      { id: 'NIRA-2026-0031', category: 'Sanitation', priority: 'High', status: 'Assigned' },
      { id: 'NIRA-2026-0032', category: 'Roads', priority: 'Medium', status: 'In Progress' },
      { id: 'NIRA-2026-0033', category: 'Water Supply', priority: 'Critical', status: 'Pending' }
    ].filter((item) => statusFilter === 'All' || item.status === statusFilter),
    [statusFilter]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_0.65fr]">
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-niraivu-600">Officer Dashboard</p>
              <h1 className="text-3xl font-semibold text-slate-900">Manage field operations and complaint assignments.</h1>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-slate-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Recent AI summaries</h2>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none"
              >
                {['All', 'Assigned', 'In Progress', 'Pending', 'Resolved'].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{complaint.id}</p>
                      <p className="text-sm text-slate-500">{complaint.category}</p>
                    </div>
                    <div className="flex gap-2 text-sm text-slate-600">
                      <span className="rounded-full bg-niraivu-100 px-3 py-1">{complaint.priority}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{complaint.status}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">AI Summary: Inspect drainage in civic zone, verify water contamination risk, and assign sanitation crew immediately.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick insights</h2>
            <div className="mt-6 grid gap-4">
              {summaryTiles.map((tile) => (
                <div key={tile.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{tile.title}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{tile.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Complaint distribution</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={complaintData} innerRadius={48} outerRadius={88} dataKey="count" paddingAngle={3}>
                    {complaintData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Trending issues</h2>
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complaintData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
