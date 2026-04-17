'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addIssue } from '@/lib/issues';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ward: '',
    name: '',
    phone: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await addIssue({
        title: formData.title.trim(),
        description: formData.description.trim(),
        ward: parseInt(formData.ward, 10),
        name: formData.name.trim() || undefined,
        phone: formData.phone.trim() || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('रिपोर्ट पेश गर्न सकिएन। कृपया पुनः प्रयास गर्नुहोस्।');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-lg mx-auto card p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">धन्यवाद!</h2>
          <p className="text-muted mt-3 leading-relaxed">
            तपाईंको रिपोर्ट सफलतापूर्वक पेश गरिएको छ। प्रशासनले शीघ्र समीक्षा गरी अद्यावधिक गर्नेछ।
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-7">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ title: '', description: '', ward: '', name: '', phone: '' });
                setFile(null);
              }}
              className="btn-ghost"
            >
              अर्को रिपोर्ट
            </button>
            <Link href="/issues" className="btn-primary">सबै समस्याहरू हेर्नुहोस्</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <nav className="text-sm text-muted mb-4">
            <Link href="/" className="hover:text-primary">गृहपृष्ठ</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">समस्या पेश गर्नुहोस्</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            नयाँ समस्या रिपोर्ट गर्नुहोस्
          </h1>
          <p className="text-muted mt-3 max-w-2xl">
            जति विस्तृत जानकारी दिनुहुन्छ, त्यति नै छिटो समाधान सम्भव हुन्छ। सम्भव भएसम्म तस्वीर/PDF समावेश गर्नुहोस्।
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          <form onSubmit={handleSubmit} className="card p-7 md:p-9 space-y-6">
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
              <label className="block text-sm font-semibold text-foreground mb-2">
                शीर्षक <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="उदाहरण: सडक बत्ती बिग्रिएको छ"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                विवरण <span className="text-accent">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field h-36 resize-y"
                placeholder="समस्याको पूर्ण विवरण, स्थान र कहिले देखि भएको हो उल्लेख गर्नुहोस्..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  वार्ड <span className="text-accent">*</span>
                </label>
                <select
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">वार्ड छान्नुहोस्</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((ward) => (
                    <option key={ward} value={ward}>वार्ड {ward}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  तपाईंको नाम
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="ऐच्छिक"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                सम्पर्क नम्बर
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                placeholder="ऐच्छिक, प्रगति सूचनाका लागि"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                प्रमाण फाइल (छवि / PDF)
              </label>
              <label className="block border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/2 transition">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="sr-only"
                />
                <svg className="w-8 h-8 text-muted mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M17 8l-5-5-5 5" />
                  <path d="M12 3v12" />
                </svg>
                <div className="text-sm font-medium text-foreground">
                  {file ? file.name : 'क्लिक गरेर फाइल अपलोड गर्नुहोस्'}
                </div>
                <div className="text-xs text-muted mt-1">PNG, JPG वा PDF (अधिकतम १० MB)</div>
              </label>
              <p className="text-xs text-muted mt-2">
                नोट: फाइल अपलोड सुविधा छिट्टै Firebase Storage मार्फत सक्रिय हुनेछ।
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed" disabled={submitting}>
                {submitting ? 'पेश हुँदैछ...' : 'रिपोर्ट पेश गर्नुहोस्'}
                {!submitting && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              <Link href="/issues" className="btn-ghost">रद्द गर्नुहोस्</Link>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="card p-6">
              <h3 className="font-semibold text-foreground mb-3">राम्रो रिपोर्टका सुझावहरू</h3>
              <ul className="space-y-3 text-sm text-foreground/85">
                {[
                  'स्पष्ट र संक्षिप्त शीर्षक लेख्नुहोस्',
                  'स्थान र समय उल्लेख गर्नुहोस्',
                  'सम्भव भएसम्म तस्वीर संलग्न गर्नुहोस्',
                  'सम्पर्क विवरण दिनु सुझाव दिइन्छ',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">आपतकाल?</h4>
                  <p className="text-sm text-muted mt-1">जीवन वा सम्पत्तिको तत्कालको खतरा भए स्थानीय प्रहरीलाई १०० मा सम्पर्क गर्नुहोस्।</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
