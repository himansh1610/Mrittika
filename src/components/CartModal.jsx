import React, { useState } from "react";
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck, Ticket, Check } from "lucide-react";
import confetti from "canvas-confetti";

export default function CartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState("cart"); // cart, shipping, razorpay, success
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState("");
  
  const [shippingInfo, setShippingInfo] = useState({
    name: "Ajay Sharma",
    phone: "+91 98765 43210",
    address: "124, Arera Colony, Bhopal",
    city: "Bhopal",
    pincode: "462016",
    state: "Madhya Pradesh"
  });

  const [simulatedOrder, setSimulatedOrder] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (code === "HERITAGE10") {
      setDiscount(subtotal * 0.1);
      setCouponStatus("Coupon applied! 10% Discount.");
    } else if (code === "UTSAV15") {
      setDiscount(subtotal * 0.15);
      setCouponStatus("Coupon applied! 15% Festive Discount.");
    } else {
      setCouponStatus("Invalid coupon code.");
      setDiscount(0);
    }
  };

  const total = subtotal - discount;

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep("shipping");
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setCheckoutStep("razorpay");
  };

  const handleSimulatePayment = (success) => {
    if (success) {
      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Save order
      setSimulatedOrder({
        orderId: "HK-" + Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        shipping: { ...shippingInfo },
        total: total,
        status: "Ordered",
        date: new Date().toLocaleDateString()
      });

      setCheckoutStep("success");
    } else {
      alert("Payment failed. Please try simulating a successful payment!");
      setCheckoutStep("shipping");
    }
  };

  const handleSuccessClose = () => {
    onClearCart();
    setCheckoutStep("cart");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "550px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "85vh" }}
      >
        {/* Header */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(78, 54, 41, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--beige-bg)"
        }}>
          <h3 style={{ fontSize: "20px" }}>
            {checkoutStep === "cart" && "Your Shopping Cart"}
            {checkoutStep === "shipping" && "Shipping & Delivery"}
            {checkoutStep === "razorpay" && "Razorpay Secure Checkout"}
            {checkoutStep === "success" && "Order Confirmed! 🎉"}
          </h3>
          <button 
            onClick={checkoutStep === "success" ? handleSuccessClose : onClose}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          
          {/* STEP 1: CART LISTING */}
          {checkoutStep === "cart" && (
            <div>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "16px" }}>
                    Your cart is currently empty.
                  </p>
                  <button className="btn btn-primary" onClick={onClose}>
                    Explore Heritage Catalog
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Cart Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {cart.map((item) => (
                      <div 
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px",
                          border: "1px solid rgba(78, 54, 41, 0.08)",
                          borderRadius: "12px",
                          background: "white"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} 
                          />
                          <div>
                            <h4 style={{ fontSize: "14px", margin: 0 }}>{item.name}</h4>
                            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>₹{item.price}</span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {/* Qty selectors */}
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "20px", overflow: "hidden" }}>
                            <button 
                              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                              style={{ padding: "4px 8px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ padding: "0 8px", fontSize: "13px" }}>{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              style={{ padding: "4px 8px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          
                          {/* Delete */}
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon section */}
                  <div style={{
                    borderTop: "1px solid rgba(78, 54, 41, 0.1)",
                    borderBottom: "1px solid rgba(78, 54, 41, 0.1)",
                    padding: "16px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}>
                    <label style={{ fontSize: "12px", fontWeight: "bold" }}>Apply Promo Code</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input 
                        type="text" 
                        placeholder="Try 'HERITAGE10' or 'UTSAV15'" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                      />
                      <button className="btn btn-secondary" onClick={applyCoupon} style={{ borderRadius: "6px" }}>
                        Apply
                      </button>
                    </div>
                    {couponStatus && (
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: couponStatus.includes("applied") ? "green" : "red" }}>
                        {couponStatus}
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Subtotal:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "green" }}>
                        <span>Discount:</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1.5px solid #4E3629", paddingTop: "8px", fontSize: "16px" }}>
                      <span>Total:</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={handleStartCheckout} style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                    Proceed to Shipping <CreditCard size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING INFO FORM */}
          {checkoutStep === "shipping" && (
            <form onSubmit={handleSubmitShipping} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Full Name (पूरा नाम)</label>
                <input 
                  type="text" 
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Phone Number (फ़ोन नंबर)</label>
                <input 
                  type="tel" 
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Delivery Address (डिलिवरी पता)</label>
                <textarea 
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", height: "60px" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>City</label>
                  <input 
                    type="text" 
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Pincode</label>
                  <input 
                    type="text" 
                    value={shippingInfo.pincode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" className="btn btn-outline" onClick={() => setCheckoutStep("cart")} style={{ flex: 1, justifyContent: "center" }}>
                  Back to Cart
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }}>
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: MOCK RAZORPAY OVERLAY POPUP */}
          {checkoutStep === "razorpay" && (
            <div style={{
              background: "#1E2A38",
              color: "white",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #32465a",
              fontFamily: "var(--font-sans)",
              animation: "zoom-in 0.2s ease-out"
            }}>
              {/* Razorpay Brand */}
              <div style={{ display: "flex", justifySelf: "space-between", borderBottom: "1px solid #2e3e52", paddingBottom: "12px", marginBottom: "16px" }}>
                <div>
                  <h4 style={{ color: "white", fontSize: "15px", margin: 0 }}>Razorpay Secure</h4>
                  <span style={{ fontSize: "11px", color: "#8b9fb6" }}>HastKala MP Merchant Gateway</span>
                </div>
                <div style={{ background: "#06509f", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                  R
                </div>
              </div>

              {/* Amount Info */}
              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "12px", color: "#8b9fb6" }}>Total Payable Amount:</span>
                <h2 style={{ color: "white", fontSize: "28px", marginTop: "4px" }}>₹{total}</h2>
              </div>

              {/* Secure Info Alert */}
              <div style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                background: "#141e29",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#4bd686",
                marginBottom: "24px",
                border: "1.5px solid #1c3327"
              }}>
                <ShieldCheck size={18} />
                <span>Simulated Sandbox Environment. No real money will be charged.</span>
              </div>

              {/* Presets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleSimulatePayment(true)}
                  style={{
                    backgroundColor: "#2e7d32",
                    color: "white",
                    fontWeight: "bold",
                    justifyContent: "center",
                    padding: "12px"
                  }}
                >
                  Simulate Successful Payment (सफल भुगतान)
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleSimulatePayment(false)}
                  style={{
                    borderColor: "#d32f2f",
                    color: "#e57373",
                    justifyContent: "center",
                    padding: "12px"
                  }}
                >
                  Simulate Failed Payment (भुगतान विफलता)
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS */}
          {checkoutStep === "success" && simulatedOrder && (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
              <div style={{
                background: "#e8f5e9",
                color: "#2e7d32",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #c8e6c9"
              }}>
                <Check size={32} strokeWidth={3} />
              </div>

              <div>
                <h3 style={{ fontSize: "22px", color: "green" }}>भुगतान सफल! (Payment Successful)</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  Your order has been placed. Order ID: <b>{simulatedOrder.orderId}</b>
                </p>
              </div>

              {/* Delivery progress */}
              <div style={{
                width: "100%",
                background: "var(--beige-bg)",
                borderRadius: "12px",
                padding: "16px",
                border: "1px dashed var(--mustard)",
                textAlign: "left"
              }}>
                <h4 style={{ fontSize: "13px", color: "var(--brown)", marginBottom: "12px", fontWeight: "bold" }}>
                  Live Order Tracker (ऑर्डर ट्रैकिंग)
                </h4>

                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "green" }} />
                    <span><b>Ordered:</b> Completed today ({simulatedOrder.date})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.5 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "orange" }} />
                    <span><b>Shipped:</b> Estimated tomorrow</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.5 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--text-muted)" }} />
                    <span><b>In Transit:</b> In 2-3 Days</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.5 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--text-muted)" }} />
                    <span><b>Delivered:</b> Estimated inside 5 working days</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleSuccessClose} style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                Back to Marketplace (मुख्य पेज पर जाएं)
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
