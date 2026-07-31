// Central place for site-wide constants.
// Sections in later phases will import from here instead of hardcoding copy.

export const SITE = {
  name: "Miftahul Islam",
  role: "Web Developer / Civil Engineer",
  tagline: "Building software the way I build structures — one solid layer at a time.",
  email: "miftahulislam504@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/miftahulislam504-crypto",
    whatsapp: "https://wa.me/8801776485474",
  },
};

// ---------- Contact → macOS Floating Dock ----------
export const DOCK_ITEMS = [
  { name: "GitHub", icon: "Github", href: "https://github.com/miftahulislam504-crypto" },
  { name: "Email", icon: "Mail", href: "mailto:miftahulislam504@gmail.com" },
  { name: "WhatsApp", icon: "MessageCircle", href: "https://wa.me/8801776485474" },
  { name: "Resume", icon: "FileText", href: "/resume.pdf" },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Certificates", href: "#certificates" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Stats", href: "#stats" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export const ABOUT = {
  // Lines typed out in the terminal panel, in order.
  terminalLines: [
    { command: "whoami", output: ["Miftahul Islam"] },
    {
      command: "cat roles.txt",
      output: ["> Web Developer", "> Civil Engineer"],
    },
    {
      command: "cat stack.txt",
      output: ["Next.js · Firebase · TypeScript · Tailwind"],
    },
    {
      command: "cat focus.txt",
      output: [
        "Building social platforms, education tools,",
        "e-commerce, and engineering software —",
        "mostly for Bengali-speaking users.",
      ],
    },
  ],
  blueprintCaption: "Elevation view — drafted like the structures I used to design.",
} as const;

// ---------- Projects → Mini Desktop Windows ----------

// Category keys used to group PROJECTS below. Order here also controls the
// order sections render in on the page.
export const PROJECT_CATEGORIES = [
  { id: "community", label: "Community" },
  { id: "engineering", label: "Engineering" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "educational", label: "Educational" },
  { id: "business", label: "Business Tools" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["id"];

export const PROJECTS = [
  {
    id: "brotherfit",
    name: "BrotherFit",
    category: "ecommerce" as ProjectCategory,
    description:
      "A full storefront for a clothing brand — cart, checkout, and order tracking, backed by an admin panel and an AI-assisted customer support engine.",
    stack: ["Next.js", "Firebase", "Firestore", "Tailwind CSS"],
    accentColor: "#4A9EFF",
    url: "https://brotherfit.vercel.app",
    year: "2026",
  },
  {
    id: "ummahnet",
    name: "UmmahNet",
    category: "community" as ProjectCategory,
    description:
      "A social network for the Muslim community — Islamic content sharing, halal event discovery, and dawah-focused tools, rebuilt end-to-end in English.",
    stack: ["Next.js", "Firebase", "Firestore", "Auth"],
    accentColor: "#4CAF7D",
    url: "https://ummahnet.vercel.app",
    year: "2026",
  },
  {
    id: "build-enginex",
    name: "Build EngineX",
    category: "ecommerce" as ProjectCategory,
    description:
      "A marketplace connecting Bangladeshi builders with construction material suppliers — bKash and SSLCommerz checkout, vendor and order management.",
    stack: ["Next.js", "Firebase", "bKash API", "SSLCommerz"],
    accentColor: "#E8A33D",
    url: "https://build-enginex.vercel.app",
    year: "2024",
  },
  {
    id: "business-suites",
    name: "Business Suites",
    category: "business" as ProjectCategory,
    description:
      "An all-in-one SME dashboard — invoicing, multi-location inventory, HR/payroll records, and a business analytics view, in one tool instead of five.",
    stack: ["Next.js", "Firebase", "Firestore", "Chart.js"],
    accentColor: "#C77DFF",
    url: "https://businesssuites.vercel.app",
    year: "2025",
  },
  {
    id: "ak-ummah-foundation",
    name: "Ak Ummah Foundation",
    category: "community" as ProjectCategory,
    description:
      "A donation platform for a non-profit — bKash-powered giving, campaign progress tracking, and welfare program listings donors can follow directly.",
    stack: ["Next.js", "Firebase", "bKash API"],
    accentColor: "#E8564B",
    url: "https://akummahfoundation.vercel.app",
    year: "2025",
  },
  {
    id: "chemistry-unfiltered",
    name: "Chemistry Unfiltered",
    category: "educational" as ProjectCategory,
    description:
      "A Bengali-language chemistry platform organized subbject > chapter > topic, with a rebuilt interactive periodic table and a hierarchical revision system.",
    stack: ["Next.js", "Firebase", "Firestore", "Tailwind CSS"],
    accentColor: "#E8564B",
    url: "https://chemistry-unfiltered.vercel.app",
    year: "2025",
  },
  {
    id: "mathx",
    name: "MathX",
    category: "educational" as ProjectCategory,
    description:
      "A visual mathematics learning universe — concept maps and step-by-step interactive explanations across 10+ subjects, installable as a PWA.",
    stack: ["Next.js", "PWA", "Firebase"],
    accentColor: "#4A9EFF",
    url: "https://mathxuniverse.vercel.app",
    year: "2025",
  },
  {
    id: "physicsverse",
    name: "PhysicsVerse",
    category: "educational" as ProjectCategory,
    description:
      "Physics topics brought to life through interactive simulations and experiment-style modules, mapped directly to the SSC and HSC syllabus.",
    stack: ["Next.js", "Firebase", "Three.js"],
    accentColor: "#C77DFF",
    url: "https://physicsverse.vercel.app",
    year: "2025",
  },
  {
    id: "esoquranshikhiacademy",
    name: "Esho Quran Shikhi Academy",
    category: "educational" as ProjectCategory,
    description:
      "A step-by-step Quran and Arabic learning platform — Tajweed and Makhraj lessons, self-assessment, courses, and progress tracking through to certification.",
    stack: ["Next.js", "Firebase", "Firestore"],
    accentColor: "#186447",
    url: "https://esoquranshikhiacademy.vercel.app",
    year: "2026",
  },
  {
    id: "biomind",
    name: "BioMind",
    category: "educational" as ProjectCategory,
    description:
      "A biology learning platform bringing concepts to life with structured lessons and interactive study tools for students.",
    stack: ["Next.js", "Firebase", "Firestore"],
    accentColor: "#4CAF7D",
    url: "https://biomindlogy.vercel.app",
    year: "2026",
  },
  {
    id: "enginex-hub",
    name: "EngineX Hub",
    category: "engineering" as ProjectCategory,
    description:
      "The front door to the CivilOS suite — unified login, user profiles with project history, and sidebar navigation linking all six connected apps.",
    stack: ["Next.js", "Firebase Auth", "Firestore"],
    accentColor: "#4CAF7D",
    url: "https://enginex-hub.vercel.app",
    year: "2024",
  },
  {
    id: "enginex-archdrawing",
    name: "EngineX Arch Drawing",
    category: "engineering" as ProjectCategory,
    description:
      "A full CAD workflow that runs entirely in the browser — BNBC-compliant floor plans, elevations, and sections, with PDF/SVG export.",
    stack: ["Next.js", "Canvas / SVG", "Firebase"],
    accentColor: "#E8A33D",
    url: "https://enginexdraw.vercel.app",
    year: "2025",
  },
  {
    id: "enginex-structural",
    name: "EngineX Structural",
    category: "engineering" as ProjectCategory,
    description:
      "Structural design across 20+ modules — a DSM solver, full RC design per ACI 318-19, 3D space frame analysis, code-checks, and DXF export.",
    stack: ["JavaScript", "DSM Solver", "3D Engine"],
    accentColor: "#4A9EFF",
    url: "https://enginexstruc.vercel.app",
    year: "2025",
  },
  {
    id: "enginex-estimate",
    name: "EngineX Estimate",
    category: "engineering" as ProjectCategory,
    description:
      "Automated Bill of Quantities generation priced against live Bangladeshi market rates, exportable cleanly to PDF or Excel.",
    stack: ["Next.js", "Firebase", "PDF Export"],
    accentColor: "#4CAF7D",
    url: "https://enginexquanta.vercel.app",
    year: "2024",
  },
  {
    id: "enginex-projectmgmt",
    name: "EngineX Project Mgmt",
    category: "engineering" as ProjectCategory,
    description:
      "Construction PM software — Gantt-based scheduling, milestone progress tracking, RAJUK/CDA compliance checklists, and team task assignment.",
    stack: ["Next.js", "Firebase", "Firestore"],
    accentColor: "#E8564B",
    url: "https://enginexproject.vercel.app",
    year: "2024",
  },
  {
    id: "enginex-learning",
    name: "EngineX Learning",
    category: "engineering" as ProjectCategory,
    description:
      "Civil engineering exam prep aligned to the BNBC syllabus — MCQ, Viva, and Flashcard study modes with progress tracking across sessions.",
    stack: ["Next.js", "Firebase", "Firestore"],
    accentColor: "#C77DFF",
    url: "https://enginexlearn.vercel.app",
    year: "2024",
  },
] as const;

// ---------- Skills → Floating Command Palette ----------
export const SKILLS = [
  "Html",
  "CSS",
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Firebase / Firestore",
  "Tailwind CSS",
  "Flutter",
  "Framer Motion",
  "Three.js",
  "FastAPI",
  "REST APIs",
  "PWA",
] as const;

// ---------- Experience → Git Commit Timeline ----------
export const EXPERIENCE = [
  {
    year: "2026",
    commits: [
      "Wall Dash — Firebase multiplayer, matchmaking",
      "UmmahNet — nav rework, Firestore rules cleanup",
      "Chemistry Unfiltered — revision engine + gamification",
      "BrotherFit — AI customer service via Groq",
    ],
  },
  {
    year: "2025",
    commits: [
      "CivilOS — unified six-app architecture",
      "AK Ummah Foundation — loans, savings, donations flow",
      "CIVION — 3D portfolio with Three.js",
    ],
  },
] as const;

// ---------- Services → App Launcher ----------
export const SERVICES = [
  { name: "Web Apps", icon: "Globe" },
  { name: "mobile Apps", icon: "LayoutDashboard" },
  { name: "Civil Design Tools", icon: "Ruler" },
  { name: "E-commerce", icon: "ShoppingBag" },
  { name: "Firebase Backend", icon: "Flame" },
  { name: "AI Integration", icon: "Sparkles" },
] as const;

// ---------- Certificates → File Explorer ----------
export const CERTIFICATES = [
  { name: "Next.js Development.pdf", size: "1.2 MB" },
  { name: "Firebase Architecture.pdf", size: "0.9 MB" },
  { name: "Structural Analysis (ETABS).pdf", size: "2.1 MB" },
  { name: "TypeScript Advanced.pdf", size: "0.8 MB" },
] as const;

// ---------- Tech Stack → Sticker Wall ----------
export const TECH_STACK = [
  "Next.js",
  "Firebase",
  "TypeScript",
  "Tailwind",
  "React",
  "Flutter",
  "Three.js",
  "ETABS",
  "SAFE",
  "FastAPI",
] as const;

// ---------- Statistics → Dashboard Widgets ----------
export const STATS = [
  { label: "Projects Shipped", value: 12, suffix: "+" },
  { label: "Apps in Production", value: 9, suffix: "" },
  { label: "Firestore Collections", value: 40, suffix: "+" },
  { label: "Years Building", value: 3, suffix: "+" },
] as const;
