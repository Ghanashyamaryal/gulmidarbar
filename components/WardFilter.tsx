interface WardFilterProps {
  selectedWard: number | null;
  onWardChange: (ward: number | null) => void;
}

export default function WardFilter({ selectedWard, onWardChange }: WardFilterProps) {
  const wards = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">वार्ड अनुसार फिल्टर</h3>
          <p className="text-xs text-muted mt-0.5">कुनै वार्डको समस्याहरू मात्र हेर्न चयन गर्नुहोस्</p>
        </div>
        {selectedWard !== null && (
          <button
            onClick={() => onWardChange(null)}
            className="text-xs font-medium text-primary hover:underline"
          >
            क्लियर गर्नुहोस्
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onWardChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedWard === null
              ? 'bg-primary text-white shadow-md shadow-primary/30'
              : 'bg-slate-100 text-foreground/80 hover:bg-slate-200'
          }`}
        >
          सबै
        </button>
        {wards.map((w) => (
          <button
            key={w}
            onClick={() => onWardChange(w)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedWard === w
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-slate-100 text-foreground/80 hover:bg-slate-200'
            }`}
          >
            वार्ड {w}
          </button>
        ))}
      </div>
    </div>
  );
}
