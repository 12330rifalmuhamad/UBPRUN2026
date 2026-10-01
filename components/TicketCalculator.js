"use client";

import { useState, useEffect } from "react";

export default function TicketCalculator() {
  const [category, setCategory] = useState("runner"); // "runner" or "speedrun"
  const [period, setPeriod] = useState("early"); // "early", "presale", "regular"
  const [quantity, setQuantity] = useState(1);
  const [priceDetails, setPriceDetails] = useState({
    unitPrice: 155000,
    subtotal: 155000,
    discountPercent: 0,
    discountAmount: 0,
    freeTickets: 0,
    total: 155000,
  });

  // Ticket prices for each category and period
  const prices = {
    runner: {
      early: 155000,
      presale: 165000,
      regular: 175000,
    },
    speedrun: {
      early: 165000,
      presale: 180000,
      regular: 190000,
    }
  };

  const getTicketName = (cat, per) => {
    if (cat === "runner") {
      if (per === "early") return "Early Bird Runner";
      if (per === "presale") return "Presale Runner";
      return "Regular Runner";
    } else {
      if (per === "early") return "Speed Run Early Bird";
      if (per === "presale") return "Speed Run Presale";
      return "Speed Run Regular";
    }
  };

  useEffect(() => {
    const unitPrice = prices[category][period];
    const subtotal = unitPrice * quantity;
    
    let discountPercent = 0;
    let freeTickets = 0;

    // Community Discount Logic (does not apply to Early Bird)
    const isEarlyBird = period === "early";
    if (!isEarlyBird) {
      if (quantity >= 20) {
        discountPercent = 12;
        freeTickets = 1;
      } else if (quantity >= 15) {
        discountPercent = 9;
        freeTickets = 1;
      } else if (quantity >= 10) {
        discountPercent = 6;
        freeTickets = 0;
      } else if (quantity >= 5) {
        discountPercent = 3;
        freeTickets = 0;
      }
    }

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const total = subtotal - discountAmount;

    setPriceDetails({
      unitPrice,
      subtotal,
      discountPercent,
      discountAmount,
      freeTickets,
      total,
    });
  }, [category, period, quantity]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="glass-card calculator-container" style={{ padding: "30px", marginTop: "30px" }}>
      <style jsx>{`
        .calculator-container {
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 5;
          border-color: rgba(109, 40, 217, 0.15);
        }
        .calc-header {
          text-align: center;
          margin-bottom: 25px;
        }
        .calc-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .calc-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .calc-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 25px;
        }
        .toggle-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .toggle-options {
          display: flex;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(109, 40, 217, 0.15);
          border-radius: 12px;
          padding: 4px;
        }
        .toggle-btn {
          flex: 1;
          padding: 12px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-outfit);
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .toggle-btn.active {
          background: linear-gradient(135deg, var(--primary-purple), var(--primary-pink));
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(109, 40, 217, 0.25);
        }
        .qty-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .qty-controls {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(109, 40, 217, 0.15);
          border-radius: 12px;
          padding: 4px;
        }
        .qty-btn {
          width: 44px;
          height: 44px;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .qty-btn:hover {
          background: rgba(255, 255, 255, 0.85);
          color: var(--primary-purple);
        }
        .qty-display {
          flex: 1;
          text-align: center;
          font-family: var(--font-outfit);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .summary-box {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(109, 40, 217, 0.12);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 25px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed rgba(109, 40, 217, 0.15);
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .summary-row:last-of-type {
          border-bottom: none;
        }
        .summary-row.total-row {
          border-top: 1px solid rgba(109, 40, 217, 0.15);
          padding-top: 15px;
          margin-top: 5px;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-outfit);
        }
        .summary-row.total-row .val {
          color: var(--primary-purple);
          text-shadow: 0 0 10px rgba(109, 40, 217, 0.15);
        }
        .discount-badge {
          background: rgba(255, 0, 127, 0.15);
          color: var(--primary-pink);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid rgba(255, 0, 127, 0.25);
        }
        .free-badge {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary-cyan);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid rgba(0, 240, 255, 0.25);
        }
        .promo-banner {
          font-size: 0.85rem;
          color: var(--primary-cyan);
          text-align: center;
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
      `}</style>

      <div className="calc-header">
        <h3 className="calc-title">Kalkulator Tiket & Promo</h3>
        <p className="calc-subtitle">Hitung biaya pendaftaran Anda dan dapatkan diskon komunitas otomatis!</p>
      </div>

      <div className="calc-grid">
        {/* Category Choice */}
        <div className="toggle-container">
          <span className="input-label">Kategori Lari</span>
          <div className="toggle-options">
            <button
              className={`toggle-btn ${category === "runner" ? "active" : ""}`}
              onClick={() => setCategory("runner")}
            >
              Runner
            </button>
            <button
              className={`toggle-btn ${category === "speedrun" ? "active" : ""}`}
              onClick={() => setCategory("speedrun")}
            >
              Speed Run ⚡
            </button>
          </div>
        </div>

        {/* Period Choice */}
        <div className="toggle-container">
          <span className="input-label">Periode Tiket</span>
          <div className="toggle-options">
            <button
              className={`toggle-btn ${period === "early" ? "active" : ""}`}
              onClick={() => setPeriod("early")}
            >
              Early Bird 🎟️
            </button>
            <button
              className={`toggle-btn ${period === "presale" ? "active" : ""}`}
              onClick={() => setPeriod("presale")}
            >
              Presale 🎟️
            </button>
            <button
              className={`toggle-btn ${period === "regular" ? "active" : ""}`}
              onClick={() => setPeriod("regular")}
            >
              Regular 🏃
            </button>
          </div>
        </div>

        {/* Quantity Choice */}
        <div className="qty-container">
          <span className="input-label">Jumlah Tiket</span>
          <div className="qty-controls">
            <button
              className="qty-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="qty-display">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="summary-box">
        <div className="summary-row">
          <span>Kategori & Tiket</span>
          <span style={{ color: "#ffffff", fontWeight: "600" }}>
            {getTicketName(category, period)}
          </span>
        </div>
        <div className="summary-row">
          <span>Harga Satuan</span>
          <span style={{ color: "#ffffff" }}>{formatRupiah(priceDetails.unitPrice)}</span>
        </div>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatRupiah(priceDetails.subtotal)}</span>
        </div>
        
        {priceDetails.discountPercent > 0 && (
          <div className="summary-row" style={{ color: "var(--primary-pink)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              Diskon Komunitas <span className="discount-badge">-{priceDetails.discountPercent}%</span>
            </span>
            <span>-{formatRupiah(priceDetails.discountAmount)}</span>
          </div>
        )}

        {priceDetails.freeTickets > 0 && (
          <div className="summary-row" style={{ color: "var(--primary-cyan)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              Bonus Tiket <span className="free-badge">GRATIS</span>
            </span>
            <span>+{priceDetails.freeTickets} Tiket Regular Runner (Gratis)</span>
          </div>
        )}

        <div className="summary-row total-row">
          <span>Total Pembayaran</span>
          <span className="val">{formatRupiah(priceDetails.total)}</span>
        </div>
      </div>

      <a
        href="https://wanatix.id"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-neon"
        style={{ display: "inline-flex", width: "100%", padding: "16px", fontSize: "1.1rem", textDecoration: "none", justifyContent: "center", alignItems: "center" }}
      >
        Daftar di Wanatix.id 🎟️
      </a>

      {period === "early" ? (
        <div className="promo-banner" style={{ color: "var(--text-muted)" }}>
          <span>* Diskon komunitas tidak berlaku untuk tiket Early Bird</span>
        </div>
      ) : quantity >= 5 ? (
        <div className="promo-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Diskon komunitas sebesar {priceDetails.discountPercent}% telah diterapkan!</span>
        </div>
      ) : (
        <div className="promo-banner" style={{ color: "var(--text-muted)" }}>
          <span>Beli minimal 5 tiket untuk mendapatkan diskon komunitas (3% - 12%)</span>
        </div>
      )}
    </div>
  );
}
