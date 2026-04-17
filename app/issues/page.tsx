'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { issues, Issue } from '@/data/issues';
import IssueCard from '@/components/IssueCard';
import WardFilter from '@/components/WardFilter';

type StatusFilter = 'सबै' | Issue['status'];
const STATUSES: StatusFilter[] = ['सबै', 'विचाराधीन', 'प्रगति हुँदैछ', 'समाधान भएको'];

function IssuesContent() {
  const searchParams = useSearchParams();
  const initialWard = searchParams.get('ward') ? parseInt(searchParams.get('ward')!) : null;
  const [selectedWard, setSelectedWard] = useState<number | null>(initialWard);
  const [status, setStatus] = useState<StatusFilter>('सबै');
  const [query, setQuery] = useState('');

  const filteredIssues = useMemo(() => {
    return issues.filter((i) => {
      if (selectedWard !== null && i.ward !== selectedWard) return false;
      if (status !== 'सबै' && i.status !== status) return false;
      if (query.trim() && !(`${i.title} ${i.description}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [selectedWard, status, query]);

  return (
    <div>
      {/* Page Header */}
      <section className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <nav className="text-sm text-muted mb-4">
            <Link href="/" className="hover:text-primary">गृहपृष्ठ</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">समस्याहरू</span>
          </nav>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                सबै रिपोर्टहरू
              </h1>
              <p className="text-muted mt-3 max-w-2xl">
                वार्ड, स्थिति वा कीवर्ड अनुसार फिल्टर गरेर सम्बन्धित समस्याहरू हेर्नुहोस्।
              </p>
            </div>
            <Link href="/submit" className="btn-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              नयाँ रिपोर्ट
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="space-y-4">
            <div className="card p-5">
              <label className="block text-sm font-semibold text-foreground mb-2">खोज्नुहोस्</label>
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="शीर्षक वा विवरण..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input-field pl-9"
                />
              </div>
            </div>

            <WardFilter selectedWard={selectedWard} onWardChange={setSelectedWard} />

            <div className="card p-5">
              <h3 className="font-semibold text-foreground mb-3">स्थिति</h3>
              <div className="space-y-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                      status === s
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-slate-50 text-foreground/80'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-5 text-sm">
              <div className="text-muted">
                <span className="font-semibold text-foreground">{filteredIssues.length}</span> नतिजा भेटियो
              </div>
            </div>
            {filteredIssues.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">कुनै नतिजा भेटिएन</h3>
                <p className="text-sm text-muted mt-1">फिल्टर परिवर्तन गरेर पुनः प्रयास गर्नुहोस्।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function IssuesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-muted">लोड हुँदैछ...</div>}>
      <IssuesContent />
    </Suspense>
  );
}
