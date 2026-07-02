kasponten project gabut pengangguran aja

tadinya namanya furinacute, tapi cewe gw ngamuk jir yaudalah ganti jadi kasponten, intinya ini tuh kalkulator estimasi Primogem buat lu gacha + perkiraan jadwal update sama livestream

**langsng buka aja** [kasponten.vercel.app](https://kasponten.vercel.app)

---

## Fitur (males nulis jir tapi gapapa)

### 1. kasponten
ngitung lu dpt brapa yaudah gt doang 

- **Resource yang lu pnya sekarang** — Genesis Crystal, Primogem, dan Intertwined Fate (dikonversi otomatis ke total pull).
- **Sumber primogem sesuai kebutuhan:**
  | Sumber | Jumlah | Catatan |
  |---|---|---|
  | Daily Commission | 60 primo/hari | kelarin misi hariannya |
  | Blessing of the Welkin Moon | 90 primo/hari | Harus pnya welkin |
  | Stardust Exchange | 5 pull/bulan | Ditukar via Paimon's Bargains(shop) |
  | Spiral Abyss | 800 primogem/reset, reset tiap tanggal 16 | Asumsi full clear 36★ |
  | Imaginarium Theater | 800 primogem/reset, reset tiap tanggal 1 | Asumsi full clear |
  | Arcane Chamber (opsional, ikut Theater) | +200 primogem (2 stage × 100) | aktof kalai IT dipake total jadi 1000/reset |

- Hasil akhir nampilin tiap sumber + total estimasi pull.

### 2. Jadwal Update & Livestream Genshin Impact
- Menampilkan perkiraan tanggal **livestream** dan **update versi** berikutnya.
- Dihitung otomatis berdasarkan sbelum sbelmnya: **setiap update berjarak 42 hari (6 minggu)**, selalu hari **Rabu**, dan livestream **12 hari sebelumnya**, selalu hari **Jumat**.
- Ga banuak banhak dlu gw taruh sampai 2028 end q3
- Btw jaadwal bisa berubah sewaktu-waktu (event khusus, libur, atau pengumuman resmi HoYoverse).

### 3. Ngecek error (mnga bantuan ai tdi gweh)
`index.html` dan `main.jsx` dilengkapi penangkap error global (`window.onerror`, `unhandledrejection`, dan try/catch di render) yang menampilkan pesan error langsung di layar (bukan cuma di console). Ini mempermudah debugging saat deploy, terutama dari perangkat yang tidak punya akses mudah ke DevTools (misal HP).

---

---

## Menjalankan di Lokal

instal dlu [Node.js](https://nodejs.org/) (versi 18+ disarankan).

```bash
git clone https://github.com/heiaeya/furinacute2.git
cd furinacute2

npm install

npm run dev
```

Buka `http://localhost:5173` di browser.

### Build untuk produksi
```bash
npm run build
```
Hasil build ada di folder `dist/`.

### Preview hasil build
```bash
npm run preview
```

---

## ☁️ Deploy

### Vercel 
1. Import repo ke [vercel.com](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build` (default), Output Directory: `dist` (default).
4. Deploy kelar
---

## ⚠️ Disclaimer

Semua angka di kalkulator ini adalah **estimasi berdasarkan asumsi umum** (full clear di setiap mode, commission diklaim penuh setiap hari, dsb). Hasil sebenarnya bisa berbeda tergantung progres akun masing-masing. Jadwal update & livestream juga merupakan **perkiraan berdasarkan pola sebelum sebelumnya**, bukan jadwal resmi dari HoYoverse — selalu cek

Genshin Impact adalah trademark milik HoYoverse. Project ini adalah project isenggabut dan tidak berafiliasi dengan HoYoverse.

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Vanilla CSS (tanpa framework CSS eksternal)
