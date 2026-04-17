interface StatusBadgeProps {
  status: 'विचाराधीन' | 'प्रगति हुँदैछ' | 'समाधान भएको';
  size?: 'sm' | 'md';
}

const styles = {
  'विचाराधीन': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
    dot: 'bg-amber-500',
  },
  'प्रगति हुँदैछ': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-blue-200',
    dot: 'bg-blue-500',
  },
  'समाधान भएको': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-200',
    dot: 'bg-emerald-500',
  },
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const s = styles[status];
  const sizing = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ring-1 ring-inset ${sizing} ${s.bg} ${s.text} ${s.ring}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
