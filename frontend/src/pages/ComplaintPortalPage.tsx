import { useMemo, useState } from 'react';

const categories = ['Roads', 'Water Supply', 'Electricity', 'Sanitation', 'Public Safety', 'Civic Issue'];

const analysisResults = {
  department: 'Municipal Department',
  priority: 'High',
  duplicate: 'No duplicates detected',
  summary: 'Drainage blockage impacting local sanitation; requires immediate field inspection.',
  confidence: '93%'
};

export default function ComplaintPortalPage() {
  const [complaintId, setComplaintId] = useState('NIRA-2026-0031');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: categories[0],
    description: ''
  });

  const canSubmit = useMemo(
    () => formData.name && formData.location && formData.description,
    [formData]
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-niraivu-600">Citizen Complaint Portal</p>
          <h1 className="text-3xl font-semibold text-slate-900">Submit your grievance and let AI route it instantly.</h1>
          <p className="max-w-2xl text-slate-600">Complete the form below to register a complaint. NiraivuAI will analyze the issue and provide department, priority, duplicate status, and summary details.</p>
        </div>

        <form
          className="mt-10 grid gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none focus:border-niraivu-500 focus:ring-2 focus:ring-niraivu-100"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <input
                type="text"
                value={formData.location}
                onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none focus:border-niraivu-500 focus:ring-2 focus:ring-niraivu-100"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={formData.category}
              onChange={(event) => setFormData({ ...formData, category: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none focus:border-niraivu-500 focus:ring-2 focus:ring-niraivu-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Complaint description</span>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm shadow-sm outline-none focus:border-niraivu-500 focus:ring-2 focus:ring-niraivu-100"
              placeholder="Describe the issue in detail, including the affected area and impact."
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Upload image (optional)</span>
            <input type="file" className="w-full text-sm text-slate-500" />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center rounded-full bg-niraivu-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-niraivu-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Submit complaint
          </button>
        </form>

        {submitted && (
          <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-niraivu-600">AI Analysis Complete</p>
                <h2 className="text-2xl font-semibold text-slate-900">Complaint ID: {complaintId}</h2>
              </div>
              <span className="rounded-full bg-niraivu-100 px-4 py-2 text-sm font-semibold text-niraivu-700">Active review</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Detected Department</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{analysisResults.department}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Priority Level</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{analysisResults.priority}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Duplicate Status</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{analysisResults.duplicate}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Confidence Score</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{analysisResults.confidence}</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">AI Summary</h3>
              <p className="mt-3 text-slate-600">{analysisResults.summary}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
