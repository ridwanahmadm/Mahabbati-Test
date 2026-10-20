import type { ImageMetadata } from "astro";

const photoFiles = import.meta.glob<{ default: ImageMetadata }>("/src/assets/photos/*.jpg", { eager: true });
const asatidzFiles = import.meta.glob<{ default: ImageMetadata }>("/src/assets/asatidz/*.jpg", { eager: true });
const screenFiles = import.meta.glob<{ default: ImageMetadata }>("/src/assets/screens/**/*.{png,jpg}", {
  eager: true,
});

const byName = (files: Record<string, { default: ImageMetadata }>, base: string) =>
  Object.fromEntries(
    Object.entries(files).map(([path, mod]) => [path.replace(base, "").replace(/\.(jpg|png)$/, ""), mod.default]),
  );

export const PHOTOS = byName(photoFiles, "/src/assets/photos/");
export const SCREENS = byName(screenFiles, "/src/assets/screens/");
export const ASATIDZ_PHOTOS = byName(asatidzFiles, "/src/assets/asatidz/");

export const ustadzPhoto = (name: string) => {
  const p = ASATIDZ_PHOTOS[name];
  if (!p) throw new Error(`Ustadz photo not found: ${name}`);
  return p;
};

export const photo = (name: string) => {
  const p = PHOTOS[name];
  if (!p) throw new Error(`Photo not found: ${name}`);
  return p;
};
export const screen = (name: string) => {
  const s = SCREENS[name];
  if (!s) throw new Error(`Screen not found: ${name}`);
  return s;
};

// Unsplash sources, for credits and replacement.
export const CREDITS: Record<string, string> = {
  "hero-taaruf": "https://unsplash.com/photos/Ds4SH5LPaf0",
  "hero-walimah": "https://unsplash.com/photos/Lr834aonJ70",
  "j-taaruf": "https://unsplash.com/photos/UjLfNJa-KY8",
  "j-nadzhor": "https://unsplash.com/photos/rntyE2uq-dA",
  "j-khitbah": "https://unsplash.com/photos/jt2iZ0ARWoY",
  "j-pranikah": "https://images.unsplash.com/photo-1720873160840-d5934323bb23",
  "j-akad": "https://unsplash.com/photos/ki9sZyhXbqo",
  "j-walimah": "https://unsplash.com/photos/9Lq0zlOu_dw",
  "wo-hero": "https://unsplash.com/photos/2uWUf5K-INY",
  "wo-decor-lavender": "https://images.unsplash.com/photo-1633443682042-17462ad4ad76",
  "wo-catering": "https://images.unsplash.com/photo-1555244162-803834f70033",
  "wo-catering-2": "https://images.unsplash.com/photo-1724218012292-5548214cc2d2",
  "wo-mua": "https://unsplash.com/photos/D_5Kf6Du6JY",
  "wo-melati": "https://unsplash.com/photos/wFlgMiIT0fg",
  "wo-doa": "https://unsplash.com/photos/0QL68R5wGRU",
  "wo-family-doa": "https://unsplash.com/photos/96i7ZYVjrYs",
  "wo-ring": "https://unsplash.com/photos/RHfYB_USSEc",
  hands: "https://unsplash.com/photos/464ps_nOflw",
  "couple-white": "https://unsplash.com/photos/vcgzQPaEI1A",
  walk: "https://unsplash.com/photos/4XCsaj8utx0",
  quran: "https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7",
  "bride-portrait": "https://unsplash.com/photos/_G7UyLmY1tc",
  "couple-blue": "https://unsplash.com/photos/bpBREsra69U",
  "couple-blue-2": "https://unsplash.com/photos/Pa1_0F4mCso",
  "profile-akhwat": "https://unsplash.com/photos/Pa1_0F4mCso",
  "v-ballroom": "https://images.unsplash.com/photo-1780593116478-c46838f86523",
  "v-hall": "https://images.unsplash.com/photo-1783314867628-220ab03cac99",
  "v-masjid": "https://images.unsplash.com/photo-1757314026273-8218e3bb11f0",
  "v-masjid-court": "https://images.unsplash.com/photo-1790596858808-e5c54b2a35d7",
  "v-masjid-night": "https://images.unsplash.com/photo-1760072986110-01cd779ddec4",
  "v-garden": "https://images.unsplash.com/photo-1759954644836-a57275881ded",
  "v-garden-arch": "https://images.unsplash.com/photo-1783142979736-9596873cf20a",
  "v-gazebo": "https://images.unsplash.com/photo-1523438885200-e635ba2c371e",
  "v-villa": "https://images.unsplash.com/photo-1663185776079-33231c5242eb",
  "v-dining": "https://images.unsplash.com/photo-1769812343590-485512e27838",
  "svc-khitbah": "https://images.unsplash.com/photo-1765812927514-8c1ca8b430bc",
};
