import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";
import Header from "@/shared/components/header";
import Head from 'next/head';
import {Toaster} from "@/shared/components/libs/basic/sonner/root.sonner";
import Cookie from "@/shared/components/libs/basic/cookie.component"
import Footer from "@/shared/components/footer";
import {Montserrat} from "next/font/google";
import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {StarBackground} from "@/shared/components/custom/bg.custom";

export const revalidate = 86400

export const metadata: Metadata = {
  metadataBase: new URL("https://tarnov-tv.vercel.app"),

  title: {
    default: "Tarnov TV — Tarnowska telewizja młodzieżowa",
    template: "%s | Tarnov TV",
  },
  verification:{
    google:"",
  },

  description:
      "Portfolio of an Upper-Middle TypeScript & Rust Developer with strong Swift skills. Building scalable web and mobile applications with modern technologies.",

  keywords: [
    "TypeScript Developer",
    "Rust Developer",
    "Next.js Portfolio",
    "Fullstack Developer",
    "Swift Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
  ],

  authors: [{ name: "Slysl" }],
  creator: "Slysl",

  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://tarnov-tv.vercel.app/",
    title: "Tarnov TV — Tarnowska telewizja młodzieżowa",
    description:
        "Explore projects, experience, and skills in modern web and mobile development.",
    siteName: "Tarnov TV",
    images: [
      {
        url: "/assets/render-full.webp", // положи в /public
        width: 1200,
        height: 630,
        alt: "Tarnov TV Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TarnovTV — Tarnowska telewizja młodzieżowa",
    description:
        "Portfolio showcasing modern web, mobile, and scalable applications.",
    images: ["/assets/render-full.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100","200", "300","400", "500", "600", "700","800"],
  subsets: ["latin"],
  display: "swap",
},);

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
      <html lang="pl">
      <Head>
        <meta name="google-site-verification" content="" />
      </Head>
      <body
          className={`antialiased max-w-screen ${montserrat.variable}`}
      >
      <Header />
      <main className="pt-20">
          {children}
      </main>
      <Cookie/>
      <StarBackground/>
      <Toaster/>
      <Footer/>
      <Analytics mode={"production"}/>
      <SpeedInsights/>
      </body>
      </html>
  );
}
