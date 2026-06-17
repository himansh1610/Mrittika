import React, { useState } from "react";
import { MapPin, Info, ArrowRight, User } from "lucide-react";

export default function InteractiveMap({ onFilterState, onSelectArtisan }) {
  const [selectedState, setSelectedState] = useState("Madhya Pradesh");

  const stateData = {
    "Madhya Pradesh": {
      capital: "Bhopal",
      crafts: ["Gond Paintings", "Terracotta Pottery", "Bamboo Crafts", "Maheshwari Sarees", "Bagh Block Prints"],
      artisans: [
        { id: "art-1", name: "Ramesh Kushwaha", role: "Terracotta Potter" },
        { id: "art-2", name: "Sunita Maheshwari", role: "Saree Weaver" },
        { id: "art-4", name: "Phool Bai Gond", role: "Gond Painter" }
      ],
      story: "Madhya Pradesh lies in the heart of India, rich in tribal heritage and royal handloom patronage. The Holkar dynasty of Maheshwar and Scindias of Gwalior nurtured weaving and pottery guilds that exist to this day. Tribal Gond painters use lines and dots to draw forest stories on canvas.",
      famousProduct: "Royal Maheshwari Silk Saree"
    },
    "Rajasthan": {
      capital: "Jaipur",
      crafts: ["Brass casting", "Bandhani tie-dye", "Meenakari jewelry", "Blue Pottery", "Lac Bangles"],
      artisans: [
        { id: "art-7", name: "Karan Johar Soni", role: "Brass Castor & Jeweler" }
      ],
      story: "The royal land of Rajputs, Rajasthan is globally renowned for luxury crafts. The kings of Jaipur invited craftsmen from Persia to establish the iconic Blue Pottery workshops. Rajasthani tie-and-dye (Bandhani) and lost-wax casting represent timeless accuracy.",
      famousProduct: "Flute-Playing Lord Krishna Brass Statue"
    },
    "Bihar": {
      capital: "Patna",
      crafts: ["Madhubani Paintings", "Phool Makhana harvesting", "Sikkigrass basketry"],
      artisans: [
        { id: "art-6", name: "Saraswati Devi", role: "Madhubani Painter" }
      ],
      story: "Mithila in Bihar is home to Madhubani art, traditionally painted by women to celebrate weddings and harvests. Bihar's marshy lakes also yield premium Makhana (foxnuts), harvested and popped using traditional fire techniques.",
      famousProduct: "Premium Phool Makhana"
    },
    "Jammu & Kashmir": {
      capital: "Srinagar",
      crafts: ["Pashmina Shawls", "Walnut wood carving", "Paper Mache"],
      artisans: [
        { id: "art-6", name: "Saraswati Devi", role: "Collaborating Artisan" }
      ],
      story: "Nestled in the Himalayas, Kashmir is famous for the softest wools in the world. The authentic Pashmina shawl takes months of handloom work. Delicate Sozni needlework details nature's patterns onto these shawls.",
      famousProduct: "Embroidered Woolen Shawl"
    },
    "Odisha": {
      capital: "Bhubaneswar",
      crafts: ["Silver Filigree (Tarakasi)", "Pattachitra Paintings", "Sambalpuri Handloom"],
      artisans: [
        { id: "art-7", name: "Karan Johar Soni", role: "Filigree Specialist" }
      ],
      story: "Odisha is famous for maritime crafts. The silver filigree of Cuttack (Tarakasi) dates back hundreds of years, inspired by ships sailing to Bali. Weavers create beautiful cotton sarees with forest patterns.",
      famousProduct: "Handcrafted Silver Filigree Earrings"
    },
    "Kerala": {
      capital: "Trivandrum",
      crafts: ["Coir baskets", "Brass Lamps", "Spices (Cardamom, Pepper)"],
      artisans: [
        { id: "art-7", name: "Karan Johar Soni", role: "Spices curator" }
      ],
      story: "Known as the spice garden of India, Kerala's moist hills grow premium cardamom and black gold (pepper) since Roman trade times. Coir craft utilizes waste coconut husks to make beautiful organic items.",
      famousProduct: "Organic Spices Combo"
    }
  };

  const states = Object.keys(stateData);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <span className="badge badge-heritage" style={{ marginBottom: "8px" }}>Interactive Heritage Journey</span>
        <h2>Discover India's State-wise Crafts</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Click on a state in the map or list below to discover native crafts, artisan stories, and authentic regional products.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "32px",
        alignItems: "start"
      }}>
        {/* Visual Map Representation */}
        <div className="heritage-card" style={{ padding: "24px", textAlign: "center", background: "var(--cream)" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Map of India (Heritage States)</h3>
          
          <div style={{ position: "relative", height: "380px", margin: "0 auto", maxWidth: "320px" }}>
            {/* Simple Stylized India Outline SVG */}
            <svg viewBox="0 0 400 480" style={{ width: "100%", height: "100%" }}>
              {/* Stylized background boundary */}
              <path 
                d="M 170 30 L 195 20 L 225 35 L 230 65 L 210 90 L 230 110 L 260 130 L 300 130 L 330 150 L 350 150 L 340 180 L 310 170 L 280 190 L 285 220 L 255 210 L 245 235 L 235 240 L 225 280 L 215 310 L 205 340 L 195 380 L 190 410 L 180 430 L 185 450 L 175 460 L 170 430 L 165 390 L 160 360 L 155 330 L 140 290 L 130 250 L 135 230 L 115 220 L 95 210 L 80 190 L 95 160 L 115 150 L 140 145 L 150 115 L 165 95 Z" 
                fill="#fcfcfc" 
                stroke="#e5ccb6" 
                strokeWidth="2.5" 
              />
              
              {/* Highlight Nodes for Heritage States */}
              
              {/* J&K */}
              <g 
                onClick={() => setSelectedState("Jammu & Kashmir")} 
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx="185" cy="50" r={selectedState === "Jammu & Kashmir" ? "12" : "8"} 
                  fill={selectedState === "Jammu & Kashmir" ? "var(--terracotta)" : "var(--mustard)"} 
                  stroke="white" strokeWidth="2"
                  style={{ transition: "var(--transition)" }}
                />
                <text x="200" y="54" fontSize="10" fontWeight="bold" fill="var(--brown)">J&K</text>
              </g>

              {/* Rajasthan */}
              <g 
                onClick={() => setSelectedState("Rajasthan")} 
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx="125" cy="170" r={selectedState === "Rajasthan" ? "12" : "8"} 
                  fill={selectedState === "Rajasthan" ? "var(--terracotta)" : "var(--mustard)"} 
                  stroke="white" strokeWidth="2"
                  style={{ transition: "var(--transition)" }}
                />
                <text x="140" y="174" fontSize="10" fontWeight="bold" fill="var(--brown)">Rajasthan</text>
              </g>

              {/* Madhya Pradesh */}
              <g 
                onClick={() => setSelectedState("Madhya Pradesh")} 
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx="180" cy="220" r={selectedState === "Madhya Pradesh" ? "14" : "9"} 
                  fill={selectedState === "Madhya Pradesh" ? "var(--terracotta)" : "var(--mustard)"} 
                  stroke="white" strokeWidth="2"
                  className={selectedState === "Madhya Pradesh" ? "mic-active" : ""}
                  style={{ transition: "var(--transition)" }}
                />
                <text x="200" y="224" fontSize="11" fontWeight="bold" fill="var(--brown)">Madhya Pradesh</text>
              </g>

              {/* Bihar */}
              <g 
                onClick={() => setSelectedState("Bihar")} 
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx="245" cy="190" r={selectedState === "Bihar" ? "12" : "8"} 
                  fill={selectedState === "Bihar" ? "var(--terracotta)" : "var(--mustard)"} 
                  stroke="white" strokeWidth="2"
                  style={{ transition: "var(--transition)" }}
                />
                <text x="260" y="194" fontSize="10" fontWeight="bold" fill="var(--brown)">Bihar</text>
              </g>

              {/* Odisha */}
              <g 
                onClick={() => setSelectedState("Odisha")} 
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx="230" cy="265" r={selectedState === "Odisha" ? "12" : "8"} 
                  fill={selectedState === "Odisha" ? "var(--terracotta)" : "var(--mustard)"} 
                  stroke="white" strokeWidth="2"
                  style={{ transition: "var(--transition)" }}
                />
                <text x="245" y="269" fontSize="10" fontWeight="bold" fill="var(--brown)">Odisha</text>
              </g>

              {/* Kerala */}
              <g 
                onClick={() => setSelectedState("Kerala")} 
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx="165" cy="400" r={selectedState === "Kerala" ? "12" : "8"} 
                  fill={selectedState === "Kerala" ? "var(--terracotta)" : "var(--mustard)"} 
                  stroke="white" strokeWidth="2"
                  style={{ transition: "var(--transition)" }}
                />
                <text x="180" y="404" fontSize="10" fontWeight="bold" fill="var(--brown)">Kerala</text>
              </g>
            </svg>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "16px" }}>
            {states.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedState(s)}
                style={{
                  background: selectedState === s ? "var(--terracotta)" : "transparent",
                  color: selectedState === s ? "white" : "var(--brown)",
                  border: "1px solid var(--terracotta)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* State details panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {selectedState && (
            <div className="heritage-card" style={{ padding: "28px", borderTop: "6px solid var(--terracotta)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "24px" }}>{selectedState}</h3>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    Capital: {stateData[selectedState].capital}
                  </span>
                </div>
                <div style={{
                  background: "#FCECE7",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--terracotta)"
                }}>
                  <MapPin size={24} />
                </div>
              </div>

              {/* Cultural story */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", color: "var(--terracotta)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <Info size={14} /> Heritage & Cultural Story
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-dark)", lineHeight: "1.6" }}>
                  {stateData[selectedState].story}
                </p>
              </div>

              {/* Native Crafts */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", color: "var(--terracotta)", marginBottom: "8px" }}>Native Crafts (स्थानीय शिल्प)</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {stateData[selectedState].crafts.map((craft, idx) => (
                    <span 
                      key={idx}
                      style={{
                        background: "var(--beige-bg)",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "var(--brown)"
                      }}
                    >
                      {craft}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Artisans */}
              <div style={{ marginBottom: "24px", padding: "12px", border: "1px dashed var(--mustard)", borderRadius: "10px" }}>
                <h4 style={{ fontSize: "13px", color: "var(--brown)", marginBottom: "8px", fontWeight: "bold" }}>Featured Artisans of the Region</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {stateData[selectedState].artisans.map((art, idx) => (
                    <div 
                      key={idx}
                      onClick={() => onSelectArtisan(art.id)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        background: "var(--cream)",
                        cursor: "pointer",
                        border: "1px solid rgba(192, 92, 62, 0.1)"
                      }}
                    >
                      <span style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <User size={12} color="var(--terracotta)" /> {art.name}
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>{art.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => onFilterState(selectedState)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Browse {selectedState} Crafts <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
