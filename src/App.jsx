import React, { useEffect, useRef, useState } from "react";

const BASE = window.location.pathname.startsWith("/moving-in-mobile/") ? "/moving-in-mobile/" : "/";

const ASSETS = {
  skyline: `${BASE}mobile-hero.png`,
  tina: `${BASE}TinaRoweHalf.png`,
  tinaAlt: `${BASE}TinaRoweSignature.png`,
  logo: `${BASE}TheRoweReportTransparentLogo.png`,
  kw: `${BASE}KW-MOBILE.png`,
  guide: `${BASE}og-image.png`,
  van: `${BASE}van-wrap.png`,
  facebook: `${BASE}facebook.png`,
  instagram: `${BASE}instagram.png`,
  youtube: `${BASE}youtube.png`,
  linkedin: `${BASE}linkedin.png`,
  handshakeIcon: `${BASE}handshake-icon.png`,
  marketingIcon: `${BASE}marketing-icon.png`,
  communicationIcon: `${BASE}communication-icon.png`,
  marketIcon: `${BASE}market-icon.png`,
  processAnalyze: `${BASE}process-analyze.png`,
  processStrategize: `${BASE}process-strategize.png`,
  processMarket: `${BASE}process-market.png`,
  processNegotiate: `${BASE}process-negotiate.png`,
  processSold: `${BASE}process-sold.png`,
  localExpertIcon: `${BASE}local-expert-icon.png`,
  honestyIcon: `${BASE}honesty-icon.png`,
  integrityIcon: `${BASE}integrity-icon.png`,
  commitmentIcon: `${BASE}commitment-icon.png`,
  careIcon: `${BASE}care-icon.png`,
  checkCircleIcon: `${BASE}check-circle-red.png`,
  penPaperIcon: `${BASE}pen-paper.png`,
  locationIcon: `${BASE}location-icon.png`,
  investorIcon: `${BASE}investor-icon.png`,
  bigHouseIcon: `${BASE}big-house.png`,
  buyersLoveMobile: `${BASE}buyers-love-mobile.jpg`,
  benefit1: `${BASE}benefit1.JPG`,
  benefit2: `${BASE}benefit2.JPG`,
  benefit3: `${BASE}benefit3.JPG`,
};

const phone = "(251) 895-9322";
const navItems = ["Home", "About", "Sellers", "Buyers", "Neighborhoods", "Resources", "Contact"];
const socials = [
  {
    icon: ASSETS.facebook,
    alt: "Facebook",
    href: "https://www.facebook.com/tina.rowe.484411",
  },
  {
    icon: ASSETS.instagram,
    alt: "Instagram",
    href: "https://www.instagram.com/therowereport",
  },
  {
    icon: ASSETS.youtube,
    alt: "YouTube",
    href: "https://www.youtube.com/@TheRoweReportMobile",
  },
  {
    icon: ASSETS.linkedin,
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tina-rowe-76368b353/",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CTA({ children, outline = false, onClick, className = "" }) {
  const handleClick = onClick || (() => window.dispatchEvent(new CustomEvent("openLeadPopup")));

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        "rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide transition",
        outline
          ? "border-2 border-white/80 bg-black/30 text-white hover:bg-white hover:text-black"
          : "bg-red-600 text-white shadow-lg shadow-red-950/25 hover:bg-red-700",
        className
      )}
    >
      {children}
    </button>
  );
}

function SocialSidebar() {
  return (
    <div className="fixed left-4 top-1/2 z-[40] hidden -translate-y-1/2 flex-col gap-3 2xl:flex">
      {socials.map((social) => (
        <a
          key={social.alt}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.alt}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/80 shadow-xl backdrop-blur transition hover:scale-105 hover:border-red-500 hover:bg-red-600"
>
          <img
            src={social.icon}
            alt={social.alt}
            className="h-6 w-6 object-contain brightness-0 invert transition group-hover:brightness-0 group-hover:invert"
          />
        </a>
      ))}
    </div>
  );
}

function TopBar({ onOpen }) {
  return (
    <div className="relative z-[90] w-full border-b border-red-600 bg-white text-red-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-3 text-center sm:flex-row sm:justify-between sm:px-6">
        <button
          type="button"
          onClick={onOpen}
          className="relative z-[95] rounded bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow hover:bg-red-700 sm:px-5 sm:text-sm"
        >
          What Is My Home Worth?
        </button>
        <a
  href="tel:2518959322"
  className="relative z-[95] text-base font-semibold tracking-wide text-red-600 hover:text-red-700 hover:underline sm:text-lg"
  >
    ☎ (251) 895-9322
  </a>
      </div>
    </div>
  );
}

function Header({ page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const goToPage = (key) => {
    setPage(key);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white shadow-xl">
      <div className="mx-auto flex min-h-[92px] max-w-7xl items-center justify-between gap-4 px-4 py-2 xl:h-[120px] xl:gap-10 xl:px-5 xl:py-0">
        <button type="button" onClick={() => goToPage("home")} className="flex shrink-0 items-center gap-2 xl:gap-4">
          <img src={ASSETS.logo} alt="The Rowe Report" className="h-[92px] w-auto object-contain sm:h-[115px] md:h-[140px] xl:h-[300px]" />
          <img src={ASSETS.kw} alt="Keller Williams Mobile" className="h-[28px] w-auto object-contain sm:h-[34px] md:h-[40px] xl:h-[75px]" />
        </button>

        <nav className="hidden items-center gap-8 font-display text-[17px] uppercase tracking-[0.08em] xl:flex 2xl:gap-10">
          {navItems.map((item) => {
            const key = item.toLowerCase();
            const active = page === key;
            return (
              <button
                key={item}
                type="button"
                onClick={() => goToPage(key)}
                className={cx(
                  "relative py-3 transition hover:text-red-500",
                  active && "after:absolute after:inset-x-0 after:-bottom-1 after:h-1 after:bg-red-600"
                )}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="hidden shrink-0 xl:ml-10 xl:block 2xl:ml-16">
          <CTA onClick={() => goToPage("resources")} className="px-4 py-2 text-[11px] xl:px-6 xl:py-3 xl:text-sm">
            Get Your Rowe Report
          </CTA>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="ml-auto rounded border border-white/25 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white xl:hidden"
          aria-expanded={mobileOpen}
        >
          Menu
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-black px-4 pb-4 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => {
              const key = item.toLowerCase();
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(key)}
                  className={cx(
                    "rounded px-4 py-3 text-left font-display text-lg uppercase tracking-wide hover:bg-white/10",
                    page === key && "bg-red-600 text-white"
                  )}
                >
                  {item}
                </button>
              );
            })}
            <CTA onClick={() => goToPage("resources")} className="mt-2 w-full">
              Get Your Rowe Report
            </CTA>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function IconBlock({ icon, title, text, dark = false }) {
  return (
    <div
      className={cx(
        "px-4 py-4 text-center md:border-r last:border-r-0",
        dark ? "border-white/10" : "border-neutral-200"
      )}
    >
      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center text-red-600">
        {icon}
      </div>
      <h3 className="font-display text-[18px] font-semibold uppercase leading-tight tracking-tight">
        {title}
      </h3>
      <p
        className={cx(
          "mx-auto mt-1.5 max-w-[170px] text-[13px] leading-5",
          dark ? "text-white/75" : "text-neutral-700"
        )}
      >
        {text}
      </p>
    </div>
  );
}

function FormPanel({ title, button = "Get My Free Report", dark = true }) {
  const words = title.split(" ");
  const fields = ["Name", "Phone Number", "Email Address", "Property Address"];

  return (
    <div className={cx("rounded-lg p-7 shadow-2xl", dark ? "bg-black text-white" : "bg-white text-black")}>
      <h3 className="font-display text-3xl font-semibold uppercase leading-tight">
        {words.map((word, idx) => (
          <React.Fragment key={`${word}-${idx}`}>
            <span className={word.toLowerCase().includes("free") || word.toLowerCase().includes("rowe") ? "text-red-600" : ""}>{word}</span>{" "}
          </React.Fragment>
        ))}
      </h3>
      <div className="mt-5 grid gap-3">
        {fields.map((field) => (
          <input
            key={field}
            className="rounded border border-neutral-300 bg-white px-4 py-3 text-sm text-black outline-none"
            placeholder={field}
          />
        ))}
        <textarea
          className="min-h-28 rounded border border-neutral-300 bg-white px-4 py-3 text-sm text-black outline-none"
          placeholder="How can Tina help?"
        />
        <CTA className="w-full" onClick={() => window.dispatchEvent(new CustomEvent("submitLeadForm"))}>{button}</CTA>
        <button type="button" className={cx("text-center text-sm underline", dark ? "text-white/75" : "text-neutral-500")}>No thanks, continue browsing</button>
        <p className={cx("text-center text-xs", dark ? "text-white/70" : "text-neutral-500")}>🔒 We respect your privacy. No spam, ever.</p>
      </div>
    </div>
  );
}

function ReviewCard({ name, text }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center text-black shadow-md">
      <div className="text-lg tracking-[0.15em] text-red-600">★★★★★</div>
      <p className="mt-4 text-sm leading-6 text-neutral-700">“{text}”</p>
      <p className="mt-4 font-semibold">— {name}</p>
      <p className="text-sm text-neutral-600">Mobile, AL</p>
    </div>
  );
}

function Hero({ title, redTitle, text, quote, button = "Get Your Home Value", form, reverse = false }) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <img src={ASSETS.skyline} alt="Mobile skyline" className="absolute inset-0 h-full w-full object-cover opacity-85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

      <div className="relative mx-auto grid min-h-[535px] max-w-7xl items-center gap-8 px-6 py-7 lg:grid-cols-[1fr_.92fr]">
        <div className={cx("z-10", reverse && "lg:order-2")}>
          <h1 className="font-display text-[3.2rem] font-semibold uppercase leading-[0.95] tracking-tight md:text-[4.2rem]">
            {title}<br />
            <span className="text-red-600">{redTitle}</span>
          </h1>
          <div className="mt-4 h-1 w-24 bg-red-600" />
          <p className="mt-4 max-w-[500px] text-[17px] font-medium leading-7 text-white/90">{text}</p>
          {quote ? (
            <div className="absolute right-8 top-40 hidden max-w-[240px] rotate-[-2deg] xl:block">
              <p className="font-hand text-[35px] leading-[1.15] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                I don’t just<br />
                list homes...<br />
                I get them<br />
                <span className="text-[43px]">SOLD.</span>
              </p>
              <div className="mt-1 h-1.5 w-40 rotate-[-2deg] rounded-full bg-red-600" />
              <p className="mt-4 font-hand text-[31px] leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">— Tina Rowe</p>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CTA>{button}</CTA>
            <CTA outline onClick={() => window.dispatchEvent(new CustomEvent("navigatePage", { detail: "resources" }))}>Get Your Free Rowe Report</CTA>
          </div>
          <p className="mt-5 text-sm text-white/80">Or call/text me directly</p>
          <p className="text-3xl font-semibold tracking-tight"><a href="tel:2518959322">☎ {phone}</a></p>
        </div>

        <div className="relative hidden h-[520px] lg:block">
          <img src={ASSETS.tina} alt="Tina Rowe" className="absolute bottom-[-40px] right-56 h-[620px] w-auto object-contain object-bottom drop-shadow-2xl" />
          {form ? (
            <div className="absolute right-0 top-5 w-[360px]">
              <FormPanel title={form} button="Send Me Homes That Match" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    [
      ASSETS.processAnalyze,
      "Analyze",
      "I break down exactly what went wrong and what needs to change.",
    ],
    [
      ASSETS.processStrategize,
      "Strategize",
      "We create a custom plan for pricing, positioning, and timing.",
    ],
    [
      ASSETS.processMarket,
      "Market",
      "Your home gets maximum exposure where buyers are actually looking.",
    ],
    [
      ASSETS.processNegotiate,
      "Negotiate",
      "I fight to get you top dollar and the strongest terms.",
    ],
    [
      ASSETS.processSold,
      "Sold",
      "Smooth closing, clear communication, no surprises.",
    ],
  ];

  return (
    <section className="bg-neutral-50 py-14">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-display text-4xl font-semibold uppercase">
          My <span className="text-red-600">Proven</span> Process to Get Your Home Sold
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-5">
          {steps.map(([icon, label, description]) => (
            <IconBlock
              key={label}
              icon={<img src={icon} alt={label} className="h-16 w-16 object-contain" />}
              title={label}
              text={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ title }) {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const firstWords = words.slice(0, -1).join(" ");

  return (
    <section className="bg-[#06101a] py-14 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-display text-4xl font-semibold uppercase">
          {firstWords} <span className="text-red-600">{lastWord}</span>
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <ReviewCard name="Michael T." text="Our home sat on the market with another agent. Tina stepped in and had it under contract in weeks." />
          <ReviewCard name="Jennifer R." text="She told us exactly what was wrong, fixed it, and got it SOLD for more than we expected." />
          <ReviewCard name="David K." text="If your home didn’t sell, call Tina before you do anything else." />
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-black text-white">
      <div className="border-t border-red-600 border-b border-red-600 bg-white py-5">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 text-center text-red-600 md:grid-cols-3">
          <a href="tel:2518959322" className="font-semibold uppercase text-red-600 transition hover:text-red-700">☎ Call or Text Tina<br /><span className="font-normal text-neutral-600">{phone}</span></a>
          <button type="button" onClick={() => setPage("contact")} className="font-semibold uppercase text-red-600 transition hover:text-red-700">📅 Schedule a Call<br /><span className="font-normal text-neutral-600">Let’s talk about your goals.</span></button>
          <button type="button" onClick={() => setPage("resources")} className="font-semibold uppercase text-red-600 transition hover:text-red-700">📄 Get Your Free Report<br /><span className="font-normal text-neutral-600">See what your home is worth</span></button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
        <div>
          <img src={ASSETS.logo} alt="The Rowe Report" className="h-[320px] w-auto" />
          <img src={ASSETS.kw} alt="Keller Williams Mobile" className="mt-[-6px] h-[80px] w-auto" />
          <p className="mt-3 text-xs text-white/60">Helping homeowners and buyers make confident moves in Mobile, AL and the surrounding areas.</p>
        </div>
        <div>
          <h4 className="font-semibold uppercase">Quick Links</h4>
          <div className="mt-3 grid gap-1 text-sm text-white/70">
            {navItems.slice(0, 6).map((item) => (
              <button key={item} type="button" onClick={() => setPage(item.toLowerCase())} className="text-left hover:text-red-500">{item}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold uppercase">Contact</h4>
          <p className="mt-3 text-sm leading-7 text-white/70"><a href="tel:2518959322">☎ {phone}</a><br />✉ <a href="mailto:tinarowe@kw.com" className="hover:text-red-500">tinarowe@kw.com</a><br />📍 <a href="https://maps.apple.com/?address=1210%20Hillcrest%20Road,%20Mobile,%20AL%2036695" target="_blank" rel="noreferrer" className="hover:text-red-500">1210 Hillcrest Road<br />Mobile, AL 36695</a></p>
        </div>
        <div>
          <h4 className="font-semibold uppercase">Follow Me</h4>
          <div className="mt-4 flex gap-4">
  {socials.map((social) => (
    <a
      key={social.alt}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.alt}
    >
      <img
        src={social.icon}
        alt={social.alt}
        className="h-9 w-9 rounded-full border border-white/30 p-2 transition hover:border-red-500"
      />
    </a>
  ))}
</div>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ setPage }) {
  const iconStyle = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.85,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <>
      <Hero
        title="Your Home Didn't Sell?"
        redTitle="There's a Reason."
        text="Most homes that don't sell come down to pricing, exposure, or strategy. I fix all three — so you don't leave money on the table again."
        quote="I don't just list homes... I get them SOLD."
        button="Find Out Why Your Home Didn't Sell"
      />

      <section className="bg-[#07111b] py-4 text-white">
        <div className="mx-auto grid max-w-7xl gap-2 px-6 md:grid-cols-4">
          <IconBlock
            dark
            icon={<img src={ASSETS.marketingIcon} alt="Strategic Marketing" className="h-14 w-14 object-contain" />}
            title="Strategic Marketing"
            text="Your home seen by the right buyers."
          />
          <IconBlock
            dark
            icon={<img src={ASSETS.communicationIcon} alt="Clear Communication" className="h-14 w-14 object-contain" />}
            title="Clear Communication"
            text="You're always informed."
          />
          <IconBlock
            dark
            icon={<img src={ASSETS.marketIcon} alt="Local Market Expertise" className="h-14 w-14 object-contain" />}
            title="Local Market Expertise"
            text="In-depth knowledge of Mobile."
          />
          <IconBlock
            dark
            icon={<img src={ASSETS.handshakeIcon} alt="Handshake" className="h-14 w-14 object-contain" />}
            title="Results-Driven Approach"
            text="Proven strategies that get homes SOLD."
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[.72fr_1.02fr_.86fr] lg:items-center">
          <img src={ASSETS.van} alt="The Rowe Report Van" className="max-h-[380px] justify-self-center rounded-lg object-contain" />
          <div>
            <h2 className="font-display text-[2.65rem] font-semibold uppercase leading-[0.97]">
              Before You List Again... <br />
              <span className="text-red-600">See What Your Home Should Have Sold For</span>
            </h2>
            <p className="mt-4 text-[17px] leading-7 text-neutral-700">Most sellers never see the real numbers. The Rowe Report shows exactly what buyers are paying in your neighborhood right now.</p>
            <ul className="mt-5 space-y-2 text-[15px] font-bold">
              <li>✅ Real recent sales (not guesses)</li>
              <li>✅ Neighborhood-specific breakdowns</li>
              <li>✅ Pricing trends that impact your home</li>
              <li>✅ What likely caused your home not to sell</li>
            </ul>
            <p className="mt-4 font-script text-2xl italic text-neutral-700">100% FREE. No pressure. Just real answers.</p>
          </div>
          <FormPanel title="Get Your Free Rowe Report" button="Send Me My Rowe Report" />
        </div>
      </section>

      <section className="bg-neutral-100 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-4xl font-semibold uppercase leading-tight">
            Why Most Homes Don't Sell <span className="text-red-600">(And Why Yours Didn't Either)</span>
          </h2>
          <div className="mx-auto mt-8 grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-lg bg-white p-6 text-left shadow-md">
              <ul className="space-y-3 text-[16px] font-medium">
                <li>❌ Priced wrong for today's market</li>
                <li>❌ Not enough exposure to serious buyers</li>
                <li>❌ Weak marketing that didn't stand out</li>
                <li>❌ Poor negotiation strategy</li>
                <li>❌ No clear plan from the start</li>
              </ul>
            </div>
            <div className="text-6xl font-semibold text-red-600">→</div>
            <div className="rounded-lg bg-white p-6 text-left shadow-md">
              <h3 className="font-display text-3xl font-semibold uppercase text-green-600">How I Fix It</h3>
              <ul className="mt-4 space-y-3 text-[16px] font-medium">
                <li>✅ Data-driven pricing strategy</li>
                <li>✅ High-impact marketing that gets attention</li>
                <li>✅ Professional presentation & positioning</li>
                <li>✅ Strong negotiation to protect your equity</li>
                <li>✅ A clear, proven plan from day one</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <TestimonialsSection title="What Homeowners Are Saying" />

      <section className="relative overflow-hidden bg-black py-8 text-white">
        <img src={ASSETS.skyline} alt="homes" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 md:grid-cols-[.5fr_1.2fr_.9fr]"> <div>
            <h2 className="font-display text-4xl font-semibold uppercase leading-tight">
              Don’t Relist Your Home Without a <span className="text-red-600">Better Strategy.</span>
            </h2>
            <p className="mt-2 text-lg text-white/80">You already tried once. Let’s make sure the next time... it actually sells.</p>
          </div>
          <div className="flex flex-col gap-3">
            <CTA>Schedule a Call With Tina</CTA>
            <CTA outline onClick={() => setPage("resources")}>Get The Rowe Report First</CTA>
            <p className="text-3xl font-semibold"><a href="tel:2518959322">☎ {phone}</a></p>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}

function AboutPage({ setPage }) {
  return (
    <>
      <Hero
        title="Hi, I'm Tina Rowe"
        redTitle="Focused On Getting Homes Sold."
        text="I believe every homeowner deserves an agent who will truly fight for their best outcome. Whether your home didn't sell or you're thinking about making a move, I have the strategy, experience, and determination to get you top dollar."
      />

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="grid gap-3 rounded-lg bg-white p-2 shadow-xl sm:grid-cols-2">
              <img
                src={ASSETS.benefit1}
                alt="Tina Rowe community benefit event"
                className="h-[360px] w-full rounded-md object-cover sm:row-span-2"
              />
              <img
                src={ASSETS.benefit3}
                alt="Tina Rowe at community benefit"
                className="h-[174px] w-full rounded-md object-cover"
              />
              <img
                src={ASSETS.benefit2}
                alt="Tina Rowe volunteering at community benefit"
                className="h-[174px] w-full rounded-md object-cover"
              />
            </div>

            <div className="mt-8">
              <h2 className="font-hand text-4xl text-red-600">Why Sellers Choose Me</h2>
              <p className="mt-4 leading-7">
                I’m a lifelong Mobile local, and I know this market inside and out — not just the neighborhoods, but what actually makes homes sell.
              </p>
              <p className="mt-4 leading-7">
                I don’t approach real estate like most agents. Too many homes sit on the market because of the wrong pricing, weak marketing, or no real strategy. That costs sellers time, money, and frustration.
              </p>
              <p className="mt-4 font-semibold">I do things differently.</p>
              <p className="mt-4 leading-7">
                I focus on positioning your home to stand out, attract the right buyers, and create the kind of demand that leads to strong offers.
              </p>
              <p className="mt-4 leading-7">
                Whether your home didn’t sell the first time or you’re thinking about listing, my goal is simple:
                <span className="font-semibold text-red-600"> Get you the best possible outcome — with a clear plan from day one.</span>
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold uppercase tracking-widest text-red-600">Get To Know Me</p>
            <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight">
              A Strong Negotiator. <br />
              A Problem Solver. A Local.
            </h2>
            <div className="mt-3 h-1 w-20 bg-red-600" />

            <p className="mt-5 leading-7">
              Real estate is more than buying and selling homes — it’s about helping people make life-changing decisions with confidence. I started my real estate career with one goal in mind: to provide honest advice, clear communication, and a proven plan that gets results.
            </p>
            <p className="mt-4 leading-7">
              I specialize in helping sellers, especially those who have had their homes sit on the market, get the outcome they deserve.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <IconBlock icon={<img src={ASSETS.handshakeIcon} alt="Advocate" className="h-12 w-12 object-contain" />} title="Advocate" text="I’ll always put your best interests first." />
              <IconBlock icon={<img src={ASSETS.marketingIcon} alt="Strategist" className="h-12 w-12 object-contain" />} title="Strategist" text="I create custom plans that get your home sold." />
              <IconBlock icon={<img src={ASSETS.communicationIcon} alt="Communicator" className="h-12 w-12 object-contain" />} title="Communicator" text="You’ll always know where you stand." />
              <IconBlock
                icon={<img src={ASSETS.localExpertIcon} alt="Local Expert" className="h-12 w-12 object-contain" />}
                title="Local Expert"
                text="I know Mobile, the market, and the people."
            />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="rounded-lg bg-neutral-100 p-7">
                <h3 className="font-display text-3xl font-semibold uppercase leading-tight">
                  What You Can <span className="text-red-600">Expect</span> When You Work With Me
                </h3>
                <ul className="mt-5 space-y-4 text-sm leading-6">
                  <li>✅ A clear pricing strategy based on real market data</li>
                  <li>✅ Marketing that actually gets your home seen — not just listed</li>
                  <li>✅ Honest communication — you’ll always know what’s happening</li>
                  <li>✅ Strong negotiation to protect your bottom line</li>
                  <li>✅ A step-by-step plan so nothing is left to chance</li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
                <img src={ASSETS.tina} alt="Tina Rowe" className="h-56 w-full object-cover object-top" />
                <div className="p-5 text-center">
                  <h3 className="font-display text-2xl font-semibold uppercase text-red-600">
                    Thinking About Selling Your Home?
                  </h3>
                  <p className="mt-2 text-sm">Before you list, let’s talk about your strategy.</p>
                  <CTA className="mt-4 w-full">Schedule A Call With Tina</CTA>
                  <CTA outline className="mt-3 w-full border-black text-black hover:bg-black hover:text-white">
                    Find Out What Your Home Is Worth
                  </CTA>
                  <a href="tel:2518959322" className="mt-4 block text-2xl font-semibold">
                    ☎ {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-3xl font-semibold uppercase">
            The <span className="text-red-600">Values</span> I Bring To Every Client
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <IconBlock
              icon={<img src={ASSETS.honestyIcon} alt="Honesty" className="h-14 w-14 object-contain" />}
              title="Honesty" text="I give you the truth, even when it’s not what you want to hear." />
            <IconBlock
              icon={<img src={ASSETS.integrityIcon} alt="Integrity" className="h-14 w-14 object-contain" />}
              title="Integrity" text="I do what I say I’ll do and I always follow through." />
            <IconBlock
              icon={<img src={ASSETS.commitmentIcon} alt="Commitment" className="h-14 w-14 object-contain" />}
              title="Commitment" text="I’m committed to your success from start to finish." />
            <IconBlock
              icon={<img src={ASSETS.marketIcon} alt="Results" className="h-14 w-14 object-contain" />}
              title="Results" text="I focus on strategies that deliver the best possible outcome." />
            <IconBlock
              icon={<img src={ASSETS.careIcon} alt="Care" className="h-14 w-14 object-contain" />}
              title="Care" text="I treat every client like family." />
          </div>
        </div>
      </section>

      <TestimonialsSection title="What Sellers Say After Working With Me" />

      <Footer setPage={setPage} />
    </>
  );
}

function SellersPage({ setPage }) {
  return (
    <>
      <Hero title="Your Home Didn't Sell — Or You're Thinking About Listing?" redTitle="Let's Make Sure It Sells This Time." text="Most homes that fail to sell come down to pricing, exposure, or strategy. I fix all three — so you walk away with top dollar." button="Find Out What Your Home Should Sell For" />
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-4xl font-semibold uppercase">What Actually Gets Homes <span className="text-red-600">Sold</span></h2>
          <div className="mt-8 grid gap-4 md:grid-cols-6">
            {["Strategic Pricing", "Marketing That Stands Out", "Local Expertise", "Strong Negotiation", "Full Service", "Proven Results"].map((title, index) => (
              <IconBlock key={title} icon={["🎯", "📸", "📍", "🤝", "🏠", "🛡️"][index]} title={title} text="A better strategy from start to finish." />
            ))}
          </div>
        </div>
      </section>
      <ProcessSection />
      <Footer setPage={setPage} />
    </>
  );
}

function BuyersPage({ setPage }) {
  const buyerSteps = [
    [
      ASSETS.marketingIcon,
      "1. Understand Your Goals",
      "We get clear on what you want — and what you don’t.",
    ],
    [
      ASSETS.processAnalyze,
      "2. Find The Right Homes",
      "I hand-pick the best options that fit your needs and budget.",
    ],
    [
      ASSETS.processStrategize,
      "3. Tour Strategically",
      "We focus only on homes that are the right fit.",
    ],
    [
      ASSETS.penPaperIcon,
      "4. Make A Strong Offer",
      "I’ll help you stand out and win in multiple-offer situations.",
    ],
    [
      ASSETS.handshakeIcon,
      "5. Negotiate Smart",
      "I protect your money and fight for the best terms.",
    ],
    [
      ASSETS.processSold,
      "6. Close Smoothly",
      "Clear communication and a stress-free closing.",
    ],
  ];

  const buyerBenefits = [
    ["Get more home for your money", "Affordable prices and great value."],
    ["Coastal lifestyle without coastal prices", "Beaches, boating, and beautiful sunsets."],
    ["Strong communities + great schools", "Great neighborhoods and family-friendly living."],
    ["Growth, charm, and opportunity", "A thriving economy with a rich history."],
  ];

  const buyerTypes = [
    [
      ASSETS.localExpertIcon,
      "First-Time Buyers",
      "I simplify everything so you feel confident every step of the way.",
    ],
    [
      ASSETS.bigHouseIcon,
      "Move-Up Buyers",
      "Upgrade smart without overpaying or rushing the process.",
    ],
    [
      ASSETS.locationIcon,
      "Relocating Buyers",
      "I help you navigate Mobile like a local and make a smooth transition.",
    ],
    [
      ASSETS.investorIcon,
      "Investors",
      "Find opportunities that make sense and fit your goals.",
    ],
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={ASSETS.skyline}
          alt="Mobile skyline"
          className="absolute inset-0 h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[.75fr_1fr_.78fr] lg:items-center">
          <div className="hidden self-end lg:block">
            <img
              src={ASSETS.tina}
              alt="Tina Rowe"
              className="h-[560px] w-auto object-contain object-bottom"
            />
          </div>

          <div>
            <h1 className="font-display text-[3rem] font-semibold uppercase leading-[.95] md:text-[4.4rem]">
              Find The Right Home—<br />
              Without Overpaying<br />
              <span className="text-red-600">Or Missing Out</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8">
              In today’s market, the right strategy matters. I help you find, win,
              and secure the right home — without the stress.
            </p>

            <p className="mt-6 font-hand text-4xl">Tina Rowe</p>
            <p className="mt-3 max-w-sm text-lg">
              I help buyers win in competitive markets — without overpaying.
            </p>
          </div>

          <FormPanel
            title="Get Access To Homes Before Everyone Else"
            button="Send Me Homes That Match"
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-4xl font-semibold uppercase">
            How I Help You <span className="text-red-600">Win</span> The Right Home
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {buyerSteps.map(([icon, title, text]) => (
              <IconBlock
                key={title}
                icon={
                  <img
                    src={icon}
                    alt={title}
                    className="h-14 w-14 object-contain"
                  />
                }
                title={title}
                text={text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
            <img
              src={ASSETS.buyersLoveMobile}
              alt="Beautiful Mobile Alabama home"
              className="h-64 w-full object-cover"
            />

            <div className="p-8">
              <h2 className="font-display text-3xl font-semibold uppercase">
                Why Buyers Love <span className="text-red-600">Mobile, AL</span>
              </h2>

              <ul className="mt-6 space-y-6">
                {buyerBenefits.map(([title, text]) => (
                  <li key={title} className="flex items-start gap-4">
                    <img
                      src={ASSETS.checkCircleIcon}
                      alt=""
                      className="mt-1 h-7 w-7 shrink-0 object-contain"
                    />
                    <div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-sm text-neutral-600">{text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-lg bg-black p-8 text-white shadow-lg">
            <img
              src={ASSETS.skyline}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />

            <div className="relative grid h-full gap-6 md:grid-cols-[1fr_1fr] md:items-end">
              <div className="relative z-10">
                <h2 className="font-display text-4xl font-semibold uppercase leading-tight">
                  Stop Missing Out<br />
                  <span className="text-red-600">On The Right Homes</span>
                </h2>

                <p className="mt-4 text-lg leading-7">
                  The best homes don’t last long — and many never hit the public
                  market. Let me give you the advantage.
                </p>

                <CTA className="mt-5">Get Homes Sent To Me First</CTA>
                <CTA outline className="mt-3 w-full">
                  Schedule A Call With Tina
                </CTA>

                <a href="tel:2518959322" className="mt-5 block text-3xl font-semibold">
                  ☎ {phone}
                </a>
              </div>

              <div className="relative hidden h-full min-h-[520px] md:block">
                <img
                  src={ASSETS.tina}
                  alt="Tina Rowe"
                  className="absolute bottom-[-25px] right-[-20px] h-[560px] w-auto max-w-none object-contain object-bottom lg:h-[620px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-4xl font-semibold uppercase">
            No Matter Where You Are,{" "}
            <span className="text-red-600">I’ve Got You Covered</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {buyerTypes.map(([icon, title, text]) => (
              <IconBlock
                key={title}
                icon={
                  <img
                    src={icon}
                    alt={title}
                    className="h-16 w-16 object-contain"
                  />
                }
                title={title}
                text={text}
              />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection title="What Buyers Say After Working With Me" />

      <section className="bg-red-600 py-6 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-6 text-center lg:grid-cols-[1fr_auto_auto_auto]">
          <h2 className="font-display text-3xl font-semibold uppercase">
            Buying A Home Doesn’t Have To Be Stressful—<br />
            If You Have The Right Agent
          </h2>

          <CTA outline onClick={() => window.dispatchEvent(new CustomEvent("openLeadPopup"))}>
            Start My Home Search
          </CTA>

          <CTA outline onClick={() => setPage("contact")}>
            Talk To Tina First
          </CTA>

          <a href="tel:2518959322" className="text-2xl font-semibold">
            Call or Text<br />
            {phone}
          </a>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}
function NeighborhoodsPage({ setPage }) {
  const areas = ["Downtown Mobile", "Midtown", "The Spring Hill Area", "West Mobile", "Point Clear"];

  return (
    <>
      <Hero
        title="Find Your Perfect Neighborhood"
        redTitle="In Mobile, AL"
        text="Every neighborhood has its own style and story. I’ll help you find the one that fits your lifestyle and goals."
        button="Search Neighborhoods"
      />

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-4xl font-semibold uppercase">
            Popular Neighborhoods in <span className="text-red-600">Mobile</span>
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {areas.map((area, index) => (
              <div key={area} className="overflow-hidden rounded-lg border bg-white shadow-lg">
                <img
                  src={
                    index === 0
                      ? ASSETS.skyline
                      : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=80"
                  }
                  alt={area}
                  className="h-40 w-full object-cover"
                />

                <div className="p-5 text-center">
                  <h3 className="font-display text-xl font-semibold uppercase">{area}</h3>
                  <p className="mt-2 text-sm text-neutral-700">
                    Homes, lifestyle, market insight, and local guidance.
                  </p>
                  <button className="mt-5 w-full rounded border py-2 font-bold uppercase hover:bg-red-600 hover:text-white">
                    View Homes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}
function ResourcesPage({ setPage }) {
  const resources = ["Market Overview", "Pricing Trends", "Sales Activity", "Seller's Advantage", "Neighborhood Breakdown", "Local Insights"];

  const vendorGroups = [
    ["Appliance Repair", [["ASAP Appliance Repair", "(251) 510-0088"], ["Appliance Tech of Mobile", "(251) 525-3496"], ["Coastal Repair Solutions", "(251) 721-6177"]]],
    ["Appraisers", [["Chad Anderson", "(251) 510-5296"], ["Michael Holifield", "(251) 554-2668"], ["Stacey Wade", "(251) 661-8440"], ["Tripp Baldwin", "(251) 550-5390"]]],
    ["Electricians", [["Jake Brewster", "(251) 550-9813"], ["Jonathon Hay", "(251) 599-8430"], ["Rick Andrews", "(251) 222-5681"], ["Sean Kroner", "(251) 508-0057"]]],
    ["Estate Sales", [["Jody Crane", "(251) 753-0690"]]],
    ["Fencing", [["James Fleming", "(251) 366-9248"]]],
    ["Handyman", [["Eric Schaffer", "(251) 591-4253"], ["Gary Parker", "(251) 689-4949"], ["Jeff Youngblood", "(251) 366-5289"], ["Mike Freeman", "(251) 646-6281"]]],
    ["Heating and Cooling", [["Hembree Heating & Air", "(251) 259-4664"]]],
    ["Home Cleaners", [["Brandy Whitten", "(251) 721-5393"], ["Karen Smith", "(251) 421-9491"]]],
    ["Home Inspectors", [["Darrell Pitts", "(251) 472-6727"], ["Julian Wiik", "(251) 490-3178"], ["Michael Burchfield", "(251) 404-0957"]]],
    ["Home Warranty", [["Lisa Burns", "(850) 393-7106"], ["Todd Powell", "(850) 739-4376"]]],
    ["Insurance Company", [["Goosehead", "(251) 263-7924"]]],
    ["Mortgage Company", [["Ashley Darst", "(952) 715-7295"], ["Jesse Robinson", "(251) 599-4385"]]],
    ["Moving Services", [["Azalea City Moving Co.", "(251) 633-8889"], ["Pink Zebra Moving", "(251) 999-7222"]]],
    ["Plumbers", [["Rod Deberry", "(251) 721-0688"], ["Jeff Byrd", "(251) 232-2813"], ["Nathan Herring", "(251) 675-6757"]]],
    ["Renovations", [["Coery Williams", "(251) 525-7039"]]],
    ["Roofers", [["Frank Reusser", "(251) 610-0812"], ["Jason Impson", "(251) 401-1158"]]],
    ["Surveyors", [["Joe Stewart", "(251) 554-8449"]]],
  ];

  const phoneLink = (phoneNumber) => `tel:${phoneNumber.replace(/\D/g, "")}`;

  return (
    <>
      <Hero
        title="The Rowe Report"
        redTitle="Real Results."
        text="The Rowe Report gives you local market data, neighborhood breakdowns, pricing trends, and expert insights you need to make a smart move."
        button="Get Your Rowe Report"
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_.9fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold uppercase">
              What's Inside The <span className="text-red-600">Rowe Report</span>
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {resources.map((item) => (
                <IconBlock key={item} icon="●" title={item} text="Helpful insight to make a confident decision." />
              ))}
            </div>
          </div>
          <FormPanel title="Get Your Free Rowe Report" button="Get My Home Value + Report" />
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-widest text-red-600">Local Resources</p>
            <h2 className="font-display text-4xl font-semibold uppercase">
              Tina's <span className="text-red-600">Vendor List</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              Browse local vendors by category. Tap a phone number to call directly.
            </p>
          </div>

          <div className="space-y-4">
            {vendorGroups.map(([category, vendors]) => (
              <details key={category} className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between bg-black px-6 py-4 font-display text-xl font-semibold uppercase tracking-wide text-white transition hover:bg-red-600">
                  {category}
                  <span className="ml-4 text-2xl transition group-open:rotate-45">+</span>
                </summary>

                <div className="divide-y divide-neutral-100 px-6">
                  {vendors.map(([name, vendorPhone]) => (
                    <div key={`${category}-${name}`} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                      <span className="font-semibold text-neutral-900">{name}</span>
                      <a href={phoneLink(vendorPhone)} className="font-semibold text-red-600 hover:text-black hover:underline">
                        {vendorPhone}
                      </a>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-neutral-500">
            Vendor list is provided as a helpful resource only. Clients should independently verify licensing, insurance, availability, pricing, and suitability before hiring any vendor.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold uppercase">
              Recent <span className="text-red-600">Rowe Report</span> Topics
            </h2>
            {[
              "Why Homes in Mobile Aren't Selling Right Now",
              "What Homes Are Actually Selling For",
              "The #1 Mistake That Keeps Homes From Selling",
              "Is Now Still A Good Time To Sell in Mobile?",
            ].map((topic) => (
              <div key={topic} className="mt-3 rounded border bg-white p-4 font-semibold shadow-sm">
                {topic} →
              </div>
            ))}
          </div>
          <img src={ASSETS.van} alt="The Rowe Report Van" className="rounded-lg shadow-xl" />
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}

function ContactPage({ setPage }) {
  return (
    <>
      <Hero title="Let's Talk About Your Next Move —" redTitle="And Get It Right." text="Whether your home didn't sell, you're thinking about buying, or just have questions — I'll give you clear, honest answers so you can move forward with confidence." button="Get My Plan" />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_.9fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold uppercase">Tell Me What You Need— <span className="text-red-600">I'll Take It From There.</span></h2>
            <div className="mt-6 grid gap-3">
              <input className="rounded border p-3" placeholder="First Name" />
              <input className="rounded border p-3" placeholder="Email Address" />
              <input className="rounded border p-3" placeholder="Phone Number" />
              <textarea className="h-36 rounded border p-3" placeholder="How can I help you?" />
              <CTA>Get My Plan</CTA>
            </div>
          </div>
          <div className="rounded-lg bg-neutral-50 p-8 shadow-xl">
            <h2 className="font-display text-3xl font-semibold uppercase">Prefer To Reach Me <span className="text-red-600">Directly?</span></h2>
            <p className="mt-6 text-lg leading-9">☎ <a href="tel:2518959322"><b>{phone}</b></a><br />✉ <a href="mailto:tinarowe@kw.com" className="font-bold text-red-600 hover:text-red-700">tinarowe@kw.com</a><br />📍 <a href="https://maps.apple.com/?address=1210%20Hillcrest%20Road,%20Mobile,%20AL%2036695" target="_blank" rel="noreferrer" className="font-bold hover:text-red-500">1210 Hillcrest Road<br />Mobile, AL 36695</a><br />⏰ <b>24/7</b></p>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </>
  );
}

export default function MovingInMobileMockup() {
  const [page, setPage] = useState("home");
  const [showPopup, setShowPopup] = useState(false);
  const popupDismissedRef = useRef(false);

  const openLeadPopup = () => {
    setShowPopup(true);
  };

  const closeLeadPopup = () => {
    popupDismissedRef.current = true;
    setShowPopup(false);
  };

  useEffect(() => {
    setShowPopup(false);

    const handleOpenLeadPopup = () => openLeadPopup();
    window.addEventListener("openLeadPopup", handleOpenLeadPopup);

    const handleNavigatePage = (event) => {
      if (event.detail) {
        setPage(event.detail);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("navigatePage", handleNavigatePage);

    const handleSubmitLeadForm = () => {
      alert("Thank you! Tina will reach out soon.");
    };
    window.addEventListener("submitLeadForm", handleSubmitLeadForm);

    const delay = 6500;
    const timer = window.setTimeout(() => {
      if (!popupDismissedRef.current) {
        setShowPopup(true);
      }
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("openLeadPopup", handleOpenLeadPopup);
      window.removeEventListener("navigatePage", handleNavigatePage);
      window.removeEventListener("submitLeadForm", handleSubmitLeadForm);
    };
  }, [page]);

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage setPage={setPage} />,
    sellers: <SellersPage setPage={setPage} />,
    buyers: <BuyersPage setPage={setPage} />,
    neighborhoods: <NeighborhoodsPage setPage={setPage} />,
    resources: <ResourcesPage setPage={setPage} />,
    contact: <ContactPage setPage={setPage} />,
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Caveat:wght@600;700&display=swap');
        .font-display { font-family: Oswald, Arial Narrow, sans-serif; font-weight: 500; letter-spacing: .02em; }
        .font-script { font-family: Georgia, serif; }
        .font-hand { font-family: Caveat, "Comic Sans MS", cursive; }
      `}</style>

      {showPopup ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-4 backdrop-blur-[1px]">
          <div className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-4 text-center shadow-2xl sm:p-8">
            <button type="button" onClick={closeLeadPopup} className="absolute right-4 top-3 text-2xl">×</button>
            <h2 className="font-display text-2xl uppercase leading-tight sm:text-4xl">Let Tina Help With <span className="text-red-600">Your Next Move</span></h2>
            <p className="mt-2 text-sm text-neutral-600 sm:mt-3 sm:text-base">Tell Tina what you need — home value, Rowe Report, listings, selling strategy, or general questions.</p>
            <div className="mt-4 grid gap-2 text-left sm:mt-5 sm:gap-3">
              <input className="rounded border p-3" placeholder="Name" />
              <input className="rounded border p-3" placeholder="Phone Number" />
              <input className="rounded border p-3" placeholder="Email Address" />
              <input className="rounded border p-3" placeholder="Property Address" />
              <textarea className="min-h-20 rounded border p-3 sm:min-h-28" placeholder="Additional details / How can Tina help?" />
              <CTA className="w-full">Submit My Information</CTA>
            </div>
            <button type="button" onClick={closeLeadPopup} className="mt-4 text-sm underline">No thanks, continue browsing</button>
          </div>
        </div>
      ) : null}

      <SocialSidebar />
      <TopBar onOpen={openLeadPopup} />
      <Header page={page} setPage={setPage} />
      {pages[page] || pages.home}
    </div>
  );
}
