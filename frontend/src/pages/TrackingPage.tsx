import { useState } from 'react';

const timeline = [
  { label: 'Submitted', done: true },
  { label: 'AI Analysis', done: true },
  { label: 'Assigned', done: false },
  { label: 'In Progress', done: false },
  { label: 'Resolved', done: false }
];

export default function TrackingPage() {
  const [complaintId, setComplaintId] = useState('');

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-niraivu-600">Complaint Tracking</p>
          <h1 className="text-3xl font-semibold text-slate-900">Track your complaint status in real time.</h1>
          <p className="max-w-2xl text-slate-600">Enter your complaint ID to see its progress from submission to resolution.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={complaintId}
            onChange={(event) => setComplaintId(event.target.value)}
            placeholder="Enter Complaint ID, e.g. NIRA-2026-0031"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm shadow-sm outline-none focus:border-niraivu-500 focus:ring-2 focus:ring-niraivu-100"
          />
          <button className="rounded-full bg-niraivu-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-niraivu-700">
            Track
          </button>
        </div>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Complaint ID</p>
              <p className="text-xl font-semibold text-slate-900">{complaintId || 'NIRA-2026-0031'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Current status</p>
              <p className="text-lg font-semibold text-niraivu-700">Assigned</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between text-sm text-slate-500">
              <span>Completion</span>
              <span>40%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-2/5 rounded-full bg-niraivu-600 transition-all duration-500" />
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {timeline.map((item, index) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className={`mt-1 h-3 w-3 rounded-full ${item.done ? 'bg-niraivu-600' : 'bg-slate-300'}`} />
                <div>
                  <p className="text-base font-semibold text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.done ? 'Completed' : index === 0 ? 'Awaiting submission' : 'Pending next step'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
