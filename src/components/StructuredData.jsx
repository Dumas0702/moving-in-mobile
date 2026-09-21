import { FAQ_CATEGORIES } from "../data/faqData";

const SITE_URL = "https://movinginmobile.com";

export default function StructuredData() {
  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/$/, "") || "/"
      : "/";

  const isFaqPage = currentPath === "/faq";

  const pageSchema = {
  "/": {
    name: "Mobile Alabama REALTOR® | Tina Rowe | Moving in Mobile",
    description:
      "Work with Tina Rowe, a Mobile Alabama REALTOR®, for home buying, selling, relocation, neighborhood guidance, and local real estate expertise.",
  },
  "/about": {
    name: "Tina Rowe, Mobile Alabama REALTOR® | About",
    description:
      "Meet Tina Rowe, a Mobile Alabama REALTOR® helping buyers, sellers, and relocating clients navigate Mobile and Baldwin County real estate.",
  },
  "/sellers": {
    name: "Sell Your Home in Mobile AL | Tina Rowe REALTOR®",
    description:
      "Sell your Mobile, Alabama home with strategic pricing, marketing, negotiation, and hands-on guidance from REALTOR® Tina Rowe.",
  },
  "/buyers": {
    name: "Homes for Sale in Mobile AL | Tina Rowe REALTOR®",
    description:
      "Search homes for sale in Mobile and Baldwin County and get expert buying and relocation guidance from Mobile Alabama REALTOR® Tina Rowe.",
  },
  "/neighborhoods": {
    name: "Mobile & Baldwin County Communities | Tina Rowe REALTOR®",
    description:
      "Explore Mobile and Baldwin County neighborhoods, communities, lifestyles, and current MLS listings with local REALTOR® Tina Rowe.",
  },
  "/rowe-report": {
    name: "The Rowe Report | Mobile Alabama Real Estate",
    description:
      "Watch The Rowe Report for Mobile Alabama real estate guidance, market information, neighborhoods, relocation insights, and local expertise.",
  },
  "/resources": {
    name: "Mobile Alabama Real Estate Resources | Tina Rowe REALTOR®",
    description:
      "Helpful Mobile Alabama real estate resources for buyers, sellers, homeowners, and people relocating to the Mobile and Baldwin County area.",
  },
  "/faq": {
    name: "Moving to Mobile Alabama FAQs | Tina Rowe REALTOR®",
    description:
      "Answers to 50 common questions about moving to Mobile Alabama, neighborhoods, buying and selling homes, flooding, insurance, schools, and everyday life.",
  },
  "/contact": {
    name: "Contact Tina Rowe | Mobile Alabama REALTOR®",
    description:
      "Contact Tina Rowe for help buying, selling, or relocating in Mobile, Alabama, Mobile County, Baldwin County, and surrounding communities.",
  },
  "/open-houses": {
    name: "Open Houses with Tina Rowe | Mobile Alabama REALTOR®",
    description:
      "See the Mobile and Baldwin County open houses Tina Rowe is personally hosting and get local guidance before your visit.",
  },
};

const currentPage =
  pageSchema[currentPath] || pageSchema["/"];

const currentPageUrl =
  currentPath === "/"
    ? `${SITE_URL}/`
    : `${SITE_URL}${currentPath}`;

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    url: `${SITE_URL}/faq`,
    name: "Moving to Mobile Alabama FAQs | Tina Rowe",
    description:
      "Answers to 50 frequently asked questions about moving to Mobile, Alabama, neighborhoods, buying and selling homes, flooding, insurance, schools, jobs, and everyday life.",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#real-estate-business`,
    },
    mainEntity: FAQ_CATEGORIES.flatMap((category) =>
      category.questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
    inLanguage: "en-US",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#brokerage`,
        name: "Keller Williams Mobile",
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#brokerage-logo`,
          url: `${SITE_URL}/KW-MOBILE.png`,
          contentUrl: `${SITE_URL}/KW-MOBILE.png`,
          caption: "Keller Williams Mobile",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "1210 Hillcrest Road",
          addressLocality: "Mobile",
          addressRegion: "AL",
          postalCode: "36695",
          addressCountry: "US",
        },
      },

      {
        "@type": "Person",
        "@id": `${SITE_URL}/#tina-rowe`,
        name: "Tina Rowe",
        givenName: "Tina",
        familyName: "Rowe",
        jobTitle: "REALTOR®",
        description:
          "Mobile, Alabama REALTOR® specializing in home selling, home buying, relocation, strategic marketing, negotiation, and local real estate guidance.",
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#tina-rowe-image`,
          url: `${SITE_URL}/TinaRoweSignatureLowRez.png`,
          contentUrl: `${SITE_URL}/TinaRoweSignatureLowRez.png`,
          caption: "Tina Rowe, Mobile Alabama REALTOR®",
        },
        telephone: "+1-251-895-9322",
        email: "tinarowe@kw.com",
        identifier: {
          "@type": "PropertyValue",
          name: "Alabama Real Estate License",
          propertyID: "Alabama Real Estate License",
          value: "169048",
        },
        worksFor: {
          "@id": `${SITE_URL}/#brokerage`,
        },
        knowsAbout: [
          "Mobile Alabama real estate",
          "Home selling",
          "Home buying",
          "Real estate negotiation",
          "Residential real estate marketing",
          "Relocation to Mobile Alabama",
          "Mobile County real estate",
          "Baldwin County real estate",
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61584234016458",
          "https://www.instagram.com/movinginmobile",
          "https://www.youtube.com/@movinginmobile",
          "https://www.linkedin.com/in/tina-rowe-76368b353/",
        ],
      },

      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#real-estate-business`,
        name: "Moving in Mobile with Tina Rowe",
        alternateName: [
          "Moving in Mobile",
          "The Rowe Report",
          "Tina Rowe Real Estate",
        ],
        description:
          "Moving in Mobile provides residential real estate guidance for home sellers, buyers, and people relocating to Mobile, Alabama, Mobile County, and Baldwin County.",
        url: SITE_URL,
        telephone: "+1-251-895-9322",
        email: "tinarowe@kw.com",
        image: {
          "@id": `${SITE_URL}/#tina-rowe-image`,
        },
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#moving-in-mobile-logo`,
          url: `${SITE_URL}/TheRoweReportTransparentLogo.png`,
          contentUrl: `${SITE_URL}/TheRoweReportTransparentLogo.png`,
          caption: "The Rowe Report",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "1210 Hillcrest Road",
          addressLocality: "Mobile",
          addressRegion: "AL",
          postalCode: "36695",
          addressCountry: "US",
        },
        employee: {
          "@id": `${SITE_URL}/#tina-rowe`,
        },
        parentOrganization: {
          "@id": `${SITE_URL}/#brokerage`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Real estate inquiries",
          telephone: "+1-251-895-9322",
          email: "tinarowe@kw.com",
          areaServed: "US-AL",
          availableLanguage: "English",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Mobile",
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: "Mobile County, Alabama",
            },
          },
          {
            "@type": "AdministrativeArea",
            name: "Mobile County, Alabama",
          },
          {
            "@type": "AdministrativeArea",
            name: "Baldwin County, Alabama",
          },
          {
            "@type": "City",
            name: "Daphne",
          },
          {
            "@type": "City",
            name: "Fairhope",
          },
          {
            "@type": "City",
            name: "Spanish Fort",
          },
          {
            "@type": "City",
            name: "Saraland",
          },
          {
            "@type": "City",
            name: "Semmes",
          },
          {
            "@type": "City",
            name: "Gulf Shores",
          },
          {
            "@type": "City",
            name: "Orange Beach",
          },
          {
            "@type": "City",
            name: "Dauphin Island",
          },
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61584234016458",
          "https://www.instagram.com/movinginmobile",
          "https://www.youtube.com/@movinginmobile",
          "https://www.linkedin.com/in/tina-rowe-76368b353/",
        ],
      },
      {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "Moving in Mobile",
          alternateName: "Moving in Mobile with Tina Rowe",
          description:
            "Mobile, Alabama real estate information for sellers, buyers, and people relocating to the Mobile and Baldwin County areas.",
          inLanguage: "en-US",
          publisher: {
            "@id": `${SITE_URL}/#real-estate-business`,
          },
      },
      {
        "@type": "WebPage",
        "@id": `${currentPageUrl}#webpage`,
        url: currentPageUrl,
        name: currentPage.name,
        description: currentPage.description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: [
          {
            "@id": `${SITE_URL}/#tina-rowe`,
          },
          {
            "@id": `${SITE_URL}/#real-estate-business`,
          },
        ],
        primaryImageOfPage: {
          "@id": `${SITE_URL}/#tina-rowe-image`,
        },
        inLanguage: "en-US",
      },
      ...(isFaqPage ? [faqSchema] : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}