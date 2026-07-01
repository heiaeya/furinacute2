# Furinacute — Primogem Forecast

Kalkulator estimasi Primogem/pull Genshin Impact, plus perkiraan jadwal update & livestream, dibangun pakai React + Vite.

🔗 **Live demo:** [furinacute.vercel.app](https://furinacute.vercel.app)

---

## ✨ Fitur

### 1. Primogem Forecast Calculator
Hitung berapa banyak pull (wish) yang bakal kamu punya sampai tanggal tertentu, berdasarkan:

- **Resource yang sudah kamu punya sekarang** — Genesis Crystal, Primogem, dan Intertwined Fate (dikonversi otomatis ke total pull).
- **Sumber primogem yang bisa dicentang/uncentang sesuai kebutuhan:**
  | Sumber | Jumlah | Catatan |
  |---|---|---|
  | Daily Commission | 60 primogem/hari | Asumsi 4 commission harian diklaim penuh |
  | Blessing of the Welkin Moon | 90 primogem/hari | Perlu Welkin aktif |
  | Stardust Exchange | 5 pull/bulan | Ditukar via Paimon's Bargains |
  | Spiral Abyss | 800 primogem/reset, reset tiap tanggal 16 | Asumsi full clear 36★ |
  | Imaginarium Theater | 800 primogem/reset, reset tiap tanggal 1 | Asumsi full clear |
  | Arcane Chamber (opsional, ikut Theater) | +200 primogem (2 stage × 100) | Hanya aktif kalau Imaginarium Theater juga dicentang — total jadi 1000/reset |

- Hasil akhir menampilkan breakdown tiap sumber + total estimasi pull.

### 2. Jadwal Update & Livestream Genshin Impact
- Menampilkan perkiraan tanggal **livestream** dan **update versi** berikutnya.
- Dihitung otomatis berdasarkan pola siklus historis: **setiap update berjarak 42 hari (6 minggu)**, selalu hari **Rabu**, dan livestream **12 hari sebelumnya**, selalu hari **Jumat**.
- Jumlah versi ke depan yang ditampilkan bisa diatur (default 8).
- Ada disclaimer bahwa jadwal bisa berubah sewaktu-waktu (event khusus, libur, atau pengumuman resmi HoYoverse).

### 3. Error Boundary Manual
`index.html` dan `main.jsx` dilengkapi penangkap error global (`window.onerror`, `unhandledrejection`, dan try/catch di render) yang menampilkan pesan error langsung di layar (bukan cuma di console). Ini mempermudah debugging saat deploy, terutama dari perangkat yang tidak punya akses mudah ke DevTools (misal HP).

---

## 🗂️ Struktur Proyek

```
furinacute/
├── index.html                  # Entry HTML + error catcher global
├── package.json
├── vite.config.js
├── public/
│   └── img/furinaicon.png      # Favicon
└── src/
    ├── main.jsx                 # Entry point React + error boundary
    ├── App.jsx                  # Root komponen
    ├── index.css                # Reset CSS global
    ├── PrimogemCalculator.jsx   # UI kalkulator utama
    ├── PrimogemCalculator.css   # Styling kalkulator
    ├── primogemCalc.js          # Semua logic & konstanta perhitungan primogem
    ├── Field.jsx                # Komponen input angka (reusable)
    ├── Row.jsx                  # Komponen baris hasil (reusable)
    ├── GenshinSchedule.jsx      # UI jadwal update & livestream
    ├── GenshinSchedule.css      # Styling jadwal
    └── genshinSchedule.js       # Logic perhitungan tanggal update/livestream
```

**Prinsip pemisahan kode:** logic murni (perhitungan, konstanta) dipisah dari komponen UI, dan styling dipisah ke file `.css` masing-masing — bukan inline style — supaya mudah dibaca, di-maintain, dan di-reuse.

---

## 🚀 Menjalankan di Lokal

Pastikan sudah terinstall [Node.js](https://nodejs.org/) (versi 18+ disarankan).

```bash
# 1. Clone repo
git clone https://github.com/<username>/furinacute.git
cd furinacute

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser.

### Build untuk produksi
```bash
npm run build
```
Hasil build akan ada di folder `dist/`.

### Preview hasil build
```bash
npm run preview
```

---

## ☁️ Deploy

### Vercel (direkomendasikan)
1. Import repo ke [vercel.com](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build` (default), Output Directory: `dist` (default).
4. Deploy — Vercel akan otomatis build ulang setiap kali ada push ke branch utama.

### GitHub Pages
Karena GitHub Pages hanya bisa serve file statis (tidak bisa menjalankan `vite build` secara langsung), dibutuhkan **GitHub Actions** untuk build otomatis sebelum deploy. Pastikan:
- `vite.config.js` punya `base: "/nama-repo/"` sesuai nama repository.
- Di repo Settings → Pages → Source dipilih **"GitHub Actions"** (bukan "Deploy from branch").
- Ada workflow `.github/workflows/deploy.yml` yang menjalankan `npm install && npm run build`, lalu upload folder `dist/` sebagai artifact ke GitHub Pages.

---

## ⚙️ Konstanta yang Bisa Disesuaikan

Semua angka & aturan perhitungan ada di dua file berikut, tinggal diubah kalau ada perubahan mekanik game dari update Genshin Impact berikutnya:

**`src/primogemCalc.js`**
```js
RESOURCE_PER_ROLL          // 160 — resource per 1 pull
DAILY_COMMISSION_PER_DAY   // 60
WELKIN_PER_DAY              // 90
STARDUST_PULLS_PER_MONTH    // 5
SPIRAL_ABYSS_RESET_DAYS     // [16]
SPIRAL_ABYSS_PER_RESET      // 800
THEATER_RESET_DAYS          // [1]
THEATER_PER_RESET           // 800
ARCANE_STAGE_COUNT          // 2
ARCANE_PER_STAGE            // 100
```

**`src/genshinSchedule.js`**
```js
CYCLE_DAYS               // 42 — jarak antar update (hari)
LIVESTREAM_OFFSET_DAYS   // 12 — livestream sebelum update (hari)
ANCHOR_UPDATE            // tanggal update yang sudah dikonfirmasi, jadi patokan hitung mundur/maju
```

---

## ⚠️ Disclaimer

Semua angka di kalkulator ini adalah **estimasi berdasarkan asumsi umum** (full clear di setiap mode, commission diklaim penuh setiap hari, dsb). Hasil sebenarnya bisa berbeda tergantung progres akun masing-masing. Jadwal update & livestream juga merupakan **perkiraan berdasarkan pola historis**, bukan jadwal resmi dari HoYoverse — selalu cek pengumuman resmi in-game atau media sosial resmi Genshin Impact untuk info paling akurat.

Genshin Impact adalah trademark milik HoYoverse. Proyek ini adalah fan-made tool dan tidak berafiliasi dengan HoYoverse.

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Vanilla CSS (tanpa framework CSS eksternal)
