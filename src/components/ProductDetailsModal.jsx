import React, { useState } from "react";
import { X, Star, MapPin, ShoppingBag, BookOpen, AlertCircle, Sparkles, Send } from "lucide-react";
import { artisans } from "../data/artisans";

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  // Retrieve artisan info
  const artisan = artisans.find(a => a.id === product.artisanId) || {
    name: "Independent Rural Guild",
    region: product.region,
    specialty: "Traditional Crafting",
    story: "Woven and sculpted by cooperative artisan circles under regional heritage programs.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
  };

  const [reviews, setReviews] = useState([
    { name: "Amit Sharma", rating: 5, text: "Excellent quality, water stays genuinely cold! Highly recommended." },
    { name: "Pooja Patel", rating: 4, text: "Beautiful traditional finish. Looks amazing in my dining room." }
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      alert("Please fill in your name and comment!");
      return;
    }
    setReviews(prev => [...prev, newReview]);
    setNewReview({ name: "", rating: 5, text: "" });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "880px" }}>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "var(--cream)",
            border: "1.5px solid var(--terracotta)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--terracotta)",
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          padding: "24px"
        }}>
          {/* Column 1: Image & Artisan Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "16px",
                border: "2px solid var(--mustard)"
              }}
            />

            {/* Artisan Story Card */}
            <div style={{
              background: "var(--beige-bg)",
              border: "1px solid rgba(78, 54, 41, 0.12)",
              borderRadius: "16px",
              padding: "16px"
            }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
                <img 
                  src={artisan.image} 
                  alt={artisan.name} 
                  style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} 
                />
                <div>
                  <h4 style={{ fontSize: "14px", margin: 0 }}>{artisan.name}</h4>
                  <span style={{ fontSize: "11px", color: "var(--terracotta)" }}>{artisan.specialty}</span>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-dark)", lineHeight: "1.5", fontStyle: "italic" }}>
                "{artisan.story}"
              </p>
            </div>
          </div>

          {/* Column 2: Details, Specs, Reviews */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span className="badge badge-heritage" style={{ marginBottom: "6px" }}>{product.category}</span>
              <h2 style={{ fontSize: "24px", color: "var(--brown)", lineHeight: "1.2" }}>{product.name}</h2>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px", fontSize: "12px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={12} color="var(--terracotta)" /> {product.region}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                  <Star size={12} fill="var(--mustard)" color="var(--mustard)" /> {product.rating}
                </span>
              </div>
            </div>

            {/* Price & Buy Section */}
            <div style={{
              background: "#FFFDF9",
              border: "1.5px solid var(--mustard-light)",
              borderRadius: "12px",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Price</span>
                <h3 style={{ fontSize: "24px", color: "var(--terracotta-dark)" }}>₹{product.price}</h3>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                style={{ padding: "10px 24px" }}
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
            </div>

            {/* Story & Cultural Significance */}
            <div>
              <h4 style={{ fontSize: "14px", color: "var(--brown)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <BookOpen size={14} color="var(--terracotta)" /> The Craft Story
              </h4>
              <p style={{ fontSize: "12px", color: "var(--text-dark)", lineHeight: "1.5" }}>
                {product.story}
              </p>
              
              {product.culturalSignificance && (
                <div style={{ marginTop: "10px", paddingLeft: "10px", borderLeft: "2.5px solid var(--mustard)" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", display: "block", color: "var(--mustard-dark)" }}>Cultural Significance</span>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                    {product.culturalSignificance}
                  </p>
                </div>
              )}
            </div>

            {/* Food Ingredients & Exp details */}
            {product.specifications && (
              <div style={{
                background: "var(--beige-bg)",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "11px"
              }}>
                <span style={{ fontWeight: "bold", display: "block", marginBottom: "6px", color: "var(--brown)" }}>
                  Product Specifications / Details
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key}>
                      <span style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>{key}:</span> <b>{val}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div style={{ borderTop: "1px solid rgba(78, 54, 41, 0.1)", paddingTop: "14px" }}>
              <h4 style={{ fontSize: "14px", color: "var(--brown)", marginBottom: "8px" }}>Customer Reviews ({reviews.length})</h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "150px", overflowY: "auto", marginBottom: "12px" }}>
                {reviews.map((r, idx) => (
                  <div key={idx} style={{ background: "white", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(78,54,41,0.06)" }}>
                    <div style={{ display: "flex", justifySelf: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                      <b>{r.name}</b>
                      <span style={{ display: "flex", gap: "2px" }}>
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} size={10} fill="var(--mustard)" color="var(--mustard)" />
                        ))}
                      </span>
                    </div>
                    <p style={{ fontSize: "11px", color: "var(--text-dark)" }}>{r.text}</p>
                  </div>
                ))}
              </div>

              {/* Leave Review Form */}
              <form onSubmit={handleAddReview} style={{ display: "flex", gap: "6px" }}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: "30%", padding: "6px", fontSize: "11px", borderRadius: "4px", border: "1px solid #ccc" }}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Share your experience..." 
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  style={{ flex: 1, padding: "6px", fontSize: "11px", borderRadius: "4px", border: "1px solid #ccc" }}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ padding: "6px 12px" }}>
                  <Send size={12} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
