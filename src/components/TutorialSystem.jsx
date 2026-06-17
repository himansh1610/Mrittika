import React, { useState } from "react";
import { HelpCircle, ChevronRight, X, ArrowLeft, Volume2 } from "lucide-react";

export default function TutorialSystem({ isOpen, onClose, activeTab, setActiveTab }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. हस्तकला मध्य प्रदेश में आपका स्वागत है! 🏵️",
      hindiDesc: "यह भारत का पहला डिजिटल हेरिटेज स्टोर है जहाँ आप सीधे भारतीय कारीगरों से जुड़ सकते हैं।",
      englishDesc: "Welcome to India's first digital heritage store connecting you directly with authentic artisans.",
      targetId: "body",
      actionHint: "चलिए आगे बढ़ते हैं और इस अनूठे बाजार को देखते हैं।"
    },
    {
      title: "2. उत्पादों की खोज (Search & Categories) 🔍",
      hindiDesc: "ऊपर बने खोज बॉक्स से आप कोई भी उत्पाद खोज सकते हैं। जैसे 'पॉटरी' या 'सारे'।",
      englishDesc: "Use the top search bar to find any craft or item instantly (e.g. 'Pottery' or 'Makhana').",
      targetId: "nav-search-bar",
      actionHint: "यदि आपको सहायता चाहिए तो ऊपर 'मार्केंटप्लेस' पर क्लिक करें।"
    },
    {
      title: "3. राज्यों का नक्शा (Interactive Map) 🗺️",
      hindiDesc: "'State Crafts Map' पर जाएं, किसी भी राज्य पर क्लिक करें और वहां के प्रसिद्ध शिल्पों की कहानी जानें।",
      englishDesc: "Navigate to the State Crafts Map, click a state, and explore localized cultural heritage.",
      targetId: "body",
      actionHint: "मध्य प्रदेश के गोंड चित्र और महेश्वरी साड़ी की जानकारी अवश्य देखें।"
    },
    {
      title: "4. कार्ट और सुरक्षित भुगतान (Cart & Razorpay) 🛒",
      hindiDesc: "पसंदीदा उत्पाद को कार्ट में जोड़ें। आप कूपन कोड लगाकर मॉक रेजरपे से सुरक्षित भुगतान कर सकते हैं।",
      englishDesc: "Add items to your cart, apply coupons, and checkout using a safe simulated Razorpay payment gateway.",
      targetId: "nav-cart-btn",
      actionHint: "इस बटन से उत्पाद कार्ट में जोड़ें - 'कार्ट में जोड़ें' बटन का उपयोग करें।"
    },
    {
      title: "5. हिंदी आवाज़ सहायक (Voice Assistant) 🎤",
      hindiDesc: "नीचे दाईं तरफ बने माइक्रोफोन बटन को दबाकर आप हिंदी या इंग्लिश में बोलकर साइट चला सकते हैं!",
      englishDesc: "Tap the floating microphone button to navigate, search, or add products using Hindi or English voice commands.",
      targetId: "floating-voice-mic",
      actionHint: "उदाहरण के लिए कहें: 'पॉटरी दिखाओ' या 'कार्ट खोलो'।"
    }
  ];

  if (!isOpen) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Auto navigate to relevant tabs to show the user
      if (currentStep === 1) setActiveTab("browse");
      if (currentStep === 2) setActiveTab("map");
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(78, 54, 41, 0.55)",
      backdropFilter: "blur(3px)",
      zIndex: 2000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px"
    }}>
      <div style={{
        maxWidth: "480px",
        width: "100%",
        backgroundColor: "var(--cream)",
        border: "3px solid var(--mustard)",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        animation: "zoom-in 0.25s ease-out"
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)"
          }}
        >
          <X size={20} />
        </button>

        {/* Progress Dots */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {steps.map((_, idx) => (
            <div 
              key={idx}
              style={{
                height: "6px",
                flex: 1,
                borderRadius: "3px",
                backgroundColor: idx === currentStep ? "var(--terracotta)" : "var(--beige-bg)",
                border: "1px solid rgba(192, 92, 62, 0.2)"
              }}
            />
          ))}
        </div>

        {/* Header */}
        <h3 style={{ fontSize: "18px", color: "var(--brown)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <HelpCircle size={20} color="var(--terracotta)" /> {step.title}
        </h3>

        {/* Hindi Instructions */}
        <div style={{
          background: "#FAF6F0",
          borderLeft: "4px solid var(--terracotta)",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "12px"
        }}>
          <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--terracotta)", fontWeight: "bold", display: "block", marginBottom: "4px" }}>
            हिन्दी मार्गदर्शन (Hindi Guide)
          </span>
          <p style={{ fontSize: "14px", fontWeight: "500", color: "var(--brown-dark)", lineHeight: "1.5" }}>
            {step.hindiDesc}
          </p>
        </div>

        {/* English Instructions */}
        <div style={{ marginBottom: "20px", padding: "4px 12px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.4" }}>
            {step.englishDesc}
          </p>
        </div>

        {/* Help Tip Alert */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "var(--text-muted)",
          marginBottom: "24px",
          backgroundColor: "#fcf9f4",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px dashed var(--mustard)"
        }}>
          <Volume2 size={16} color="var(--mustard-dark)" />
          <span><b>संकेत:</b> {step.actionHint}</span>
        </div>

        {/* Footer Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="btn btn-outline"
            style={{
              padding: "8px 16px",
              opacity: currentStep === 0 ? 0.4 : 1,
              cursor: currentStep === 0 ? "not-allowed" : "pointer"
            }}
          >
            <ArrowLeft size={16} /> पीछे (Back)
          </button>
          
          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ padding: "8px 20px" }}
          >
            {currentStep === steps.length - 1 ? "शुरू करें (Finish)" : "आगे बढ़ें (Next)"} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
