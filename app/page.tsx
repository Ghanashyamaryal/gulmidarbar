import Link from 'next/link';
import { issues } from '@/data/issues';
import IssueCard from '@/components/IssueCard';

export default function Home() {
  const recentIssues = issues.slice(0, 6);
  const resolved = issues.filter((i) => i.status === 'समाधान भएको').length;
  const inProgress = issues.filter((i) => i.status === 'प्रगति हुँदैछ').length;
  const pending = issues.filter((i) => i.status === 'विचाराधीन').length;

  const categories = [
    { title: 'सडक र पुल', desc: 'सडक मर्मत, पुल निर्माण, सडक बत्ती', icon: 'M3 12h18M5 12v8h14v-8M7 12V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6' },
    { title: 'खानेपानी', desc: 'खानेपानी आपूर्ति, मुहान संरक्षण', icon: 'M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z' },
    { title: 'विद्युत', desc: 'बिजुली आपूर्ति, सडक बत्ती', icon: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' },
    { title: 'स्वास्थ्य', desc: 'स्वास्थ्य चौकी, औषधि उपलब्धता', icon: 'M12 2v20M2 12h20' },
    { title: 'शिक्षा', desc: 'विद्यालय, शिक्षक, पुस्तकालय', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
    { title: 'कृषि', desc: 'सिंचाइ, बीउ-मल, पशुपालन', icon: 'M12 2l3 7h7l-5.5 4.5 2 7-6.5-4.5-6.5 4.5 2-7L2 9h7z' },
    { title: 'फोहोर व्यवस्थापन', desc: 'सरसफाइ, फोहोर सङ्कलन', icon: 'M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' },
    { title: 'अन्य', desc: 'उपरोक्त बाहेक कुनै पनि समस्या', icon: 'M12 2a10 10 0 1 0 10 10M12 6v6l4 2' },
  ];

  const steps = [
    {
      num: '०१',
      title: 'रिपोर्ट गर्नुहोस्',
      desc: 'वार्ड छानेर समस्याको शीर्षक, विवरण र प्रमाण (तस्वीर/PDF) समावेश गर्नुहोस्।',
    },
    {
      num: '०२',
      title: 'प्रशासनद्वारा जाँच',
      desc: 'गाउँपालिकाको सम्बन्धित शाखाले तपाईंको रिपोर्टको समीक्षा र प्राथमिकीकरण गर्छ।',
    },
    {
      num: '०३',
      title: 'प्रगति अद्यावधिक',
      desc: 'समस्या “प्रगति हुँदैछ” बाट “समाधान भएको” सम्म सार्वजनिक रूपमा ट्र्याक गर्न सकिन्छ।',
    },
    {
      num: '०४',
      title: 'समाधान र जवाफ',
      desc: 'समस्या समाधान हुनासाथ प्रशासनले सार्वजनिक रूपमा स्थिति अद्यावधिक गर्दछ।',
    },
  ];

  const features = [
    { title: 'पारदर्शिता', desc: 'प्रत्येक रिपोर्ट सार्वजनिक रूपमा हेर्न र ट्र्याक गर्न सकिन्छ।', icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
    { title: 'तीव्र प्रतिक्रिया', desc: 'प्राथमिकताको आधारमा समयमै कार्य अगाडि बढाइन्छ।', icon: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' },
    { title: 'सबै ७ वार्ड', desc: 'गाउँपालिकाका सातै वार्डका नागरिकले समान सेवा पाउनुहुन्छ।', icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
    { title: 'सुरक्षित र निःशुल्क', desc: 'तपाईंको जानकारी सुरक्षित र सेवा पूर्णतया निःशुल्क छ।', icon: 'M12 2l9 4v6c0 5-3.5 9.5-9 10-5.5-.5-9-5-9-10V6z' },
    { title: 'मोबाइल–मैत्री', desc: 'मोबाइल, ट्याब्लेट वा कम्प्युटर जहाँबाट पनि रिपोर्ट गर्न सकिन्छ।', icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2' },
    { title: 'समुदायिक सहभागिता', desc: 'नागरिकहरूको प्रत्यक्ष सहभागिता र सुझाव संकलन।', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  ];

  const faqs = [
    {
      q: 'के यो सेवा निःशुल्क हो?',
      a: 'हो, गुल्मी दरबार गाउँपालिकाका सबै नागरिकका लागि यो सेवा पूर्णतया निःशुल्क छ।',
    },
    {
      q: 'रिपोर्ट गरेपछि कति समयमा प्रतिक्रिया आउँछ?',
      a: 'सामान्य रिपोर्टहरूलाई ३-५ कार्य दिनभित्र प्रशासनले समीक्षा गर्दछ। आपतकालीन समस्याहरूलाई अग्राधिकार दिइन्छ।',
    },
    {
      q: 'के म अनाम रूपमा रिपोर्ट गर्न सक्छु?',
      a: 'हो। तर रिपोर्टको पुष्टि र थप जानकारीका लागि सम्पर्क विवरण दिनु सुझाव दिइन्छ।',
    },
    {
      q: 'मेरो रिपोर्टको स्थिति कसरी हेर्ने?',
      a: '“समस्याहरू” पृष्ठमा गई आफ्नो वार्ड छानेर रिपोर्टको अवस्था (विचाराधीन / प्रगति हुँदैछ / समाधान भएको) हेर्न सकिन्छ।',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <span className="eyebrow mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                आधिकारिक नागरिक पोर्टल
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground mt-6">
                तपाईंको आवाज,<br />
                <span className="bg-linear-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
                  हाम्रो प्रतिबद्धता
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                गुल्मी दरबार गाउँपालिकाका ७ वटै वार्डका नागरिकले स्थानीय समस्याहरू सजिलैसँग रिपोर्ट
                गर्न, स्थिति ट्र्याक गर्न र समाधानमा सहभागी हुन सक्नुहुन्छ। पारदर्शी, जवाफदेही र डिजिटल।
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/submit" className="btn-primary">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  समस्या रिपोर्ट गर्नुहोस्
                </Link>
                <Link href="/issues" className="btn-ghost">
                  सबै समस्याहरू हेर्नुहोस्
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-linear-to-br from-blue-400 to-primary ring-2 ring-white" />
                    ))}
                  </div>
                  <span><strong className="text-foreground">१,२००+</strong> सहभागी नागरिक</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.8L12 17.8 5.7 21l1.2-6.8-5-4.9 7-1z" />
                      </svg>
                    ))}
                  </div>
                  <span>४.८/५ सन्तुष्टि</span>
                </div>
              </div>
            </div>

            <div className="relative fade-up">
              <div className="absolute -inset-6 bg-linear-to-br from-primary/20 via-blue-400/10 to-accent/10 blur-3xl rounded-[3rem]" />
              <div className="relative card p-6 md:p-8 shadow-2xl shadow-slate-900/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">लाइभ ड्यासबोर्ड</h3>
                  <span className="text-xs font-medium text-emerald-600 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    लाइभ
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'कुल', value: issues.length, tone: 'bg-slate-50 text-slate-700' },
                    { label: 'समाधान', value: resolved, tone: 'bg-emerald-50 text-emerald-700' },
                    { label: 'बाँकी', value: pending + inProgress, tone: 'bg-amber-50 text-amber-700' },
                  ].map((s) => (
                    <div key={s.label} className={`${s.tone} rounded-xl p-4 text-center`}>
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-xs font-medium mt-1 opacity-80">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {recentIssues.slice(0, 3).map((issue) => (
                    <Link
                      key={issue.id}
                      href={`/issues/${issue.id}`}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{issue.title}</div>
                        <div className="text-xs text-muted">वार्ड {issue.ward} · {issue.createdAt}</div>
                      </div>
                      <svg className="w-4 h-4 text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="container mx-auto px-4 -mt-8 md:-mt-12 relative z-10">
        <div className="card p-6 md:p-8 shadow-xl shadow-slate-900/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'कुल रिपोर्ट', value: issues.length, icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
              { label: 'समाधान भएका', value: resolved, icon: 'M20 6L9 17l-5-5' },
              { label: 'प्रगतिमा', value: inProgress, icon: 'M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
              { label: 'सक्रिय वार्ड', value: 7, icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARD GRID */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">वार्डहरू</span>
          <h2 className="section-heading mt-4">आफ्नो वार्ड छान्नुहोस्</h2>
          <p className="text-muted mt-3">
            गाउँपालिकाका ७ वटै वार्डहरूबाट रिपोर्ट हेर्न र रिपोर्ट गर्न क्लिक गर्नुहोस्।
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((ward) => {
            const count = issues.filter((i) => i.ward === ward).length;
            return (
              <Link
                key={ward}
                href={`/issues?ward=${ward}`}
                className="group card p-5 text-center flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl gradient-band flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition">
                  {ward}
                </div>
                <div className="font-semibold text-foreground mt-1">वार्ड {ward}</div>
                <div className="text-xs text-muted">{count} रिपोर्ट</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white border-y border-border py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">श्रेणीहरू</span>
            <h2 className="section-heading mt-4">के कस्ता समस्याहरू रिपोर्ट गर्न सकिन्छ?</h2>
            <p className="text-muted mt-3">
              स्थानीय सेवा सम्बन्धी जुनसुकै समस्या — हामी सुन्न र समाधान गर्न तयार छौं।
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((c) => (
              <div key={c.title} className="card p-6">
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">प्रक्रिया</span>
          <h2 className="section-heading mt-4">यो कसरी काम गर्छ?</h2>
          <p className="text-muted mt-3">
            ४ सजिला चरणहरूमा तपाईंको समस्या सान्दर्भिक निकायसम्म पुग्छ र समाधानको बाटो खुल्छ।
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.num} className="relative card p-6">
              <div className="text-5xl font-bold text-primary/15 mb-2">{s.num}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <svg className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-border" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* RECENT ISSUES */}
      <section className="bg-white border-y border-border py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="eyebrow">हालका रिपोर्टहरू</span>
              <h2 className="section-heading mt-4">समुदायबाट ताजा समस्याहरू</h2>
              <p className="text-muted mt-3 max-w-xl">
                नागरिकहरूद्वारा हालै रिपोर्ट गरिएका समस्याहरू र तिनको अवस्था।
              </p>
            </div>
            <Link href="/issues" className="btn-ghost">
              सबै हेर्नुहोस्
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="eyebrow">हाम्रा विशेषताहरू</span>
            <h2 className="section-heading mt-4">किन यो पोर्टल प्रयोग गर्ने?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              गुल्मी दरबार गाउँपालिकाले नागरिकसँगको सम्बन्ध थप सशक्त बनाउन डिजिटल साधन ल्याएको छ।
              पारदर्शिता, जवाफदेहिता र सेवा डेलिभरी यसका मुख्य स्तम्भ हुन्।
            </p>
            <Link href="/submit" className="btn-primary mt-8">
              अहिले नै रिपोर्ट गर्नुहोस्
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="card p-5">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 text-primary flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white border-y border-border py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">नागरिकहरूका अनुभव</span>
            <h2 className="section-heading mt-4">समुदायको विश्वास</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: 'सुनीता पौडेल',
                ward: 'वार्ड ३',
                text: 'मैले सडक बत्तीको रिपोर्ट गरेको केही दिनमै समाधान भयो। यस्तो पारदर्शी सेवा साँच्चै प्रभावकारी छ।',
              },
              {
                name: 'रामेश्वर के.सी.',
                ward: 'वार्ड ५',
                text: 'पहिले कार्यालय धाउनुपर्थ्यो, अब घरबाटै रिपोर्ट गर्न पाएर सजिलो भएको छ। प्रगति पनि हेर्न पाइन्छ।',
              },
              {
                name: 'गीता गुरुङ',
                ward: 'वार्ड १',
                text: 'पानी आपूर्ति समस्या मैले यही पोर्टलमार्फत उठाएकी थिएँ। प्रशासनको प्रतिक्रिया धेरै छिटो आयो।',
              },
            ].map((t) => (
              <div key={t.name} className="card p-6">
                <svg className="w-8 h-8 text-primary/30 mb-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 7h4v4H9a2 2 0 0 0-2 2v2H3v-4c0-2.2 1.8-4 4-4zM17 7h4v4h-2a2 2 0 0 0-2 2v2h-4v-4c0-2.2 1.8-4 4-4z" />
                </svg>
                <p className="text-foreground/90 leading-relaxed">“{t.text}”</p>
                <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent text-white flex items-center justify-center font-semibold">
                    {t.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted">{t.ward}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <span className="eyebrow">प्रश्नहरू</span>
            <h2 className="section-heading mt-4">बारम्बार सोधिने प्रश्नहरू</h2>
            <p className="text-muted mt-4 leading-relaxed">
              कुनै प्रश्न बाँकी छ? हाम्रो कार्यालयमा सम्पर्क गर्न नहिचकिचाउनुहोस्।
            </p>
            <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-border">
              <div className="text-sm font-semibold text-foreground">सहायता हटलाइन</div>
              <div className="text-primary font-bold text-lg mt-1">+९७७-७९-४२००००</div>
              <div className="text-xs text-muted mt-1">आइतबार – शुक्रबार, ९:०० – ५:००</div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-foreground pr-4">{f.q}</span>
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-open:rotate-45 transition">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="text-muted leading-relaxed mt-3 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl gradient-band p-10 md:p-16 text-white">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }} />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                तपाईंको एउटा रिपोर्टले परिवर्तन ल्याउन सक्छ।
              </h2>
              <p className="mt-4 text-white/85 leading-relaxed">
                समुदायको आवाज नै परिवर्तनको शुरुवात हो। अहिले नै आफ्नो वार्डको समस्या रिपोर्ट गर्नुहोस्।
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                रिपोर्ट पेश गर्नुहोस्
              </Link>
              <Link
                href="/issues"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/30 font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition"
              >
                सबै रिपोर्ट हेर्नुहोस्
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
