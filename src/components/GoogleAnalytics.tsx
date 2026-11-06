import Script from "next/script";
import GAPageViewTracker from "@/components/GAPageViewTracker";
import GAEngagementTracker from "@/components/GAEngagementTracker";
import WebVitalsTracker from "@/components/WebVitalsTracker";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Consent Mode v2: defaults must be set before gtag.js loads.
          Reads any prior visitor choice from localStorage so returning
          visitors who already opted in don't start denied every load. */}
      {/* This component is only ever rendered from the root layout, which is
          exactly where Next.js docs say beforeInteractive scripts belong in
          the App Router - the lint rule below predates App Router support. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var storedConsent = null;
          try { storedConsent = window.localStorage.getItem('measured-notes:analytics-consent'); } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: storedConsent === 'granted' ? 'granted' : 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <GAPageViewTracker measurementId={GA_MEASUREMENT_ID} />
      <GAEngagementTracker />
      <WebVitalsTracker />
    </>
  );
}
