import React, { useState } from "react";

const pages = {
  dashboard: { title: "Dashboard", subtitle: "Overview of your store performance.", icon: "📊", content: "Revenue summaries, top-selling products, and daily stats appear here." },
  pos: { title: "Point of Sale", subtitle: "Track your sales, revenue, and growth metrics in real time.", icon: "🛒", content: "Your POS content goes here — products, order panel, checkout flow, and more." },
  products: { title: "Products", subtitle: "Manage your full product catalogue.", icon: "🍹", content: "Add, edit, or remove products from your menu here." },
  stocks: { title: "Stocks", subtitle: "Monitor and replenish your inventory.", icon: "📦", content: "View stock levels, low-stock alerts, and reorder triggers." },
  analytics: { title: "Sales Analytics", subtitle: "Deep-dive into your sales data.", icon: "📈", content: "Charts, trends, and revenue breakdowns live here." },
  history: { title: "Purchase History", subtitle: "Browse all past transactions.", icon: "🗒️", content: "All completed orders with timestamps and amounts are listed here." },
  users: { title: "Users", subtitle: "Manage staff accounts and permissions.", icon: "👤", content: "Add or remove staff, assign roles, and update credentials here." },
};

const navItems = [
  { page: "dashboard", label: "Dashboard", icon: "📊" },
  { page: "pos", label: "Point of Sale", icon: "🛒" },
  { page: "products", label: "Products", icon: "🍹", badge: 12 },
  { page: "stocks", label: "Stocks", icon: "📦" },
  null, 
  { page: "analytics", label: "Sales Analytics", icon: "📈" },
  { page: "history", label: "Purchase History", icon: "🗒️" },
  null, 
  { page: "users", label: "Users", icon: "👤" },
];

function NavItem({ item, isActive, onClick }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick(item.page);
  };

  return (
    <button 
      onClick={handleClick} 
      style={{ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) }}
      onMouseEnter={e => { if (!isActive) Object.assign(e.currentTarget.style, styles.navItemHoverOn); }}
      onMouseLeave={e => { if (!isActive) Object.assign(e.currentTarget.style, styles.navItemHoverOff); }}
    >
      {isActive && <span style={styles.activeBar} />}
      <span style={styles.navIcon}>{item.icon}</span>
      <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
      {item.badge && <span style={styles.badge}>{item.badge}</span>}
      {ripples.map((r) => (
        <span key={r.id} style={{ ...styles.ripple, width: r.size, height: r.size, left: r.x, top: r.y }} />
      ))}
    </button>
  );
}

export default function Sidebar() {
  const [activePage, setActivePage] = useState("pos");
  const [loggedOut, setLoggedOut] = useState(false);
  const page = pages[activePage];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setLoggedOut(true);
    }
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>🧋</div>
          <span style={styles.logoText}>MERYENDA</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item, i) =>
            item === null ? (
              <div key={`divider-${i}`} style={styles.divider} />
            ) : (
              <NavItem
                key={item.page}
                item={item}
                isActive={activePage === item.page}
                onClick={setActivePage}
              />
            )
          )}
        </nav>

        <div style={styles.logoutArea}>
          <button 
            style={styles.logoutBtn} 
            onClick={handleLogout}
            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.logoutHoverOn)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, styles.logoutHoverOff)}
          >
            <span style={styles.navIcon}>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        {loggedOut ? (
          <div style={styles.pageContent}>
            <span style={styles.placeholderIcon}>👋</span>
            <h3 style={styles.contentHeading}>Goodbye!</h3>
            <p>You have been logged out successfully.</p>
            <button onClick={() => setLoggedOut(false)} style={styles.loginBtn}>Log Back In</button>
          </div>
        ) : (
          <>
            <h2 style={styles.pageTitle}>{page.title}</h2>
            <p style={styles.pageSubtitle}>{page.subtitle}</p>
            <div style={styles.pageContent}>
              <span style={styles.placeholderIcon}>{page.icon}</span>
              <h3 style={styles.contentHeading}>{page.title}</h3>
              <p>{page.content}</p>
            </div>
          </>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fredoka+One&display=swap');
        @keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 4px 12px rgba(212,130,10,0.45); }
          50%      { box-shadow: 0 4px 22px rgba(245,166,35,0.7); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  layout: { display: "flex", height: "100vh", fontFamily: "'Poppins', sans-serif", background: "#f5e6c8", overflow: "hidden" },
  sidebar: { width: 220, background: "linear-gradient(180deg, #3b2000 0%, #2a1500 100%)", display: "flex", flexDirection: "column", flexShrink: 0, boxShadow: "4px 0 24px rgba(0,0,0,0.35)", position: "relative", overflow: "hidden" },
  logoArea: { padding: "28px 20px 22px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" },
  logoIcon: { width: 42, height: 42, background: "linear-gradient(135deg, #d4820a, #f5a623)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, animation: "pulse-glow 3s ease-in-out infinite", flexShrink: 0 },
  logoText: { fontFamily: "'Fredoka One', cursive", fontSize: 19, color: "#f5a623", letterSpacing: 1 },
  nav: { flex: 1, padding: "18px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" },
  navItem: { display: "flex", alignItems: "center", gap: 11, padding: "10px 14px", borderRadius: 12, cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 13.5, fontWeight: 500, position: "relative", overflow: "hidden", transition: "all 0.2s", background: "transparent", border: "none", width: "100%", fontFamily: "'Poppins', sans-serif" },
  navItemActive: { background: "linear-gradient(90deg, #d4820a, #f5a623)", color: "#fff", fontWeight: 600, boxShadow: "0 4px 16px rgba(212,130,10,0.4)" },
  navItemHoverOn: { background: "rgba(255,255,255,0.07)", color: "#fff", transform: "translateX(2px)" },
  navItemHoverOff: { background: "transparent", color: "rgba(255,255,255,0.55)", transform: "translateX(0)" },
  activeBar: { position: "absolute", left: 0, top: "20%", width: 3, height: "60%", background: "#f5a623", borderRadius: "0 4px 4px 0" },
  navIcon: { fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 },
  badge: { marginLeft: "auto", background: "#d4820a", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 20, padding: "1px 7px", minWidth: 20, textAlign: "center" },
  divider: { height: 1, background: "rgba(255,255,255,0.07)", margin: "8px 6px" },
  ripple: { position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,0.18)", transform: "scale(0)", animation: "ripple-anim 0.5s linear", pointerEvents: "none" },
  logoutArea: { padding: "14px 12px 22px", borderTop: "1px solid rgba(255,255,255,0.07)" },
  logoutBtn: { display: "flex", alignItems: "center", gap: 11, padding: "10px 14px", borderRadius: 12, cursor: "pointer", color: "rgba(255,100,100,0.7)", fontSize: 13.5, fontWeight: 500, width: "100%", background: "transparent", border: "none", fontFamily: "'Poppins', sans-serif", transition: "all 0.22s" },
  logoutHoverOn: { background: "rgba(255,80,80,0.1)", color: "#ff6b6b" },
  logoutHoverOff: { background: "transparent", color: "rgba(255,100,100,0.7)" },
  main: { flex: 1, padding: "36px 32px", overflowY: "auto" },
  pageTitle: { fontFamily: "'Fredoka One', cursive", fontSize: 28, color: "#3b2000", marginBottom: 6 },
  pageSubtitle: { color: "#9e7a3a", fontSize: 14, marginBottom: 28 },
  pageContent: { background: "rgba(255,255,255,0.7)", borderRadius: 18, padding: 28, minHeight: 300, backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", color: "#6b3a00", fontSize: 14, lineHeight: 1.7 },
  placeholderIcon: { fontSize: 48, marginBottom: 12, display: "block" },
  contentHeading: { fontSize: 18, fontWeight: 700, color: "#3b2000", marginBottom: 6 },
  loginBtn: { marginTop: 20, padding: "10px 20px", borderRadius: 8, border: "none", background: "#3b2000", color: "#fff", cursor: "pointer", fontWeight: 600 }
};