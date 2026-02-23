import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتراکس | Eterex",
  description: "برای شروع ثبت نام کنید | کمترین تفاوت قیمت خرید و فروش | پایین ترین نرخ کارمزد | با ۷ سال سابقه فعالیت درخشان",
  openGraph: {
    title:  "اتراکس | Eterex",
    description:  "برای شروع ثبت نام کنید | کمترین تفاوت قیمت خرید و فروش | پایین ترین نرخ کارمزد | با ۷ سال سابقه فعالیت درخشان",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Campaign layout: no site Header/Footer (handled by root ConditionalShell). Minimal wrapper for campaign pages. */
export default function CampaignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white" dir="rtl">
      {children}
    </div>
  );
}
