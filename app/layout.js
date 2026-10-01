import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "UBP RUN 2026 | Pendaftaran Resmi",
  description: "Daftarkan diri Anda di UBP RUN 2026! Ajang lari santai 2.5K Family Run & 5K Youth Run yang memadukan olahraga, hiburan, dan kampanye hidup sehat di Karawang pada Minggu, 6 Desember 2026.",
  keywords: ["UBP RUN", "UBP RUN 2026", "Lari Karawang", "UBP Karawang", "Pendaftaran UBP RUN", "Family Run", "Youth Run", "Wanatix"],
  authors: [{ name: "UBP Karawang" }],
  openGraph: {
    title: "UBP RUN 2026 | Pendaftaran Resmi",
    description: "Ayo lari bersama di UBP RUN 2026 Karawang! Pilih kategori 2.5K Family Run atau 5K Youth Run dan nikmati berbagai keseruan acara.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body>
        <div className="ambient-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
