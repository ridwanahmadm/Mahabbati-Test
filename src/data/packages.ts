// Wedding Organizer catalogue: what a couple can book, grouped by what they are preparing.
//
// CARA MENGISI DATA ASLI
// - `placeholder: true` pada paket = harga dan rincian masih contoh. Ganti nilainya, lalu set ke false
//   (label "Data contoh" di situs akan hilang otomatis).
// - `includesClass: true` = paket ini termasuk akses kelas pranikah dan nasihat pernikahan dari asatidz
//   Mahabbati di aplikasi. Sementara: paket Akad dan paket Lengkap (arahan 20 Okt 2026), ubah bila perlu.
// - Harga asli dari mahabbati.com dan aplikasi: Wedding Planner Rp1,5 jt, Intimate Rp15 jt,
//   Full Package Standard Rp75 jt (300 pax) dan Exclusive Rp95 jt (500 pax). Sisanya contoh.

export type NeedId = "lengkap" | "akad" | "masjid" | "walimah" | "khitbah" | "tempat" | "harih";

export const NEEDS: { id: NeedId; label: string; short: string; photo: string; alt: string }[] = [
  { id: "lengkap", label: "Paket lengkap", short: "Akad sampai walimah, dipegang satu tim.", photo: "wo-hero", alt: "Pengantin bersiger di pelaminan berhias bunga putih." },
  { id: "akad", label: "Akad nikah", short: "Prosesi ijab qabul yang khidmat di rumah atau gedung.", photo: "j-akad", alt: "Pengantin pria berjabat tangan dengan wali saat ijab qabul." },
  { id: "masjid", label: "Akad di masjid", short: "Akad di masjid mitra, dengan adab masjid yang terjaga.", photo: "v-masjid-court", alt: "Pelataran masjid putih dengan ukiran kerawang." },
  { id: "walimah", label: "Walimah", short: "Jamuan tamu, pelaminan, dan dokumentasi.", photo: "wo-decor-lavender", alt: "Pelaminan berhias bunga lavender dan tirai." },
  { id: "khitbah", label: "Khitbah & lamaran", short: "Pertemuan dua keluarga yang hangat dan tertata.", photo: "svc-khitbah", alt: "Pasangan berbusana adat dengan roncean melati." },
  { id: "tempat", label: "Tempat saja", short: "Sewa tempat mitra: masjid, gedung, taman, atau villa.", photo: "v-ballroom", alt: "Ballroom dengan lampu gantung dan meja tamu bertaplak putih." },
  { id: "harih", label: "Koordinasi hari H", short: "Vendor dari kamu, kendali acara dari kami.", photo: "wo-family-doa", alt: "Keluarga berdoa bersama pengantin wanita." },
];

export type IconName =
  | "restaurant"
  | "assignment"
  | "local_florist"
  | "checkroom"
  | "photo_camera"
  | "groups"
  | "event_available"
  | "volunteer_activism"
  | "group"
  | "checklist"
  | "drafts"
  | "videocam"
  | "school"
  | "mic"
  | "mosque"
  | "redeem";

export type Item = { icon: IconName; label: string; value: string; detail: string };

export type AddonId = "video" | "stream" | "henna" | "invite" | "crew";

export const ADDONS: Record<AddonId, { label: string; price: number }> = {
  // DUMMY: harga add-on contoh.
  video: { label: "Video sinematik, highlight 3 menit", price: 4_500_000 },
  stream: { label: "Live streaming akad untuk keluarga jauh", price: 2_000_000 },
  henna: { label: "Henna pengantin wanita", price: 1_250_000 },
  invite: { label: "Undangan digital dengan RSVP", price: 750_000 },
  crew: { label: "Tambahan 2 crew", price: 900_000 },
};

export type Variant = {
  id: string;
  name: string;
  price: number;
  guests: { min: number; max: number; step: number; included: number };
  /** Extra cost per block of guests above `included`. */
  extra: { per: number; price: number };
  items: Item[];
  addons: AddonId[];
};

export type Package = {
  slug: string;
  need: NeedId;
  name: string;
  priceFrom: number;
  /** true = harga dan isi masih contoh. */
  placeholder: boolean;
  /** true = termasuk akses kelas pranikah & nasihat pernikahan di aplikasi. */
  includesClass: boolean;
  promise: string;
  forWho: string;
  summary: string;
  photo: string;
  gallery: string[];
  featured?: boolean;
  variants: Variant[];
};

/** Added to every package with includesClass, so the claim lives in one place. */
export const CLASS_ITEM: Item = {
  icon: "school",
  label: "Kelas pranikah & nasihat",
  value: "Di aplikasi",
  detail: "Akses kelas pranikah dan nasihat pernikahan bersama asatidz Mahabbati lewat aplikasi Mahabbati.",
};

export const PACKAGES: Package[] = [
  {
    slug: "full-package",
    need: "lengkap",
    name: "Full Package Wedding",
    priceFrom: 75_000_000,
    placeholder: false,
    includesClass: true,
    featured: true,
    promise: "Didampingi dari rencana pertama sampai tamu terakhir pulang.",
    forWho: "Akad dan walimah 300 tamu ke atas, dengan satu tim yang mengurus semuanya.",
    summary:
      "Kami mendampingi sejak awal: mempelajari prioritas kalian, lalu menyusunnya menjadi rencana yang terstruktur dan terukur.",
    photo: "wo-hero",
    gallery: ["wo-hero", "wo-decor-lavender", "wo-catering", "wo-mua", "wo-catering-2", "bride-portrait"],
    variants: [
      {
        id: "standard",
        name: "Standard",
        price: 75_000_000,
        guests: { min: 200, max: 800, step: 50, included: 300 },
        extra: { per: 50, price: 4_750_000 }, // DUMMY
        addons: ["video", "stream", "henna", "invite", "crew"],
        items: [
          // DUMMY sebagian: isi mengikuti layar WO di aplikasi, detailnya contoh.
          { icon: "restaurant", label: "Catering", value: "300 pax", detail: "Prasmanan dan tiga gubukan. Menu dipilih saat food testing." },
          { icon: "assignment", label: "Wedding planner", value: "Profesional", detail: "Koordinator utama dan 10 crew sejak technical meeting." },
          { icon: "local_florist", label: "Dekorasi", value: "Pelaminan & akad", detail: "Pelaminan, area akad, dan gerbang masuk dengan bunga segar." },
          { icon: "checkroom", label: "MUA & busana", value: "Akad & resepsi", detail: "Rias dan busana pengantin, ditambah rias untuk kedua orang tua." },
          { icon: "mic", label: "Ustadz pemateri", value: "Tausiyah", detail: "Tausiyah singkat untuk kedua keluarga di hari acara." },
          { icon: "photo_camera", label: "Dokumentasi", value: "Foto & video", detail: "Dua fotografer, satu videografer, dan album cetak." },
        ],
      },
      {
        id: "exclusive",
        name: "Exclusive",
        price: 95_000_000,
        guests: { min: 300, max: 1000, step: 50, included: 500 },
        extra: { per: 50, price: 5_500_000 }, // DUMMY
        addons: ["stream", "henna", "crew"],
        items: [
          { icon: "restaurant", label: "Catering", value: "500 pax", detail: "Prasmanan dan lima gubukan. Menu dipilih saat food testing." },
          { icon: "assignment", label: "Wedding planner", value: "Profesional", detail: "Koordinator utama dan 14 crew sejak technical meeting." },
          { icon: "local_florist", label: "Dekorasi", value: "Premium", detail: "Pelaminan, area akad, gerbang, dan meja tamu VIP dengan bunga segar." },
          { icon: "checkroom", label: "MUA & busana", value: "Akad & resepsi", detail: "Rias dan busana pengantin, ditambah empat anggota keluarga inti." },
          { icon: "mic", label: "Ustadz pemateri", value: "Tausiyah", detail: "Tausiyah singkat untuk kedua keluarga di hari acara." },
          { icon: "videocam", label: "Dokumentasi", value: "Foto & sinematik", detail: "Dua fotografer, dua videografer, highlight sinematik 3 menit, album cetak." },
          { icon: "drafts", label: "Undangan digital", value: "Dengan RSVP", detail: "Satu halaman undangan dengan konfirmasi kehadiran tamu." },
        ],
      },
    ],
  },
  {
    slug: "intimate-wedding",
    need: "lengkap",
    name: "Intimate Wedding",
    priceFrom: 15_000_000,
    placeholder: false,
    includesClass: true,
    featured: true,
    promise: "Akad dan walimah yang hangat, untuk orang-orang terdekat.",
    forWho: "Acara sederhana hingga 200 tamu, tanpa repot mengurus vendor satu per satu.",
    summary: "Satu paket untuk akad dan walimah kecil: makanan, dekorasi, rias, dokumentasi, dan tim yang mengatur jalannya acara.",
    photo: "couple-white",
    gallery: ["couple-white", "wo-doa", "wo-ring", "wo-melati"],
    variants: [
      {
        id: "intimate",
        name: "Intimate Wedding",
        price: 15_000_000,
        guests: { min: 50, max: 200, step: 10, included: 100 },
        extra: { per: 10, price: 900_000 }, // DUMMY
        addons: ["video", "stream", "henna", "invite"],
        items: [
          // DUMMY: rincian isi paket.
          { icon: "restaurant", label: "Catering", value: "100 pax", detail: "Prasmanan dengan dua menu utama dan satu gubukan." },
          { icon: "local_florist", label: "Dekorasi", value: "Akad & pelaminan", detail: "Area akad dan pelaminan minimalis dengan bunga segar." },
          { icon: "checkroom", label: "MUA & busana", value: "1 tampilan", detail: "Rias dan busana pengantin untuk akad sampai walimah." },
          { icon: "photo_camera", label: "Dokumentasi", value: "Foto 6 jam", detail: "Satu fotografer, 100 foto hasil edit dalam galeri online." },
          { icon: "groups", label: "Wedding planner", value: "+ 4 crew", detail: "Koordinator dan crew yang mengatur alur acara di hari H." },
        ],
      },
    ],
  },
  {
    slug: "paket-akad",
    need: "akad",
    name: "Paket Akad",
    priceFrom: 4_500_000,
    placeholder: true,
    includesClass: true,
    featured: true,
    promise: "Ijab qabul yang khidmat, tanpa repot di belakang layar.",
    forWho: "Kamu fokus pada akad di rumah atau gedung. Walimah bisa menyusul atau terpisah.",
    summary: "Area akad, rias, dokumentasi, dan koordinasi dengan penghulu, wali, serta saksi, ditangani satu tim.",
    photo: "j-akad",
    gallery: ["j-akad", "wo-doa", "wo-ring", "hands"],
    variants: [
      {
        id: "akad",
        name: "Paket Akad",
        price: 4_500_000,
        guests: { min: 20, max: 150, step: 10, included: 50 },
        extra: { per: 10, price: 650_000 },
        addons: ["stream", "henna", "video"],
        items: [
          // DUMMY: seluruh isi paket contoh.
          { icon: "local_florist", label: "Dekorasi", value: "Area akad", detail: "Meja akad, backdrop sederhana, dan bunga segar." },
          { icon: "checkroom", label: "MUA & busana", value: "Akad", detail: "Rias dan busana pengantin wanita untuk prosesi akad." },
          { icon: "volunteer_activism", label: "Koordinasi akad", value: "Termasuk", detail: "Koordinasi penghulu, wali, dan saksi agar ijab qabul berjalan khidmat." },
          { icon: "photo_camera", label: "Dokumentasi", value: "Foto 3 jam", detail: "Satu fotografer, galeri online." },
          { icon: "restaurant", label: "Jamuan keluarga", value: "50 pax", detail: "Nasi kotak atau prasmanan kecil untuk keluarga inti." },
        ],
      },
    ],
  },
  {
    slug: "akad-di-masjid",
    need: "masjid",
    name: "Akad di Masjid",
    priceFrom: 25_000_000,
    placeholder: true,
    includesClass: true,
    featured: true,
    promise: "Akad di rumah Allah, dengan adab masjid yang terjaga.",
    forWho: "Kamu ingin akad di masjid mitra, lalu jamuan sederhana untuk keluarga dan sahabat.",
    summary: "Kami mengurus izin dan koordinasi dengan pengurus masjid, menata area akad sesuai adab masjid, sampai jamuan setelahnya.",
    photo: "v-masjid-court",
    gallery: ["v-masjid-court", "v-masjid", "j-akad", "v-masjid-night"],
    variants: [
      {
        id: "masjid",
        name: "Akad di Masjid",
        price: 25_000_000,
        guests: { min: 50, max: 300, step: 25, included: 100 },
        extra: { per: 25, price: 2_000_000 },
        addons: ["stream", "video", "invite"],
        items: [
          // DUMMY: seluruh isi paket contoh.
          { icon: "mosque", label: "Masjid mitra", value: "Termasuk", detail: "Izin, jadwal, dan koordinasi dengan pengurus masjid." },
          { icon: "local_florist", label: "Dekorasi", value: "Sesuai adab masjid", detail: "Penataan area akad tanpa mengganggu ruang sholat." },
          { icon: "checkroom", label: "MUA & busana", value: "Akad", detail: "Rias dan busana pengantin, ruang rias terpisah." },
          { icon: "restaurant", label: "Jamuan", value: "100 pax", detail: "Jamuan sederhana setelah akad di aula atau tempat terdekat." },
          { icon: "photo_camera", label: "Dokumentasi", value: "Foto & video", detail: "Satu fotografer dan satu videografer." },
          { icon: "groups", label: "Crew", value: "6 orang", detail: "Mengatur alur tamu pria dan wanita serta jamuan." },
        ],
      },
    ],
  },
  {
    slug: "paket-walimah",
    need: "walimah",
    name: "Paket Walimah",
    priceFrom: 25_000_000,
    placeholder: true,
    includesClass: false,
    promise: "Jamuan yang tertata, tamu pulang dengan kesan baik.",
    forWho: "Akad sudah beres. Kamu butuh resepsi dengan katering, pelaminan, dan tim.",
    summary: "Katering, pelaminan, rias, dokumentasi, dan crew untuk resepsi. Tempat bisa memakai milikmu atau tempat mitra.",
    photo: "wo-decor-lavender",
    gallery: ["wo-decor-lavender", "wo-catering", "wo-catering-2", "v-ballroom"],
    variants: [
      {
        id: "walimah",
        name: "Paket Walimah",
        price: 25_000_000,
        guests: { min: 100, max: 1000, step: 50, included: 300 },
        extra: { per: 50, price: 4_250_000 },
        addons: ["video", "invite", "crew"],
        items: [
          // DUMMY: seluruh isi paket contoh.
          { icon: "restaurant", label: "Catering", value: "300 pax", detail: "Prasmanan dan dua gubukan." },
          { icon: "local_florist", label: "Pelaminan", value: "Termasuk", detail: "Pelaminan dan dekorasi pintu masuk." },
          { icon: "checkroom", label: "MUA & busana", value: "Resepsi", detail: "Rias dan busana pengantin untuk resepsi." },
          { icon: "photo_camera", label: "Dokumentasi", value: "Foto 6 jam", detail: "Dua fotografer, galeri online." },
          { icon: "groups", label: "Crew", value: "8 orang", detail: "Mengatur tamu, katering, dan jalannya resepsi." },
          { icon: "group", label: "Area tamu", value: "Bisa dipisah", detail: "Penataan area tamu pria dan wanita bila keluarga menghendaki." },
        ],
      },
    ],
  },
  {
    slug: "paket-khitbah",
    need: "khitbah",
    name: "Paket Khitbah",
    priceFrom: 3_500_000,
    placeholder: true,
    includesClass: false,
    promise: "Pertemuan dua keluarga yang hangat dan tertata.",
    forWho: "Lamaran di rumah keluarga calon, dari yang sederhana sampai lengkap dengan seserahan.",
    summary: "Dekorasi ruang lamaran, penataan seserahan, MC, dokumentasi, dan jamuan keluarga.",
    photo: "svc-khitbah",
    gallery: ["svc-khitbah", "j-khitbah", "wo-ring", "v-dining"],
    variants: [
      {
        id: "khitbah",
        name: "Paket Khitbah",
        price: 3_500_000,
        guests: { min: 20, max: 100, step: 10, included: 30 },
        extra: { per: 10, price: 500_000 },
        addons: ["video", "henna"],
        items: [
          // DUMMY: seluruh isi paket contoh.
          { icon: "local_florist", label: "Dekorasi", value: "Ruang lamaran", detail: "Backdrop dan bunga untuk ruang tamu keluarga." },
          { icon: "redeem", label: "Seserahan", value: "6 tray", detail: "Penataan tray seserahan, barang dari keluarga." },
          { icon: "mic", label: "MC lamaran", value: "Termasuk", detail: "Memandu sambutan kedua keluarga." },
          { icon: "photo_camera", label: "Dokumentasi", value: "Foto 3 jam", detail: "Satu fotografer, galeri online." },
          { icon: "restaurant", label: "Jamuan", value: "30 pax", detail: "Hidangan untuk kedua keluarga." },
        ],
      },
    ],
  },
  {
    slug: "wedding-planner",
    need: "harih",
    name: "Wedding Planner",
    priceFrom: 1_500_000,
    placeholder: false,
    includesClass: false,
    promise: "Hari H berjalan sesuai rencana.",
    forWho: "Vendor sudah kamu pilih sendiri. Kami yang memegang kendali di hari H.",
    summary:
      "Tim kami mengendalikan hari H supaya seluruh rencana dieksekusi tepat, rapi, dan tanpa gangguan. Keluarga cukup hadir dan menikmati.",
    photo: "wo-family-doa",
    gallery: ["wo-family-doa", "j-akad", "hands"],
    variants: [
      {
        id: "standar",
        name: "Wedding Planner",
        price: 1_500_000,
        guests: { min: 100, max: 1000, step: 50, included: 300 },
        extra: { per: 150, price: 500_000 }, // DUMMY
        addons: ["stream", "crew"],
        items: [
          // DUMMY: rincian isi paket.
          { icon: "assignment", label: "Wedding planner", value: "1 koordinator", detail: "Satu orang yang memegang seluruh rencana, dari technical meeting sampai acara ditutup." },
          { icon: "groups", label: "Crew hari H", value: "6 orang", detail: "Mengatur alur keluarga, tamu, dan vendor. Jumlahnya bertambah mengikuti jumlah tamu." },
          { icon: "event_available", label: "Technical meeting", value: "2 kali", detail: "Bersama keluarga dan vendor pada H-30 dan H-7 untuk mengunci rundown." },
          { icon: "checklist", label: "Rundown", value: "Akad & walimah", detail: "Disusun bersama keluarga, lengkap dengan jeda waktu sholat." },
          { icon: "volunteer_activism", label: "Pendampingan akad", value: "Termasuk", detail: "Koordinasi penghulu, wali, dan saksi agar ijab qabul berjalan khidmat." },
        ],
      },
    ],
  },
];

export const findPackage = (slug: string) => PACKAGES.find((p) => p.slug === slug);
export const needLabel = (id: NeedId) => NEEDS.find((n) => n.id === id)?.label ?? id;

/** Items shown on a package page: its own items, plus the class access when included. */
export const itemsFor = (p: Package, v: Variant) => (p.includesClass ? [...v.items, CLASS_ITEM] : v.items);

/** Estimate for a variant, guest count and add-ons. Mirrors src/scripts/estimator.ts. */
export const estimate = (v: Variant, guests: number, addons: AddonId[] = []) => {
  const over = Math.max(0, guests - v.guests.included);
  const blocks = Math.ceil(over / v.extra.per);
  return v.price + blocks * v.extra.price + addons.reduce((s, a) => s + ADDONS[a].price, 0);
};

/** Guest range a package can serve, across its variants. */
export const guestRange = (p: Package) => ({
  min: Math.min(...p.variants.map((v) => v.guests.min)),
  max: Math.max(...p.variants.map((v) => v.guests.max)),
});

// DUMMY: contoh susunan hari H, untuk memberi gambaran.
export const RUNDOWN = [
  { time: "07.00", title: "Rias dan persiapan", note: "MUA mulai, crew memeriksa venue." },
  { time: "08.30", title: "Keluarga tiba", note: "Briefing singkat dengan wali dan saksi." },
  { time: "09.00", title: "Akad nikah", note: "Ijab qabul, doa, penyerahan mahar." },
  { time: "10.00", title: "Tausiyah dan foto keluarga", note: "Urutan foto sudah disepakati di technical meeting." },
  { time: "11.00", title: "Walimah dibuka", note: "Tamu dipersilakan, area pria dan wanita bila dipisah." },
  { time: "12.00", title: "Jeda sholat Dzuhur", note: "Acara berhenti sejenak, musala sudah disiapkan." },
  { time: "13.30", title: "Penutupan", note: "Crew merapikan, keluarga pulang tanpa urusan tersisa." },
];

// DUMMY: alur layanan, perlu konfirmasi tim WO.
export const WO_STEPS = [
  { title: "Konsultasi lewat WhatsApp", body: "Ceritakan tanggal, kota, dan perkiraan jumlah tamu." },
  { title: "Penawaran tertulis", body: "Rincian item dan harga dalam satu dokumen, sebelum kamu membayar DP." },
  { title: "Technical meeting", body: "Bersama keluarga dan vendor, mengunci rundown dan pembagian tugas." },
  { title: "Hari H", body: "Tim memegang kendali. Keluarga cukup hadir dan menikmati momennya." },
];

export const GUEST_RANGES = [
  { id: "s", label: "Hingga 100 tamu", min: 0, max: 100 },
  { id: "m", label: "100 sampai 300 tamu", min: 100, max: 300 },
  { id: "l", label: "300 sampai 500 tamu", min: 300, max: 500 },
  { id: "xl", label: "Lebih dari 500 tamu", min: 500, max: 5000 },
];

export const BUDGETS = [
  { id: "b1", label: "Hingga Rp10 jt", max: 10_000_000 },
  { id: "b2", label: "Hingga Rp50 jt", max: 50_000_000 },
  { id: "b3", label: "Hingga Rp100 jt", max: 100_000_000 },
];
