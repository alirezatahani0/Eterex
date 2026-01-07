import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
import ScrollToTop from "@/components/UI/ScrollToTop";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "اترکس | پلتفرم معاملات ارز دیجیتال",
    template: "%s | اترکس",
  },
  description: "پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین",
  keywords: ["ارز دیجیتال", "بیت کوین", "کریپتو", "معاملات", "اتریوم"],
  authors: [{ name: "Eterex" }],
  creator: "Eterex",
  publisher: "Eterex",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eterex.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "اترکس",
    title: "اترکس | پلتفرم معاملات ارز دیجیتال",
    description: "پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین",
  },
  twitter: {
    card: "summary_large_image",
    title: "اترکس | پلتفرم معاملات ارز دیجیتال",
    description: "پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://eterex.com"} />
      </head>
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-white`}
        dir="rtl"
      >
        <QueryProvider>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
