# 📍 Tarnów TV — Lokalne Medium Młodzieżowe

> Tworzymy wideo, organizujemy wydarzenia i budujemy lokalną społeczność — od 2024 roku.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Lighthouse](https://img.shields.io/badge/Lighthouse-96%2F100-green?style=flat-square&logo=lighthouse)

---

## ✨ O projekcie

**Tarnów TV** to platforma lokalnego medium młodzieżowego z Tarnowa. Publikujemy projekty, galerie mediów, organizujemy głosowania społecznościowe i prezentujemy ofertę współpracy — wszystko w jednym, nowoczesnym serwisie.

---

## 🚀 Stack technologiczny

| Warstwa | Technologia             |
|---|-------------------------|
| Framework | Next.js 16 (App Router) |
| Język | TypeScript              |
| Stylowanie | Tailwind CSS 4          |
| Baza danych | Firebase Firestore      |
| Storage | ImgBB API               |
| Ikony | Phosphor Icons          |
| Animacje | SSR SlyAnimate          |
| Hosting | Vercel                  |

---

## 📁 Struktura projektu

````
src/
├── app/                    # App Router — strony i layouty
│   ├── (public)/           # Strony publiczne
│   │   ├── page.tsx        # Strona główna
│   │   ├── projects/       # Lista i detale projektów
│   │   ├── media/          # Galeria mediów
│   │   ├── offers/         # Oferta współpracy
│   │   ├── contact/        # Kontakt
│   │   ├── us/             # Zespół
│   │   ├── about/          # O nas
│   │   ├── privacy/        # Polityka prywatności
│   │   └── terms/          # Warunki użytkowania
│   └── settings/
│       └── moderator/      # Panel moderatora (chroniony)
├── lib/
│   ├── firebase/           # get / post / patch / delete
│   └── imagebb/            # Upload zdjęć
├── middlewares/            # Autoryzacja moderatora
└── shared/
├── components/         # UI components + custom
├── consts/             # Enums, stałe
└── types/              # Typy domenowe
````
---

## ⚡ Uruchomienie lokalne

```bash
# Klonowanie
git clone https://github.com/your-org/tarnow-tv.git
cd tarnow-tv

# Instalacja zależności
npm install

# Konfiguracja zmiennych środowiskowych
cp .env.example .env.local
# uzupełnij .env.local swoimi kluczami Firebase i ImgBB

# Uruchomienie
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

---

## 🔑 Zmienne środowiskowe

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# ImgBB
IMGBB_API_KEY=

# App
NEXT_PUBLIC_FRONTEND_URL=https://tarnov-tv.vercel.app
```

---

## 🛡️ Panel moderatora

Dostęp do panelu moderatora wymaga uprawnień. Panel umożliwia:

- ➕ Dodawanie, edytowanie i usuwanie **projektów** (z galerią zdjęć)
- 💼 Zarządzanie **ofertami** współpracy
- 🗳️ Tworzenie i zarządzanie **głosowaniami**
- 🖼️ Upload zdjęć przez **ImgBB API**

---

## 📊 Wydajność

Wyniki Lighthouse na urządzeniu mobilnym (Slow 4G):
````
Performance     ██████████ 96
Accessibility   ██████████ 96
Best Practices  ██████████ 100
SEO             ██████████ 100
FCP   1.4s  |  LCP   1.7s  |  TBT   20ms  |  CLS   0
````

---

## 🗺️ Sitemap

Sitemap generowany automatycznie przez Next.js dostępny pod:

https://tarnov-tv.vercel.app/sitemap.xml

---

## 🎨 Design system

- **Motywy:** Light & Dark (via Tailwind `dark:`)
- **Kolor akcentu:** `--contrast-color` (indigo/violet)
- **Typografia:** Extrabold headings + Light body
- **Komponenty:** Glassmorphism cards z `backdrop-blur`
- **Animacje:** `fadeUp` CSS keyframes + Animate SSR wrapper

---

## 📄 Licencja

© 2024–2025 Tarnów TV. Wszelkie prawa zastrzeżone.  
Kod źródłowy jest własnością zespołu Tarnów TV i nie może być kopiowany ani rozpowszechniany bez zgody.

---

<p align="center">
  Zrobione z ❤️ w Tarnowie
</p>