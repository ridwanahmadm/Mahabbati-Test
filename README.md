# Mahabbati Microsite

Website Mahabbati dengan fokus utama **Wedding Organizer syar'i** (WO Mahabbati + tempat mitra), ditambah halaman product knowledge **aplikasi ta'aruf**.

Janji utamanya: **"Kami menemani sebelum, saat, dan setelah akad."**
- **Sebelum akad:** kelas pranikah dan nasihat pernikahan bersama asatidz Mahabbati di aplikasi.
- **Saat akad:** khitbah, akad, akad di masjid, walimah, atau paket lengkap.
- **Setelah akad:** kajian dan seminar rumah tangga, serta konsultasi syariah.

Dibangun dengan [Astro](https://astro.build) dan menghasilkan HTML statis, ditambah GSAP (ScrollTrigger) dan Lenis. Setiap push ke `main` otomatis di-deploy lewat GitHub Pages (`.github/workflows/deploy-pages.yml`).

## Test deployment

GitHub Pages: https://ridwanahmadm.github.io/Mahabbati-Test/

Workflow membangun situs dengan repository subpath supaya tautan internal, font, dan gambar berfungsi di `/Mahabbati-Test/`.

## Halaman

| Rute | Isi |
|---|---|
| `/` | Hero + pencari kebutuhan, daftar kebutuhan dengan foto mengikuti kursor, benang "sebelum, saat, setelah akad", asatidz, paket pilihan, tempat mitra, standar syar'i, bukti, band "Persimpangan" (WO / aplikasi), FAQ |
| `/layanan/` | Katalog paket dengan filter kebutuhan, jumlah tamu, dan budget. Filter tersimpan di URL, jadi pencari di beranda langsung mendarat di hasil yang terfilter |
| `/layanan/<paket>/` | Detail paket: isi per varian, kelas pranikah (bila termasuk), rundown, galeri, tempat yang cocok, estimator yang mengisi pesan WhatsApp |
| `/tempat/`, `/tempat/<tempat>/` | Tempat mitra (masjid, gedung, taman, villa, restoran) dengan filter jenis/kota/tamu, plus detail dan tombol "Cek ketersediaan tanggal" |
| `/asatidz/` | Asatidz, isi kelas, dua jalan mendapat akses, benefit sebelum/setelah menikah, paket yang termasuk kelas |
| `/cerita/` | Cerita pasangan dan ulasan |
| `/aplikasi/` | Product knowledge aplikasi ta'aruf: demo anti-ghosting, foto privat, verifikasi, AI, panduan, pranikah, setelah menikah, membership |
| `/tentang/` | Tentang Mahabbati, standar syar'i, kontak |

URL lama (`/taaruf/`, `/wedding-organizer/...`) otomatis diarahkan ke halaman barunya.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:4321, slot placeholder ikut tampil (lihat .env.development)
npm run build    # hasil di dist/, slot placeholder TIDAK tampil
```

## Mengisi data asli

Semua data ada di `src/data/`. Cari kata `PLACEHOLDER`, `DUMMY`, dan `GANTI`.

**`site.ts`**
- `APP_STORE_URL`: link App Store (GANTI).
- Kontak, link legal, dan angka bukti (`PROOF`).

**`packages.ts`** (paket WO)
- `placeholder: true` berarti harga dan rincian masih contoh. Label "Data contoh" tampil di situs sampai diubah ke `false`.
- `includesClass: true` berarti paket termasuk kelas pranikah dan nasihat di aplikasi. Saat ini: Paket Akad, Akad di Masjid, Intimate, Full Package.
- Harga asli: Wedding Planner Rp1,5 jt, Intimate Rp15 jt, Full Package Standard Rp75 jt (300 pax) dan Exclusive Rp95 jt (500 pax). Khitbah, Akad, Akad di Masjid, dan Walimah masih contoh.
- `ADDONS`, harga per tamu tambahan, `RUNDOWN`, dan `WO_STEPS` masih contoh.

**`venues.ts`** (tempat mitra)
- Seluruhnya contoh dengan nama generik. Ganti dengan data mitra resmi lalu set `placeholder: false`.

**`people.ts`**
- `ASATIDZ`: nama dan topik kajian. **Foto di `src/assets/asatidz/` sementara diambil dari thumbnail kajian publik di YouTube.** Ganti dengan foto resmi berizin, dengan nama file yang sama.
- `STORIES`: testimoni. Data asli yang sudah publik: kisah F & N (Instagram) dan ulasan Google Play (M. Dimas Maulana, Afni). Slot `placeholder: true` hanya tampil saat `npm run dev`. Isi `by`, `quote`, `source`, `meta`, lalu set `placeholder: false` agar tampil di situs.

**`content.ts`**
- `BENEFITS`: benefit sebelum/setelah menikah, masih usulan. Selama `BENEFITS_NOTE` tidak kosong, catatan "sedang disiapkan" ikut tampil.
- `SYARI_STANDARDS`: standar syar'i, masih usulan (konfirmasi ke tim WO).
- FAQ aplikasi dan WO.

**Foto lain** ada di `src/assets/photos/` (Unsplash, sumbernya di `src/data/images.ts`). Untuk mengganti, timpa file dengan nama yang sama.

## Kualitas yang sudah dicek

- axe-core 4.10.3 (WCAG 2.0/2.1/2.2 A dan AA + best-practice): 0 pelanggaran di 15 halaman, pada lebar 390 dan 1440.
- Kontras teks di atas foto diukur dari piksel, dengan kondisi terburuk: judul minimal 5,26:1 dan paragraf minimal 8,41:1.
- Tanpa overflow horizontal di 320 sampai 1440 px.
- 19 uji interaksi lolos: pencari → katalog terfilter, filter budget dan sinkronisasi URL, "Tempat saja" → halaman tempat, filter tempat, estimator dan pesan WhatsApp, demo anti-ghosting, demo foto privat, FAQ, baris geser, lensa hero, band Persimpangan, menu mobile.
- Reduced motion dihormati. Animasi kursor hanya aktif di pointer presisi.

## Struktur

```
src/
  data/        site, packages, venues, people (asatidz + cerita), content (benang, benefit, standar, FAQ), images
  components/  Finder, NeedIndex, Journey (benang), CrossBand (persimpangan), PackageCard, VenueCard, UstadzCard,
               StoryCard, Benefits, Header, Footer, Logo, Icon, Phone, StoreBadges, Faq, DownloadBlock
  scripts/     motion, base, lens, cross, journey, preview, drag-row, catalog, estimator, ghost, photo-lock
  pages/       index, layanan/, tempat/, asatidz, cerita, aplikasi, tentang, 404
legacy/        situs versi 20 September 2026 (tidak di-deploy)
```
