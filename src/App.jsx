import React, { useState } from "react";

const getBasePath = () => {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/moving-in-mobile/")) {
    return "/moving-in-mobile/";
  }
  return "/";
};

const BASE = getBasePath();
const assetPath = (fileName) => `${BASE}${fileName}`;

const ASSETS = {
  headshot: assetPath("TinaRoweSignature.png"),
  compliance: assetPath("REALTOREOL.PNG"),
  mobileHero: assetPath("mobile-hero.jpg"),
  kwLogo: assetPath("keller-williams-logo.png"),
  kwMobileLogo: assetPath("KW-MOBILE.png"),
  facebook: assetPath("facebook.png"),
  youtube: assetPath("youtube.png"),
  instagram: assetPath("instagram.png"),
  linkedin: assetPath("linkedin.png"),
};

const Icon = ({ name, className = "", size = 22 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const icons = {
    home: <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>,
    search: <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
    phone: <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" /></svg>,
    mail: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
    pin: <svg {...common}><path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
    close: <svg {...common}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    menu: <svg {...common}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>,
    chevron: <svg {...common}><path d="m9 18 6-6-6-6" /></svg>,
    key: <svg {...common}><circle cx="7.5" cy="14.5" r="4.5" /><path d="m11 11 9-9" /><path d="m15 6 3 3" /><path d="m17 4 3 3" /></svg>,
    calc: <svg {...common}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /></svg>,
    chat: <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg>,
  };

  return icons[name] || null;
};

const SocialBadge = ({ label, src, href, dark = false }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`group flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl ${
      dark ? "border-slate-200 bg-white hover:bg-red-50" : "border-white/20 bg-white/10 hover:bg-white"
    }`}
  >
    <img src={src} alt={label} className="h-5 w-5 object-contain" />
  </a>
);

const SectionTitle = ({ eyebrow, title, text, light = false }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${light ? "text-red-100" : "text-red-700"}`}>{eyebrow}</p>
    <h2 className={`font-serif text-4xl leading-tight md:text-5xl ${light ? "text-white" : "text-slate-950"}`}>{title}</h2>
    {text ? <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 ${light ? "text-white/75" : "text-slate-600"}`}>{text}</p> : null}
  </div>
);

const Field = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    className="w-full rounded-none border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-red-700"
    placeholder={placeholder}
  />
);

export default function MovingInMobileMockup() {
  const [showPopup, setShowPopup] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showValuationBar, setShowValuationBar] = useState(true);

  const communities = ["Spring Hill", "West Mobile", "Midtown", "Downtown Mobile", "Daphne", "Spanish Fort"];

  const listings = [
    { price: "$425,000", address: "123 Spring Hill Ave", beds: "4 Beds", baths: "3 Baths" },
    { price: "$315,000", address: "78 Midtown Blvd", beds: "3 Beds", baths: "2 Baths" },
    { price: "$525,000", address: "910 West Mobile Dr", beds: "5 Beds", baths: "4 Baths" },
  ];

  const googleReviews = [
    { name: "Google Review", text: "Tina was professional, responsive, and made the entire process feel easy from start to finish." },
    { name: "Google Review", text: "Excellent communication, local knowledge, and guidance throughout the buying process." },
    { name: "Google Review", text: "Tina went above and beyond and made us feel confident every step of the way." },
    { name: "Google Review", text: "Knowledgeable, kind, and incredibly helpful. Highly recommend working with Tina." },
    { name: "Google Review", text: "A wonderful experience from the first conversation through closing." },
    { name: "Google Review", text: "Tina made the process smooth, clear, and stress-free." },
    { name: "Google Review", text: "Five-star service and a true local real estate professional." },
  ];

  const navItems = ["Search", "Buy", "Sell", "Communities", "The Rowe Report", "About", "Contact"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 font-sans text-slate-950">
      <style>{`
        @keyframes testimonials-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonials-track { animation: testimonials-marquee 46s linear infinite; }
        .testimonials-marquee:hover .testimonials-track { animation-play-state: paused; }
      `}</style>

      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(185,28,28,.18) 0%, rgba(2,6,23,.10) 45%, rgba(2,6,23,.06) 65%, rgba(2,6,23,.20) 100%), linear-gradient(180deg, rgba(2,6,23,.12) 0%, rgba(2,6,23,.04) 50%, rgba(2,6,23,.28) 100%), url(${ASSETS.mobileHero})`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-6" />
      <div className="pointer-events-none fixed inset-0 z-[2] shadow-[inset_0_0_80px_rgba(0,0,0,.25)]" />

      <div className="relative z-10">
        {showPopup ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-[1px] px-4">
            <div className="relative w-full max-w-xl rounded-3xl border border-white/30 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Close new listing alert"
              >
                <Icon name="close" size={20} />
              </button>

              <div className="text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-700">New Listing Alerts</p>
                <h3 className="font-serif text-3xl leading-tight text-slate-950 sm:text-4xl">Be the first to see homes in Mobile</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Get listings, price drops, and new homes delivered directly to you. No pressure — just local insight.</p>
              </div>

              <div className="mt-6 grid gap-4">
                <Field placeholder="Email or phone" />
                <button type="button" className="rounded-full bg-slate-950 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:scale-[1.02] hover:bg-red-700 hover:shadow-xl hover:shadow-red-400/40">
                  Send Me Homes
                </button>
                <button type="button" onClick={() => setShowPopup(false)} className="text-xs font-medium text-slate-500 underline">
                  Continue browsing
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-white/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-5 md:py-5 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
            <div className="flex items-center justify-start text-white">
              <img src={ASSETS.kwLogo} alt="Keller Williams" className="h-11 w-auto object-contain sm:h-14 md:h-16 xl:h-20" />
            </div>

            <nav className="hidden items-center justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 xl:flex">
              {navItems.map((item) => (
                <a key={item} className="transition hover:text-red-200">{item}</a>
              ))}
            </nav>

            <div className="hidden items-center justify-end gap-3 lg:flex">
              <SocialBadge label="Facebook" src={ASSETS.facebook} href="https://www.facebook.com/tina.rowe.484411" />
              <SocialBadge label="YouTube" src={ASSETS.youtube} href="https://www.youtube.com/@TheRoweReportMobile" />
              <SocialBadge label="Instagram" src={ASSETS.instagram} href="https://www.instagram.com/therowereport" />
              <SocialBadge label="LinkedIn" src={ASSETS.linkedin} href="https://www.linkedin.com" />
              <a className="ml-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:scale-[1.02] hover:bg-red-50 hover:shadow-xl">Contact Tina</a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur lg:hidden"
              aria-label="Open mobile menu"
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-white/10 bg-slate-950/95 px-5 py-5 shadow-2xl backdrop-blur lg:hidden">
              <nav className="grid gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
                {navItems.map((item) => (
                  <a key={item}>{item}</a>
                ))}
              </nav>
              <div className="mt-5 flex items-center gap-3">
                <SocialBadge label="Facebook" src={ASSETS.facebook} href="https://www.facebook.com/tina.rowe.484411" />
                <SocialBadge label="YouTube" src={ASSETS.youtube} href="https://www.youtube.com/@TheRoweReportMobile" />
                <SocialBadge label="Instagram" src={ASSETS.instagram} href="https://www.instagram.com/therowereport" />
                <SocialBadge label="LinkedIn" src={ASSETS.linkedin} href="https://www.linkedin.com" />
              </div>
              <button type="button" className="mt-5 w-full rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-red-50">Contact Tina</button>
            </div>
          ) : null}
        </header>

        <main>
          <section className="relative flex min-h-screen items-center px-4 pb-14 pt-28 text-white sm:px-5 sm:pb-20 sm:pt-36 md:pt-40">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_520px] lg:items-center">
              <div className="max-w-3xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-100 sm:mb-5 sm:text-xs sm:tracking-[0.35em]">Mobile, Alabama Real Estate</p>
                <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">Moving in Mobile</h1>
                <p className="mt-4 text-xl font-light text-white/80 sm:text-2xl">Move beautifully.</p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:mt-7 sm:text-xl sm:leading-9">A polished, lead-focused real estate experience for buyers, sellers, and families making their move in Mobile.</p>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <button className="rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:scale-[1.02] hover:bg-red-50 hover:shadow-xl sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.18em]">Find Your Home</button>
                  <button className="rounded-full border border-white/50 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.18em]">Get My Home Value</button>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/60">Trusted by buyers & sellers across Mobile • Keller Williams Mobile</p>
              </div>

              <aside className="overflow-hidden rounded-[1.5rem] border border-white/25 bg-white/96 text-slate-950 shadow-2xl backdrop-blur sm:rounded-[2rem]">
                <div className="bg-gradient-to-br from-slate-950 to-slate-800 px-5 py-6 text-white sm:px-8 sm:py-8">
                  <div className="grid gap-5 md:grid-cols-[190px_1fr] md:items-center md:gap-7">
                    <img src={ASSETS.headshot} alt="Tina Rowe" className="mx-auto h-32 w-32 rounded-full object-cover ring-4 ring-white/90 shadow-2xl sm:h-40 sm:w-40 md:h-48 md:w-48" />
                    <div className="text-center md:text-left">
                      <div className="mb-4 inline-flex rounded-xl bg-white px-3 py-2 shadow-lg sm:mb-5 sm:px-4 sm:py-3">
                        <img src={ASSETS.kwMobileLogo} alt="Keller Williams Mobile" className="h-9 w-auto object-contain sm:h-12" />
                      </div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 sm:text-xs sm:tracking-[0.28em]">Your Mobile Real Estate Resource</p>
                      <h2 className="font-serif text-4xl leading-none sm:text-5xl">Tina Rowe</h2>
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/75 sm:text-sm sm:tracking-[0.2em]">REALTOR® · Keller Williams Mobile</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
                  <div className="space-y-4 border-b border-slate-100 p-5 text-sm text-slate-700 sm:p-7 md:border-b-0 md:border-r">
                    <p className="flex items-center gap-3"><Icon name="phone" size={18} /> 251-895-9322</p>
                    <p className="flex items-center gap-3"><Icon name="mail" size={18} /> tinarowe@kw.com</p>
                    <p className="flex items-start gap-3"><Icon name="pin" size={18} /> 1210 Hillcrest Rd., Mobile, AL 36695</p>
                    <button className="mt-4 w-full rounded-full bg-red-700 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02] hover:bg-slate-950 hover:shadow-xl">Contact Tina</button>
                  </div>
                  <div className="bg-slate-50 p-5 sm:p-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Quick MLS Search</p>
                    <div className="space-y-4">
                      <Field placeholder="City, neighborhood, ZIP or address" />
                      <div className="grid grid-cols-2 gap-4"><Field placeholder="Min Price" /><Field placeholder="Max Price" /></div>
                      <button className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-red-700 hover:shadow-xl">Search MLS</button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="bg-white/90 px-4 py-16 backdrop-blur-md sm:px-5 sm:py-24">
            <div className="mx-auto max-w-6xl text-center">
              <SectionTitle eyebrow="Start Here" title="How can Tina help you today?" text="Choose your path to get a more personalized experience and the right next steps." />
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Buy a Home", prompt: "Get new listings that match your wish list." },
                  { title: "Sell Your Home", prompt: "Find out what your home could sell for." },
                  { title: "Relocating to Mobile", prompt: "Get a local relocation guide and neighborhood tips." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="font-serif text-2xl text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{item.prompt}</p>
                    <div className="mt-6 grid gap-3">
                      <Field placeholder="Email or phone" />
                      <button className="rounded-full bg-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-red-700 hover:shadow-xl">Get Started</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-16 text-white sm:px-5 sm:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionTitle light eyebrow="The Rowe Report" title="Local insight, straight from Tina" text="Watch the latest videos covering neighborhoods, market trends, and what it’s really like to live in Mobile." />
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "The Rowe Report: Mobile Area Real Estate Video", category: "The Rowe Report", time: "Watch on YouTube", embed: "https://www.youtube.com/embed/cUr9FBQ1Dog", watch: "https://youtu.be/cUr9FBQ1Dog?si=IoLllIx7hv9o9Vs1" },
                  { title: "The Rowe Report: Mobile Area Real Estate Video", category: "The Rowe Report", time: "Watch on YouTube", embed: "https://www.youtube.com/embed/0HcOGSsuv-E", watch: "https://youtu.be/0HcOGSsuv-E?si=v-lggOxTMuccePyV" },
                ].map((video, i) => (
                  <div key={video.embed} className={`group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl ${i === 0 ? "md:col-span-2" : ""}`}>
                    <div className={`${i === 0 ? "h-80" : "h-72"} relative overflow-hidden rounded-t-3xl bg-slate-950 shadow-lg`}>
                      <iframe src={video.embed} title={video.title} className="h-full w-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-700">{video.category}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{video.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{video.time}</p>
                      </div>
                      <a href={video.watch} target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-red-700">Watch</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="overflow-hidden bg-white/90 px-4 py-16 backdrop-blur-md sm:px-5 sm:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionTitle eyebrow="Google Reviews" title="5.0 stars from Mobile-area clients" text="A scrolling showcase of Tina’s 5-star Google reviews. Hover over any review to pause the carousel." />
              <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
                <div className="text-3xl text-yellow-500">★★★★★</div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">5.0 Google Rating · 7 Reviews</p>
              </div>
              <div className="testimonials-marquee relative -mx-4 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
                <div className="testimonials-track flex w-max gap-6 px-4">
                  {[...googleReviews, ...googleReviews].map((review, i) => (
                    <div key={`${review.text}-${i}`} className="w-[310px] shrink-0 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:w-[380px]">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <p className="text-lg text-yellow-500">★★★★★</p>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-700">Google</span>
                      </div>
                      <p className="text-sm leading-7 text-slate-600">“{review.text}”</p>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">— {review.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 text-center">
                <a href="https://www.google.com/search?q=Tina+Rowe+-+Mobile,+AL+REALTOR%C2%AE" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-slate-950 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02] hover:bg-red-700 hover:shadow-xl">Read All Google Reviews</a>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 text-white sm:px-5 sm:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionTitle light eyebrow="Instant Home Value" title="Curious what your Mobile-area home could sell for?" text="A seller-focused lead capture tool gives homeowners a simple reason to reach out before they are ready to list." />
              <div className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-md md:grid-cols-[1fr_1.1fr] md:items-center md:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">Free Home Valuation</p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight text-slate-950">Get a personalized price range and selling strategy.</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">This can later connect to a valuation provider, CRM, or email workflow. For the mockup, it demonstrates one of the strongest seller lead paths on the site.</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="grid gap-5">
                    <Field placeholder="Property address" />
                    <div className="grid gap-5 sm:grid-cols-2"><Field placeholder="Name" /><Field placeholder="Email or phone" /></div>
                    <button className="rounded-full bg-red-700 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:scale-[1.02] hover:bg-slate-950 hover:shadow-xl">Get My Home Value</button>
                    <p className="text-center text-xs text-slate-500">No pressure. Just helpful local guidance from Tina.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white/90 px-4 py-16 text-slate-950 backdrop-blur-md sm:px-5 sm:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-700">Why Work With Tina</p>
                  <h2 className="font-serif text-4xl leading-tight sm:text-5xl">A local advocate with a personal approach.</h2>
                  <p className="mt-6 text-base leading-8 text-slate-600">This section gives Tina a stronger personal sales message and helps visitors understand why they should choose her instead of just browsing listings.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {["Mobile-area neighborhood knowledge", "Personal guidance from search to closing", "Seller strategy built around market timing", "Clear communication and responsive follow-up"].map((reason) => (
                    <div key={reason} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white">✓</div>
                      <p className="font-serif text-xl leading-snug">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 text-white sm:px-5 sm:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionTitle light eyebrow="Featured Listings" title="Homes you’ll want to see" text="A preview of available homes in the Mobile area. This section will connect directly to IDX listings in the live site." />
              <div className="grid gap-8 md:grid-cols-3">
                {listings.map((home, i) => (
                  <div key={i} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80" alt={`${home.address} listing preview`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition group-hover:opacity-100">
                        <div className="w-full p-4"><button className="w-full rounded-full bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 shadow-xl">Schedule a Showing</button></div>
                      </div>
                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-red-700 shadow">New</div>
                    </div>
                    <div className="p-6">
                      <p className="text-lg font-semibold text-slate-900">{home.price}</p>
                      <p className="mt-1 text-sm text-slate-600">{home.address}</p>
                      <div className="mt-3 flex gap-4 text-xs uppercase tracking-wide text-slate-500"><span>{home.beds}</span><span>{home.baths}</span></div>
                      <button className="mt-6 w-full rounded-full bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02] hover:bg-red-700 hover:shadow-xl">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white/90 px-4 py-14 text-slate-950 backdrop-blur-md sm:px-5">
            <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm backdrop-blur md:grid-cols-[1fr_1.2fr] md:items-center md:p-10">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-700">Instant Updates</p>
                <h2 className="font-serif text-4xl leading-tight">Want homes before everyone else sees them?</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">Create a lead capture path for saved searches, price drops, new listings, and neighborhood-specific alerts.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                <Field placeholder="Preferred area" />
                <Field placeholder="Email or phone" />
                <button className="rounded-full bg-red-700 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02] hover:bg-white hover:text-slate-950 hover:shadow-xl">Send Alerts</button>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 text-white sm:px-5 sm:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-100">Local Expertise</p>
                <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">Explore Mobile-area communities.</h2>
                <p className="mt-6 text-base leading-8 text-white/75">Community pages can support SEO, introduce local lifestyle content, and guide visitors into saved searches or direct contact with Tina.</p>
                <button className="mt-8 rounded-full bg-slate-950 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:scale-[1.02] hover:bg-red-700 hover:shadow-xl">View All Communities</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {communities.map((area) => (
                  <div key={area} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <p className="font-serif text-2xl">{area}</p>
                    <p className="mt-2 text-sm text-slate-500">Homes, market insight, local guidance</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 text-white sm:px-5 sm:py-28">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/20 bg-slate-950/70 p-8 text-center shadow-2xl backdrop-blur md:p-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-100">Ready When You Are</p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Let’s talk about your next move.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">This section gives visitors another clean, elegant path to reach out without overwhelming the page.</p>
              <div className="mx-auto mt-9 grid max-w-2xl gap-5 md:grid-cols-2"><Field placeholder="Name" /><Field placeholder="Email or phone" /></div>
              <button className="mt-8 rounded-full bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-950 transition hover:scale-[1.02] hover:bg-red-50 hover:shadow-xl">Contact Tina</button>
            </div>
          </section>
        </main>

        <footer className="bg-white px-5 py-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div>
              <img src={ASSETS.kwMobileLogo} alt="Keller Williams Mobile" className="mb-4 h-14 w-auto object-contain" />
              <div className="font-serif text-3xl tracking-tight">Moving in Mobile</div>
              <p className="mt-2 text-sm text-slate-500">Tina Rowe · Keller Williams Mobile</p>
            </div>
            <img src={ASSETS.compliance} alt="REALTOR and Equal Housing Opportunity logos" className="mx-auto max-h-24 object-contain sm:max-h-28 md:max-h-32" />
            <div className="flex justify-start gap-3 md:justify-end">
              <SocialBadge dark label="Facebook" src={ASSETS.facebook} href="https://www.facebook.com/tina.rowe.484411" />
              <SocialBadge dark label="YouTube" src={ASSETS.youtube} href="https://www.youtube.com/@TheRoweReportMobile" />
              <SocialBadge dark label="Instagram" src={ASSETS.instagram} href="https://www.instagram.com/therowereport" />
              <SocialBadge dark label="LinkedIn" src={ASSETS.linkedin} href="https://www.linkedin.com" />
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-7xl border-t border-slate-100 pt-6 text-xs leading-6 text-slate-500">© 2025 Tina Rowe, REALTOR® with Keller Williams Mobile. Mock-up only. IDX, MLS compliance, brokerage requirements, licensing details, and final logo usage to be confirmed before launch.</div>
        </footer>

        {showValuationBar ? (
          <div className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
            <button onClick={() => setShowValuationBar(false)} className="absolute right-3 top-3 text-slate-400"><Icon name="close" size={16} /></button>
            <p className="pr-6 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">Quick Lead Capture</p>
            <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
              <input className="rounded-full border border-slate-200 px-4 py-3 text-sm outline-none" placeholder="Home value or listing alerts" />
              <button className="rounded-full bg-red-700 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Go</button>
            </div>
          </div>
        ) : null}

        <button className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-xs font-semibold text-white shadow-2xl transition hover:bg-red-700 hover:shadow-xl md:flex sm:bottom-6 sm:right-6 sm:px-5 sm:py-4 sm:text-sm"><Icon name="chat" size={18} /> Ask Tina</button>
      </div>
    </div>
  );
}
