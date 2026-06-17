import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, X, Command, ArrowRight } from "lucide-react";

export default function VoiceAssistant({
  setActiveTab,
  setSearchQuery,
  setCartOpen,
  onAddProductByName,
  products
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("नमस्ते! मैं आपका हस्तकला सहायक हूँ। आप हिंदी या English में बोल सकते हैं।");
  const recognitionRef = useRef(null);

  // Initialize Speech Synthesis
  const speakText = (text, lang = "hi-IN") => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Preset commands for easy simulation (investor/demo mode)
  const presets = [
    { label: 'English: "Show Gond paintings"', cmd: "show gond paintings" },
    { label: 'English: "Show Makhana"', cmd: "show makhana" },
    { label: 'English: "Show Ganesha idols"', cmd: "show ganesha idols" },
    { label: 'English: "Show pottery products"', cmd: "show pottery products" },
    { label: 'Hindi: "गोंड पेंटिंग दिखाओ"', cmd: "गोंड पेंटिंग दिखाओ" },
    { label: 'Hindi: "मखाना दिखाओ"', cmd: "मखाना दिखाओ" },
    { label: 'Hindi: "गणेश जी की मूर्तियाँ दिखाओ"', cmd: "गणेश जी की मूर्तियाँ दिखाओ" },
    { label: 'Hindi: "हर्बल साबुन दिखाओ"', cmd: "हर्बल साबुन दिखाओ" },
    { label: 'Hindi: "मटके दिखाओ"', cmd: "मटके दिखाओ" },
    { label: 'English: "open cart"', cmd: "open cart" }
  ];

  // Core command parser
  const processCommand = (commandText) => {
    const cmd = commandText.toLowerCase().trim();
    setTranscript(commandText);

    // 1. GOND PAINTINGS
    if (cmd.includes("gond painting") || cmd.includes("गोंड पेंटिंग") || cmd.includes("गोंड चित्र")) {
      setSearchQuery("");
      setActiveTab("browse");
      setSearchQuery("Gond Painting");
      const resp = "Showing authentic tribal Gond paintings. पारंपरिक गोंड चित्रकारी दिखाई जा रही है।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // 2. MAKHANA
    if (cmd.includes("makhana") || cmd.includes("मखाना")) {
      setSearchQuery("");
      setActiveTab("browse");
      setSearchQuery("Makhana");
      const resp = "Showing premium organic Makhana. मखाना उत्पाद दिखाए जा रहे हैं।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // 3. GANESHA IDOLS
    if (cmd.includes("ganesha") || cmd.includes("गणेश जी") || cmd.includes("गणेश")) {
      setSearchQuery("");
      setActiveTab("browse");
      setSearchQuery("Ganesha");
      const resp = "Here is our Lord Ganesha spiritual collection. श्री गणेश जी की मूर्तियाँ दिखाई जा रही हैं।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // 4. HERBAL SOAP
    if (cmd.includes("herbal soap") || cmd.includes("soap") || cmd.includes("साबुन") || cmd.includes("हर्बल साबुन")) {
      setSearchQuery("");
      setActiveTab("browse");
      setSearchQuery("Soap");
      const resp = "Showing organic Neem and Sandalwood soaps. जैविक और हर्बल साबुन दिखाए जा रहे हैं।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // 5. MATKA / WATER POT
    if (cmd.includes("matka") || cmd.includes("मटका") || cmd.includes("मटके") || cmd.includes("water pot")) {
      setSearchQuery("");
      setActiveTab("browse");
      setSearchQuery("Water Pot");
      const resp = "Showing traditional terracotta cooling pots. पारंपरिक मिट्टी के मटके और घड़े दिखाए जा रहे हैं।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // 6. POTTERY
    if (cmd.includes("pottery") || cmd.includes("पॉटरी") || cmd.includes("मिट्टी के")) {
      setSearchQuery("");
      setActiveTab("browse");
      setSearchQuery("Pottery");
      const resp = "Here are our traditional pottery products. यहाँ सुंदर पॉटरी उत्पाद हैं।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // 7. OPEN CART
    if (cmd.includes("open cart") || cmd.includes("cart") || cmd.includes("कार्ट") || cmd.includes("थैला")) {
      setCartOpen(true);
      const resp = "Opening your shopping cart. आपका कार्ट खोल दिया गया है।";
      setAssistantResponse(resp);
      speakText(resp, "hi-IN");
      return;
    }

    // Default Fallback
    const resp = `I heard: "${commandText}". Try saying: "गोंड पेंटिंग दिखाओ", "मखाना दिखाओ", or "मटके दिखाओ".`;
    setAssistantResponse(resp);
    speakText(resp, "en-IN");
  };

  // Handle Real microphone start/stop
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "hi-IN"; // Set primary language to support Hindi/English hybrid

      rec.onstart = () => {
        setIsListening(true);
        setTranscript("Listening... बोलिए...");
      };

      rec.onresult = (event) => {
        const resultText = event.results[0][0].transcript;
        processCommand(resultText);
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error: ", e);
        setIsListening(false);
        setTranscript("Speech error or microphone blocked. Please try preset triggers below!");
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [products]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Web Speech Recognition is not fully supported in this browser. Please use the simulated preset clicks!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <>
      {/* Floating Microphone Trigger */}
      <div 
        id="floating-voice-mic"
        onClick={() => {
          setIsOpen(true);
          speakText("नमस्ते, मैं आपकी कैसे सहायता करूँ? How can I help you today?");
        }}
        className={`float ${isListening ? "mic-active" : ""}`}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "var(--terracotta)",
          color: "var(--cream)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-lg)",
          cursor: "pointer",
          zIndex: 999,
          border: "2.5px solid var(--mustard)",
          transition: "var(--transition)"
        }}
        title="Voice Assistant (आवाज सहायक)"
      >
        <Mic size={26} />
      </div>

      {/* Assistant Modal Window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "105px",
          right: "32px",
          width: "350px",
          maxHeight: "480px",
          backgroundColor: "var(--cream)",
          borderRadius: "20px",
          border: "2px solid var(--mustard)",
          boxShadow: "var(--shadow-lg)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "zoom-in 0.25s ease-out"
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(90deg, var(--terracotta), var(--brown))",
            color: "var(--cream)",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Command size={18} color="var(--mustard)" />
              <span style={{ fontWeight: "600", fontSize: "14px" }}>HastKala Voice Assistant</span>
            </div>
            <X 
              size={18} 
              onClick={() => setIsOpen(false)} 
              style={{ cursor: "pointer" }} 
            />
          </div>

          {/* Dialog Area */}
          <div style={{ padding: "16px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{
              background: "var(--beige-bg)",
              padding: "12px",
              borderRadius: "12px",
              fontSize: "13px",
              borderLeft: "4px solid var(--mustard)",
              lineHeight: "1.5"
            }}>
              <b>Assistant:</b>
              <p style={{ marginTop: "4px" }}>{assistantResponse}</p>
            </div>

            {transcript && (
              <div style={{
                background: "#fcece7",
                padding: "8px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                alignSelf: "flex-end",
                maxWidth: "85%",
                color: "var(--terracotta-dark)",
                border: "1px solid var(--terracotta-light)"
              }}>
                <b>You:</b> {transcript}
              </div>
            )}

            {/* Mic Button Inside */}
            <div style={{ textAlign: "center", margin: "10px 0" }}>
              <button
                onClick={toggleMic}
                style={{
                  background: isListening ? "var(--mustard)" : "var(--terracotta)",
                  color: isListening ? "var(--brown)" : "var(--cream)",
                  border: "none",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>
                {isListening ? "Listening... Speak now!" : "Click to speak (English/Hindi)"}
              </p>
            </div>

            {/* Simulated Preset Clicks */}
            <div style={{ borderTop: "1px solid rgba(78, 54, 41, 0.1)", paddingTop: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--brown)", display: "block", marginBottom: "6px" }}>
                🎯 Preset Simulation (For Demo & Sandbox)
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => processCommand(preset.cmd)}
                    style={{
                      background: "white",
                      border: "1px solid rgba(192, 92, 62, 0.25)",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      fontSize: "11px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "var(--transition)"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "var(--beige-bg)"}
                    onMouseLeave={(e) => e.target.style.background = "white"}
                  >
                    <span>{preset.label}</span>
                    <ArrowRight size={12} color="var(--terracotta)" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
