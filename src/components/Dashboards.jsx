import React, { useState } from "react";
import { 
  TrendingUp, Package, Users, Award, 
  PlusCircle, CheckCircle, AlertTriangle, 
  Trash2, DollarSign, ShoppingBag, Eye 
} from "lucide-react";

export default function Dashboards({
  currentRole,
  products,
  setProducts,
  onAddCustomProduct,
  orders,
  onUpdateOrderStatus,
  onVerifySeller
}) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Pottery",
    region: "Bhopal, Madhya Pradesh",
    state: "Madhya Pradesh",
    story: "",
    culturalSignificance: "",
    specifications: "",
    ingredients: "",
    weight: "",
    expiryDate: ""
  });

  const [sellers, setSellers] = useState([
    { id: "sel-1", name: "Ramesh Kushwaha", craft: "Clay Pottery", status: "Verified", location: "Dhar, MP" },
    { id: "sel-2", name: "Sunita Maheshwari", craft: "Handloom Weaving", status: "Verified", location: "Maheshwar, MP" },
    { id: "sel-3", name: "Devendra Baghel", craft: "Bagh Print", status: "Pending Verification", location: "Bagh, MP" },
    { id: "sel-4", name: "Radha Bai", craft: "Gond Artistry", status: "Pending Verification", location: "Patangarh, MP" }
  ]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter a product name and price!");
      return;
    }

    const created = {
      id: "custom-" + Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&q=80", // standard default image
      region: newProduct.region,
      state: newProduct.state,
      artisanId: "art-1",
      rating: 5.0,
      badges: ["Handmade", "Verified Artisan"],
      story: newProduct.story || "A custom handcrafted artifact preserving local history and traditions.",
      culturalSignificance: newProduct.culturalSignificance || "Crafted using traditional methods passed down through generations.",
      specifications: newProduct.specifications ? JSON.parse(newProduct.specifications) : { Material: "Natural/Organic" }
    };

    if (newProduct.category === "Local Foods & Consumables" || newProduct.category === "Beauty & Wellness") {
      created.specifications = {
        ...created.specifications,
        Ingredients: newProduct.ingredients || "Natural organic components",
        Weight: newProduct.weight || "200g",
        ExpiryDate: newProduct.expiryDate || "12 Months from packing",
        Storage: "Store in a cool, dry place"
      };
    }

    onAddCustomProduct(created);
    alert("Product successfully added to inventory!");
    setNewProduct({
      name: "",
      price: "",
      category: "Pottery",
      region: "Bhopal, Madhya Pradesh",
      state: "Madhya Pradesh",
      story: "",
      culturalSignificance: "",
      specifications: "",
      ingredients: "",
      weight: "",
      expiryDate: ""
    });
  };

  const handleVerify = (id) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, status: "Verified" } : s));
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product from inventory?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // 1. ARTISAN DASHBOARD
  if (currentRole === "artisan") {
    const artisanProducts = products.filter(p => p.artisanId === "art-1");
    
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="badge badge-verified">Artisan Partner Portal</span>
            <h2 style={{ fontSize: "28px", marginTop: "4px" }}>Namaste, Ramesh Kushwaha 👋</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Manage your shop inventory, track your earnings, and add new heritage items.</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ background: "var(--mustard)", color: "var(--brown-dark)", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", fontSize: "14px" }}>
              Shop Status: Active 🟢
            </span>
          </div>
        </div>

        {/* Analytics stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--terracotta)", marginBottom: "8px" }}>
              <span>Total Earnings</span>
              <DollarSign size={20} />
            </div>
            <h3 style={{ fontSize: "24px" }}>₹42,500</h3>
            <span style={{ fontSize: "12px", color: "green" }}>+12% from last month</span>
          </div>

          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--mustard-dark)", marginBottom: "8px" }}>
              <span>Active Orders</span>
              <ShoppingBag size={20} />
            </div>
            <h3 style={{ fontSize: "24px" }}>3 Pending</h3>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>1 Ready to Ship</span>
          </div>

          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#2e7d32", marginBottom: "8px" }}>
              <span>Total Products</span>
              <Package size={20} />
            </div>
            <h3 style={{ fontSize: "24px" }}>{artisanProducts.length} Items</h3>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>4 Categories represented</span>
          </div>

          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--brown)", marginBottom: "8px" }}>
              <span>Heritage Score</span>
              <Award size={20} />
            </div>
            <h3 style={{ fontSize: "24px" }}>98% Excellent</h3>
            <span style={{ fontSize: "12px", color: "var(--terracotta)" }}>Heritage Craft Badge</span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "32px"
        }}>
          {/* Add Product Form */}
          <div className="heritage-card" style={{ padding: "24px", background: "white" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <PlusCircle size={20} color="var(--terracotta)" /> Add New Heritage Product
            </h3>
            
            <form onSubmit={handleCreateProduct} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Product Name *</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Clay Water Bottle" 
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Price (INR) *</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="e.g. 450" 
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", background: "white" }}
                  >
                    <option value="Pottery">Pottery</option>
                    <option value="Handloom & Textiles">Handloom & Textiles</option>
                    <option value="Wooden Crafts">Wooden Crafts</option>
                    <option value="Bamboo Crafts">Bamboo Crafts</option>
                    <option value="Handmade Jewelry">Handmade Jewelry</option>
                    <option value="Paintings & Wall Art">Paintings & Wall Art</option>
                    <option value="God Idols & Spiritual Collection">God Idols & Spiritual</option>
                    <option value="Beauty & Wellness">Beauty & Wellness</option>
                    <option value="Local Foods & Consumables">Local Foods</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Heritage Story / Bio</label>
                <textarea 
                  value={newProduct.story}
                  onChange={(e) => setNewProduct({ ...newProduct, story: e.target.value })}
                  placeholder="Tell the story behind this handcrafted item..."
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", height: "60px" }}
                />
              </div>

              {/* Extra food specifications if local foods category */}
              {(newProduct.category === "Local Foods & Consumables" || newProduct.category === "Beauty & Wellness") && (
                <div style={{ background: "var(--beige-bg)", padding: "10px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--terracotta)" }}>Food & Wellness Specs (Required)</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <input 
                      type="text" 
                      placeholder="Ingredients (सामग्री)" 
                      value={newProduct.ingredients}
                      onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                      style={{ padding: "6px", fontSize: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    <input 
                      type="text" 
                      placeholder="Weight (वजन)" 
                      value={newProduct.weight}
                      onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                      style={{ padding: "6px", fontSize: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Expiry Date (समाप्ति तिथि)" 
                    value={newProduct.expiryDate}
                    onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                    style={{ padding: "6px", fontSize: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", marginTop: "8px" }}>
                Add to Store Catalog
              </button>
            </form>
          </div>

          {/* Current Inventory list */}
          <div className="heritage-card" style={{ padding: "24px", background: "white" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>Current Active Inventory</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto" }}>
              {artisanProducts.map((p) => (
                <div 
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    border: "1px solid rgba(78, 54, 41, 0.1)",
                    borderRadius: "10px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      style={{ width: "45px", height: "45px", borderRadius: "8px", objectFit: "cover" }} 
                    />
                    <div>
                      <h4 style={{ fontSize: "14px", margin: 0 }}>{p.name}</h4>
                      <span style={{ fontSize: "12px", color: "var(--terracotta)", fontWeight: "bold" }}>₹{p.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteProduct(p.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      padding: "6px"
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ADMIN DASHBOARD
  if (currentRole === "admin") {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="badge badge-heritage">System Administrator View</span>
          <h2 style={{ fontSize: "28px", marginTop: "4px" }}>Platform Admin Dashboard</h2>
          <p style={{ color: "var(--text-muted)" }}>Moderate product uploads, verify rural artisans, and inspect site activity.</p>
        </div>

        {/* Global Analytics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifySelf: "space-between", color: "var(--terracotta)", marginBottom: "6px" }}>
              <span>Total Sellers</span>
              <Users size={18} />
            </div>
            <h3>148 Artisans</h3>
            <span style={{ fontSize: "11px", color: "green" }}>12 waiting verification</span>
          </div>

          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifySelf: "space-between", color: "var(--mustard-dark)", marginBottom: "6px" }}>
              <span>Platform Revenue</span>
              <TrendingUp size={18} />
            </div>
            <h3>₹4,12,890</h3>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>This month</span>
          </div>

          <div className="heritage-card" style={{ padding: "20px", background: "var(--cream)" }}>
            <div style={{ display: "flex", justifySelf: "space-between", color: "#2e7d32", marginBottom: "6px" }}>
              <span>Flagged Products</span>
              <AlertTriangle size={18} />
            </div>
            <h3>0 Flags</h3>
            <span style={{ fontSize: "11px", color: "green" }}>Clean moderation queue</span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "32px"
        }}>
          {/* Seller verification */}
          <div className="heritage-card" style={{ padding: "24px", background: "white" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>Artisan Verification Requests</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sellers.map((s) => (
                <div 
                  key={s.id}
                  style={{
                    padding: "12px",
                    border: "1px solid rgba(78, 54, 41, 0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", margin: 0 }}>{s.name}</h4>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0" }}>{s.craft} • {s.location}</p>
                    <span className={`badge ${s.status === "Verified" ? "badge-verified" : "badge-heritage"}`} style={{ fontSize: "9px" }}>
                      {s.status}
                    </span>
                  </div>
                  {s.status !== "Verified" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleVerify(s.id)}
                      style={{ padding: "6px 12px", fontSize: "11px" }}
                    >
                      <CheckCircle size={12} /> Verify Seller
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product moderation */}
          <div className="heritage-card" style={{ padding: "24px", background: "white" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>Live Product Moderation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {products.slice(0, 5).map((p) => (
                <div 
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    border: "1px solid rgba(78, 54, 41, 0.08)",
                    borderRadius: "8px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src={p.image} alt={p.name} style={{ width: "35px", height: "35px", borderRadius: "4px", objectFit: "cover" }} />
                    <div>
                      <h4 style={{ fontSize: "13px", margin: 0, textOverflow: "ellipsis", overflow: "hidden", maxWidth: "180px", whiteSpace: "nowrap" }}>{p.name}</h4>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.category}</span>
                    </div>
                  </div>
                  <span className="badge badge-organic" style={{ fontSize: "9px" }}>Approved</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
