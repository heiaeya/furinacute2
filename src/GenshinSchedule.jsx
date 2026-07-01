import { useState } from "react";
import "./GenshinSchedule.css";
import { getUpcomingSchedule } from "./genshinSchedule.js";

export default function GenshinSchedule() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(8);

  const schedule = getUpcomingSchedule(count);

  return (
    <div className="gs-wrap">
      <button className="gs-toggle-btn" onClick={() => setOpen((o) => !o)}>
        {open ? "Tutup Jadwal Update" : "📅 Lihat Jadwal Update Genshin"}
      </button>

      {open && (
        <div className="gs-panel">
          <div className="gs-panel-head">
            <h3 className="gs-panel-title">Perkiraan Jadwal Update</h3>
            <div className="gs-count-control">
              <label htmlFor="gs-count">Jumlah versi:</label>
              <input
                id="gs-count"
                type="number"
                min={1}
                max={30}
                value={count}
                onChange={(e) =>
                  setCount(Math.min(30, Math.max(1, parseInt(e.target.value, 10) || 1)))
                }
              />
            </div>
          </div>

          <p className="gs-disclaimer">
            Perkiraan berdasarkan pola siklus 42 hari (update tiap Rabu, livestream
            12 hari sebelumnya tiap Jumat). Bisa berubah sewaktu-waktu kalau ada
            event khusus, libur panjang, atau pengumuman resmi dari HoYoverse.
          </p>

          <div className="gs-table">
            <div className="gs-table-header">
              <span>#</span>
              <span>Livestream</span>
              <span>Update</span>
            </div>
            {schedule.map((item) => (
              <div className="gs-table-row" key={item.version}>
                <span className="gs-version">v{item.version}</span>
                <span className="gs-live">🔴 {item.livestreamDateLabel}</span>
                <span className="gs-update">🟢 {item.updateDateLabel}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
