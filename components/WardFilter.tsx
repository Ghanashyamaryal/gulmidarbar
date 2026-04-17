interface WardFilterProps {
  selectedWard: number | null;
  onWardChange: (ward: number | null) => void;
}

export default function WardFilter({ selectedWard, onWardChange }: WardFilterProps) {
  const wards = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">वार्ड अनुसार फिल्टर</h3>
          <p className="text-xs text-muted mt-0.5">वार्ड छानेर समस्याहरू हेर्नुहोस्</p>
        </div>
        {selectedWard !== null && (
          <button
            onClick={() => onWardChange(null)}
            className="text-xs font-medium text-primary hover:underline"
          >
            क्लियर
          </button>
        )}
      </div>

      <div className="relative">
        <svg
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <select
          value={selectedWard ?? ''}
          onChange={(e) => onWardChange(e.target.value === '' ? null : parseInt(e.target.value))}
          className="input-field pl-10 pr-10 appearance-none cursor-pointer"
        >
          <option value="">सबै वार्डहरू</option>
          {wards.map((w) => (
            <option key={w} value={w}>
              वार्ड {w}
            </option>
          ))}
        </select>
        <svg
          className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
