import React from "react";
import { Star, MapPin, ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onSelect, onAddToCart }) {
  // Map helper to select proper custom badge style
  const getBadgeStyle = (badge) => {
    const b = badge.toLowerCase();
    if (b.includes("handmade")) return "badge-handmade";
    if (b.includes("heritage")) return "badge-heritage";
    if (b.includes("organic")) return "badge-organic";
    if (b.includes("eco")) return "badge-eco";
    if (b.includes("cultural")) return "badge-cultural";
    return "badge-verified";
  };

  return (
    <div 
      className="heritage-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "var(--cream)",
        cursor: "pointer"
      }}
      onClick={() => onSelect(product)}
    >
      {/* Product Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "var(--transition)" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        {/* State Tag */}
        <span style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          background: "rgba(78, 54, 41, 0.8)",
          backdropFilter: "blur(4px)",
          color: "white",
          padding: "3px 8px",
          borderRadius: "4px",
          fontSize: "11px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <MapPin size={10} color="var(--mustard)" /> {product.state}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
        <div>
          {/* Categories & Badges */}
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px" }}>
            {product.badges && product.badges.slice(0, 2).map((b, idx) => (
              <span key={idx} className={`badge ${getBadgeStyle(b)}`}>
                {b}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: "16px", marginBottom: "4px", color: "var(--brown)" }}>{product.name}</h3>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>{product.region}</span>
        </div>

        <div>
          {/* Price & Rating */}
          <div style={{ display: "flex", justifySelf: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "var(--terracotta-dark)" }}>
              ₹{product.price}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "12px", fontWeight: "600" }}>
              <Star size={12} fill="var(--mustard)" color="var(--mustard)" /> {product.rating}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            className="btn btn-outline"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "8px 16px",
              fontSize: "12px"
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal opening
              onAddToCart(product);
            }}
            title="इस बटन से उत्पाद कार्ट में जोड़ें"
          >
            <ShoppingCart size={14} /> Add to Cart (कार्ट में जोड़ें)
          </button>
        </div>
      </div>
    </div>
  );
}
