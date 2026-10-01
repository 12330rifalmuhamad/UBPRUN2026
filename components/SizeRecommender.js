"use client";

import { useState, useEffect } from "react";

export default function SizeRecommender({ onSelectSize }) {
  const [chestWidth, setChestWidth] = useState("");
  const [bodyLength, setBodyLength] = useState("");
  const [recommendedSize, setRecommendedSize] = useState(null);

  // Size chart data sesuai panduan resmi
  const sizeChart = [
    { size: "XS", width: 47, length: 64 },
    { size: "S", width: 49, length: 66 },
    { size: "M", width: 51, length: 68 },
    { size: "L", width: 53, length: 70 },
    { size: "XL", width: 55, length: 72 },
    { size: "XXL", width: 57, length: 74 },
    { size: "3XL", width: 59, length: 78 },
    { size: "4XL", width: 61, length: 80 },
    { size: "5XL", width: 63, length: 80 },
  ];

  useEffect(() => {
    const w = parseFloat(chestWidth);
    const l = parseFloat(bodyLength);

    if (isNaN(w) && isNaN(l)) {
      setRecommendedSize(null);
      return;
    }

    let bestMatch = null;

    // Cari ukuran terkecil yang muat lebar & panjangnya
    for (const item of sizeChart) {
      const matchWidth = isNaN(w) || item.width >= w;
      const matchLength = isNaN(l) || item.length >= l;

      if (matchWidth && matchLength) {
        bestMatch = item.size;
        break;
      }
    }

    // Jika melebihi ukuran tabel, berikan ukuran terbesar (5XL)
    if (!bestMatch && sizeChart.length > 0) {
      bestMatch = sizeChart[sizeChart.length - 1].size;
    }

    setRecommendedSize(bestMatch);
  }, [chestWidth, bodyLength]);

  const handleApplySize = () => {
    if (recommendedSize && onSelectSize) {
      onSelectSize(recommendedSize);
    }
  };

  return (
    <div className="size-recommender-container">
      <style jsx>{`
        .size-recommender-container {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 24px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .size-recommender-container {
            grid-template-columns: 1fr;
          }
        }
        .recommender-card,
        .table-card {
          padding: 28px 24px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 18px;
        }
        @media (max-width: 500px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        .result-box {
          margin-top: 20px;
          padding: 16px 18px;
          background: var(--bg-subtle);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .result-text {
          font-size: 0.88rem;
          color: var(--text-primary);
        }
        .result-badge {
          font-family: var(--font-outfit);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }
        .extra-charge-notice {
          font-size: 0.76rem;
          color: var(--accent);
          margin-top: 4px;
          font-weight: 600;
        }
        .table-section-title {
          font-family: var(--font-outfit);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .price-note {
          font-size: 0.76rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }
        .input-label {
          font-family: var(--font-outfit);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input-field {
          padding: 10px 14px;
          background: #ffffff;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-inter);
          font-size: 0.92rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          width: 100%;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.12);
        }
        .size-badge-pill {
          display: inline-block;
          padding: 2px 8px;
          background: var(--bg-muted);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-outfit);
          font-size: 0.82rem;
        }
        .active-row .size-badge-pill {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
        }
        .info-callout {
          margin-top: 20px;
          padding: 12px 14px;
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--primary);
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>

      {/* Interactive Size Finder Widget */}
      <div className="recommender-card">
        <div>
          <div className="card-header-bar">
            <h4 className="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="15" x2="15" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
              </svg>
              Jersey Size Finder
            </h4>
            <span className="eyebrow-tag">Kalkulator</span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
            Masukkan ukuran baju ternyaman Anda dalam satuan sentimeter untuk mendapatkan rekomendasi ukuran jersey resmi.
          </p>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label" htmlFor="chest-width-input">Lebar Dada (cm)</label>
              <input
                id="chest-width-input"
                type="number"
                className="input-field"
                placeholder="Misal: 53"
                value={chestWidth}
                onChange={(e) => setChestWidth(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="body-length-input">Panjang Baju (cm)</label>
              <input
                id="body-length-input"
                type="number"
                className="input-field"
                placeholder="Misal: 70"
                value={bodyLength}
                onChange={(e) => setBodyLength(e.target.value)}
              />
            </div>
          </div>

          {recommendedSize && (
            <div className="result-box">
              <div className="result-text">
                <div style={{ fontWeight: "700", color: "var(--text-primary)" }}>Rekomendasi Ukuran:</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Berdasarkan lebar {chestWidth || "0"} cm &amp; panjang {bodyLength || "0"} cm
                </div>
                {["XXL", "3XL", "4XL", "5XL"].includes(recommendedSize) && (
                  <div className="extra-charge-notice">
                    * Ukuran di atas XL dikenakan biaya tambahan +Rp5.000,-
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                <span className="result-badge">{recommendedSize}</span>
                {onSelectSize && (
                  <button
                    onClick={handleApplySize}
                    className="btn-secondary"
                    style={{ padding: "5px 10px", fontSize: "0.75rem" }}
                  >
                    Gunakan Ukuran
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="info-callout">
          <strong>Panduan Pengukuran:</strong> Ukur lebar pakaian ternyaman Anda dari jahitan ketiak kiri ke ketiak kanan, dan ukur panjang dari titik bahu tertinggi ke ujung bawah keliman baju.
        </div>
      </div>

      {/* Table Size Chart */}
      <div className="table-card">
        <div>
          <div className="table-section-title">
            <span>Tabel Ukuran Resmi (cm)</span>
            <span className="price-note">&gt;XL dikenakan +Rp5.000,-</span>
          </div>
          <div className="table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Ukuran</th>
                  <th>Lebar</th>
                  <th>Panjang</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((item) => (
                  <tr
                    key={item.size}
                    className={recommendedSize === item.size ? "active-row" : ""}
                  >
                    <td>
                      <span className="size-badge-pill">{item.size}</span>
                    </td>
                    <td>{item.width} cm</td>
                    <td>{item.length} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "12px", lineHeight: 1.45 }}>
          Toleransi jahitan ±1-2 cm. Pastikan ukuran yang Anda pilih sudah sesuai sebelum menyelesaikan formulir di platform Wanatix.
        </p>
      </div>
    </div>
  );
}
