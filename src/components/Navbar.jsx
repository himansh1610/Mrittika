import React from "react";
import { ShoppingBag, Search, User, Compass, Volume2, Sparkles } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  setCartOpen,
  searchQuery,
  setSearchQuery,
  currentRole,
  setCurrentRole,
  onStartOnboarding,
  onOpenVoiceAssistant,
  currentUser,
  onLogout
}) {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(253, 251, 250, 0.95)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(192, 92, 62, 0.15)",
      boxShadow: "var(--shadow-sm)"
    }}>
      {/* Top Banner */}
      <div style={{
        background: "linear-gradient(90deg, var(--terracotta-dark), var(--brown))",
        color: "var(--cream)",
        padding: "6px 20px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={12} color="var(--mustard)" />
          <span>India's Digital Heritage Marketplace • <b>G-20 Handicrafts Showcase</b></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} onClick={onStartOnboarding}>
            <Volume2 size={12} /> Onboarding (मार्गदर्शन)
          </span>
          {currentUser ? (
            // Logged-in user strip
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {currentUser.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt={currentUser.name}
                    style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--mustard)" }}
                  />
                ) : (
                  <span style={{ fontSize: "14px" }}>
                    {currentUser.role === "artisan" ? "🏺" : currentUser.role === "admin" ? "🛡️" : "👤"}
                  </span>
                )}
                <span style={{ fontWeight: "700", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {currentUser.name.split(" ")[0]}
                </span>
                <span style={{
                  background: "var(--mustard)", color: "var(--brown-dark)",
                  padding: "1px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "700", textTransform: "capitalize"
                }}>
                  {currentUser.role}
                </span>
              </span>
              {/* Role switcher still visible for demo purposes */}
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                style={{
                  background: "transparent", border: "1px solid rgba(255,255,255,0.3)",
                  color: "var(--cream)", fontWeight: "600", borderRadius: "4px",
                  padding: "2px 6px", cursor: "pointer", fontSize: "10px", outline: "none"
                }}
              >
                <option value="customer">Customer</option>
                <option value="artisan">Artisan</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={onLogout}
                style={{
                  background: "rgba(255,255,255,0.15)", border: "none",
                  color: "var(--cream)", padding: "3px 10px", borderRadius: "6px",
                  cursor: "pointer", fontSize: "11px", fontWeight: "600"
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            // Guest strip
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>Role: </span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                style={{
                  background: "var(--mustard)", border: "none",
                  color: "var(--brown-dark)", fontWeight: "600", borderRadius: "4px",
                  padding: "2px 8px", cursor: "pointer", fontSize: "11px", outline: "none"
                }}
              >
                <option value="customer">Customer (ग्राहक)</option>
                <option value="artisan">Artisan / Seller (कारीगर)</option>
                <option value="admin">Admin (प्रशासक)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap"
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab("home")}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            cursor: "pointer" 
          }}
        >
          <div style={{
            background: "var(--terracotta)",
            color: "var(--cream)",
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            border: "2px solid var(--mustard)"
          }}>
            ह
          </div>
          <div>
            <h1 style={{ fontSize: "22px", lineHeight: "1.1", margin: 0 }}>HastKala MP</h1>
            <span style={{ fontSize: "11px", color: "var(--terracotta)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "bold" }}>Digital Heritage</span>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          id="nav-search-bar"
          style={{
            flex: "1",
            maxWidth: "450px",
            position: "relative",
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            placeholder='Try searching "Pottery" or "मखाना"...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== "browse") setActiveTab("browse");
            }}
            style={{
              width: "100%",
              padding: "10px 16px 10px 42px",
              borderRadius: "50px",
              border: "1.5px solid var(--terracotta-light)",
              backgroundColor: "var(--cream)",
              color: "var(--text-dark)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              outline: "none"
            }}
          />
          <Search 
            size={18} 
            color="var(--terracotta)" 
            style={{ position: "absolute", left: "16px" }}
          />
        </div>

        {/* Action icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Menu Links */}
          <nav style={{ display: "flex", gap: "20px", fontSize: "14px", fontWeight: "500" }}>
            <span 
              onClick={() => setActiveTab("home")} 
              style={{ cursor: "pointer", color: activeTab === "home" ? "var(--terracotta)" : "var(--text-dark)", borderBottom: activeTab === "home" ? "2px solid var(--terracotta)" : "none", paddingBottom: "4px" }}
            >
              Home
            </span>
            <span 
              onClick={() => setActiveTab("browse")} 
              style={{ cursor: "pointer", color: activeTab === "browse" ? "var(--terracotta)" : "var(--text-dark)", borderBottom: activeTab === "browse" ? "2px solid var(--terracotta)" : "none", paddingBottom: "4px" }}
            >
              Marketplace
            </span>
            <span 
              onClick={() => setActiveTab("map")} 
              style={{ cursor: "pointer", color: activeTab === "map" ? "var(--terracotta)" : "var(--text-dark)", borderBottom: activeTab === "map" ? "2px solid var(--terracotta)" : "none", paddingBottom: "4px" }}
            >
              State Crafts Map
            </span>
            <span 
              onClick={() => setActiveTab("festival")} 
              style={{ cursor: "pointer", color: activeTab === "festival" ? "var(--terracotta)" : "var(--text-dark)", borderBottom: activeTab === "festival" ? "2px solid var(--terracotta)" : "none", paddingBottom: "4px" }}
            >
              Festivals
            </span>
            <span 
              onClick={() => setActiveTab("stories")} 
              style={{ cursor: "pointer", color: activeTab === "stories" ? "var(--terracotta)" : "var(--text-dark)", borderBottom: activeTab === "stories" ? "2px solid var(--terracotta)" : "none", paddingBottom: "4px" }}
            >
              Artisan Stories
            </span>
            {currentRole !== "customer" && (
              <span 
                onClick={() => setActiveTab("dashboard")} 
                style={{ cursor: "pointer", color: activeTab === "dashboard" ? "var(--terracotta)" : "var(--mustard-dark)", fontWeight: "bold", borderBottom: activeTab === "dashboard" ? "2px solid var(--terracotta)" : "none", paddingBottom: "4px" }}
              >
                Dashboard ⚙️
              </span>
            )}
          </nav>

          {/* Cart Icon */}
          <div 
            id="nav-cart-btn"
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              cursor: "pointer",
              background: "var(--cream)",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid rgba(192, 92, 62, 0.1)"
            }}
          >
            <ShoppingBag size={20} color="var(--brown)" />
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "var(--terracotta)",
                color: "var(--cream)",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "11px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--cream)"
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
