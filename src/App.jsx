import React, { useEffect, useRef, useState } from "react";

import StagingIndicators from "./components/StagingIndicators";

import "./floating-contact.css";

import StructuredData from "./components/StructuredData";

const BASE = window.location.pathname.startsWith("/moving-in-mobile/") ? "/moving-in-mobile/" : "/";

const ASSETS = {
  skyline: `${BASE}mobile-hero.png`,
  tina: `${BASE}TinaRoweHalf.png`,
  tinaAlt: `${BASE}TinaRoweSignature.png`,
  tinaFloatingContact: `${BASE}TinaRoweSignatureLowRez.png`,
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
  fullServiceIcon: `${BASE}full-service.png`,
  realtorEOL: `${BASE}REALTOREOL.PNG`,
  realtorEOLWhite: `${BASE}REALTOREOL-white.png`,
  downtownMobile: `${BASE}downtown-mobile.jpg`,
  midtownMobile: `${BASE}midtown-mobile.jpg`,
  springHill: `${BASE}spring-hill.jpg`,
  westMobile: `${BASE}west-mobile.jpg`,
  saraland: `${BASE}saraland.jpg`,
  semmes: `${BASE}semmes.jpg`,
  spanishFort: `${BASE}spanish-fort.jpg`,
  daphne: `${BASE}daphne.jpg`,
  fairhope: `${BASE}fairhope.jpg`,
  dauphinIsland: `${BASE}dauphin-island.jpg`,
  gulfShores: `${BASE}gulf-shores.jpg`,
  orangeBeach: `${BASE}orange-beach.jpg`,
};

const phone = "(251) 895-9322";
const LEAD_CAPTURE_ENDPOINT = "https://formspree.io/f/mgogbvkq";

const GA_MEASUREMENT_ID = "G-3DL4PQGHQC";

const ANALYTICS_PAGES = {
  home: {
    title: "Moving in Mobile | Tina Rowe",
    path: "/",
  },
  about: {
    title: "About Tina Rowe | Moving in Mobile",
    path: "/about",
  },
  sellers: {
    title: "Sell Your Home in Mobile, Alabama | Tina Rowe",
    path: "/sellers",
  },
  buyers: {
    title: "Buy a Home in Mobile, Alabama | Tina Rowe",
    path: "/buyers",
  },
  neighborhoods: {
    title: "Mobile & Baldwin County Neighborhoods | Tina Rowe",
    path: "/neighborhoods",
  },
  rowereport: {
    title: "The Rowe Report | Mobile Alabama Real Estate",
    path: "/rowe-report",
  },
  resources: {
    title: "Mobile Alabama Real Estate Resources | Tina Rowe",
    path: "/resources",
  },
  contact: {
    title: "Contact Tina Rowe | Moving in Mobile",
    path: "/contact",
  },
};

function getRequestLabel(value) {
  if (typeof value === "string") return value;
  return "General Inquiry";
}

function openLeadRequest(requestType = "General Inquiry") {
  window.dispatchEvent(new CustomEvent("openLeadPopup", { detail: requestType }));
}

function openHomesSearch(area) {
  window.dispatchEvent(new CustomEvent("openHomesPopup", { detail: area }));
}

const navItems = ["Home", "About", "Sellers", "Buyers", "Neighborhoods", "Rowe Report", "Resources", "Contact"];
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
  const requestType = getRequestLabel(children);
  const handleClick = onClick || (() => openLeadRequest(requestType));

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

function FloatingTinaContact() {
  return (
    <div className="fixed bottom-6 right-4 z-[85] sm:bottom-auto sm:right-5 sm:top-[170px]">
      <button
        type="button"
        onClick={() => openLeadRequest("Send Tina a Message")}
        aria-label="Send Tina Rowe a message"
        title="Send Tina a message"
        className="
          group relative block rounded-full
          transition-all duration-200
          hover:-translate-y-1
          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-red-300
        "
      >
        {/* Tina Headshot */}
        <span
          className="
            tina-pulse
            flex h-[58px] w-[58px]
            items-center justify-center
            overflow-hidden
            rounded-full
            border border-red-600
            bg-white
            transition-all duration-200
            group-hover:scale-105
            group-hover:border-red-700
            group-hover:shadow-[0_12px_24px_rgba(0,0,0,.35)]
            sm:h-[70px] sm:w-[70px]
          "
        >
          <img
            src={ASSETS.tinaFloatingContact}
            alt="Tina Rowe"
            className="h-full w-full object-cover object-top"
          />
        </span>

        {/* Chat Bubble */}
        <span
          className="
            absolute
            -bottom-1
            -left-1
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border-2
            border-white
            bg-red-600
            text-white
            shadow-lg
            transition-colors duration-200
            group-hover:bg-red-700
            sm:h-8 sm:w-8
          "
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 fill-none stroke-current sm:h-4 sm:w-4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5.1A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            <path d="M8 10h.01" />
            <path d="M12 10h.01" />
            <path d="M16 10h.01" />
          </svg>
        </span>

        {/* Tooltip */}
        <span
          className="
            pointer-events-none
            absolute
            right-full
            top-1/2
            mr-3
            hidden
            -translate-y-1/2
            whitespace-nowrap
            rounded-md
            bg-black
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            shadow-lg
            group-hover:block
          "
        >
          Message Tina
        </span>
      </button>
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
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 py-3">
        <button type="button" onClick={() => goToPage("home")} className="flex min-w-0 shrink-0 items-center gap-2">
          <img src={ASSETS.logo} alt="The Rowe Report" className="h-[58px] w-auto max-w-[180px] object-contain sm:h-[68px] sm:max-w-[210px] md:h-[76px] md:max-w-[230px] xl:h-[88px] xl:max-w-[260px]" />
          <img src={ASSETS.kw} alt="Keller Williams Mobile" className="h-[28px] w-auto object-contain sm:h-[34px] md:h-[40px] xl:h-[75px]" />
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-4 xl:gap-6 lg:flex">
          {navItems.map((item) => {
           const key = item.toLowerCase().replace(/\s+/g, "");
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
           <CTA
              onClick={() => goToPage("rowereport")}
              className="shrink-0 whitespace-nowrap px-3 py-2 text-[11px] xl:px-5 xl:text-sm"
            >
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
              const key = item.toLowerCase().replace(/\s+/g, "");
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
            <CTA className="mt-2 w-full">
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fields = [
    ["name", "Name", "text", true],
    ["phone", "Phone Number", "tel", false],
    ["email", "Email Address", "email", true],
    ["address", "Property Address", "text", false],
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(LEAD_CAPTURE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError("Something went wrong. Please try again or call Tina directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cx("rounded-lg p-7 shadow-2xl", dark ? "bg-black text-white" : "bg-white text-black")}>
      {submitted ? (
        <div className="py-8 text-center">
          <h3 className="font-display text-3xl font-semibold uppercase">
            Thank You!
          </h3>
          <p className={cx("mt-3 text-sm leading-6", dark ? "text-white/75" : "text-neutral-600")}>
            Your information was sent successfully. Tina will be in touch soon.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-red-950/25 transition hover:bg-red-700"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="requestType" value={title} />
          <input type="hidden" name="source" value="Moving in Mobile website embedded form" />

          <h3 className="font-display text-3xl font-semibold uppercase leading-tight">
            {words.map((word, idx) => (
              <React.Fragment key={`${word}-${idx}`}>
                <span className={word.toLowerCase().includes("free") || word.toLowerCase().includes("rowe") ? "text-red-600" : ""}>{word}</span>{" "}
              </React.Fragment>
            ))}
          </h3>

          <div className="mt-5 grid gap-3">
            {fields.map(([name, placeholder, type, required]) => (
              <input
                key={name}
                name={name}
                type={type}
                required={required}
                className="rounded border border-neutral-300 bg-white px-4 py-3 text-sm text-black outline-none"
                placeholder={placeholder}
              />
            ))}
            <textarea
              name="need"
              className="min-h-28 rounded border border-neutral-300 bg-white px-4 py-3 text-sm text-black outline-none"
              placeholder="How can Tina help?"
            />

            {submitError ? (
              <p className="rounded bg-red-50 px-3 py-2 text-center text-sm text-red-700">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-red-950/25 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : button}
            </button>

            <button
              type="button"
              onClick={() => openLeadRequest(title)}
              className={cx("text-center text-sm underline", dark ? "text-white/75" : "text-neutral-500")}
            >
              Open larger form instead
            </button>

            <p className={cx("text-center text-xs", dark ? "text-white/70" : "text-neutral-500")}>🔒 We respect your privacy. No spam, ever.</p>
          </div>
        </form>
      )}
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
                sell homes...<br />
                I help people<br />
                <span className="text-[43px]">MOVE.</span>
              </p>
              <div className="mt-1 h-1.5 w-40 rotate-[-2deg] rounded-full bg-red-600" />
              <p className="mt-4 font-hand text-[31px] leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">— Tina Rowe</p>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CTA>{button}</CTA>
            <CTA outline>Have Questions About Real Estate?</CTA>
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

function TestimonialsSection({ type }) {
  const buyerReviews = [
    {
      name: "nikkistruth",
      source: "Google Review",
      text:
        "Working with Tina Rowe from Keller Williams was an absolute pleasure! Her knowledgeable agent insights into the real estate market gave us confidence in our investment. She went above and beyond, making the real estate process smooth and as stress-free as the process of buying a new home can be. If you’re looking for a phenomenal agent who understands the local market, we highly recommend her!",
    },
    {
      name: "Sandie Leonard",
      source: "Google Review",
      text:
        "Tina has been great to work with. She is very responsive and has exceeded all of our expectations. You will not be disappointed.",
    },
    {
      name: "Jansyn Wiggins",
      source: "Google Review",
      text:
        "Tina goes above and beyond to get a deal closed! Such a great agent :)",
    },
    {
      name: "Nichole Bedgood",
      source: "Zillow Review",
      text:
        "Working with Tina Rowe from Keller Williams was an absolute pleasure! Her knowledgeable agent insights into the real estate market gave us confidence in our investment. She went above and beyond, making the real estate process smooth and as stress-free as the process of buying a new home can be. If you’re looking for a phenomenal agent who understands the local market, we highly recommend her!",
    },
  ];

  const sellerReviews = [
    {
      name: "Scharlene Taylor",
      source: "Google Review",
      text:
        "From the very beginning Tina was not only very knowledgeable and professional but treated us as though we were family not just clients. Our property was sold in 22 days… she went above and beyond what we expected. She was recommended to us and we would HIGHLY recommend her to anyone. Thank you Tina for everything.",
    },
    {
      name: "Carolyn Brockmiller",
      source: "Google Review",
      text:
        "We re very impressed with Tina. She’s a real go getter. She has been a wonderful agent for us!!!! Highly recommend!!!!!!!!",
    },
    {
      name: "Sarah McGallagher",
      source: "Google Review",
      text:
        "Tina was fantastic to work with, I appreciate her cooperation with this transaction… it meant the world to my buyers and we are so thankful!",
    },
    {
      name: "Lauren Williams",
      source: "Google Review",
      text:
        "If you’re looking for a trustworthy, hardworking, and truly exceptional real estate professional, I cannot recommend Tina Rowe enough! Her attention to detail and commitment to doing what’s right for her clients set her apart in every way!",
    },
    {
      name: "cruisnrider",
      source: "Zillow Review",
      text:
        "Tina did an awesome job on getting our family home sold. Thirty two days from start to closing. Tina was very knowledgeable with the process and spot on on great advice, both with recommendations and watch outs. I would highly recommend Tina Rowe, as a matter of fact, I just shared her contact information with a friend that has a property that they want to sell. Always quick to answer any questions and most importantly, she got the home place sold very timely.",
    },
    {
      name: "Amy Barker",
      source: "Zillow Review",
      text:
        "Tina was incredibly thorough and helpful with our house sale. She worked hard to get us the best deal possible. She kept us informed at every stage and was extremely supportive throughout. She held our hand through each step and we are so grateful. I would highly recommend Tina!",
    },
  ];

  const reviews =
    type === "buyer"
      ? buyerReviews
      : sellerReviews;

  const title =
    type === "buyer"
      ? "What Buyers Say After Working With Me"
      : "What Sellers Say After Working With Me";

  const scrollingReviews = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden bg-[#06101a] py-14 text-white">
      <style>{`
        @keyframes testimonialScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .testimonial-track {
          animation: testimonialScroll 65s linear infinite;
        }

        .testimonial-wrapper:hover .testimonial-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-display text-4xl font-semibold uppercase">
          {title}
        </h2>

        <div className="testimonial-wrapper mt-10 overflow-hidden">
          <div className="testimonial-track flex w-max gap-6">

            {scrollingReviews.map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="flex w-[380px] shrink-0 flex-col justify-between rounded-xl bg-white p-6 text-black shadow-lg"
              >
                <div>
                  <p className="text-xl tracking-widest text-red-600">
                    ★★★★★
                  </p>

                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    “{review.text}”
                  </p>
                </div>

                <div className="mt-5 border-t pt-4">
                  <p className="font-bold">
                    — {review.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {review.source}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-black text-white">
      <div className="border-y border-red-600 bg-white py-5">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 text-center text-red-600 md:grid-cols-3">
          <a
            href="tel:2518959322"
            className="font-semibold uppercase text-red-600 transition hover:text-red-700"
          >
            ☎ Call or Text Tina
            <br />
            <span className="font-normal text-neutral-600">{phone}</span>
          </a>

          <button
            type="button"
            onClick={() => openLeadRequest("Schedule a Call")}
            className="font-semibold uppercase text-red-600 transition hover:text-red-700"
          >
            📅 Schedule a Call
            <br />
            <span className="font-normal text-neutral-600">
              Let’s talk about your goals.
            </span>
          </button>

          <button
            type="button"
            onClick={() => openLeadRequest("Get Your Free Report")}
            className="font-semibold uppercase text-red-600 transition hover:text-red-700"
          >
            📄 Get Your Free Report
            <br />
            <span className="font-normal text-neutral-600">
              See what your home is worth
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-12 lg:grid-cols-[2.5fr_0.7fr_0.95fr_0.85fr] lg:items-start">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="flex items-center justify-center">
              <img
                src={ASSETS.logo}
                alt="The Rowe Report"
                className="h-[300px] w-auto max-w-full object-contain sm:h-[340px] lg:h-[380px]"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-10 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <img
                src={ASSETS.kw}
                alt="kw Keller Williams Mobile"
                className="h-[130px] w-auto max-w-full object-contain sm:h-[150px]"
              />
              <p className="text-sm text-neutral-300">
                Tina Rowe, REALTOR®
              </p>

              <p className="text-sm text-neutral-400">
                Alabama License #169048
              </p>
              <img
                src={ASSETS.realtorEOLWhite}
                alt="REALTOR® and Equal Housing Opportunity"
                className="h-[115px] w-auto max-w-full object-contain sm:h-[135px]"
              />

            </div>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h4>

          <div className="mt-5 grid gap-2 text-sm text-white/75">
            {navItems.slice(0, 6).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setPage(item.toLowerCase().replace(/\s+/g, ""));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-left transition hover:text-red-500"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
            Contact
          </h4>

          <div className="mt-5 space-y-3 text-sm leading-7 text-white/80">
            <a
              href="tel:2518959322"
              className="block transition hover:text-red-500"
            >
              ☎ {phone}
            </a>

            <a
              href="mailto:tinarowe@kw.com"
              className="block transition hover:text-red-500"
            >
              ✉ tinarowe@kw.com
            </a>

            <a
              href="https://maps.apple.com/?address=1210%20Hillcrest%20Road,%20Mobile,%20AL%2036695"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition hover:text-red-500"
            >
              📍 1210 Hillcrest Road
              <br />
              Mobile, AL 36695
            </a>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
            Follow Me
          </h4>

          <div className="mt-5 flex flex-wrap gap-4">
            {socials.map((social) => (
              <a
                key={social.alt}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.alt}
                className="group"
              >
                <img
                  src={social.icon}
                  alt={social.alt}
                  className="h-12 w-12 rounded-full border border-white/25 bg-white/5 p-2.5 transition duration-200 group-hover:scale-105 group-hover:border-red-500 group-hover:bg-red-600"
                />
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="font-display text-lg uppercase text-white">
              Move With Confidence
            </p>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Clear guidance, strong strategy, and a local expert who knows how
              to get homes sold.
            </p>
          </div>

          <p className="mt-6 text-xs text-white/45">
            Privacy Policy | Terms of Use
          </p>
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
        title="Selling in Mobile?"
        redTitle="Moving in Mobile?"
        text="I'm Tina Rowe, your local, Mobile, Alabama home selling and relocation expert.  Get neighborhood guides, market updates, and a personalized strategy for your move."
        quote="I don't just sell homes... I help people move."
        button="Schedule Your 15 Minute Strategy Session"
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
              Before You List... <br />
              <span className="text-red-600">See What Your Home Could Sell For</span>
            </h2>
            <p className="mt-4 text-[17px] leading-7 text-neutral-700">Most homeowners don’t know what buyers are actually willing to pay today.  The Rowe Report gives you the data, strategy, and local market insights you need before putting your home on the market.</p>
            <ul className="mt-5 space-y-2 text-[15px] font-bold">
              <li>✅ Recent neighborhood sales</li>
              <li>✅ Pricing trends</li>
              <li>✅ Buyer demand in your area</li>
              <li>✅ A customized pricing strategy</li>
            </ul>
            <p className="mt-4 font-script text-2xl italic text-neutral-700">100% Free. No obligation. Just real information.</p>
          </div>
          <FormPanel title="Get Your Free Rowe Report" button="Send Me My Rowe Report" />
        </div>
      </section>

      <section className="bg-neutral-100 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-4xl font-semibold uppercase leading-tight">
            WHY SOME HOMES SELL FAST… <span className="text-red-600">(WHILE OTHERS SIT ON THE MARKET)</span>
          </h2>
          <div className="mx-auto mt-8 grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-lg bg-white p-6 text-left shadow-md">
              <ul className="space-y-3 text-[16px] font-medium">
                <li>❌ Incorrect Pricing</li>
                <li>❌ Limited Exposure</li>
                <li>❌ Weak marketing</li>
                <li>❌ Poor negotiation</li>
                <li>❌ No clear selling strategy</li>
              </ul>
            </div>
            <div className="text-6xl font-semibold text-red-600">→</div>
            <div className="rounded-lg bg-white p-6 text-left shadow-md">
              <h3 className="font-display text-3xl font-semibold uppercase text-green-600">HOW I HELP YOU SELL FOR MORE</h3>
              <ul className="mt-4 space-y-3 text-[16px] font-medium">
                <li>✅ Strategic pricing based on today’s market</li>
                <li>✅ Professional marketing that attracts buyers</li>
                <li>✅ Maximum exposure online</li>
                <li>✅ Skilled negotiation to protect your equity</li>
                <li>✅ A proven plan from day one</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <section className="relative overflow-hidden bg-black py-8 text-white">
        <img src={ASSETS.skyline} alt="homes" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 md:grid-cols-[.5fr_1.2fr_.9fr]"> <div>
            <h2 className="font-display text-4xl font-semibold uppercase leading-tight">
              READY TO <span className="text-red-600">SELL YOUR HOME?</span>
            </h2>
            <p className="mt-2 text-lg text-white/80">Let’s build the right strategy from the beginning and maximize your home’s value.</p>
          </div>
          <div className="flex flex-col gap-3">
            <CTA>SCHEDULE YOUR SELLER STRATEGY SESSION</CTA>
            <CTA outline>Get The Rowe Report First</CTA>
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
        redTitle="YOUR MOBILE, ALABAMA HOME SELLING EXPERT. Focused on getting you where you want to be."
        text="I believe every homeowner deserves an agent who will truly fight for their best outcome. I combine local market knowledge with a proven marketing strategy designed to help sellers maximize their home’s value. "
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
                As a lifelong Mobile, Alabama resident and Realtor, I know the Mobile real estate market inside and out—from the neighborhoods and schools to the pricing, marketing, and negotiation strategies that help homes sell for top dollar.
              </p>
              <p className="mt-4 leading-7">
                I love helping homeowners navigate one of the biggest financial decisions they’ll ever make with confidence and a clear plan.
              </p>
              <p className="mt-4 font-semibold">I do things differently.</p>
              <p className="mt-4 leading-7">
                I don’t believe in simply listing homes—I believe in building a strategy. Every home deserves the right pricing, positioning, marketing, and negotiation plan to attract qualified buyers and maximize its value. 
              </p>
              <p className="mt-4 leading-7">
                Whether you’re preparing to sell or looking for a fresh approach after your home didn’t sell, my goal is simple:
                <span className="font-semibold text-red-600"> help you achieve the best possible outcome with a clear strategy from day one.</span>
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
      <Footer setPage={setPage} />
    </>
  );
}

function SellersPage({ setPage }) {
  const sellerIcons = [
    [
      ASSETS.marketingIcon,
      "Strategic Pricing",
      "Data-driven pricing that positions your home to sell for the best possible price.",
    ],
    [
      ASSETS.processMarket,
      "Marketing That Stands Out",
      "Professional photography, digital marketing, and maximum exposure where buyers are looking.",
    ],
    [
      ASSETS.localExpertIcon,
      "Local Expertise",
      "Knowledge of Mobile's neighborhoods, market conditions, and buyer demand.",
    ],
    [
      ASSETS.processNegotiate,
      "Strong Negotiation",
      "Experienced negotiation focused on protecting your bottom line.",
    ],
    [
      ASSETS.fullServiceIcon,
      "Full Service",
      "Clear communication and hands-on guidance every step of the way.",
    ],
    [
      ASSETS.marketIcon,
      "Proven Results",
      "A proven strategy built to help homes sell faster and for more money.",
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
              Selling in Mobile?<br />
              <span className="text-red-600">Moving in Mobile?</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8">
              I’m Tina Rowe, a Mobile, Alabama Realtor specializing in helping homeowners sell for the best possible price and helping buyers confidently relocate to Mobile. Whether you’re selling, buying, or moving, I’ll help you create a strategy that fits your goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <CTA>Schedule your 15 minute strategy session</CTA>
              <CTA outline>
                Have Questions About Real Estate?
              </CTA>
            </div>

            <a
              href="tel:2518959322"
              className="mt-8 block text-3xl font-semibold"
            >
              ☎ {phone}
            </a>
          </div>

          <FormPanel
            title="Get Monthly Market Updates"
            button="Send Me Monthly Market Updates"
          />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-4xl font-semibold uppercase">
            What Actually Gets Homes <span className="text-red-600">Sold</span>
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {sellerIcons.map(([icon, title, text]) => (
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex flex-col items-center">
              <div className="h-px w-24 bg-red-600 opacity-60"></div>

              <h2 className="mt-5 font-display text-5xl font-bold uppercase tracking-[0.22em] text-red-600 sm:text-6xl">
                THE ROWE
              </h2>

              <h3 className="mt-1 font-display text-3xl font-semibold uppercase tracking-[0.45em] text-neutral-900 sm:text-4xl">
                SELLING SYSTEM
              </h3>

              <div className="mt-5 h-px w-24 bg-red-600 opacity-60"></div>
            </div>

            <h2 className="font-display text-3xl font-semibold leading-tight text-neutral-900 sm:text-3xl">
              Why Homeowners Choose Tina to Sell Their Home in Mobile, Alabama
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              When you list your home with Tina Rowe, you get more than an agent—you
              get{" "}
              <span className="font-semibold text-neutral-900">
                The Rowe Selling System
              </span>
              , a strategic, step-by-step approach designed to maximize your home’s
              exposure, attract qualified buyers, negotiate the strongest terms, and
              guide you confidently from listing to closing.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              "Professional Pricing Strategy",
              "Professional Photography",
              "Drone Photography (if applicable)",
              "Professional Property Description",
              "Maximum MLS Exposure",
              "Social Media Marketing",
              "Digital Advertising",
              "Reverse Prospecting",
              "Email Marketing to Agents",
              "Open House Strategy (if applicable)",
              "Showing Feedback",
              "Weekly Communication",
              "Expert Negotiation",
              "Contract-to-Closing Management",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex min-h-[68px] items-center gap-4
                  rounded-lg border border-neutral-200
                  bg-white px-5 py-3 shadow-sm
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:border-red-200
                  hover:shadow-md
                "
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                  ✓
                </div>

                <p className="text-[15px] font-semibold leading-6 text-neutral-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-4xl font-semibold uppercase">
            Why Sellers Choose <span className="text-red-600">Tina</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-700">
            Selling a home is more than putting a sign in the yard. It takes the
            right pricing strategy, marketing plan, communication, and
            negotiation to help you achieve the best possible outcome.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="font-display text-2xl font-semibold uppercase">
                Honest Advice
              </h3>
              <p className="mt-3 text-neutral-600">
                Clear guidance and realistic expectations so you can make
                confident decisions.
              </p>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="font-display text-2xl font-semibold uppercase">
                Consistent Communication
              </h3>
              <p className="mt-3 text-neutral-600">
                You'll always know what's happening and what comes next.
              </p>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="font-display text-2xl font-semibold uppercase">
                Proven Strategy
              </h3>
              <p className="mt-3 text-neutral-600">
                A systematic approach designed to attract buyers and create
                strong offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection title="What Sellers Say After Working With Me" type="seller"/>

      <section className="bg-red-600 py-6 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-6 text-center lg:grid-cols-[1fr_auto_auto_auto]">
          <h2 className="font-display text-3xl font-semibold uppercase">
            Thinking About Selling?<br />
            Let's Talk About Your Options.
          </h2>

          <CTA outline>
            Request Your Rowe Report Seller's Guide Now
          </CTA>

          <CTA outline>
            Get Your Free Rowe Report
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
              Find The Right Home in Mobile Alabama—<br />
              Without Overpaying<br />
              <span className="text-red-600">Or Missing Out</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8">
              Helping buyers navigate the Mobile, Alabama real estate market 
              with smart strategy, expert negotiation, and local knowledge.
            </p>

            <p className="mt-6 font-hand text-4xl">Hi I'm Tina Rowe</p>
            <p className="mt-3 max-w-sm text-lg">
              Your Mobile, Alabama Buyer and Relocation Specialist.
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
            The <span className="text-red-600">Rowe</span> Buying System
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-8 flex flex-col items-center">
              <div className="h-px w-24 bg-red-600 opacity-60"></div>

              <h2 className="mt-5 font-display text-5xl font-bold uppercase tracking-[0.22em] text-red-600 sm:text-6xl">
                WHY WORK
              </h2>

              <h3 className="mt-1 font-display text-3xl font-semibold uppercase tracking-[0.45em] text-neutral-900 sm:text-4xl">
                WITH TINA?
              </h3>

              <div className="mt-5 h-px w-24 bg-red-600 opacity-60"></div>
            </div>

            <p className="text-lg leading-8 text-neutral-600">
              Buying a home is one of the biggest financial decisions you'll ever make.
              Having the right agent means having someone who knows the market,
              protects your interests, negotiates aggressively, and guides you every
              step of the way.
            </p>

          </div>

          <div className="mt-14 rounded-2xl border border-red-100 bg-red-50 p-8 shadow-sm">

            <h3 className="text-center font-display text-3xl font-bold uppercase tracking-[0.28em] text-red-600">
              THE ROWE ADVANTAGE
            </h3>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {[
                "Local Market Knowledge",
                "Strategic Negotiation",
                "Fast Communication",
                "Trusted Vendor Network",
                "Guidance From Search to Closing",
                "Relocation Expertise",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex min-h-[68px] items-center gap-4
                    rounded-lg border border-neutral-200
                    bg-white px-5 py-3 shadow-sm
                    transition duration-200
                    hover:-translate-y-0.5
                    hover:border-red-200
                    hover:shadow-md
                  "
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    ✓
                  </div>

                  <p className="text-[15px] font-semibold leading-6 text-neutral-800">
                    {item}
                  </p>

                </div>
              ))}

            </div>

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
                Why Buyers Love Living in <span className="text-red-600">Mobile, AL</span>
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
            Moving to Mobile, Alabama? {" "}
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

      <TestimonialsSection title="What Buyers Say After Working With Me" type="buyer"/>

      <section className="bg-red-600 py-6 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-6 text-center lg:grid-cols-[1fr_auto_auto_auto]">
          <h2 className="font-display text-3xl font-semibold uppercase">
            Buying A Home Doesn’t Have To Be Stressful—<br />
            If You Have The Right Agent
          </h2>

          <CTA outline>
            Request Your Rowe Report Buyer's Guide Now
          </CTA>

          <CTA outline>
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
  const neighborhoods = [
    {
      name: "Daphne",
      image: ASSETS.daphne,
      homesUrl: "https://www.homes.com/daphne-al/",
      bestFor: "Bay access, Eastern Shore lifestyle, convenience",
      description:
        "Daphne offers a central Eastern Shore location with access to Mobile Bay, established neighborhoods, parks, restaurants, shopping, and convenient travel to Mobile and other Baldwin County communities.",
      homeStyle:
        "Traditional homes, bay-area properties, subdivisions, townhomes",
      lifestyle: "Coastal, convenient, active, established",
    },
    {
      name: "Dauphin Island",
      image: ASSETS.dauphinIsland,
      homesUrl: "https://www.homes.com/dauphin-island-al/",
      bestFor: "Quiet island living, beaches, fishing, boating, nature",
      description:
        "Dauphin Island is a laid-back barrier-island community with public beaches, fishing and boating access, historic Fort Gaines, the Alabama Aquarium, and extensive protected bird and wildlife habitat. It appeals to buyers seeking a slower coastal pace, second-home opportunities, or waterfront and water-access living.",
      homeStyle:
        "Elevated beach houses, waterfront homes, cottages, condos, vacation properties",
      lifestyle: "Relaxed, coastal, outdoorsy, nature-focused",
    },
    {
      name: "Downtown Mobile",
      image: ASSETS.downtownMobile,
      homesUrl:
        "https://www.homes.com/mobile-al/downtown-mobile-neighborhood/",
      bestFor: "Historic charm, restaurants, events, nightlife",
      description:
        "Downtown Mobile is the cultural and historic center of the city, with architecture, restaurants, entertainment, Mardi Gras traditions, and walkable access to Dauphin Street, Bienville Square, museums, and the waterfront.",
      homeStyle: "Historic condos, renovated homes, lofts, townhomes",
      lifestyle: "Walkable, energetic, cultural, historic",
    },
    {
      name: "Fairhope",
      image: ASSETS.fairhope,
      homesUrl: "https://www.homes.com/fairhope-al/",
      bestFor: "Downtown charm, bayfront parks, boutiques, coastal lifestyle",
      description:
        "Fairhope is known for its walkable downtown, flower-lined streets, bayfront parks, independent shops, restaurants, galleries, and the Fairhope Municipal Pier. The area offers a broad mix of historic homes, established neighborhoods, and newer development.",
      homeStyle:
        "Cottages, custom homes, historic homes, bay-area properties",
      lifestyle: "Charming, walkable, coastal, artsy",
    },
    {
      name: "Gulf Shores",
      image: ASSETS.gulfShores,
      homesUrl: "https://www.homes.com/gulf-shores-al/",
      bestFor: "Beach access, outdoor recreation, tourism, coastal investment",
      description:
        "Gulf Shores offers sugar-white Gulf beaches, restaurants, entertainment, and direct access to Gulf State Park, including trails, lakes, fishing, paddling, and other outdoor recreation. Housing ranges from established residential neighborhoods to condos, vacation homes, and investment properties near the beach.",
      homeStyle:
        "Beach condos, coastal cottages, newer subdivisions, vacation homes",
      lifestyle: "Beach-oriented, recreational, active, tourism-driven",
    },
    {
      name: "Midtown Mobile",
      image: ASSETS.midtownMobile,
      homesUrl:
        "https://www.homes.com/mobile-al/midtown-mobile-neighborhood/",
      bestFor: "Historic homes, oak-lined streets, classic Mobile character",
      description:
        "Midtown Mobile is known for mature trees, historic architecture, front porches, neighborhood parks, and convenient access to downtown, hospitals, restaurants, and local businesses.",
      homeStyle:
        "Craftsman homes, cottages, bungalows, historic renovations",
      lifestyle: "Charming, established, walkable, community-oriented",
    },
    {
      name: "Orange Beach",
      image: ASSETS.orangeBeach,
      homesUrl: "https://www.homes.com/orange-beach-al/",
      bestFor: "Boating, fishing, beaches, waterfront living, entertainment",
      description:
        "Orange Beach combines Gulf beaches with bays, canals, marinas, fishing, and boating access. The community also offers Waterfront Park, the Hugh S. Branyon Backcountry Trail system, restaurants, and The Wharf’s shopping, dining, events, and entertainment.",
      homeStyle:
        "Waterfront homes, beach condos, canal-front properties, coastal communities",
      lifestyle: "Boating-focused, coastal, active, entertainment-oriented",
    },
    {
      name: "Saraland",
      image: ASSETS.saraland,
      homesUrl: "https://www.homes.com/saraland-al/",
      bestFor: "Community feel, North Mobile convenience, suburban living",
      description:
        "Saraland is a growing community north of Mobile with convenient access to I-65, shopping, services, employment corridors, and established residential neighborhoods.",
      homeStyle:
        "Brick homes, subdivisions, newer construction, traditional single-family homes",
      lifestyle: "Community-focused, convenient, suburban, growing",
    },
    {
      name: "Semmes",
      image: ASSETS.semmes,
      homesUrl: "https://www.homes.com/semmes-al/",
      bestFor: "Space, quieter living, larger lots, rural-suburban feel",
      description:
        "Semmes offers a more relaxed setting with larger lots, established homes, newer construction, local parks, and convenient access to West Mobile and the broader Mobile metropolitan area.",
      homeStyle:
        "Larger lots, brick homes, rural properties, newer builds",
      lifestyle: "Quiet, spacious, relaxed, outdoorsy",
    },
    {
      name: "Spanish Fort",
      image: ASSETS.spanishFort,
      homesUrl: "https://www.homes.com/spanish-fort-al/",
      bestFor: "Eastern Shore access, shopping, recreation, Mobile commute",
      description:
        "Spanish Fort combines Eastern Shore living with convenient access to Mobile, major highways, shopping, restaurants, outdoor recreation, and a variety of established and newer residential communities.",
      homeStyle:
        "Subdivisions, newer homes, traditional brick homes, larger residential communities",
      lifestyle: "Convenient, active, suburban, commuter-friendly",
    },
    {
      name: "Spring Hill",
      image: ASSETS.springHill,
      homesUrl:
        "https://www.homes.com/local-guide/mobile-al/parkhill-neighborhood/",
      bestFor: "Established neighborhoods, shopping, schools, convenience",
      description:
        "Spring Hill offers an established residential setting with mature landscaping, shopping, restaurants, medical access, and landmarks such as Spring Hill College. The area includes both older homes and carefully updated properties.",
      homeStyle:
        "Traditional homes, estate-style properties, updated ranch homes",
      lifestyle: "Established, convenient, polished, residential",
    },
    {
      name: "West Mobile",
      image: ASSETS.westMobile,
      homesUrl: "https://www.homes.com/mobile-al/",
      bestFor: "More space, newer homes, suburban convenience",
      description:
        "West Mobile appeals to buyers seeking suburban neighborhoods, larger lots, newer construction, shopping, parks, and convenient access to major roads while remaining within the Mobile area.",
      homeStyle:
        "Newer subdivisions, brick homes, larger lots, single-family homes",
      lifestyle: "Suburban, practical, growing, spacious",
    },
  ];

  return (
    <>
      <Hero
        title="Find Your Perfect Community"
        redTitle="Across Mobile & Baldwin County"
        text="Every community has its own personality, housing options, and lifestyle. Explore several of the areas Tina serves, then connect with her when you're ready to narrow down the best fit for your move."
        button="Search Neighborhoods"
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-widest text-red-600">
              Local Area Guide
            </p>

            <h2 className="mt-3 font-display text-4xl font-semibold uppercase">
              Popular Neighborhoods & Communities
            </h2>

            <p className="mt-4 text-neutral-600">
              Explore communities throughout Mobile County and Baldwin County.
              Select an area to view its current Homes.com listings, or ask Tina
              to create a more focused home search for you.
            </p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {neighborhoods.map((area) => (
              <div
                key={area.name}
                className="flex overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex w-full flex-col">
                  <img
                    src={area.image}
                    alt={`${area.name} area`}
                    className="h-56 w-full object-cover"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                      Best For: {area.bestFor}
                    </div>

                    <h3 className="font-display text-3xl font-semibold uppercase">
                      {area.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-neutral-700">
                      {area.description}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm">
                      <div>
                        <p className="font-bold uppercase text-neutral-900">
                          Common Home Styles
                        </p>
                        <p className="mt-1 text-neutral-600">
                          {area.homeStyle}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold uppercase text-neutral-900">
                          Lifestyle Feel
                        </p>
                        <p className="mt-1 text-neutral-600">
                          {area.lifestyle}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openHomesSearch(area)}
                      className="mt-auto pt-6"
                    >
                      <span className="block w-full rounded bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700">
                        View Homes in {area.name}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-neutral-500">
            Area information is provided as a general overview. Buyers should
            independently verify schools, zoning, flood zones, insurance
            requirements, HOA restrictions, rental rules, commute times, and
            property-specific information before making a purchase decision.
          </p>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}
function RoweReportPage({ setPage }) {
  const videos = [
    {
      title: "The Rowe Report",
      id: "DWIVXuEWUf0",
    },
    {
      title: "The Rowe Report",
      id: "w-kBKuvxwZs",
    },
    {
      title: "The Rowe Report",
      id: "4EBHmQ5RsY8",
    },
    {
      title: "The Rowe Report",
      id: "cUr9FBQ1Dog",
    },
    {
      title: "The Rowe Report",
      id: "0HcOGSsuv-E",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={ASSETS.skyline}
          alt="Mobile Alabama"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <img
            src={ASSETS.logo}
            alt="The Rowe Report"
            className="mx-auto h-148 w-auto object-contain"
          />

          <h1 className="mt-6 font-display text-5xl font-semibold uppercase">
            The <span className="text-red-600">Rowe Report</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Real estate advice, market updates, homeowner tips, and local insight
            from Tina Rowe and Keller Williams Mobile.
          </p>

          <a
            href="https://www.youtube.com/@TheRoweReportMobile"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded bg-red-600 px-8 py-3 font-bold uppercase tracking-wide transition hover:bg-red-700"
          >
            Visit YouTube Channel
          </a>
        </div>
      </section>


      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="text-center font-display text-4xl font-semibold uppercase">
            Latest Episodes
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-xl border bg-white shadow-lg"
              >
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold uppercase">
                    The Rowe Report
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Tips, strategies, and conversations to help Mobile area
                    buyers and sellers make confident decisions.
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section className="bg-black py-12 text-center text-white">
        <h2 className="font-display text-4xl font-semibold uppercase">
          Stay Updated With Tina
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Subscribe to The Rowe Report for new episodes, market updates,
          and local real estate advice.
        </p>

        <a
          href="https://www.youtube.com/@TheRoweReportMobile"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded bg-red-600 px-8 py-3 font-bold uppercase"
        >
          Subscribe On YouTube
        </a>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}
function ResourcesPage({ setPage }) {
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
    ["Pest Control", [["Arrow Exterminators", "(251) 243-0072"], ["Boss Pest Solutions - Ashley McNorton", "(251) 648-8125"], ["Cook's Pest Control - Daniel Sewatt", "(251) 422-0317"], ["J&M Exterminators - Marlin", "(251) 591-7226"], ["Knox Pest", "(251) 478-9829"], ["Wayne's Pest Control", "(251) 639-3481"]]],
    ["Plumbers", [["Rod Deberry", "(251) 721-0688"], ["Jeff Byrd", "(251) 232-2813"], ["Nathan Herring", "(251) 675-6757"]]],
    ["Renovations", [["Corey Williams", "(251) 525-7039"], ["Rainwaters Contracting LLC - Braxton Rainwaaters", "(251) 725-7226"]]],
    ["Roofers", [["Frank Reusser", "(251) 610-0812"], ["Jason Impson", "(251) 401-1158"]]],
    ["Surveyors", [["Joe Stewart", "(251) 554-8449"], ["Erdman Surveying - Craig Erdman", "(251) 422-6510"]]],
  ];

  const phoneLink = (phoneNumber) => `tel:${phoneNumber.replace(/\D/g, "")}`;

  return (
    <>
      <Hero
        title="Resources You Can Use"
        redTitle="Before, During, And After Your Move."
        text="From trusted local vendors to helpful guidance, this page is designed to give Mobile and Baldwin County buyers and sellers a practical place to start."
        button="Ask Tina For A Recommendation"
      />

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-widest text-red-600">
              Local Resources
            </p>

            <h2 className="font-display text-4xl font-semibold uppercase">
              Tina's <span className="text-red-600">Vendor List</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              Browse local vendors by category. Tap a phone number to call directly.
            </p>
          </div>

          <div className="space-y-4">
            {vendorGroups.map(([category, vendors]) => (
              <details
                key={category}
                className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between bg-black px-6 py-4 font-display text-xl font-semibold uppercase tracking-wide text-white transition hover:bg-red-600">
                  {category}
                  <span className="ml-4 text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="divide-y divide-neutral-100 px-6">
                  {vendors.map(([name, vendorPhone]) => (
                    <div
                      key={`${category}-${name}`}
                      className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <span className="font-semibold text-neutral-900">
                        {name}
                      </span>

                      <a
                        href={phoneLink(vendorPhone)}
                        className="font-semibold text-red-600 hover:text-black hover:underline"
                      >
                        {vendorPhone}
                      </a>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-neutral-500">
            Vendor list is provided as a helpful resource only. Clients should independently
            verify licensing, insurance, availability, pricing, and suitability before hiring
            any vendor.
          </p>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}
function ContactPage({ setPage }) {
  return (
    <>
      <Hero
        title="Let's Talk About Your Next Move —"
        redTitle="And Get It Right."
        text="Whether you're considering selling, you're home didn't sell the first time, you're considering  buying, or just have questions — I'll give you clear, honest answers so you can move forward with confidence."
        button="Get My Plan"
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_.9fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold uppercase">
              Tell Me What You Need—{" "}
              <span className="text-red-600">I'll Take It From There.</span>
            </h2>

            <div className="mt-6">
              <FormPanel
                title="Tell Me What You Need"
                button="Get My Plan"
                dark={false}
              />
            </div>
          </div>

          <div className="rounded-lg bg-neutral-50 p-8 shadow-xl">
            <h2 className="font-display text-3xl font-semibold uppercase">
              Prefer To Reach Me <span className="text-red-600">Directly?</span>
            </h2>

            <p className="mt-6 text-lg leading-9">
              ☎{" "}
              <a href="tel:2518959322">
                <b>{phone}</b>
              </a>
              <br />
              ✉{" "}
              <a
                href="mailto:tinarowe@kw.com"
                className="font-bold text-red-600 hover:text-red-700"
              >
                tinarowe@kw.com
              </a>
              <br />
              📍{" "}
              <a
                href="https://maps.apple.com/?address=1210%20Hillcrest%20Road,%20Mobile,%20AL%2036695"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-red-600 hover:text-red-700"
              >
                1210 Hillcrest Road
                <br />
                Mobile, AL 36695
              </a>
            </p>

            <div className="mt-8 rounded-lg bg-black p-6 text-white">
              <h3 className="font-display text-2xl font-semibold uppercase">
                Not Sure Where To Start?
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/75">
                Send Tina a quick message with what you're trying to do — selling,
                buying, relocating, or just exploring your options — and she’ll help
                you figure out the next best step.
              </p>

              <CTA className="mt-5 w-full">
                Schedule A Call With Tina
              </CTA>
            </div>
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
  const [leadRequestType, setLeadRequestType] = useState("General Inquiry");
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [popupSubmitError, setPopupSubmitError] = useState("");
  const [homesPopup, setHomesPopup] = useState(null);
  const popupDismissedRef = useRef(false);

  useEffect(() => {
  const analyticsPage =
    ANALYTICS_PAGES[page] || ANALYTICS_PAGES.home;

  document.title = analyticsPage.title;

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_title: analyticsPage.title,
    page_location: `${window.location.origin}${analyticsPage.path}`,
    page_path: analyticsPage.path,
  });
}, [page]);

  const openLeadPopup = (requestType = "General Inquiry") => {
    setLeadRequestType(getRequestLabel(requestType));
    setPopupSubmitted(false);
    setPopupSubmitError("");
    setShowPopup(true);
  };

  const closeLeadPopup = () => {
    popupDismissedRef.current = true;
    setShowPopup(false);
  };

  const handlePopupSubmit = async (event) => {
    event.preventDefault();
    setPopupSubmitting(true);
    setPopupSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(LEAD_CAPTURE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setPopupSubmitted(true);
      form.reset();
    } catch (error) {
      setPopupSubmitError("Something went wrong. Please try again or call Tina directly.");
    } finally {
      setPopupSubmitting(false);
    }
  };

  useEffect(() => {
    setShowPopup(false);
    setPopupSubmitted(false);
    setPopupSubmitError("");

    const handleOpenLeadPopup = (event) => openLeadPopup(event.detail || "General Inquiry");
    window.addEventListener("openLeadPopup", handleOpenLeadPopup);

    const handleNavigatePage = (event) => {
      if (event.detail) {
        setPage(event.detail);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("navigatePage", handleNavigatePage);

    const handleOpenHomesPopup = (event) => {
      if (event.detail) {
        setHomesPopup(event.detail);
      }
    };
    window.addEventListener("openHomesPopup", handleOpenHomesPopup);

    const delay = 6500;
    const timer = window.setTimeout(() => {
      if (!popupDismissedRef.current) {
        openLeadPopup("Initial Website Visit");
      }
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("openLeadPopup", handleOpenLeadPopup);
      window.removeEventListener("navigatePage", handleNavigatePage);
      window.removeEventListener("openHomesPopup", handleOpenHomesPopup);
    };
  }, [page]);

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage setPage={setPage} />,
    sellers: <SellersPage setPage={setPage} />,
    buyers: <BuyersPage setPage={setPage} />,
    neighborhoods: <NeighborhoodsPage setPage={setPage} />,
    resources: <ResourcesPage setPage={setPage} />,
    rowereport: <RoweReportPage setPage={setPage} />,
    contact: <ContactPage setPage={setPage} />,
  };

  return (
  <div className="min-h-screen bg-white font-sans text-neutral-950">
    <StructuredData />
    <StagingIndicators />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Caveat:wght@600;700&display=swap');
        .font-display { font-family: Oswald, Arial Narrow, sans-serif; font-weight: 500; letter-spacing: .02em; }
        .font-script { font-family: Georgia, serif; }
        .font-hand { font-family: Caveat, "Comic Sans MS", cursive; }
      `}</style>

      {homesPopup ? (
        <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-5 text-center shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setHomesPopup(null)}
              className="absolute right-4 top-3 text-3xl leading-none text-neutral-500 transition hover:text-black"
              aria-label="Close homes search popup"
            >
              ×
            </button>

            <p className="font-semibold uppercase tracking-widest text-red-600">
              Homes.com Search
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">
              View Homes in <span className="text-red-600">{homesPopup.name}</span>
            </h2>

            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-inner">
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-6 sm:min-h-[380px]">
                <div className="text-6xl">⌂</div>
                <p className="max-w-2xl text-neutral-700">
                  Homes.com search results will open in a new tab so visitors can explore the active map and listings for this area. Once Tina’s IDX feed is available, this same button can be replaced with an embedded MLS search.
                </p>

                <a
                  href={homesPopup.homesUrl || homesPopup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    if (!homesPopup.homesUrl && !homesPopup.url) {
                      event.preventDefault();
                      console.error(
                        "No homes search URL was provided for:",
                        homesPopup
                      );
                    }
                  }}
                  className="inline-block rounded bg-red-600 px-8 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
                >
                  Open Homes.com Map
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setHomesPopup(null);
                  openLeadRequest(`Have Tina send me homes in ${homesPopup.name}`);
                }}
                className="rounded border border-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Have Tina Send Me Homes Here
              </button>

              <button
                type="button"
                onClick={() => setHomesPopup(null)}
                className="rounded border border-neutral-300 px-6 py-3 text-sm font-bold uppercase tracking-wide text-neutral-700 transition hover:bg-neutral-100"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPopup ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-4 backdrop-blur-[1px]">
          <div className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-4 text-center shadow-2xl sm:p-8">
            <button type="button" onClick={closeLeadPopup} className="absolute right-4 top-3 text-2xl">×</button>

            {popupSubmitted ? (
              <div className="py-10">
                <h2 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
                  Thank <span className="text-red-600">You!</span>
                </h2>
                <p className="mx-auto mt-4 max-w-md text-neutral-600">
                  Your information was sent successfully. Tina will be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={closeLeadPopup}
                  className="mt-8 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-red-950/25 transition hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl uppercase leading-tight sm:text-4xl">
                  Let Tina Help With <span className="text-red-600">Your Next Move</span>
                </h2>
                <p className="mt-2 text-sm text-neutral-600 sm:mt-3 sm:text-base">
                  Tell Tina what you need — home value, Rowe Report, listings, selling strategy, or general questions.
                </p>

                <form
                  onSubmit={handlePopupSubmit}
                  className="mt-4 grid gap-2 text-left sm:mt-5 sm:gap-3"
                >
                  <input type="hidden" name="requestType" value={leadRequestType} />
                  <input type="hidden" name="source" value="Moving in Mobile lead popup" />

                  <input name="name" className="rounded border p-3" placeholder="Name" required />
                  <input name="phone" type="tel" className="rounded border p-3" placeholder="Phone Number" />
                  <input name="email" type="email" className="rounded border p-3" placeholder="Email Address" required />
                  <input name="address" className="rounded border p-3" placeholder="Property Address" />
                  <textarea name="need" className="min-h-20 rounded border p-3 sm:min-h-28" placeholder="Additional details / How can Tina help?" />

                  {popupSubmitError ? (
                    <p className="rounded bg-red-50 px-3 py-2 text-center text-sm text-red-700">
                      {popupSubmitError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={popupSubmitting}
                    className="w-full rounded-md bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-red-950/25 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {popupSubmitting ? "Submitting..." : "Submit My Information"}
                  </button>
                </form>

                <button type="button" onClick={closeLeadPopup} className="mt-4 text-sm underline">
                  No thanks, continue browsing
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}

      <SocialSidebar />
      <FloatingTinaContact />
      <TopBar onOpen={() => openLeadPopup("What Is My Home Worth?")} />
      <Header page={page} setPage={setPage} />
      {pages[page] || pages.home}
    </div>
  );
}
