const SITE_URL = "https://movinginmobile.com";

export default function StructuredData() {
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
          "https://www.facebook.com/tina.rowe.484411",
          "https://www.instagram.com/therowereport",
          "https://www.youtube.com/@TheRoweReportMobile",
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
          "https://www.facebook.com/tina.rowe.484411",
          "https://www.instagram.com/therowereport",
          "https://www.youtube.com/@TheRoweReportMobile",
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
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Moving in Mobile | Tina Rowe",
        description:
          "Work with Tina Rowe for strategic home selling, home buying, relocation assistance, neighborhood information, and Mobile, Alabama real estate guidance.",
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