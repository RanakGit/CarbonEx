import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const LISTINGS = [
  {
    id: "L001", seller: "Amazon Basin Conservancy", country: "Brazil",
    type: "REDD+", standard: "Verra VCS", vintage: 2024,
    available: 12400, price: 18.40, change: +2.1,
    methodology: "Avoided Deforestation", rating: "Gold",
    description: "Protecting 84,000 ha of primary Amazon rainforest. Third-party audited by Bureau Veritas.",
    sdgs: [13, 15, 1], verified: true, co2e: 12400,
    lat: -3.1, lng: -60.0
  },
  {
    id: "L002", seller: "Sahel Reforestation Initiative", country: "Mali",
    type: "ARR", standard: "Gold Standard", vintage: 2024,
    available: 5800, price: 24.70, change: -0.8,
    methodology: "Afforestation & Reforestation", rating: "Gold",
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
        <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Holdings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map(e => (
            <div key={e.id} style={{ background: "#1e293b", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ color: "#f1f5f9", fontWeight: 700 }}>{e.listing.seller}</div>
                <div style={{ color: "#475569", fontSize: 12 }}>{e.type} · {e.standard}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{e.units} tCO₂e</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>avg ${e.avgPrice.toFixed(2)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#4ade80", fontWeight: 700 }}>${(e.currentPrice * e.units).toFixed(2)}</div>
                <div style={{ color: e.pnl >= 0 ? "#4ade80" : "#f87171", fontSize: 12 }}>
                  {e.pnl >= 0 ? "▲" : "▼"} ${Math.abs(e.pnl).toFixed(2)} ({e.pnlPct.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Recent Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ background: "#0f172a", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{
                  background: a.action === "Bought" ? "#052e16" : a.action === "Retired" ? "#1e1b4b" : "#1c0a00",
                  color: a.action === "Bought" ? "#4ade80" : a.action === "Retired" ? "#818cf8" : "#fb923c",
                  fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20
                }}>{a.action}</span>
                <div>
                  <div style={{ color: "#e2e8f0", fontSize: 13 }}>{a.listing}</div>
                  <div style={{ color: "#475569", fontSize: 11 }}>{a.time} · {a.txHash}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#94a3b8" }}>{a.units} tCO₂e</div>
                {a.price && <div style={{ color: "#4ade80", fontSize: 12 }}>${a.price.toFixed(2)}/t</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RETIRE MODAL ─────────────────────────────────────────────────────────────

function RetireModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ purpose: "Net Zero 2030 commitment", beneficiary: "", qty: 100, project: "L001" });
  const listing = LISTINGS.find(l => l.id === form.project);

  if (step === 2) return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, textAlign: "center", padding: "48px 40px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏅</div>
        <div style={{ color: "#818cf8", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Retirement Certificate Issued</div>
        <div style={{ color: "#94a3b8", marginBottom: 4 }}>Serial: CXRET-2024-{Math.floor(Math.random() * 90000 + 10000)}</div>
        <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>{form.qty} tCO₂e permanently retired</div>
        <div style={{ color: "#475569", fontSize: 12, marginBottom: 32 }}>{listing.seller} · {listing.standard}</div>
        <button onClick={onClose} style={btnPrimaryStyle}>Download Certificate</button>
      </div>
    </div>
  );

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700 }}>Retire Credits</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Permanently retire carbon credits to offset your emissions. A serialized certificate is issued and the credits are removed from circulation.</p>
        {[
          { label: "Retirement Purpose", key: "purpose", type: "text" },
          { label: "Beneficiary (optional)", key: "beneficiary", type: "text", placeholder: "e.g. Company name or individual" },
          { label: "Quantity (tCO₂e)", key: "qty", type: "number" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>{f.label}</label>
            <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
              onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))}
              style={{ width: "100%", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#f1f5f9", padding: "10px 12px", fontSize: 14, boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Select Project</label>
          <select value={form.project} onChange={e => setForm(x => ({ ...x, project: e.target.value }))}
            style={{ width: "100%", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#f1f5f9", padding: "10px 12px", fontSize: 14 }}>
            {PORTFOLIO.map(p => {
              const l = LISTINGS.find(x => x.id === p.id);
              return <option key={p.id} value={p.id}>{l.seller} ({p.units} available)</option>;
            })}
          </select>
        </div>
        <button onClick={() => setStep(2)} style={btnPrimaryStyle}>Issue Retirement Certificate</button>
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20,
};
const modalStyle = {
  background: "#1e293b", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480,
  border: "1px solid #334155", maxHeight: "90vh", overflowY: "auto",
};
const btnPrimaryStyle = {
  background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none",
  borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer",
  width: "100%", letterSpacing: "0.02em",
};
const btnSecondaryStyle = {
  background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
  borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  width: "100%",
};
const qtyBtnStyle = {
  background: "#1e293b", border: "1px solid #334155", color: "#94a3b8",
  borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 700, fontSize: 14,
};

// ─── TICKER ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = LISTINGS.map(l => `${l.seller.split(" ").slice(-1)[0]} ${l.type} $${l.price.toFixed(2)} ${l.change >= 0 ? "▲" : "▼"}${Math.abs(l.change)}%`);
  const text = items.join("    ·    ");
  return (
    <div style={{ background: "#052e16", borderBottom: "1px solid #166534", padding: "6px 0", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", animation: "ticker 40s linear infinite", whiteSpace: "nowrap" }}>
        {[text, text].map((t, i) => (
          <span key={i} style={{ color: "#4ade80", fontSize: 12, fontFamily: "monospace", paddingRight: 60 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function CarbonEx() {
  const [tab, setTab] = useState("market");
  const [filterType, setFilterType] = useState("All");
  const [filterStd, setFilterStd] = useState("All");
  const [sortBy, setSortBy] = useState("price");
  const [search, setSearch] = useState("");
  const [tradeModal, setTradeModal] = useState(null); // { listing, mode }
  const [retireModal, setRetireModal] = useState(false);
  const [wallet, setWallet] = useState(24800.00);

  const types = ["All", ...Array.from(new Set(LISTINGS.map(l => l.type)))];
  const standards = ["All", "Verra VCS", "Gold Standard", "ACR"];

  const filtered = LISTINGS
    .filter(l => filterType === "All" || l.type === filterType)
    .filter(l => filterStd === "All" || l.standard === filterStd)
    .filter(l => !search || l.seller.toLowerCase().includes(search.toLowerCase()) || l.country.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "price" ? b.price - a.price : sortBy === "change" ? b.change - a.change : b.available - a.available);

  const totalMarketVol = LISTINGS.reduce((s, l) => s + l.price * l.available, 0);
  const avgPrice = LISTINGS.reduce((s, l) => s + l.price, 0) / LISTINGS.length;

  const handleTrade = (listing, mode) => setTradeModal({ listing, mode });
  const handleConfirm = (listing, qty) => {
    if (tradeModal.mode === "buy") setWallet(w => w - qty * listing.price * 1.005);
    else setWallet(w => w + qty * listing.price * 0.995);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "#f1f5f9", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, select { outline: none; }
        input:focus, select:focus { border-color: #22c55e !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #22c55e, #0891b2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌿</div>
            <span style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>CarbonEx</span>
            <span style={{ background: "#052e16", color: "#4ade80", fontSize: 10, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>BETA</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["market", "portfolio", "retire"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? "#1e293b" : "none",
                border: "none", color: tab === t ? "#4ade80" : "#64748b",
                padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14,
                textTransform: "capitalize",
              }}>{t === "retire" ? "Retire" : t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#64748b", fontSize: 11 }}>Wallet</div>
            <div style={{ color: "#4ade80", fontWeight: 700 }}>${wallet.toFixed(2)}</div>
          </div>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #22c55e, #0891b2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>R</div>
        </div>
      </nav>

      <Ticker />

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {tab === "market" && (
          <>
            {/* Stats bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Market Volume", value: `$${(totalMarketVol / 1e6).toFixed(1)}M`, sub: "total listed", icon: "📊" },
                { label: "Avg. Price", value: `$${avgPrice.toFixed(2)}`, sub: "per tCO₂e", icon: "💹" },
                { label: "Active Projects", value: LISTINGS.length, sub: "verified listings", icon: "🌍" },
                { label: "CO₂ Available", value: `${(LISTINGS.reduce((s, l) => s + l.available, 0) / 1000).toFixed(0)}K`, sub: "tonnes total", icon: "♻️" },
              ].map(s => (
                <div key={s.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="Search projects…" value={search} onChange={e => setSearch(e.target.value)}
                style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#f1f5f9", padding: "10px 14px", fontSize: 14, flex: "1 1 200px", minWidth: 0 }} />
              <select value={filterType} onChange={e => setFilterType(e.target.value)}
                style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#94a3b8", padding: "10px 14px", fontSize: 14, cursor: "pointer" }}>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
              <select value={filterStd} onChange={e => setFilterStd(e.target.value)}
                style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#94a3b8", padding: "10px 14px", fontSize: 14, cursor: "pointer" }}>
                {standards.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#94a3b8", padding: "10px 14px", fontSize: 14, cursor: "pointer" }}>
                <option value="price">Sort: Price</option>
                <option value="change">Sort: Change</option>
                <option value="available">Sort: Volume</option>
              </select>
            </div>

            {/* Type tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {types.map(t => (
                <button key={t} onClick={() => setFilterType(t)} style={{
                  background: filterType === t ? (TYPE_COLORS[t] || "#22c55e") + "20" : "#0f172a",
                  border: `1px solid ${filterType === t ? (TYPE_COLORS[t] || "#22c55e") : "#1e293b"}`,
                  color: filterType === t ? (TYPE_COLORS[t] || "#22c55e") : "#64748b",
                  borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600,
                }}>{t}</button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
              {filtered.map(l => <ListingCard key={l.id} listing={l} onTrade={handleTrade} />)}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", color: "#475569", padding: 64 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16 }}>No projects match your filters</div>
              </div>
            )}
          </>
        )}

        {tab === "portfolio" && <PortfolioTab wallet={wallet} />}

        {tab === "retire" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🏅</div>
              <h2 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Retire Carbon Credits</h2>
              <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.6 }}>
                Permanently retire verified carbon credits to offset your emissions.<br />
                Each retirement is serialized and published on-chain — provable and permanent.
              </p>
            </div>
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>How it works</div>
              {[
                ["1", "Choose credits from your portfolio", "#22c55e"],
                ["2", "Specify retirement purpose and beneficiary", "#3b82f6"],
                ["3", "Credits are permanently burned", "#f59e0b"],
                ["4", "Receive a serialized retirement certificate", "#818cf8"],
              ].map(([n, text, color]) => (
                <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ background: color + "20", color: color, fontWeight: 700, fontSize: 13, padding: "4px 10px", borderRadius: 6, flexShrink: 0 }}>{n}</div>
                  <div style={{ color: "#94a3b8", paddingTop: 2 }}>{text}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setRetireModal(true)} style={{ ...btnPrimaryStyle, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", fontSize: 16, padding: "16px 0" }}>
              Start Retirement Process
            </button>
          </div>
        )}
      </main>

      {tradeModal && (
        <TradeModal
          listing={tradeModal.listing}
          mode={tradeModal.mode}
          onClose={() => setTradeModal(null)}
          onConfirm={handleConfirm}
        />
      )}
      {retireModal && <RetireModal onClose={() => setRetireModal(false)} />}
    </div>
  );
}
