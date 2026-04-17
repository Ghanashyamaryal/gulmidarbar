import { Issue } from '@/data/issues';
import StatusBadge from './StatusBadge';

interface AdminTableProps {
  issues: Issue[];
  onStatusChange: (id: number, status: Issue['status']) => void;
  onDelete: (id: number) => void;
}

export default function AdminTable({ issues, onStatusChange, onDelete }: AdminTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="text-left font-semibold text-foreground/80 px-5 py-3.5">आईडी</th>
              <th className="text-left font-semibold text-foreground/80 px-5 py-3.5">शीर्षक</th>
              <th className="text-left font-semibold text-foreground/80 px-5 py-3.5">वार्ड</th>
              <th className="text-left font-semibold text-foreground/80 px-5 py-3.5">स्थिति</th>
              <th className="text-left font-semibold text-foreground/80 px-5 py-3.5">मिति</th>
              <th className="text-right font-semibold text-foreground/80 px-5 py-3.5">कार्य</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-slate-50/60 transition">
                <td className="px-5 py-4 font-mono text-xs text-muted">#{issue.id}</td>
                <td className="px-5 py-4 font-medium text-foreground max-w-xs truncate">
                  {issue.title}
                </td>
                <td className="px-5 py-4 text-muted">वार्ड {issue.ward}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={issue.status} />
                    <select
                      value={issue.status}
                      onChange={(e) => onStatusChange(issue.id, e.target.value as Issue['status'])}
                      className="text-xs border border-border rounded-md px-2 py-1 bg-white"
                    >
                      <option value="विचाराधीन">विचाराधीन</option>
                      <option value="प्रगति हुँदैछ">प्रगति हुँदैछ</option>
                      <option value="समाधान भएको">समाधान भएको</option>
                    </select>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted text-xs">{issue.createdAt}</td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => onDelete(issue.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                    मेटाउनुहोस्
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {issues.length === 0 && (
        <div className="p-10 text-center text-muted">कुनै समस्या भेटिएन।</div>
      )}
    </div>
  );
}
