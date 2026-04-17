import Link from 'next/link';
import { Issue } from '@/data/issues';
import StatusBadge from './StatusBadge';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link href={`/issues/${issue.id}`} className="card p-5 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          वार्ड {issue.ward}
        </span>
        <StatusBadge status={issue.status} />
      </div>

      <h3 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary">
        {issue.title}
      </h3>

      <p className="text-sm text-muted leading-relaxed line-clamp-2">
        {issue.description}
      </p>

      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {issue.createdAt}
        </span>
        <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
          विस्तृत हेर्नुहोस्
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
