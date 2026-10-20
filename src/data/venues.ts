// Tempat mitra.
//
// PLACEHOLDER: seluruh daftar ini contoh. Nama sengaja generik (jenis + area) supaya tidak terbaca
// sebagai kerja sama dengan tempat sungguhan. Ganti dengan data mitra resmi, lalu set `placeholder: false`.

import type { NeedId } from "./packages";

export type VenueType = "masjid" | "gedung" | "taman" | "villa" | "restoran";

export const VENUE_TYPES: { id: VenueType; label: string; icon: string }[] = [
  { id: "masjid", label: "Masjid", icon: "mosque" },
  { id: "gedung", label: "Gedung & ballroom", icon: "location_city" },
  { id: "taman", label: "Taman & outdoor", icon: "park" },
  { id: "villa", label: "Rumah & villa", icon: "villa" },
  { id: "restoran", label: "Restoran privat", icon: "restaurant" },
];

export type Venue = {
  slug: string;
  name: string;
  type: VenueType;
  city: string;
  capacity: { akad?: number; walimah?: number };
  priceFrom: number;
  priceNote: string;
  photo: string;
  gallery: string[];
  alt: string;
  facilities: string[];
  needs: NeedId[];
  placeholder: boolean;
};

export const VENUES: Venue[] = [
  {
    slug: "masjid-jakarta-selatan",
    name: "Masjid mitra di Jakarta Selatan",
    type: "masjid",
    city: "Jakarta Selatan",
    capacity: { akad: 150, walimah: 250 },
    priceFrom: 3_000_000,
    priceNote: "infaq dan biaya operasional",
    photo: "v-masjid-court",
    gallery: ["v-masjid-court", "v-masjid", "j-akad"],
    alt: "Pelataran masjid putih berukir kerawang dengan kolam kecil.",
    facilities: ["Ruang akad terpisah dari ruang sholat", "Aula untuk jamuan", "Ruang rias wanita", "Parkir 40 mobil"],
    needs: ["masjid", "akad"],
    placeholder: true,
  },
  {
    slug: "masjid-raya-jakarta-pusat",
    name: "Masjid raya mitra di Jakarta Pusat",
    type: "masjid",
    city: "Jakarta Pusat",
    capacity: { akad: 300 },
    priceFrom: 5_000_000,
    priceNote: "infaq dan biaya operasional",
    photo: "v-masjid",
    gallery: ["v-masjid", "v-masjid-night", "j-akad"],
    alt: "Interior masjid raya dengan pilar tinggi dan kubah berukir.",
    facilities: ["Kapasitas akad besar", "Pendampingan pengurus masjid", "Area tamu pria dan wanita terpisah"],
    needs: ["masjid", "akad"],
    placeholder: true,
  },
  {
    slug: "ballroom-jakarta-pusat",
    name: "Ballroom hotel di Jakarta Pusat",
    type: "gedung",
    city: "Jakarta Pusat",
    capacity: { akad: 200, walimah: 800 },
    priceFrom: 45_000_000,
    priceNote: "sewa ruang 6 jam",
    photo: "v-ballroom",
    gallery: ["v-ballroom", "v-hall", "wo-catering-2"],
    alt: "Ballroom dengan lampu gantung kristal dan meja tamu bertaplak putih.",
    facilities: ["Musala di lantai yang sama", "Ruang rias dan ruang keluarga", "Parkir basement", "Katering hotel atau mitra"],
    needs: ["walimah", "lengkap", "akad"],
    placeholder: true,
  },
  {
    slug: "gedung-depok",
    name: "Gedung serbaguna di Depok",
    type: "gedung",
    city: "Depok",
    capacity: { akad: 150, walimah: 500 },
    priceFrom: 18_000_000,
    priceNote: "sewa gedung 8 jam",
    photo: "v-hall",
    gallery: ["v-hall", "wo-catering", "wo-decor-lavender"],
    alt: "Aula dengan meja bundar dan kursi kayu untuk jamuan.",
    facilities: ["Musala", "Ruang rias", "Parkir 80 mobil", "Area tamu bisa dipisah"],
    needs: ["walimah", "lengkap"],
    placeholder: true,
  },
  {
    slug: "taman-bogor",
    name: "Taman outdoor di Bogor",
    type: "taman",
    city: "Bogor",
    capacity: { akad: 150, walimah: 300 },
    priceFrom: 15_000_000,
    priceNote: "sewa area sehari",
    photo: "v-garden",
    gallery: ["v-garden", "v-garden-arch", "v-gazebo"],
    alt: "Taman hijau dengan kursi putih tersusun menghadap gapura akad.",
    facilities: ["Tenda cadangan bila hujan", "Musala", "Ruang rias", "Parkir 50 mobil"],
    needs: ["lengkap", "walimah", "akad"],
    placeholder: true,
  },
  {
    slug: "villa-puncak",
    name: "Villa keluarga di Puncak",
    type: "villa",
    city: "Bogor",
    capacity: { akad: 80, walimah: 150 },
    priceFrom: 12_000_000,
    priceNote: "sewa villa 1 malam",
    photo: "v-villa",
    gallery: ["v-villa", "v-gazebo", "couple-white"],
    alt: "Villa putih bertangga dengan halaman berumput dan kursi tamu.",
    facilities: ["Kamar untuk keluarga inti", "Halaman untuk akad", "Dapur untuk katering"],
    needs: ["lengkap", "khitbah", "akad"],
    placeholder: true,
  },
  {
    slug: "restoran-jakarta-selatan",
    name: "Restoran privat di Jakarta Selatan",
    type: "restoran",
    city: "Jakarta Selatan",
    capacity: { akad: 40, walimah: 80 },
    priceFrom: 9_000_000,
    priceNote: "minimum pemesanan menu",
    photo: "v-dining",
    gallery: ["v-dining", "wo-catering-2", "svc-khitbah"],
    alt: "Meja panjang berhias bunga putih di ruang makan privat.",
    facilities: ["Ruang privat", "Menu halal", "Cocok untuk khitbah dan intimate"],
    needs: ["khitbah", "lengkap"],
    placeholder: true,
  },
];

export const findVenue = (slug: string) => VENUES.find((v) => v.slug === slug);
export const venueTypeLabel = (t: VenueType) => VENUE_TYPES.find((x) => x.id === t)?.label ?? t;
export const VENUE_CITIES = [...new Set(VENUES.map((v) => v.city))];
