// Copy blocks shared by pages. Facts come from mahabbati.com and the Mahabbati app.

export type Phase = "Sebelum akad" | "Saat akad" | "Setelah akad";

// The "benang" journey on the home page: how Mahabbati accompanies a couple.
export const JOURNEY: { id: string; phase: Phase; name: string; line: string; how: string; photo: string; alt: string }[] = [
  {
    id: "konsultasi",
    phase: "Sebelum akad",
    name: "Konsultasi",
    line: "Ceritakan rencanamu, kami bantu susun.",
    how: "Lewat WhatsApp: tanggal, kota, jumlah tamu, dan budget. Penawaran tertulis sebelum DP.",
    photo: "hands",
    alt: "Dua tangan saling menggenggam dengan bayangan di rumput.",
  },
  {
    id: "kelas",
    phase: "Sebelum akad",
    name: "Kelas pranikah",
    line: "Bekal ilmu bersama asatidz Mahabbati.",
    how: "Kelas pranikah dan nasihat pernikahan di aplikasi, termasuk dalam Paket Akad dan Paket Lengkap.",
    photo: "j-pranikah",
    alt: "Tangan memegang mushaf Al-Qur'an dan tasbih.",
  },
  {
    id: "khitbah",
    phase: "Sebelum akad",
    name: "Khitbah",
    line: "Pertemuan dua keluarga yang hangat.",
    how: "Paket Khitbah: dekorasi ruang lamaran, seserahan, MC, dan dokumentasi.",
    photo: "j-khitbah",
    alt: "Sepasang cincin perak di dalam kotak beludru merah.",
  },
  {
    id: "akad",
    phase: "Saat akad",
    name: "Akad",
    line: "Ijab qabul yang khidmat.",
    how: "Di rumah, gedung, atau masjid mitra. Koordinasi penghulu, wali, dan saksi oleh tim kami.",
    photo: "j-akad",
    alt: "Foto hitam putih pengantin pria berjabat tangan dengan wali saat ijab qabul.",
  },
  {
    id: "walimah",
    phase: "Saat akad",
    name: "Walimah",
    line: "Merayakan dengan cara yang diridhai.",
    how: "Katering, pelaminan, rias, dan dokumentasi. Area tamu pria dan wanita bisa dipisah.",
    photo: "j-walimah",
    alt: "Pengantin berkebaya putih dan berpeci memegang buku nikah hijau.",
  },
  {
    id: "rumah-tangga",
    phase: "Setelah akad",
    name: "Rumah tangga",
    line: "Kami tetap menemani setelah walimah usai.",
    how: "Kajian dan seminar rumah tangga, serta konsultasi syariah dengan asatidz lewat aplikasi.",
    photo: "walk",
    alt: "Pasangan berjalan bergandengan di jalan setapak berpohon palem.",
  },
];

// The original ta'aruf journey, used on the app page.
export const TAARUF_JOURNEY = [
  { name: "Ta'aruf", line: "Saling mengenal lewat biodata." },
  { name: "Nadzhor", line: "Bertemu dan melihat calon, didampingi wali atau mahram." },
  { name: "Khitbah", line: "Meminang dengan niat yang sudah mantap." },
] as const;

// USULAN: benefit sebelum dan sesudah menikah (arahan 20 Okt 2026, menunggu konfirmasi stakeholder).
// Selama `BENEFITS_NOTE` tidak kosong, catatan ini tampil di situs agar tidak terbaca sebagai janji final.
export const BENEFITS_NOTE = "Program benefit ini sedang disiapkan. Detail dan syaratnya diumumkan di aplikasi Mahabbati.";
export const BENEFITS: { phase: "Sebelum" | "Setelah"; icon: string; title: string; body: string; for: string }[] = [
  { phase: "Sebelum", icon: "school", title: "Kelas pranikah & nasihat pernikahan", body: "Bersama asatidz Mahabbati, diakses di aplikasi.", for: "Klien Paket Akad dan Paket Lengkap" },
  { phase: "Sebelum", icon: "forum", title: "Konsultasi syariah", body: "Tanya langsung ke asatidz soal persiapan nikah.", for: "Pengguna aplikasi dan klien WO" },
  { phase: "Setelah", icon: "menu_book", title: "Kajian rumah tangga", body: "Akses khusus kajian rumah tangga untuk pengantin baru.", for: "Pasangan dari aplikasi dan klien WO" },
  { phase: "Setelah", icon: "calendar_month", title: "Seminar rumah tangga", body: "Undangan seminar rumah tangga bersama asatidz.", for: "Pasangan dari aplikasi dan klien WO" },
  { phase: "Setelah", icon: "redeem", title: "Voucher makan pengantin baru", body: "Voucher makan berdua di restoran partner.", for: "Klien WO Mahabbati" },
  { phase: "Setelah", icon: "forum", title: "Konsultasi syariah", body: "Tetap bisa bertanya ke asatidz setelah menikah.", for: "Pasangan dari aplikasi dan klien WO" },
];

// USULAN: standar syar'i Mahabbati. Konfirmasi ke tim WO sebelum dianggap final.
export const SYARI_STANDARDS = [
  { title: "Vendor dikurasi", body: "Setiap vendor melewati kurasi agar akad dan walimah sesuai syariat Islam." },
  { title: "MUA wanita untuk pengantin wanita", body: "Rias pengantin dan keluarga wanita ditangani perias wanita." },
  { title: "Area tamu bisa dipisah", body: "Penataan area tamu pria dan wanita bila keluarga menghendaki." },
  { title: "Waktu sholat dijaga", body: "Rundown selalu memberi jeda sholat, dengan musala yang disiapkan." },
  { title: "Penawaran tertulis sebelum DP", body: "Rincian item dan harga dalam satu dokumen, jadi kamu tahu persis apa yang dibayar." },
];

export const APP_FAQ = [
  {
    q: "Bisakah aku mencari jodoh lewat website ini?",
    a: "Tidak. Pencarian, pengajuan ta'aruf, dan chat hanya ada di aplikasi Mahabbati untuk Android dan iOS. Website ini berisi informasi dan panduan.",
  },
  {
    q: "Apakah pendaftaran gratis?",
    a: "Ya. Akun gratis sudah mendapat satu pengajuan ta'aruf. Membership Silver dan Gold menambah kuota pengajuan dan membuka fitur seperti nadzhor, kajian, dan ujian pranikah.",
  },
  {
    q: "Bagaimana kalau pengajuanku tidak dibalas?",
    a: "Pengajuan yang tidak direspons dalam 7 hari dibatalkan otomatis, dan kuota yang terpakai dikembalikan ke akunmu.",
  },
  {
    q: "Siapa yang bisa melihat fotoku?",
    a: "Fotomu privat. Foto muslimah hanya ditinjau oleh admin wanita. Calon pasangan baru bisa melihatnya setelah kamu menyetujui permintaan, selama 24 jam, dan foto tidak bisa diunduh.",
  },
  {
    q: "Berapa lama proses verifikasi?",
    a: "Paling lama 3×24 jam. WNI memakai e-KTP, WNA memakai paspor, keduanya disertai foto wajah.",
  },
  {
    q: "Bagaimana proses nadzhor?",
    a: "Nadzhor adalah pertemuan untuk saling melihat dan berbincang lebih dalam. Di Mahabbati, nadzhor selalu didampingi wali atau mahram.",
  },
  {
    q: "Apakah kuota membership bisa ditabung?",
    a: "Tidak. Kuota yang tersisa tidak terbawa saat masa membership berakhir. Pembelian kuota tambahan membutuhkan membership yang aktif.",
  },
  {
    q: "Ada batasan saat chat?",
    a: "Setiap pesan maksimal 1.000 karakter, dengan jumlah pesan per ta'aruf sesuai membership: 20 untuk Silver dan 30 untuk Gold.",
  },
];

export const WO_FAQ = [
  {
    q: "Paket apa saja yang termasuk kelas pranikah?",
    // PLACEHOLDER: ikut flag includesClass di src/data/packages.ts.
    a: "Untuk saat ini Paket Akad, Akad di Masjid, dan Paket Lengkap (Intimate dan Full Package). Kelas pranikah dan nasihat pernikahan bersama asatidz Mahabbati diakses lewat aplikasi Mahabbati.",
  },
  {
    q: "Bisa pesan tempat saja?",
    a: "Bisa. Pilih dari tempat mitra kami, lalu tanyakan ketersediaan tanggalnya lewat WhatsApp. Paket WO bisa ditambahkan belakangan.",
  },
  {
    q: "Apakah vendornya sesuai syariat?",
    a: "Seluruh vendor melewati kurasi agar akad dan walimah berjalan sesuai syariat Islam.",
  },
  {
    q: "Harus pakai aplikasi Mahabbati dulu?",
    // DUMMY: konfirmasi kebijakan.
    a: "Tidak harus. Kamu bisa langsung konsultasi lewat WhatsApp, meskipun bertemu calon pasangan di luar Mahabbati.",
  },
  {
    q: "Apakah harga di website sudah final?",
    a: "Belum. Angka di website adalah estimasi awal. Harga final mengikuti jumlah tamu, lokasi, dan pilihan menu, dan dituliskan di penawaran resmi.",
  },
  {
    q: "Bisa melayani di luar Jakarta?",
    // DUMMY: konfirmasi area layanan.
    a: "Tanyakan kota dan tanggal acaramu ke tim lewat WhatsApp, kami cek ketersediaannya.",
  },
];

export const MEMBERSHIP = {
  tiers: ["Free", "Silver", "Gold"] as const,
  rows: [
    { label: "Pengajuan ta'aruf", values: ["1", "10", "25"] },
    { label: "Pesan per ta'aruf", values: [null, "20", "30"] },
    { label: "Minta lihat foto", values: [false, true, true] },
    { label: "Nadzhor dan khitbah", values: [false, true, true] },
    { label: "Kajian dan e-learning", values: [false, true, "Semua materi"] },
    { label: "Ujian pranikah dan sertifikat", values: [false, true, true] },
    { label: "Benefit merchant", values: [false, true, "Diskon eksklusif"] },
    { label: "Tiket acara Mahabbati", values: [false, false, true] },
    { label: "Jalur prioritas tim admin", values: [false, false, true] },
  ] as { label: string; values: (string | boolean | null)[] }[],
};
