'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import StatusBadge from '@/components/StatusBadge';
import IssueCard from '@/components/IssueCard';
import { getIssueById, getIssues, type Issue } from '@/lib/issues';

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [issue, setIssue] = useState<Issue | null | undefined>(undefined);
  const [related, setRelated] = useState<Issue[]>([]);

  useEffect(() => {
    (async () => {
      const found = await getIssueById(id);
      if (!found) {
        setIssue(null);
        return;
      }
      setIssue(found);
      const all = await getIssues();
      setRelated(
        all
          .filter((i) => i.id !== found.id && (i.ward === found.ward || i.status === found.status))
          .slice(0, 3)
      );
    })().catch((e) => {
      console.error(e);
      setIssue(null);
    });
  }, [id]);

  if (issue === undefined) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="card p-12 animate-pulse bg-slate-50 h-96" />
      </div>
    );
  }

  if (issue === null) notFound();

  return (
    <div>
      <section className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <nav className="text-sm text-muted mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-primary">गृहपृष्ठ</Link>
            <span>/</span>
            <Link href="/issues" className="hover:text-primary">समस्याहरू</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{issue.title}</span>
          </nav>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <article className="card p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <StatusBadge status={issue.status} size="md" />
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/8 px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                वार्ड {issue.ward}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {issue.createdAt}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {issue.title}
            </h1>

            <div className="mt-8 prose prose-slate max-w-none">
              <h2 className="text-lg font-semibold text-foreground mb-3">विवरण</h2>
              <p className="text-foreground/85 leading-relaxed text-[15px]">{issue.description}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">प्रगति समयरेखा</h2>
              <ol className="space-y-5">
                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">रिपोर्ट प्राप्त भयो</div>
                    <div className="text-xs text-muted mt-0.5">{issue.createdAt}</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    issue.status !== 'विचाराधीन' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-muted'
                  }`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {issue.status !== 'विचाराधीन' ? <path d="M20 6L9 17l-5-5" /> : <circle cx="12" cy="12" r="3" />}
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">समीक्षा अन्तर्गत</div>
                    <div className="text-xs text-muted mt-0.5">प्रशासनद्वारा जाँच</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    issue.status === 'समाधान भएको' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-muted'
                  }`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {issue.status === 'समाधान भएको' ? <path d="M20 6L9 17l-5-5" /> : <circle cx="12" cy="12" r="3" />}
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">समाधान</div>
                    <div className="text-xs text-muted mt-0.5">समस्या सम्बोधन</div>
                  </div>
                </li>
              </ol>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="card p-6">
              <h3 className="font-semibold text-foreground mb-4">सारांश</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">आईडी</dt>
                  <dd className="font-mono font-semibold text-xs">#{issue.id.slice(0, 6)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">वार्ड</dt>
                  <dd className="font-semibold">वार्ड {issue.ward}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">मिति</dt>
                  <dd className="font-semibold">{issue.createdAt}</dd>
                </div>
                <div className="flex justify-between gap-4 items-center">
                  <dt className="text-muted">स्थिति</dt>
                  <dd><StatusBadge status={issue.status} /></dd>
                </div>
              </dl>
              <Link href="/submit" className="btn-primary w-full justify-center mt-5">
                यस्तै रिपोर्ट पेश गर्नुहोस्
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-foreground mb-6">सम्बन्धित समस्याहरू</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <IssueCard key={r.id} issue={r} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
