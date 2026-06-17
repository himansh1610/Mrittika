// ============================================================
// HastKala MP – Mock User Database & Auth Helpers
// ============================================================

export const demoUsers = [
  {
    id: "usr-1",
    name: "Priya Sharma",
    email: "customer@hastkala.com",
    phone: "9876543210",
    password: "123456",
    role: "customer",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    createdAt: "2025-01-15T10:00:00Z",
    artisanProfile: null
  },
  {
    id: "usr-2",
    name: "Ramesh Kushwaha",
    email: "artisan@hastkala.com",
    phone: "9812345678",
    password: "123456",
    role: "artisan",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    createdAt: "2025-02-10T08:30:00Z",
    artisanProfile: {
      businessName: "Kushwaha Pottery Works",
      state: "Madhya Pradesh",
      district: "Dhar",
      specialization: "Pottery",
      about: "5th generation potter from Dhar, MP. I create traditional clay pots and terracotta art using methods passed down for over 150 years.",
      rating: 4.9,
      verified: true
    }
  },
  {
    id: "usr-3",
    name: "Admin User",
    email: "admin@hastkala.com",
    phone: "9000000001",
    password: "123456",
    role: "admin",
    profileImage: null,
    createdAt: "2024-12-01T00:00:00Z",
    artisanProfile: null
  }
];

// Simulated persistent store (session-only)
let registeredUsers = [...demoUsers];

// ─── Auth helpers ───────────────────────────────────────────
export const loginUser = (emailOrPhone, password) => {
  const user = registeredUsers.find(
    (u) =>
      (u.email === emailOrPhone || u.phone === emailOrPhone) &&
      u.password === password
  );
  return user || null;
};

export const registerUser = (userData) => {
  const exists = registeredUsers.find(
    (u) => u.email === userData.email || u.phone === userData.phone
  );
  if (exists) {
    return { success: false, error: "An account with this email or phone already exists." };
  }

  const newUser = {
    id: "usr-" + Date.now(),
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    role: userData.role,
    profileImage: userData.profileImage || null,
    createdAt: new Date().toISOString(),
    artisanProfile: userData.role === "artisan" ? {
      businessName: userData.businessName || "",
      state: userData.state || "",
      district: userData.district || "",
      specialization: userData.specialization || "",
      about: userData.about || "",
      rating: 0,
      verified: false
    } : null
  };

  registeredUsers.push(newUser);
  return { success: true, user: newUser };
};

export const getAllUsers = () => registeredUsers;

export const craftSpecializations = [
  "Pottery",
  "Gond Painting",
  "Madhubani Art",
  "Warli Art",
  "Wooden Crafts",
  "Bamboo Crafts",
  "Handloom & Textiles",
  "Jewelry Making",
  "Beauty Products",
  "Local Foods",
  "God Idols & Brass Casting",
  "Pithora Art",
  "Block Printing",
  "Other"
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Jammu & Kashmir", "Ladakh", "Delhi"
];
