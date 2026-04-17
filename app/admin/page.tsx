'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { issues as initialIssues, Issue } from '@/data/issues';
import AdminTable from '@/components/AdminTable';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [query, setQuery] = useState('');
  const [wardFilter, setWardFilter] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('गलत प्रयोगकर्ता नाम वा पासवर्ड');
    }
  };

  const handleStatusChange = (id: number, status: Issue['status']) => {
    setIssues(issues.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const handleDelete = (id: number) => {
    if (confirm('के तपाईं यो समस्या मेटाउन चाहनुहुन्छ?')) {
      setIssues(issues.filter((i) => i.id !== id));
    }
  };

  const stats = useMemo(() => ({
    total: issues.length,
    pending: issues.filter((i) => i.status === 'विचाराधीन').length,
    progress: issues.filter((i) => i.status === 'प्रगति हुँदैछ').length,
    resolved: issues.filter((i) => i.status === 'समाधान भएको').length,
  }), [issues]);

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      if (wardFilter !== null && i.ward !== wardFilter) return false;
      if (query.trim() && !i.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [issues, query, wardFilter]);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-band flex items-center justify-center mx-auto shadow-lg mb-4">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">प्रशासन लगइन</h1>
            <p className="text-sm text-muted mt-2">अधिकृत कर्मचारीका लागि मात्र</p>
          </div>

          <form onSubmit={handleLogin} className="card p-7 space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">प्रयोगकर्ता नाम</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">पासवर्ड</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              लगइन
            </button>
            <p className="text-xs text-muted text-center pt-2">
              डेमो: admin / admin123
            </p>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-muted hover:text-primary">← गृहपृष्ठमा फर्कनुहोस्</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow">प्रशासन प्यानल</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-3">
                रिपोर्ट व्यवस्थापन
              </h1>
              <p className="text-muted mt-2">समस्याहरूको स्थिति अद्यावधिक, समीक्षा र हटाउनुहोस्।</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="btn-ghost"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5M21 12H9" />
              </svg>
              लगआउट
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'कुल रिपोर्ट', value: stats.total, tone: 'bg-slate-50 text-slate-700' },
            { label: 'विचाराधीन', value: stats.pending, tone: 'bg-amber-50 text-amber-700' },
            { label: 'प्रगति हुँदैछ', value: stats.progress, tone: 'bg-blue-50 text-blue-700' },
            { label: 'समाधान भएको', value: stats.resolved, tone: 'bg-emerald-50 text-emerald-700' },
          ].map((s) => (
            <div key={s.label} className={`card p-5 ${s.tone}`}>
              <div className="text-sm font-medium opacity-80">{s.label}</div>
              <div className="text-3xl font-bold mt-1">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="card p-5 flex flex-wrap gap-3 items-center justify-between">
          <div className="relative flex-1 min-w-60 max-w-md">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="शीर्षकद्वारा खोज्नुहोस्..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setWardFilter(null)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                wardFilter === null ? 'bg-primary text-white' : 'bg-slate-100 text-foreground/80 hover:bg-slate-200'
              }`}
            >
              सबै
            </button>
            {[1, 2, 3, 4, 5, 6, 7].map((w) => (
              <button
                key={w}
                onClick={() => setWardFilter(w)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  wardFilter === w ? 'bg-primary text-white' : 'bg-slate-100 text-foreground/80 hover:bg-slate-200'
                }`}
              >
                वा. {w}
              </button>
            ))}
          </div>
        </div>

        <AdminTable
          issues={filtered}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
