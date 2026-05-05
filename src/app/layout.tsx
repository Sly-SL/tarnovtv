import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";
import LegacyHeader from "@/shared/components/legacy-header";
import Head from 'next/head';
import {Toaster} from "@/shared/components/libs/basic/sonner/root.sonner";
import Cookie from "@/shared/components/libs/basic/cookie.component"
import Footer from "@/shared/components/footer";
import {Montserrat} from "next/font/google";
import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import StarBackground from "@/shared/components/custom/bg.custom";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {AllThemesEnum} from "@/shared/consts/enums/all-themes.enum";
import {AllModesEnum} from "@/shared/consts/enums/all-modes.enum";
import NewMode from "@/shared/components/new-mode";
import Setup from "@/shared/components/setup";
import {cookies} from "next/headers";
import {AllCleanModesEnum} from "@/shared/consts/enums/all-clean-modes.enum";

export const revalidate = 86400

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.FRONTEND_URL),

  title: {
    default: "Tarnov TV — Tarnowska Telewizja Młodzieżowa",
    template: "%s | Tarnov TV",
  },
  verification:{
    google:"HDV4XPwnAUVrHCVJpbDRqxEVmYz217w-U77aikkUxRI",
  },

    icons: {
        icon: [
            { url: '/favicon/favicon.ico' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
        ],
    },
    manifest: '/favicon/site.webmanifest',

  description:
      "Wszystko zaczęło się w lipcu 2024 roku, podczas warsztatów psychologicznych w fundacji Bema 20 w Tarnowie. To właśnie tam narodził się pomysł stworzenia czegoś więcej niż tylko szkolnych wywiadów i krótkich nagrań. Chcieliśmy wyjść poza schemat i zacząć tworzyć materiał, który będzie angażował mieszkańców całego miasta – od luźnych ulicznych rozmów, po pytania, które budują lokalną tożsamość i pokazują codzienność Tarnowa z nieoczywistej strony.\n" +
      "Od samego początku naszym celem nie było jedynie nagrywanie filmów. Chcieliśmy zbudować społeczność – aktywną, zaangażowaną i gotową do wspólnego działania. Wtorki i soboty miały stać się dniami premier, ale równie ważne było dla nas tworzenie przestrzeni, w której ludzie mogą się spotykać, wymieniać doświadczeniami i razem uczestniczyć w wydarzeniach organizowanych w Tarnowie.\n" +
      "Z czasem nasze działania zaczęły wychodzić daleko poza internet. Organizowaliśmy wydarzenia takie jak charytatywne turnieje e-sportowe (zebraliśmy m.in. 2000 zł na pomoc dla zwierząt oraz 600 zł na wsparcie dzieci), wieczory planszówkowe, targi ubraniowe, debaty oksfordzkie oraz wykłady maturalne. Każde z tych wydarzeń miało jeden wspólny cel – łączenie ludzi i tworzenie realnej wartości dla lokalnej społeczności. Równolegle rozwijaliśmy projekt w ramach olimpiady „Zwolnieni z Teorii”, co dodatkowo motywowało nas do działania i konsekwentnego rozwoju.\n" +
      "Początki były skromne – kilku znajomych, prosta kamera i dużo entuzjazmu. Z czasem jednak struktura projektu zaczęła się zmieniać. Tworzyliśmy zespół, w którym każdy miał swoją rolę – od prowadzenia materiałów, przez organizację, aż po montaż. \n" +
      "Dziś Tarnów TV to projekt, który z małej inicjatywy młodzieżowej przekształcił się w rozpoznawalne medium lokalne. Nasze treści docierają do tysięcy odbiorców – blisko 10 tysięcy obserwujących na TikToku, ponad 6,5 tysiąca na Instagramie oraz 2 tysiące na Facebooku. Współpracowaliśmy już m.in. z lokalnymi markami i organizacjami, takimi jak Kebab INN Tarnów, Slysl Coder, Yayoi Ramen czy BOO – Organizacja Odzysku Opakowań.\n" +
      "Wraz z rozwojem skali i jakości naszych działań, Tarnów TV zaczęło przyjmować bardziej profesjonalny charakter. Dziś funkcjonujemy nie tylko jako projekt społeczny, ale również jako rosnąca inicjatywa medialna, w której produkcja treści, współprace i działania promocyjne mają już swoją strukturę i zasady. Jedno jednak pozostaje niezmienne – naszą misją nadal jest pokazywanie Tarnowa z bliska, autentycznie i z perspektywy ludzi, którzy go tworzą.\n" +
      "Tarnów TV to historia, która nadal się pisze – razem z Wami.\n",

  keywords: [
    "Tarnów",
    "TarnovTV",
    "Telewizja Tarnów",
    "Telewizja Tarnov",
    "Młodzieżowa Telewizja",
  ],

  authors: [{ name: "Slysl" }],
  creator: "Slysl",

  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: CONSTANTS.FRONTEND_URL,
    title: "Tarnov TV — Tarnowska Telewizja Młodzieżowa",
    description:
        "Wszystko zaczęło się w lipcu 2024 roku, podczas warsztatów psychologicznych w fundacji Bema 20 w Tarnowie. To właśnie tam narodził się pomysł stworzenia czegoś więcej niż tylko szkolnych wywiadów i krótkich nagrań. Chcieliśmy wyjść poza schemat i zacząć tworzyć materiał, który będzie angażował mieszkańców całego miasta – od luźnych ulicznych rozmów, po pytania, które budują lokalną tożsamość i pokazują codzienność Tarnowa z nieoczywistej strony.\n" +
        "Od samego początku naszym celem nie było jedynie nagrywanie filmów. Chcieliśmy zbudować społeczność – aktywną, zaangażowaną i gotową do wspólnego działania. Wtorki i soboty miały stać się dniami premier, ale równie ważne było dla nas tworzenie przestrzeni, w której ludzie mogą się spotykać, wymieniać doświadczeniami i razem uczestniczyć w wydarzeniach organizowanych w Tarnowie.\n" +
        "Z czasem nasze działania zaczęły wychodzić daleko poza internet. Organizowaliśmy wydarzenia takie jak charytatywne turnieje e-sportowe (zebraliśmy m.in. 2000 zł na pomoc dla zwierząt oraz 600 zł na wsparcie dzieci), wieczory planszówkowe, targi ubraniowe, debaty oksfordzkie oraz wykłady maturalne. Każde z tych wydarzeń miało jeden wspólny cel – łączenie ludzi i tworzenie realnej wartości dla lokalnej społeczności. Równolegle rozwijaliśmy projekt w ramach olimpiady „Zwolnieni z Teorii”, co dodatkowo motywowało nas do działania i konsekwentnego rozwoju.\n" +
        "Początki były skromne – kilku znajomych, prosta kamera i dużo entuzjazmu. Z czasem jednak struktura projektu zaczęła się zmieniać. Tworzyliśmy zespół, w którym każdy miał swoją rolę – od prowadzenia materiałów, przez organizację, aż po montaż. \n" +
        "Dziś Tarnów TV to projekt, który z małej inicjatywy młodzieżowej przekształcił się w rozpoznawalne medium lokalne. Nasze treści docierają do tysięcy odbiorców – blisko 10 tysięcy obserwujących na TikToku, ponad 6,5 tysiąca na Instagramie oraz 2 tysiące na Facebooku. Współpracowaliśmy już m.in. z lokalnymi markami i organizacjami, takimi jak Kebab INN Tarnów, Slysl Coder, Yayoi Ramen czy BOO – Organizacja Odzysku Opakowań.\n" +
        "Wraz z rozwojem skali i jakości naszych działań, Tarnów TV zaczęło przyjmować bardziej profesjonalny charakter. Dziś funkcjonujemy nie tylko jako projekt społeczny, ale również jako rosnąca inicjatywa medialna, w której produkcja treści, współprace i działania promocyjne mają już swoją strukturę i zasady. Jedno jednak pozostaje niezmienne – naszą misją nadal jest pokazywanie Tarnowa z bliska, autentycznie i z perspektywy ludzi, którzy go tworzą.\n" +
        "Tarnów TV to historia, która nadal się pisze – razem z Wami.\n",
    siteName: "Tarnov TV",
    images: [
      {
        url: "/assets/logo.svg",
        width: 1200,
        height: 630,
        alt: "Tarnov TV Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TarnovTV — Tarnowska Telewizja Młodzieżowa",
    description:
        "Wszystko zaczęło się w lipcu 2024 roku, podczas warsztatów psychologicznych w fundacji Bema 20 w Tarnowie. To właśnie tam narodził się pomysł stworzenia czegoś więcej niż tylko szkolnych wywiadów i krótkich nagrań. Chcieliśmy wyjść poza schemat i zacząć tworzyć materiał, który będzie angażował mieszkańców całego miasta – od luźnych ulicznych rozmów, po pytania, które budują lokalną tożsamość i pokazują codzienność Tarnowa z nieoczywistej strony.\n" +
        "Od samego początku naszym celem nie było jedynie nagrywanie filmów. Chcieliśmy zbudować społeczność – aktywną, zaangażowaną i gotową do wspólnego działania. Wtorki i soboty miały stać się dniami premier, ale równie ważne było dla nas tworzenie przestrzeni, w której ludzie mogą się spotykać, wymieniać doświadczeniami i razem uczestniczyć w wydarzeniach organizowanych w Tarnowie.\n" +
        "Z czasem nasze działania zaczęły wychodzić daleko poza internet. Organizowaliśmy wydarzenia takie jak charytatywne turnieje e-sportowe (zebraliśmy m.in. 2000 zł na pomoc dla zwierząt oraz 600 zł na wsparcie dzieci), wieczory planszówkowe, targi ubraniowe, debaty oksfordzkie oraz wykłady maturalne. Każde z tych wydarzeń miało jeden wspólny cel – łączenie ludzi i tworzenie realnej wartości dla lokalnej społeczności. Równolegle rozwijaliśmy projekt w ramach olimpiady „Zwolnieni z Teorii”, co dodatkowo motywowało nas do działania i konsekwentnego rozwoju.\n" +
        "Początki były skromne – kilku znajomych, prosta kamera i dużo entuzjazmu. Z czasem jednak struktura projektu zaczęła się zmieniać. Tworzyliśmy zespół, w którym każdy miał swoją rolę – od prowadzenia materiałów, przez organizację, aż po montaż. \n" +
        "Dziś Tarnów TV to projekt, który z małej inicjatywy młodzieżowej przekształcił się w rozpoznawalne medium lokalne. Nasze treści docierają do tysięcy odbiorców – blisko 10 tysięcy obserwujących na TikToku, ponad 6,5 tysiąca na Instagramie oraz 2 tysiące na Facebooku. Współpracowaliśmy już m.in. z lokalnymi markami i organizacjami, takimi jak Kebab INN Tarnów, Slysl Coder, Yayoi Ramen czy BOO – Organizacja Odzysku Opakowań.\n" +
        "Wraz z rozwojem skali i jakości naszych działań, Tarnów TV zaczęło przyjmować bardziej profesjonalny charakter. Dziś funkcjonujemy nie tylko jako projekt społeczny, ale również jako rosnąca inicjatywa medialna, w której produkcja treści, współprace i działania promocyjne mają już swoją strukturę i zasady. Jedno jednak pozostaje niezmienne – naszą misją nadal jest pokazywanie Tarnowa z bliska, autentycznie i z perspektywy ludzi, którzy go tworzą.\n" +
        "Tarnów TV to historia, która nadal się pisze – razem z Wami.\n",
    images: ["/assets/logo.svg"],
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

export default async function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
    const cookieStore = await cookies();
    const isCookieAccepted = cookieStore.get("functional-cookie-banner")?.value === "shown";
  return (
      <html lang="pl" data-theme={AllThemesEnum[0]} data-mode={AllModesEnum[0]} data-clean-mode={AllCleanModesEnum[0]}>
      <Head>
        <meta name="google-site-verification" content="HDV4XPwnAUVrHCVJpbDRqxEVmYz217w-U77aikkUxRI" />
      </Head>
      <body
          className={`antialiased max-w-screen ${montserrat.variable}`}
      >
      <Setup/>
      <StarBackground/>
      <LegacyHeader />
      <main className={`pt-21 [html[data-mode=new]_&]:md:ml-28 ${isCookieAccepted && "[html[data-mode=new]_&]:pt-12"}`} >
          {children}
      </main>
      <NewMode />
      {!isCookieAccepted && <Cookie />}
      <Toaster/>
      <Footer/>
      <Analytics mode={CONSTANTS.NODE_ENV == "development" ? "development" : "production"} />
      <SpeedInsights/>
      </body>
      </html>
  );
}
