"use client";

import { useState, useEffect } from "react";

export default function RegistrationModal({ isOpen, onClose, initialData }) {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Early Bird Runner");
  const [quantity, setQuantity] = useState(1);
  const [jerseySizes, setJerseySizes] = useState(["L"]);

  // Set initial data if provided
  useEffect(() => {
    if (initialData) {
      if (initialData.category) setCategory(initialData.category);
      if (initialData.quantity) {
        setQuantity(initialData.quantity);
        // Initialize jersey size array with L for the quantity
        setJerseySizes(Array(initialData.quantity).fill("L"));
      }
    }
  }, [initialData, isOpen]);

  // Sync jersey sizes array length with quantity
  useEffect(() => {
    setJerseySizes((prev) => {
      const next = [...prev];
      if (next.length < quantity) {
        return [...next, ...Array(quantity - next.length).fill("L")];
      } else if (next.length > quantity) {
        return next.slice(0, quantity);
      }
      return next;
    });
  }, [quantity]);

  if (!isOpen) return null;

  // Pricing Logic
  const prices = {
    "Early Bird Runner": 155000,
    "Presale Runner": 165000,
    "Regular Runner": 175000,
    "Speed Run Early Bird": 165000,
    "Speed Run Presale": 180000,
    "Speed Run Regular": 190000,
  };

  const getPriceDetails = () => {
    const unitPrice = prices[category] || 155000;
    const subtotal = unitPrice * quantity;
    let discountPercent = 0;
    let freeTickets = 0;

    // Community discount (does not apply to Early Bird tickets)
    const isEarlyBird = category.includes("Early Bird");
    if (!isEarlyBird) {
      if (quantity >= 20) {
        discountPercent = 12;
        freeTickets = 1;
      } else if (quantity >= 15) {
        discountPercent = 9;
        freeTickets = 1;
      } else if (quantity >= 10) {
        discountPercent = 6;
      } else if (quantity >= 5) {
        discountPercent = 3;
      }
    }

    // Size surcharge (+5000 for sizes >XL: XXL, 2XL, 3XL, 4XL, 5XL)
    let sizeSurcharge = 0;
    jerseySizes.forEach((size) => {
      if (["XXL", "2XL", "3XL", "4XL", "5XL"].includes(size)) {
        sizeSurcharge += 5000;
      }
    });

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const total = subtotal - discountAmount + sizeSurcharge;

    return {
      unitPrice,
      subtotal,
      discountPercent,
      discountAmount,
      sizeSurcharge,
      freeTickets,
      total,
    };
  };

  const priceDetails = getPriceDetails();

  const handleSizeChange = (index, val) => {
    const next = [...jerseySizes];
    next[index] = val;
    setJerseySizes(next);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("1730015051494");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleWhatsAppSubmit = () => {
    const details = priceDetails;
    const sizesString = jerseySizes.map((s, i) => `Runner ${i + 1}: ${s}`).join(", ");
    
    // Construct text message
    const message = `Halo Panitia *UBP RUN 2026*, saya ingin mendaftar dengan rincian berikut:

📌 *DATA PENDAFTAR:*
• *Nama Lengkap:* ${name}
• *Email:* ${email}
• *No. WhatsApp:* ${phone}

🏃‍♂️ *DETAIL TIKET:*
• *Kategori:* ${category}
• *Jumlah Tiket:* ${quantity} pax
• *Ukuran Jersey:* ${sizesString}
${details.freeTickets > 0 ? `• *Bonus Tiket:* +${details.freeTickets} Tiket Regular Runner (Gratis)\n` : ""}
💸 *RINCIAN BIAYA:*
• *Subtotal:* ${formatRupiah(details.subtotal)}
• *Potongan Diskon (${details.discountPercent}%):* -${formatRupiah(details.discountAmount)}
• *Biaya Tambahan Jersey (>XL):* +${formatRupiah(details.sizeSurcharge)}
• *TOTAL TRANSFER:* *${formatRupiah(details.total)}*

💳 *METODE PEMBAYARAN:*
• Mandiri Transfer (1730015051494 a.n. SAFANA NUR ASFARANI)

_Saya akan mengirimkan bukti transfer berupa foto/screenshot setelah pesan ini. Mohon segera dikonfirmasi. Terima kasih!_`;

    // Target WA number (Rima or Azriel)
    // Rima: +62 899-0681-145 -> 628990681145
    const waNumber = "628990681145";
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, "_blank");
    onClose();
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
  };

  const jerseySizesList = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

  return (
    <div className="modal-overlay">
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(30, 22, 60, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
          animation: overlayFadeIn 0.3s ease;
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-box {
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 30px;
          border-color: rgba(109, 40, 217, 0.15);
          box-shadow: 0 25px 50px rgba(109, 40, 217, 0.12), 0 0 40px rgba(109, 40, 217, 0.08);
          animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(109, 40, 217, 0.15);
          background: rgba(255, 255, 255, 0.6);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.85);
          color: var(--primary-pink);
          border-color: var(--primary-pink);
        }
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 25px;
        }
        .step-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-muted);
          transition: all 0.3s ease;
        }
        .step-dot.active {
          background: var(--primary-purple);
          box-shadow: 0 0 10px rgba(109, 40, 217, 0.3);
          transform: scale(1.3);
        }
        .step-dot.completed {
          background: var(--primary-pink);
        }
        .modal-title {
          font-size: 1.6rem;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .sizes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 12px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(109, 40, 217, 0.12);
          border-radius: 12px;
          padding: 16px;
        }
        .action-bar {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        .action-bar button {
          flex: 1;
        }
        .copy-toast {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--primary-purple);
          color: #ffffff;
          font-family: var(--font-outfit);
          font-weight: 800;
          padding: 8px 16px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(109, 40, 217, 0.3);
          pointer-events: none;
          z-index: 20;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .summary-card {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(109, 40, 217, 0.12);
          border-radius: 16px;
          padding: 20px;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.95rem;
        }
        .summary-item:last-child {
          margin-bottom: 0;
        }
        .summary-label {
          color: var(--text-secondary);
        }
        .summary-value {
          color: #ffffff;
          font-weight: 600;
          text-align: right;
        }
      `}</style>

      <div className="glass-card modal-box">
        <button className="close-btn" onClick={onClose} aria-label="Tutup">
          ✕
        </button>

        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? (step > 1 ? "completed" : "active") : ""}`} />
          <div className={`step-dot ${step >= 2 ? (step > 2 ? "completed" : "active") : ""}`} />
          <div className={`step-dot ${step >= 3 ? "active" : ""}`} />
        </div>

        {/* STEP 1: PARTICIPANT INFORMATION */}
        {step === 1 && (
          <div>
            <h3 className="modal-title">Data Pendaftar</h3>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Alamat Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Nomor WhatsApp</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="Contoh: 08990681145"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "15px" }}>
                <div className="input-group">
                  <label className="input-label">Kategori Lari</label>
                  <select
                    className="input-field select-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Early Bird Runner">Early Bird Runner (Rp155.000)</option>
                    <option value="Presale Runner">Presale Runner (Rp165.000)</option>
                    <option value="Regular Runner">Regular Runner (Rp175.000)</option>
                    <option value="Speed Run Early Bird">Speed Run Early Bird (Rp165.000)</option>
                    <option value="Speed Run Presale">Speed Run Presale (Rp180.000)</option>
                    <option value="Speed Run Regular">Speed Run Regular (Rp190.000)</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Jumlah Tiket</label>
                  <input
                    type="number"
                    className="input-field"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Ukuran Jersey ({quantity} pax)</label>
                <div className="sizes-grid">
                  {jerseySizes.map((sz, idx) => (
                    <div key={idx} className="input-group" style={{ gap: "4px" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Peserta {idx + 1}</span>
                      <select
                        className="input-field select-field"
                        style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                        value={sz}
                        onChange={(e) => handleSizeChange(idx, e.target.value)}
                      >
                        {jerseySizesList.map((s) => (
                          <option key={s} value={s}>
                            {s} {["XXL", "2XL", "3XL", "4XL", "5XL"].includes(s) ? "(+Rp5k)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="action-bar">
              <button
                className="btn-neon"
                onClick={() => {
                  if (name.trim() && email.trim() && phone.trim()) {
                    setStep(2);
                  } else {
                    alert("Mohon isi semua data pendaftar terlebih dahulu.");
                  }
                }}
              >
                Lanjutkan Ke Pembayaran
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT & BANK DETAILS */}
        {step === 2 && (
          <div>
            <h3 className="modal-title">Rincian Pembayaran</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textAlign: "center", marginBottom: "20px" }}>
              Silakan lakukan transfer pembayaran ke rekening Mandiri berikut. Klik kartu untuk menyalin nomor rekening.
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px", position: "relative" }}>
              <div className="bank-card" onClick={handleCopyAccount}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="bank-card-logo">MANDIRI</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--primary-cyan)", fontWeight: "700", border: "1px solid var(--primary-cyan)", padding: "2px 6px", borderRadius: "4px" }}>DEBIT</span>
                  </div>
                  <div className="bank-card-chip" style={{ marginTop: "15px" }} />
                </div>

                <div>
                  <div className="bank-card-number">1730 0150 5149 4</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div className="bank-card-holder">Card Holder</div>
                      <div className="bank-card-name">SAFANA NUR ASFARANI</div>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>TAP TO COPY</span>
                  </div>
                </div>
              </div>

              {copied && <div className="copy-toast">Nomor Rekening Disalin!</div>}
            </div>

            <div className="summary-card" style={{ marginBottom: "25px" }}>
              <div className="summary-item">
                <span className="summary-label">Kategori Lari</span>
                <span className="summary-value">{category}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Jumlah Pendaftar</span>
                <span className="summary-value">{quantity} Orang</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Harga Satuan</span>
                <span className="summary-value">{formatRupiah(priceDetails.unitPrice)}</span>
              </div>

              {priceDetails.discountPercent > 0 && (
                <div className="summary-item" style={{ color: "var(--primary-pink)" }}>
                  <span className="summary-label" style={{ color: "var(--primary-pink)" }}>Potongan Diskon ({priceDetails.discountPercent}%)</span>
                  <span className="summary-value">-{formatRupiah(priceDetails.discountAmount)}</span>
                </div>
              )}

              {priceDetails.sizeSurcharge > 0 && (
                <div className="summary-item" style={{ color: "var(--primary-cyan)" }}>
                  <span className="summary-label" style={{ color: "var(--primary-cyan)" }}>Biaya Tambahan Ukuran Jersey</span>
                  <span className="summary-value">+{formatRupiah(priceDetails.sizeSurcharge)}</span>
                </div>
              )}

              <div className="summary-item" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.15)", paddingTop: "12px", marginTop: "8px" }}>
                <span className="summary-label" style={{ color: "#ffffff", fontWeight: "700", fontSize: "1.1rem" }}>Total Transfer</span>
                <span className="summary-value" style={{ color: "var(--primary-cyan)", fontWeight: "800", fontSize: "1.2rem" }}>
                  {formatRupiah(priceDetails.total)}
                </span>
              </div>
            </div>

            <div className="action-bar">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                Kembali
              </button>
              <button className="btn-neon" onClick={() => setStep(3)}>
                Saya Sudah Transfer
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMATION & WHATSAPP REDIRECT */}
        {step === 3 && (
          <div>
            <h3 className="modal-title">Konfirmasi Akhir</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textAlign: "center", marginBottom: "20px" }}>
              Periksa kembali data pendaftaran Anda. Klik tombol di bawah untuk mengirim data dan bukti transfer langsung ke panitia via WhatsApp.
            </p>

            <div className="summary-card" style={{ marginBottom: "25px" }}>
              <div className="summary-item">
                <span className="summary-label">Nama Lengkap</span>
                <span className="summary-value">{name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">WhatsApp</span>
                <span className="summary-value">{phone}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Kategori & Jumlah</span>
                <span className="summary-value">{category} ({quantity} Tiket)</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Ukuran Jersey</span>
                <span className="summary-value" style={{ fontSize: "0.85rem", whiteSpace: "normal" }}>
                  {jerseySizes.join(", ")}
                </span>
              </div>
              <div className="summary-item" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.15)", paddingTop: "12px", marginTop: "8px" }}>
                <span className="summary-label" style={{ color: "#ffffff", fontWeight: "700" }}>Total Transfer</span>
                <span className="summary-value" style={{ color: "var(--primary-cyan)", fontWeight: "800" }}>
                  {formatRupiah(priceDetails.total)}
                </span>
              </div>
            </div>

            <div className="action-bar">
              <button className="btn-secondary" onClick={() => setStep(2)}>
                Kembali
              </button>
              <button className="btn-neon" onClick={handleWhatsAppSubmit}>
                Kirim via WhatsApp 💬
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
