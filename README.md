# 🌿 CarbonEx — Verified Carbon Credit Trading Platform

> **HACKHAZARDS '26 Submission** · Climate & Sustainability Systems

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-22c55e?style=for-the-badge)](https://carbonex.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Built With React](https://img.shields.io/badge/Built%20With-React%20%2B%20Vite-61dafb?style=for-the-badge)](https://vitejs.dev)

---

## 🌍 The Problem

The voluntary carbon market is worth **$2 billion** and growing — but it's broken.

- Buyers can't verify the legitimacy of credits before purchasing
- Sellers (often conservation projects in developing nations) lack direct market access
- Retirement and offset claims are opaque and hard to audit
- Fragmented standards (Verra, Gold Standard, ACR) create confusion

**The result?** Greenwashing thrives. Real climate projects go underfunded.

---

## 💡 The Solution

**CarbonEx** is a transparent, end-to-end carbon credit trading platform that connects verified project developers directly with buyers — individuals, startups, and enterprises — who want to offset their emissions with confidence.

Every credit on CarbonEx is:
- ✅ Verified against Verra VCS, Gold Standard, or ACR
- 📋 Traceable to a specific project, vintage year, and methodology
- 🏅 Retirable with a serialized certificate published on-chain

---

## ✨ Features

### 📊 Live Carbon Market
- Real-time price feed ticker across 8+ project types
- Sparkline price history charts per listing
- Filter by project type, certification standard, and country
- Sort by price, % change, or available volume

### 🔍 Verified Project Listings
- REDD+ (Avoided Deforestation)
- ARR (Afforestation, Reforestation & Revegetation)
- Blue Carbon (Mangrove Restoration)
- Renewable Energy (Solar, Wind)
- Clean Cookstoves
- Each listing shows SDG alignment, methodology, vintage year, and third-party auditor

### 💹 Trade Flow
- Buy or sell credits in a 3-step guided modal
- Real-time total + platform fee (0.5%) calculation
- Transaction hash receipt on confirmation
- Wallet balance updates instantly

### 🗂️ Portfolio Dashboard
- Holdings with average buy price and live P&L
- Total portfolio value and CO₂e held
- Full activity feed with transaction history

### 🏅 Credit Retirement
- Permanently retire credits to offset emissions
- Specify purpose, beneficiary, and project
- Receive a serialized retirement certificate (CXRET-YYYY-XXXXX)
- Credits burned from circulation — provable and permanent

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Pure CSS-in-JS (zero dependencies) |
| Charts | Custom SVG sparklines |
| Deployment | Vercel |
| State | React useState (local) |

> Designed to be lightweight, fast, and deployable anywhere — no backend required for the demo.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/RanakGit/CarbonEx.git
cd CarbonEx

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
CarbonEx/
├── index.html          # Entry HTML
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
└── src/
    ├── main.jsx        # React root mount
    └── App.jsx         # Full application (CarbonEx platform)
```

---

## 🌱 SDG Alignment

CarbonEx directly supports the following UN Sustainable Development Goals:

| SDG | Goal |
|-----|------|
| 🎯 SDG 7 | Affordable and Clean Energy |
| 🎯 SDG 13 | Climate Action |
| 🎯 SDG 14 | Life Below Water |
| 🎯 SDG 15 | Life on Land |
| 🎯 SDG 1 | No Poverty (via smallholder farmer projects) |

---

## 🗺️ Roadmap

- [ ] Wallet connect (MetaMask / WalletConnect)
- [ ] On-chain credit issuance via smart contracts (ERC-1155)
- [ ] KYB/KYC verification for sellers
- [ ] Real-time price oracle integration
- [ ] Mobile app (React Native)
- [ ] API for enterprise bulk purchases
- [ ] Automated MRV (Monitoring, Reporting & Verification) dashboard

---

## 👤 Author

**Ranak**
Built for HACKHAZARDS '26 — Climate & Sustainability Systems track

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built with 🌿 for the planet · HACKHAZARDS '26</strong>
</div>
description: "Planting native species across degraded Sahel lands, supporting 3,200 smallholder farmers.",
    sdgs: [1, 2, 13, 15], verified: true, co2e: 5800,
    lat: 17.0, lng: -2.0
  },
  {
    id: "L003", seller: "Maharashtra Solar Collective", country: "India",
    type: "Renewable Energy", standard: "Gold Standard", vintage: 2023,
    available: 28000, price: 9.15, change: +0.3,
    methodology: "Solar PV Grid Injection", rating: "Standard",
    description: "Community-owned 40MW solar plant displacing coal generation in Maharashtra grid.",
    sdgs: [7, 8, 13], verified: true, co2e: 28000,
    lat: 19.7, lng: 75.7
  },
  {
    id: "L004", seller: "Blue Carbon Pacific", country: "Indonesia",
    type: "Blue Carbon", standard: "Verra VCS", vintage: 2024,
    available: 3100, price: 42.00, change: +5.7,
    methodology: "Mangrove Restoration", rating: "Premium",
    description: "Restoring 6,200 ha of mangroves across Kalimantan coast — sequestering at 5x forest rates.",
    sdgs: [14, 13, 15], verified: true, co2e: 3100,
    lat: -1.0, lng: 116.0
  },
  {
    id: "L005", seller: "Great Plains Wind Trust", country: "USA",
    type: "Renewable Energy", standard: "ACR", vintage: 2024,
    available: 45000, price: 7.80, change: -1.2,
    methodology: "Wind Energy Generation", rating: "Standard",
    description: "180MW wind farm in Kansas displacing natural gas peakers. Additionality verified.",
    sdgs: [7, 13], verified: true, co2e: 45000,
    lat: 38.7, lng: -98.3
  },
  {
    id: "L006", seller: "Congo Basin Forest Fund", country: "DRC",
    type: "REDD+", standard: "Verra VCS", vintage: 2023,
    available: 7200, price: 21.50, change: +1.4,
    methodology: "Improved Forest Management", rating: "Gold",
    description: "Community-managed forests protecting 120,000 ha of Congo Basin biodiversity.",
    sdgs: [13, 15, 10], verified: true, co2e: 7200,
    lat: -2.5, lng: 23.5
  },
  {
    id: "L007", seller: "Patagonia Carbon Reserve", country: "Chile",
    type: "ARR", standard: "Gold Standard", vintage: 2024,
    available: 2900, price: 31.20, change: +3.9,
    methodology: "Temperate Forest Restoration", rating: "Gold",
    description: "Rewilding 15,000 ha of degraded Patagonian steppe with native Valdivian forest species.",
    sdgs: [15, 13, 6], verified: true, co2e: 2900,
    lat: -45.0, lng: -71.5
  },
  {
    id: "L008", seller: "Bihar Cookstove Program", country: "India",
    type: "Cookstoves", standard: "Gold Standard", vintage: 2024,
    available: 18500, price: 12.60, change: -0.5,
    methodology: "Efficient Cookstoves Distribution", rating: "Gold",
    description: "Distributing 42,000 clean cookstoves to rural households, reducing biomass use by 60%.",
    sdgs: [3, 5, 7, 13], verified: true, co2e: 18500,
    lat: 25.1, lng: 85.3
  },
];

const PORTFOLIO = [
  { id: "L004", units: 50, avgPrice: 38.00, type: "Blue Carbon", standard: "Verra VCS" },
  { id: "L002", units: 120, avgPrice: 23.10, type: "ARR", standard: "Gold Standard" },
  { id: "L001", units: 200, avgPrice: 16.80, type: "REDD+", standard: "Verra VCS" },
];

const ACTIVITY = [
  { time: "2m ago", action: "Bought", units: 50, listing: "Blue Carbon Pacific", price: 42.00, txHash: "0x8f2e...a91c" },
  { time: "1h ago", action: "Sold", units: 80, listing: "Maharashtra Solar Collective", price: 9.20, txHash: "0x3d7a...f04b" },
  { time: "3h ago", action: "Bought", units: 120, listing: "Sahel Reforestation Initiative", price: 23.10, txHash: "0x1c9b...7e32" },
  { time: "Yesterday", action: "Retired", units: 200, listing: "Amazon Basin Conservancy", price: null, txHash: "0x5a4f...2d18" },
];

const PRICE_HISTORY = {
  "L001": [14.2, 15.0, 15.8, 16.1, 16.9, 17.4, 17.8, 18.0, 18.2, 18.4],
  "L002": [22.0, 23.5, 24.0, 25.2, 25.8, 25.1, 24.9, 25.3, 24.5, 24.7],
  "L003": [8.5, 8.8, 9.0, 9.1, 9.0, 9.2, 9.1, 9.0, 9.2, 9.15],
  "L004": [30.0, 32.5, 34.0, 36.8, 38.2, 39.5, 40.0, 41.2, 41.8, 42.0],
  "L005": [9.2, 8.8, 8.5, 8.1, 7.9, 7.8, 8.0, 7.9, 7.7, 7.8],
  "L006": [18.0, 19.2, 20.0, 20.5, 21.0, 20.8, 21.2, 21.0, 21.4, 21.5],
  "L007": [24.0, 25.5, 27.0, 28.2, 29.5, 30.1, 30.8, 31.0, 31.1, 31.2],
  "L008": [11.0, 11.5, 12.0, 12.3, 12.5, 12.4, 12.6, 12.5, 12.7, 12.6],
};

const TYPE_COLORS = {
  "REDD+": "#22c55e",
  "ARR": "#16a34a",
  "Renewable Energy": "#3b82f6",
  "Blue Carbon": "#0891b2",
  "Cookstoves": "#f59e0b",
};

const STANDARD_BADGE = {
  "Verra VCS": { color: "#7c3aed", label: "VCS" },
  "Gold Standard": { color: "#d97706", label: "GS" },
  "ACR": { color: "#0369a1", label: "ACR" },
};

// ─── SPARKLINE ────────────────────────────────────────────────────────────────

function Sparkline({ data, color, width = 80, height = 32 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── MINI BAR ─────────────────────────────────────────────────────────────────

function MiniBar({ value, max, color }) {
  return (
    <div style={{ background: "#1e293b", borderRadius: 4, height: 4, width: "100%" }}>
      <div style={{ background: color, borderRadius: 4, height: 4, width: `${(value / max) * 100}%`, transition: "width 0.6s ease" }} />
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function TradeModal({ listing, mode, onClose, onConfirm }) {
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=success
  const total = (qty * listing.price).toFixed(2);
  const co2 = qty;

  if (step === 3) return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, textAlign: "center", padding: "48px 40px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>
        <div style={{ color: "#4ade80", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          {mode === "buy" ? "Purchase Confirmed!" : "Sale Confirmed!"}
        </div>
        <div style={{ color: "#94a3b8", marginBottom: 8 }}>
          {qty} tCO₂e {mode === "buy" ? "added to your portfolio" : "sold"}
        </div>
        <div style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace", marginBottom: 32 }}>
          TX: 0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
        </div>
        <button onClick={onClose} style={btnPrimaryStyle}>Close</button>
      </div>
    </div>
  );

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
              {mode === "buy" ? "Buy Credits" : "Sell Credits"}
            </div>
            <div style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700 }}>{listing.seller}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, marginBottom: 20, display: "flex", gap: 24 }}>
          <div>
            <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>Price / tCO₂e</div>
            <div style={{ color: "#4ade80", fontSize: 24, fontWeight: 700 }}>${listing.price.toFixed(2)}</div>
          </div>
          <div>
            <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>Type</div>
            <div style={{ color: TYPE_COLORS[listing.type], fontSize: 14, fontWeight: 600 }}>{listing.type}</div>
          </div>
          <div>
            <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>Standard</div>
            <div style={{ color: "#e2e8f0", fontSize: 14 }}>{listing.standard}</div>
          </div>
        </div>

        {step === 1 ? (
          <>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 8 }}>Quantity (tCO₂e)</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setQty(q => Math.max(1, q - 10))} style={qtyBtnStyle}>−10</button>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={qtyBtnStyle}>−</button>
                <input
                  type="number" value={qty} min={1} max={listing.available}
                  onChange={e => setQty(Math.min(listing.available, Math.max(1, parseInt(e.target.value) || 1)))}
                  style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9", fontSize: 18, fontWeight: 700, textAlign: "center", width: 100, padding: "8px 0" }}
                />
                <button onClick={() => setQty(q => Math.min(listing.available, q + 1))} style={qtyBtnStyle}>+</button>
                <button onClick={() => setQty(q => Math.min(listing.available, q + 10))} style={qtyBtnStyle}>+10</button>
              </div>
              <div style={{ marginTop: 8 }}>
                <MiniBar value={qty} max={listing.available} color="#4ade80" />
                <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{qty.toLocaleString()} of {listing.available.toLocaleString()} available</div>
              </div>
            </div>

            <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Subtotal</span>
                <span style={{ color: "#e2e8f0" }}>${(qty * listing.price).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Platform fee (0.5%)</span>
                <span style={{ color: "#e2e8f0" }}>${(qty * listing.price * 0.005).toFixed(2)}</span>
              </div>
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94a3b8", fontWeight: 600 }}>Total</span>
                <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 18 }}>${(qty * listing.price * 1.005).toFixed(2)}</span>
              </div>
            </div>

            <button onClick={() => setStep(2)} style={btnPrimaryStyle}>
              Review {mode === "buy" ? "Purchase" : "Sale"} →
            </button>
          </>
        ) : (
          <>
            <div style={{ background: "#052e16", border: "1px solid #166534", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ color: "#86efac", fontSize: 13, marginBottom: 12, fontWeight: 600 }}>Transaction Summary</div>
              {[
                ["Action", mode === "buy" ? "Purchase" : "Sale"],
                ["Project", listing.seller],
                ["Quantity", `${qty.toLocaleString()} tCO₂e`],
                ["Unit Price", `$${listing.price.toFixed(2)}`],
                ["Total", `$${(qty * listing.price * 1.005).toFixed(2)}`],
                ["Vintage", listing.vintage],
                ["Standard", listing.standard],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#4ade80" }}>{k}</span>
                  <span style={{ color: "#dcfce7" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ ...btnSecondaryStyle, flex: 1 }}>Back</button>
              <button onClick={() => { onConfirm(listing, qty); setStep(3); }} style={{ ...btnPrimaryStyle, flex: 2 }}>
                Confirm {mode === "buy" ? "Purchase" : "Sale"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── LISTING CARD ─────────────────────────────────────────────────────────────

function ListingCard({ listing, onTrade }) {
  const [expanded, setExpanded] = useState(false);
  const badgeInfo = STANDARD_BADGE[listing.standard] || { color: "#6b7280", label: "?" };
  const change = listing.change;

  return (
    <div style={{
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      border: "1px solid #1e293b",
      borderRadius: 16,
      padding: 20,
      cursor: "pointer",
      transition: "border-color 0.2s, transform 0.2s",
      ...(expanded ? { borderColor: "#334155" } : {}),
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#4ade80"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = expanded ? "#334155" : "#1e293b"; e.currentTarget.style.transform = "none"; }}
      onClick={() => setExpanded(x => !x)}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ background: TYPE_COLORS[listing.type] + "20", color: TYPE_COLORS[listing.type], fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {listing.type}
            </span>
            <span style={{ background: badgeInfo.color + "20", color: badgeInfo.color, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
              {badgeInfo.label}
            </span>
            {listing.verified && <span style={{ color: "#22c55e", fontSize: 12 }}>✓ Verified</span>}
          </div>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{listing.seller}</div>
          <div style={{ color: "#475569", fontSize: 12 }}>{listing.country} · Vintage {listing.vintage}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 22 }}>${listing.price.toFixed(2)}</div>
          <div style={{ color: change >= 0 ? "#4ade80" : "#f87171", fontSize: 12 }}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </div>
          <Sparkline data={PRICE_HISTORY[listing.id]} color={change >= 0 ? "#4ade80" : "#f87171"} />
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <div>
          <div style={{ color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Available</div>
          <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{listing.available.toLocaleString()} tCO₂e</div>
        </div>
        <div>
          <div style={{ color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Rating</div>
          <div style={{ color: listing.rating === "Premium" ? "#fbbf24" : listing.rating === "Gold" ? "#d97706" : "#94a3b8", fontSize: 14, fontWeight: 600 }}>{listing.rating}</div>
        </div>
        <div>
          <div style={{ color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>SDGs</div>
          <div style={{ display: "flex", gap: 2 }}>
            {listing.sdgs.map(n => (
              <span key={n} style={{ background: "#1e3a5f", color: "#60a5fa", fontSize: 11, padding: "1px 5px", borderRadius: 4, fontWeight: 600 }}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <MiniBar value={listing.available} max={50000} color={TYPE_COLORS[listing.type]} />

      {expanded && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #1e293b" }}>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{listing.description}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={e => { e.stopPropagation(); onTrade(listing, "buy"); }}
              style={{ ...btnPrimaryStyle, flex: 1, padding: "10px 0" }}>
              Buy Credits
            </button>
            <button onClick={e => { e.stopPropagation(); onTrade(listing, "sell"); }}
              style={{ ...btnSecondaryStyle, flex: 1, padding: "10px 0" }}>
              Sell Credits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PORTFOLIO TAB ────────────────────────────────────────────────────────────

function PortfolioTab({ wallet }) {
  const entries = PORTFOLIO.map(p => {
    const listing = LISTINGS.find(l => l.id === p.id);
    const currentPrice = listing.price;
    const pnl = (currentPrice - p.avgPrice) * p.units;
    const pnlPct = ((currentPrice - p.avgPrice) / p.avgPrice) * 100;
    return { ...p, listing, currentPrice, pnl, pnlPct };
  });
  const totalValue = entries.reduce((s, e) => s + e.currentPrice * e.units, 0);
  const totalCost = entries.reduce((s, e) => s + e.avgPrice * e.units, 0);
  const totalPnl = totalValue - totalCost;
  const totalCo2 = entries.reduce((s, e) => s + e.units, 0);

  return (
    <div>
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Portfolio Value", value: `$${totalValue.toFixed(2)}`, sub: "USD", color: "#4ade80" },
          { label: "Total P&L", value: `${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)}`, sub: `${((totalPnl / totalCost) * 100).toFixed(1)}%`, color: totalPnl >= 0 ? "#4ade80" : "#f87171" },
          { label: "Credits Held", value: `${totalCo2.toLocaleString()}`, sub: "tCO₂e", color: "#60a5fa" },
          { label: "Wallet Balance", value: `$${wallet.toFixed(2)}`, sub: "available", color: "#fbbf24" },
        ].map(c => (
          <div key={c.label} style={{ background: "#1e293b", borderRadius: 12, padding: 18 }}>
            <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{c.label}</div>
            <div style={{ color: c.color, fontSize: 24, fontWeight: 800 }}>{c.value}</div>
            <div style={{ color: "#475569", fontSize: 12 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Holdings */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: "#94a3b8", fontSize: 13, fontWeight:
