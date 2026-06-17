import React from "react";
import { Compass, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";

export default function Hero({ onExplore, onBecomeArtisan, onCategoryClick }) {
  const categories = [
    { name: "Pottery", label: "Traditional Pottery", emoji: "🏺", color: "#F5E6E1" },
    { name: "Paintings & Wall Art", label: "Tribal & Folk Paintings", emoji: "🎨", color: "#F9ECEF" },
    { name: "God Idols & Spiritual Collection", label: "Spiritual Collection", emoji: "🛕", color: "#FAF2E3" },
    { name: "Beauty & Wellness", label: "Organic Wellness", emoji: "🌿", color: "#EEF7EE" },
    { name: "Local Foods & Consumables", label: "Local Foods", emoji: "🍯", color: "#FCF6E5" },
    { name: "Handloom & Textiles", label: "Handloom Heritage", emoji: "🧵", color: "#FBF3E6" }
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Main Hero Banner */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #F3EFE0 0%, #EFE5D1 100%)",
        padding: "80px 24px",
        textAlign: "center",
        borderBottom: "4px solid var(--mustard)",
        overflow: "hidden"
      }}>
        {/* Mandalas or cultural background vectors */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          border: "4px double rgba(192, 92, 62, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "120px",
          color: "rgba(192, 92, 62, 0.05)",
          userSelect: "none"
        }}>
          🏵️
        </div>
        <div style={{
          position: "absolute",
          bottom: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "4px double rgba(192, 92, 62, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "100px",
          color: "rgba(192, 92, 62, 0.05)",
          userSelect: "none"
        }}>
          🏵️
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <span style={{
            background: "var(--terracotta)",
            color: "var(--cream)",
            padding: "6px 16px",
            borderRadius: "50px",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            100% Authentic Indian Craftsmanship
          </span>
          <h1 style={{
            fontSize: "48px",
            fontFamily: "var(--font-serif)",
            color: "var(--brown)",
            lineHeight: "1.2",
            marginBottom: "24px"
          }}>
            Crafted by Hands, <br />
            <span style={{ color: "var(--terracotta-dark)" }}>Shared with the World</span>
          </h1>
          <p style={{
            fontSize: "18px",
            color: "var(--text-dark)",
            marginBottom: "32px",
            lineHeight: "1.6"
          }}>
            Discover standard hand-turned pottery, rich royal sarees, organic consumables, and divine spiritual artifacts. Powered by voice search and guided Hindi onboarding to bring traditional artisans right to your screen.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button 
              className="btn btn-primary"
              id="hero-explore-btn"
              onClick={onExplore}
              style={{ padding: "14px 32px", fontSize: "16px" }}
            >
              <Compass size={18} /> Explore Products
            </button>
            <button 
              className="btn btn-outline"
              onClick={onBecomeArtisan}
              style={{ 
                padding: "14px 32px", 
                fontSize: "16px", 
                backgroundColor: "transparent",
                borderColor: "var(--brown)",
                color: "var(--brown)"
              }}
            >
              Become an Artisan (विक्रेता बनें)
            </button>
          </div>
        </div>
      </section>

      {/* Quick Category Bubbles */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 24px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>Popular Categories</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
          Select a category to browse local hand-crafted goods
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          padding: "8px"
        }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onCategoryClick(cat.name)}
              className="heritage-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                border: "1px solid rgba(78, 54, 41, 0.12)",
                borderRadius: "50px",
                cursor: "pointer",
                backgroundColor: cat.color,
                fontFamily: "var(--font-sans)",
                fontWeight: "500",
                fontSize: "13px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <span style={{ fontSize: "18px" }}>{cat.emoji}</span>
              <span style={{ color: "var(--brown)" }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section style={{
        background: "var(--cream)",
        borderTop: "1px solid rgba(78, 54, 41, 0.08)",
        borderBottom: "1px solid rgba(78, 54, 41, 0.08)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px"
        }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{
              background: "#FCECE7",
              color: "var(--terracotta)",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Heritage Certified</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Every item is stamped with dynamic labels (Handmade, Eco-Friendly, Heritage Craft) guaranteeing genuine origins.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{
              background: "#FBF5E6",
              color: "var(--mustard-dark)",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <HeartHandshake size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Direct Artisan Support</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                We work directly with weavers and potters, returning up to 85% of values directly to their local community.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{
              background: "#EEF7EE",
              color: "#2e7d32",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Explore by State</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Use our State Crafts Map to learn geographic history, cultural significance, and read artisan stories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
