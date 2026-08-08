import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';

const features = [
  { title: 'Smart Department Routing', body: 'Automatically tag complaints to the right government unit.', icon: ShieldCheck },
  { title: 'AI Priority Detection', body: 'Surface urgent civic issues before they become crises.', icon: TrendingUp },
  { title: 'Duplicate Detection', body: 'Reduce repeated reports with semantic clustering.', icon: Users },
  { title: 'Predictive Insights', body: 'Forecast hotspots and recurring issues with data.', icon: Sparkles }
];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <article className="space-y-6">
          <p className="inline-flex rounded-full bg-niraivu-100 px-4 py-1 text-sm font-semibold text-niraivu-700">Government Tech · AI Grievance Response</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Transforming Citizen Complaints into Faster Government Action
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            NiraivuAI powers local government with intelligent complaint routing, priority classification, duplicate detection and predictive analytics so every petition is resolved faster.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/submit" className="inline-flex items-center justify-center rounded-full bg-niraivu-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-niraivu-700">
              Submit a complaint
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="/analytics" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              View analytics
            </a>
          </div>
        </article>

        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-niraivu-500 to-slate-900 p-8 shadow-xl text-white">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">NiraivuAI Dashboard</p>
            <h3 className="text-3xl font-semibold">Intelligent grievance triage for public service teams</h3>
            <p className="text-slate-100/90">A unified command center to review petition insights, speed up resolution, and deliver transparent citizen service.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-200">AI insights</p>
              <p className="mt-3 text-2xl font-bold">Department assignment</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Status</p>
              <p className="mt-3 text-2xl font-bold">Real-time tracking</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">Problem</h3>
          <p className="mt-4 text-slate-600">Government agencies struggle with delayed complaint resolution due to incorrect routing, duplicate reports, and manual workload. Citizens feel unheard while officers work without AI-driven prioritization.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">AI-powered solution</h3>
          <p className="mt-4 text-slate-600">NiraivuAI analyzes complaint text and location to classify departments, identify urgency levels, detect duplicates and summarize issues for faster action.</p>
        </div>
      </section>

      <section className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <feature.icon className="h-8 w-8 text-niraivu-600" />
              <h4 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h4>
              <p className="mt-3 text-slate-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-niraivu-900 px-8 py-12 text-white shadow-xl sm:px-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {[
            { value: '12K+', label: 'Complaints analyzed' },
            { value: '40%', label: 'Faster resolution' },
            { value: '95%', label: 'Routing accuracy' },
            { value: '87%', label: 'Citizen satisfaction' }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
