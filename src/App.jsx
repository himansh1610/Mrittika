import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InteractiveMap from "./components/InteractiveMap";
import VoiceAssistant from "./components/VoiceAssistant";
import TutorialSystem from "./components/TutorialSystem";
import Dashboards from "./components/Dashboards";
import ProductCard from "./components/ProductCard";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartModal from "./components/CartModal";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import OnboardingWelcome from "./components/auth/OnboardingWelcome";
import { products as initialProducts } from "./data/products";
import { artisans } from "./data/artisans";
import { Sparkles, Calendar, BookOpen, Star, RefreshCw, ShoppingCart } from "lucide-react";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentRole, setCurrentRole] = useState("customer");
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState("Diwali");

  // ── Auth state ──────────────────────────────────────────────
  // authView: "login" | "signup" | "forgot-password" | "onboarding" | null (= main app)
  const [authView, setAuthView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  // Auth handlers
  const handleLoginSuccess = (user) => {
    if (!user) {
      // Guest mode — go straight to app
      setCurrentUser(null);
      setCurrentRole("customer");
      setAuthView(null);
      return;
    }
    setCurrentUser(user);
    setCurrentRole(user.role);
    setAuthView("onboarding");
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setAuthView("onboarding");
  };

  const handleOnboardingEnter = (dest) => {
    setAuthView(null);
    if (dest === "artisan-dashboard" || dest === "admin-dashboard") {
      setActiveTab("dashboard");
    } else {
      setActiveTab("home");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole("customer");
    setCart([]);
    setAuthView("login");
  };

  // Run onboarding automatically for first-time visits
  useEffect(() => {
    const visited = localStorage.getItem("hastkala_visited");
    if (!visited) {
      setOnboardingOpen(true);
      localStorage.setItem("hastkala_visited", "true");
    }
  }, []);

  // Add to cart operation
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Add product by Voice Name match
  const handleAddProductByName = (product) => {
    handleAddToCart(product);
  };

  // Update Cart Qty
  const handleUpdateQty = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Add product custom (artisan portal)
  const handleAddCustomProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.story.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesState = stateFilter === "All" || p.state === stateFilter;

    return matchesSearch && matchesCategory && matchesState;
  });

  // ── Auth gate ───────────────────────────────────────────────
  if (authView === "login") {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={setAuthView} />;
  }
  if (authView === "signup") {
    return <SignupPage onSignupSuccess={handleSignupSuccess} onNavigate={setAuthView} />;
  }
  if (authView === "forgot-password") {
    return <ForgotPasswordPage onNavigate={setAuthView} />;
  }
  if (authView === "onboarding" && currentUser) {
    return (
      <OnboardingWelcome
        user={currentUser}
        onEnter={handleOnboardingEnter}
        onNavigate={setAuthView}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        setCartOpen={setCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onStartOnboarding={() => setOnboardingOpen(true)}
        onOpenVoiceAssistant={() => {}}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main style={{ flex: 1, paddingBottom: "60px" }}>
        {/* Render Tab Views */}
        
        {/* 1. HOME TAB */}
        {activeTab === "home" && (
          <div>
            <Hero
              onExplore={() => {
                setCategoryFilter("All");
                setStateFilter("All");
                setActiveTab("browse");
              }}
              onBecomeArtisan={() => {
                setCurrentRole("artisan");
                setActiveTab("dashboard");
              }}
              onCategoryClick={(cat) => {
                setCategoryFilter(cat);
                setActiveTab("browse");
              }}
            />

            {/* Featured Heritage Showcase */}
            <section style={{ maxWidth: "1200px", margin: "40px auto 0", padding: "0 24px" }}>
              <div style={{ display: "flex", justifySelf: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span className="badge badge-handmade">Handpicked Items</span>
                  <h2 style={{ fontSize: "28px", marginTop: "4px" }}>Heritage Masterpieces</h2>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setCategoryFilter("All");
                    setActiveTab("browse");
                  }}
                >
                  View All Products
                </button>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px"
              }}>
                {products.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* Teaser 1: Local Foods & Consumables */}
            <section style={{ maxWidth: "1200px", margin: "50px auto 0", padding: "0 24px" }}>
              <div style={{ display: "flex", justifySelf: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span className="badge badge-organic">100% Pure Foods</span>
                  <h2 style={{ fontSize: "28px", marginTop: "4px" }}>Organic & Wellness Treasures</h2>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setCategoryFilter("Local Foods & Consumables");
                    setActiveTab("browse");
                  }}
                >
                  Browse Foods
                </button>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px"
              }}>
                {products.filter(p => p.category === "Local Foods & Consumables").slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* Teaser 2: God Idols Collection */}
            <section style={{ maxWidth: "1200px", margin: "50px auto 0", padding: "0 24px" }}>
              <div style={{ display: "flex", justifySelf: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span className="badge badge-heritage">Sacred Sculptures</span>
                  <h2 style={{ fontSize: "28px", marginTop: "4px" }}>God Idols & Spiritual Collection</h2>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setCategoryFilter("God Idols & Spiritual Collection");
                    setActiveTab("browse");
                  }}
                >
                  Browse Spirituals
                </button>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px"
              }}>
                {products.filter(p => p.category === "God Idols & Spiritual Collection").slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* Featured Artisan Highlight */}
            <section style={{
              background: "var(--cream)",
              padding: "48px 24px",
              marginTop: "60px",
              borderTop: "1px solid rgba(78, 54, 41, 0.08)",
              borderBottom: "1px solid rgba(78, 54, 41, 0.08)"
            }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <span className="badge badge-verified">Masters of the Guild</span>
                  <h2>Featured Artisans</h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Meet the hands weaving stories into every thread and molding history into every shape.</p>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "32px"
                }}>
                  {artisans.slice(0, 2).map((art) => (
                    <div key={art.id} className="heritage-card" style={{ display: "flex", flexDirection: "column", mdDirection: "row", padding: "24px", background: "white", gap: "16px" }}>
                      <img 
                        src={art.image} 
                        alt={art.name} 
                        style={{ width: "100%", height: "180px", borderRadius: "12px", objectFit: "cover" }} 
                      />
                      <div>
                        <span className="badge badge-heritage" style={{ marginBottom: "6px" }}>{art.specialty}</span>
                        <h3 style={{ fontSize: "18px", margin: "4px 0" }}>{art.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "10px" }}>📍 {art.region} • {art.experience} Experience</p>
                        <p style={{ fontSize: "12px", lineHeight: "1.5", color: "var(--text-dark)", marginBottom: "16px" }}>
                          {art.story.slice(0, 150)}...
                        </p>
                        <button 
                          className="btn btn-outline"
                          onClick={() => {
                            setSearchQuery("");
                            setCategoryFilter("All");
                            setStateFilter(art.state);
                            setActiveTab("browse");
                          }}
                          style={{ fontSize: "11px", padding: "6px 12px" }}
                        >
                          View Ramesh's Crafts
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. CATALOGUE/BROWSE TAB */}
        {activeTab === "browse" && (
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ display: "flex", justifySelf: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2>Heritage Catalog</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  Showing {filteredProducts.length} authentic products
                </p>
              </div>
              
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {/* Reset filters */}
                {(categoryFilter !== "All" || stateFilter !== "All" || searchQuery) && (
                  <button 
                    onClick={() => {
                      setCategoryFilter("All");
                      setStateFilter("All");
                      setSearchQuery("");
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    Clear Filters <RefreshCw size={12} />
                  </button>
                )}
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: "32px",
              alignItems: "start",
              gridTemplateAreas: '"sidebar grid"'
            }}>
              {/* Sidebar Filters */}
              <aside style={{ gridArea: "sidebar", display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Category selector */}
                <div className="heritage-card" style={{ padding: "16px", background: "white" }}>
                  <h4 style={{ fontSize: "14px", marginBottom: "10px", borderBottom: "1.5px solid rgba(78,54,41,0.08)", paddingBottom: "6px" }}>Categories</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {["All", "Pottery", "Handloom & Textiles", "Wooden Crafts", "Bamboo Crafts", "Handmade Jewelry", "Paintings & Wall Art", "God Idols & Spiritual Collection", "Beauty & Wellness", "Local Foods & Consumables"].map((c) => (
                      <label key={c} style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                        <input 
                          type="radio" 
                          name="category" 
                          checked={categoryFilter === c} 
                          onChange={() => setCategoryFilter(c)} 
                          style={{ accentColor: "var(--terracotta)" }}
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                {/* State selector */}
                <div className="heritage-card" style={{ padding: "16px", background: "white" }}>
                  <h4 style={{ fontSize: "14px", marginBottom: "10px", borderBottom: "1.5px solid rgba(78,54,41,0.08)", paddingBottom: "6px" }}>States of Origin</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {["All", "Madhya Pradesh", "Rajasthan", "Bihar", "Jammu & Kashmir", "West Bengal", "Odisha", "Kerala"].map((s) => (
                      <label key={s} style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                        <input 
                          type="radio" 
                          name="state" 
                          checked={stateFilter === s} 
                          onChange={() => setStateFilter(s)} 
                          style={{ accentColor: "var(--terracotta)" }}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div style={{ gridArea: "grid" }}>
                {filteredProducts.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <h3>No products found!</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "8px" }}>
                      Try clearing search filters or look for other states.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "24px"
                  }}>
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onSelect={setSelectedProduct}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. STATE MAP TAB */}
        {activeTab === "map" && (
          <InteractiveMap
            onFilterState={(state) => {
              setStateFilter(state);
              setCategoryFilter("All");
              setActiveTab("browse");
            }}
            onSelectArtisan={(artisanId) => {
              setActiveTab("stories");
            }}
          />
        )}

        {/* 4. FESTIVALS TAB */}
        {activeTab === "festival" && (
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span className="badge badge-heritage" style={{ display: "inline-block", marginBottom: "8px" }}>Festive Marketplace (उत्सव मेला)</span>
              <h2>Traditional Festive Bazaar</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Shop custom collections crafted especially for India's major celebrations.
              </p>
            </div>

            {/* Festival selector buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
              {["Diwali", "Ganesh Chaturthi", "Navratri", "Holi", "Raksha Bandhan"].map((fest) => (
                <button
                  key={fest}
                  onClick={() => setSelectedFestival(fest)}
                  style={{
                    background: selectedFestival === fest ? "var(--terracotta)" : "white",
                    color: selectedFestival === fest ? "white" : "var(--brown)",
                    border: "2px solid var(--mustard)",
                    borderRadius: "50px",
                    padding: "8px 24px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Calendar size={14} /> {fest}
                </button>
              ))}
            </div>

            {/* Festive Collections display */}
            <div className="heritage-card" style={{ padding: "32px", background: "var(--cream)", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>{selectedFestival} Custom Collection</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "24px" }}>
                {selectedFestival === "Diwali" && "Illuminating homes with handmade diyas, aroma diffusers, and decorative earthen lamps."}
                {selectedFestival === "Ganesh Chaturthi" && "Welcoming the remover of obstacles with eco-friendly soluble Ganesha idols and copper incense sets."}
                {selectedFestival === "Navratri" && "Celebrating colors with Jaipur lac bangles and colorful Maheshwari sarees."}
                {selectedFestival === "Holi" && "Spreading organic joy with natural face packs, herbal rose waters, and local food consumables."}
                {selectedFestival === "Raksha Bandhan" && "Bonding family ties with tribal beaded accessories and premium dry fruits boxes."}
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "24px"
              }}>
                {products
                  .filter((p) => {
                    if (selectedFestival === "Diwali") return p.name.includes("Diya") || p.name.includes("Lamp") || p.name.includes("Vase");
                    if (selectedFestival === "Ganesh Chaturthi") return p.name.includes("Ganesha") || p.name.includes("Incense") || p.name.includes("Temple");
                    if (selectedFestival === "Navratri") return p.name.includes("Saree") || p.name.includes("Bangles") || p.name.includes("Necklace");
                    if (selectedFestival === "Holi") return p.name.includes("Water") || p.name.includes("Pack") || p.name.includes("Papad");
                    return p.name.includes("Fruits") || p.name.includes("Beaded") || p.name.includes("Makhana");
                  })
                  .slice(0, 4)
                  .map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelect={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ARTISAN STORIES TAB */}
        {activeTab === "stories" && (
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span className="badge badge-cultural" style={{ display: "inline-block", marginBottom: "8px" }}>Artisan Chronicles (कारीगर गाथा)</span>
              <h2>Stories Behind the Craft</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Every masterpiece holds generations of history and the unique soul of its creator.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {artisans.map((art) => (
                <div 
                  key={art.id} 
                  className="heritage-card" 
                  style={{
                    background: "white",
                    padding: "32px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px"
                  }}
                >
                  <img 
                    src={art.image} 
                    alt={art.name} 
                    style={{ width: "100%", height: "280px", borderRadius: "16px", objectFit: "cover", border: "2px solid var(--mustard)" }} 
                  />
                  <div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {art.badges.map((b, idx) => (
                        <span key={idx} className="badge badge-heritage" style={{ fontSize: "10px" }}>{b}</span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: "24px", color: "var(--brown)" }}>{art.name}</h3>
                    <span style={{ fontSize: "12px", color: "var(--terracotta)", fontWeight: "bold", display: "block", margin: "4px 0 12px" }}>
                      📍 {art.region} • {art.experience} Experience
                    </span>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <h4 style={{ fontSize: "13px", color: "var(--brown)", fontWeight: "bold", marginBottom: "4px" }}>Our Family History & Legacy</h4>
                      <p style={{ fontSize: "13px", color: "var(--text-dark)", lineHeight: "1.6" }}>{art.story}</p>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "13px", color: "var(--brown)", fontWeight: "bold", marginBottom: "4px" }}>The Crafting Process</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}>{art.craftHistory}</p>
                    </div>

                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setCategoryFilter("All");
                        setStateFilter(art.state);
                        setActiveTab("browse");
                      }}
                    >
                      Browse Ramesh's Creations
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. DASHBOARDS TAB */}
        {activeTab === "dashboard" && (
          <Dashboards
            currentRole={currentRole}
            products={products}
            setProducts={setProducts}
            onAddCustomProduct={handleAddCustomProduct}
          />
        )}
      </main>

      {/* Floating Audio Voice Assistant Overlay */}
      <VoiceAssistant
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
        setCartOpen={setCartOpen}
        onAddProductByName={handleAddProductByName}
        products={products}
      />

      {/* Tutorial system */}
      <TutorialSystem
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* Footer */}
      <footer style={{
        background: "var(--brown-dark)",
        color: "#f0e6da",
        padding: "40px 24px",
        textAlign: "center",
        borderTop: "6px solid var(--mustard)",
        fontSize: "13px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3>HastKala MP</h3>
          <p style={{ color: "#d2c4b5", maxWidth: "600px", margin: "0 auto", lineHeight: "1.5" }}>
            Preserving and promoting India's rural craftsmanship through smart voice assistance, guided onboarding, and transparent payment structures.
          </p>
          <div style={{ borderTop: "1px solid rgba(253,251,250,0.1)", paddingTop: "16px", color: "#bdae9c" }}>
            © 2026 HastKala MP. Developed for Digital Heritage Marketplace Showcase.
          </div>
        </div>
      </footer>
    </div>
  );
}
