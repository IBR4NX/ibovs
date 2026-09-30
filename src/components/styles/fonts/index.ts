// src/components/fonts.ts
import {
  Amiri,
  Amiri_Quran,
  Aref_Ruqaa_Ink,
  Lateef,
  Noto_Sans_Arabic,
} from "next/font/google";

export const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri-quran",
});

export const arefRuqaa = Aref_Ruqaa_Ink({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-arabic",
});

export const lateef = Lateef({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-lateef",
});

import { Inter, Roboto_Mono } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

//import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`


import { Geist, Geist_Mono } from "next/font/google"
export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export default { amiri, amiriQuran, arefRuqaa, notoArabic, lateef,inter,roboto_mono, fontMono, fontSans} 