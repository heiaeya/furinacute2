// ============ JADWAL UPDATE GENSHIN IMPACT ============
// Pola dari histori: tiap update berjarak 42 hari (6 minggu), selalu hari Rabu.
// Livestream selalu 12 hari sebelum update, selalu hari Jumat.
// Anchor date di bawah adalah salah satu update yang sudah dikonfirmasi.

export const CYCLE_DAYS = 42;
export const LIVESTREAM_OFFSET_DAYS = 12;

// Anchor: 1 Juli (Rabu) — sudah dikonfirmasi sesuai histori yang diberikan
const ANCHOR_UPDATE = new Date(2026, 6, 1); // bulan 0-indexed: 6 = Juli

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDate(d) {
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Cari tanggal update PERTAMA yang >= fromDate, berdasarkan kelipatan CYCLE_DAYS dari anchor.
function findFirstUpdateOnOrAfter(fromDate) {
  const anchor = startOfDay(ANCHOR_UPDATE);
  const from = startOfDay(fromDate);
  const diffDays = Math.round((from.getTime() - anchor.getTime()) / 86400000);
  const cyclesPassed = Math.ceil(diffDays / CYCLE_DAYS);
  const result = new Date(anchor);
  result.setDate(result.getDate() + cyclesPassed * CYCLE_DAYS);
  return result;
}

// Generate `count` update berikutnya beserta tanggal livestream-nya, mulai dari fromDate.
export function getUpcomingSchedule(count = 10, fromDate = new Date()) {
  const first = findFirstUpdateOnOrAfter(fromDate);
  const list = [];
  const cursor = new Date(first);

  for (let i = 0; i < count; i++) {
    const updateDate = new Date(cursor);
    const livestreamDate = new Date(updateDate);
    livestreamDate.setDate(livestreamDate.getDate() - LIVESTREAM_OFFSET_DAYS);

    list.push({
      version: i + 1,
      updateDate,
      updateDateLabel: formatDate(updateDate),
      livestreamDate,
      livestreamDateLabel: formatDate(livestreamDate),
    });

    cursor.setDate(cursor.getDate() + CYCLE_DAYS);
  }

  return list;
}
