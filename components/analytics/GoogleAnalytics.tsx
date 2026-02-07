"use client";

import {
  GoogleTagManager,
  GoogleAnalytics,
  sendGTMEvent,
  sendGAEvent,
} from "@next/third-parties/google";

export { sendGTMEvent, sendGAEvent };

export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {gtmId && (
        <>
          <GoogleTagManager gtmId={gtmId} />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height={0}
              width={0}
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      )}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
