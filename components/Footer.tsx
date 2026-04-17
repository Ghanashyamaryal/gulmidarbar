import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl gradient-band flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white">गुल्मी दरबार</div>
                <div className="text-xs text-slate-400">गाउँपालिका</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              पारदर्शी, जवाफदेही र नागरिक-मैत्री स्थानीय शासनको लागि प्रतिबद्ध।
              तपाईंको आवाज नै हाम्रो कार्ययोजना हो।
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { label: 'FB', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { label: 'TW', path: 'M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3 4.9a4.1 4.1 0 0 0 1.3 5.5 4.1 4.1 0 0 1-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.6 11.7 11.7 0 0 0 8.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5A8.3 8.3 0 0 0 22 5.8z' },
                { label: 'IG', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
              ].map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary transition flex items-center justify-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">द्रुत लिङ्कहरू</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white transition">गृहपृष्ठ</Link></li>
              <li><Link href="/issues" className="hover:text-white transition">सबै समस्याहरू</Link></li>
              <li><Link href="/submit" className="hover:text-white transition">समस्या पेश गर्नुहोस्</Link></li>
              <li><Link href="/admin" className="hover:text-white transition">प्रशासन प्यानल</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">वार्डहरू</h3>
            <ul className="grid grid-cols-2 gap-y-2.5 text-sm">
              {[1, 2, 3, 4, 5, 6, 7].map((w) => (
                <li key={w}>
                  <Link href={`/issues?ward=${w}`} className="hover:text-white transition">
                    वार्ड {w}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">सम्पर्क</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>गुल्मी दरबार गाउँपालिका<br />गुल्मी, लुम्बिनी प्रदेश, नेपाल</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +९७७-७९-४२००००
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                info@gulmidarbar.gov.np
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {year} गुल्मी दरबार गाउँपालिका। सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition">गोपनीयता नीति</a>
            <a href="#" className="hover:text-white transition">नियम तथा सर्त</a>
            <a href="#" className="hover:text-white transition">पहुँच</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
