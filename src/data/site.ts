// Single source for links and contacts used across the microsite.

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.kasministudio.mahabbatimobile";

// GANTI: App Store masih dalam review. Ganti href ini dengan link App Store resmi
// setelah rilis (format: https://apps.apple.com/id/app/mahabbati/id<angka>).
export const APP_STORE_URL = "https://apps.apple.com/id/app/mahabbati/id0000000000";

export const INSTAGRAM_URL = "https://instagram.com/mahabbati_official";
export const EMAIL = "salam@mahabbati.com";
export const TERMS_URL = "https://www.mahabbati.com/terms#ketentuan-layanan";
export const PRIVACY_URL = "https://www.mahabbati.com/terms#kebijakan-privasi";
export const DATA_DELETION_URL = "https://forms.gle/Va4fKoqEXFi4aQiS9";
export const ADDRESS = "Jl. Komp. Bappenas Siaga Raya No. 66, Pejaten Barat, Jakarta 12510";

export const WA = {
  wo: { number: "6282261505350", label: "0822-6150-5350" },
  ikhwan: { number: "628131600671", label: "0813-1600-671" },
  akhwat: { number: "628131600651", label: "0813-1600-651" },
} as const;

export const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const WO_GREETING =
  "Assalamu'alaikum, Tim Wedding Organizer Mahabbati. Saya ingin konsultasi paket pernikahan.";

// Proof points with their sources. Keep these in sync with real data before publishing.
export const PROOF = {
  couples: "10+", // pasangan menikah lewat WO Mahabbati (company profile, Okt 2026)
  rating: "4,7", // rating Google Play
  instagram: "10,9 rb", // pengikut @mahabbati_official
  review: {
    quote: "Menarik dan cukup beda dari dating app pada umumnya.",
    by: "M. Dimas Maulana",
    source: "Ulasan Google Play",
  },
};

export const rupiah = (n: number) =>
  "Rp" + new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(n);

/** Short form: 1.500.000 → "Rp1,5 jt", 1.250.000 → "Rp1,25 jt", 750.000 → "Rp750 rb". */
export const rupiahShort = (n: number) => {
  const nf = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });
  return n < 1_000_000 ? `Rp${nf.format(n / 1000)} rb` : `Rp${nf.format(n / 1_000_000)} jt`;
};

/** Base-aware internal link. The site can live at a domain root or a sub-path (GitHub Pages). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const url = (path: string) => (path.startsWith("/") ? `${BASE}${path}` : path);

export type NavKey = "home" | "layanan" | "tempat" | "asatidz" | "cerita" | "aplikasi" | "tentang";
