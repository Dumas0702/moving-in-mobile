import { useEffect } from "react";

const STAGING_HOSTNAME = "staging.movinginmobile.com";
const STAGING_VERSION = "v1.0.0";
const STAGING_BRANCH = "redesign-v2";

export default function StagingIndicators() {
  const isStaging = window.location.hostname === STAGING_HOSTNAME;

  useEffect(() => {
    const normalTitle = "Moving in Mobile | Tina Rowe";

    document.title = isStaging
      ? `STAGING | ${normalTitle}`
      : normalTitle;

    return () => {
      document.title = normalTitle;
    };
  }, [isStaging]);

  if (!isStaging) {
    return null;
  }

  return (
    <>
      <div
        className="
          fixed inset-x-0 top-0 z-[9999]
          flex h-10 items-center justify-center
          bg-amber-600 px-4 text-center
          text-xs font-semibold uppercase tracking-[0.14em]
          text-white shadow-md
          sm:text-sm
        "
        role="status"
      >
        <span aria-hidden="true" className="mr-2">
          ⚠
        </span>

        Staging Website
        <span className="mx-2 hidden sm:inline">•</span>

        <span className="hidden normal-case tracking-normal sm:inline">
          Changes are under review and are not yet live.
        </span>
      </div>

      {/* Prevents the fixed banner from covering the website header. */}
      <div className="h-10" aria-hidden="true" />

      <div
        className="
          fixed bottom-3 right-3 z-[9998]
          rounded-md border border-white/20
          bg-slate-950/90 px-3 py-2
          text-[10px] font-medium tracking-wide
          text-white shadow-lg backdrop-blur
          sm:text-xs
        "
      >
        <div className="font-semibold uppercase tracking-[0.12em] text-amber-400">
          Staging
        </div>

        <div className="mt-0.5 text-white/80">
          {STAGING_VERSION} • {STAGING_BRANCH}
        </div>
      </div>
    </>
  );
}