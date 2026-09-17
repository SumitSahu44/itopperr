import { getApiUrl } from '../config/api';

const API_BASE = getApiUrl('/api/evaluations');

export const DEFAULT_EVALUATIONS = [
  {
    _id: "eval-gs1",
    title: "GS Paper 1 Mains Answer Evaluation",
    category: "GS",
    paperTag: "GS Paper 1",
    description: "Comprehensive evaluation covering History, Art & Culture, Geography, Indian Society & World History.",
    features: [
      "Detailed Line-by-Line Feedback within 24 Hours",
      "Model Answer Framework & Structure Map",
      "Personalized One-on-One Mentor Call",
      "Keyword Enrichment & Diagram Suggestions"
    ],
    mrpPrice: 7999,
    finalPrice: 4999,
    duration: "Till Mains 2026",
    badge: "Popular",
    purchaseUrl: "/#contact",
    planPdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    published: true,
    order: 1
  },
  {
    _id: "eval-gs2",
    title: "GS Paper 2 Mains Answer Evaluation",
    category: "GS",
    paperTag: "GS Paper 2",
    description: "In-depth evaluation for Polity, Governance, Social Justice, Constitution & International Relations.",
    features: [
      "Constitutional Articles & Case Laws Integration",
      "Evaluation by Served Officers & Toppers",
      "24/7 Doubt Resolution & Mentorship Access",
      "Monthly Performance Tracking & Analytics"
    ],
    mrpPrice: 7999,
    finalPrice: 4999,
    duration: "Till Mains 2026",
    badge: "High Recommended",
    purchaseUrl: "/#contact",
    published: true,
    order: 2
  },
  {
    _id: "eval-gs3",
    title: "GS Paper 3 Mains Answer Evaluation",
    category: "GS",
    paperTag: "GS Paper 3",
    description: "Expert evaluation focusing on Indian Economy, Environment, Science & Tech, Disaster Management & Security.",
    features: [
      "Data Points, Budget & Economic Survey Enrichment",
      "Line-by-Line Feedback on Diagram & Flowcharts",
      "Personalized Strategy Call with Experts",
      "Copy Evaluation by Top Mains Scorer"
    ],
    mrpPrice: 7999,
    finalPrice: 4999,
    duration: "Till Mains 2026",
    badge: "Top Choice",
    purchaseUrl: "/#contact",
    published: true,
    order: 3
  },
  {
    _id: "eval-gs4",
    title: "GS Paper 4 Ethics & Case Studies Evaluation",
    category: "GS",
    paperTag: "GS Paper 4",
    description: "Specialized evaluation for Ethics, Integrity, Aptitude and real-life Case Studies with philosophical grounding.",
    features: [
      "Ethical Thinkers & Quote Bank Integration",
      "Step-by-Step Case Study Solution Matrix",
      "Detailed Feedback on Value Alignment",
      "One-on-One Ethics Guidance Session"
    ],
    mrpPrice: 8999,
    finalPrice: 5499,
    duration: "Till Mains 2026",
    badge: "Ethics Special",
    purchaseUrl: "/#contact",
    published: true,
    order: 4
  },
  {
    _id: "eval-opt-psir",
    title: "Optional PSIR Answer Evaluation",
    category: "Optional",
    paperTag: "PSIR",
    description: "Comprehensive evaluation for Political Science & International Relations (Paper 1 & Paper 2).",
    features: [
      "Scholarly Perspectives & Quotes Integration",
      "Global Affairs & Thinkers Analysis",
      "Line-by-Line Evaluation within 48h",
      "Personalized Mentorship by PSIR Toppers"
    ],
    mrpPrice: 12999,
    finalPrice: 7999,
    duration: "Till Mains 2026",
    badge: "Most Popular",
    purchaseUrl: "/#contact",
    published: true,
    order: 5
  },
  {
    _id: "eval-opt-geog",
    title: "Optional Geography Answer Evaluation",
    category: "Optional",
    paperTag: "Geography",
    description: "Detailed evaluation for Geography Optional covering Physical, Human, and Indian Geography with Map Work.",
    features: [
      "Diagram & Map Marking Feedback",
      "Geographical Thinkers & Theories Focus",
      "Line-by-Line Detailed Annotations",
      "Personalized One-on-One Discussion"
    ],
    mrpPrice: 12999,
    finalPrice: 7999,
    duration: "Till Mains 2026",
    badge: "Specialized",
    purchaseUrl: "/#contact",
    published: true,
    order: 6
  },
  {
    _id: "eval-opt-socio",
    title: "Optional Sociology Answer Evaluation",
    category: "Optional",
    paperTag: "Sociology",
    description: "Rigorous evaluation for Sociology Optional focusing on Thinkers, Concepts, Indian Society, and Current Affairs.",
    features: [
      "Sociological Thinkers & Case Studies Integration",
      "Paper 1 & Paper 2 Integrated Feedback",
      "Model Answers & Structured Notes",
      "Mentor Guidance by Sociology Toppers"
    ],
    mrpPrice: 12999,
    finalPrice: 7999,
    duration: "Till Mains 2026",
    badge: "High Success",
    purchaseUrl: "/#contact",
    published: true,
    order: 7
  },
  {
    _id: "eval-opt-anthro",
    title: "Optional Anthropology Answer Evaluation",
    category: "Optional",
    paperTag: "Anthropology",
    description: "Focused evaluation for Anthropology Optional covering Physical, Social, Cultural, and Tribal Anthropology.",
    features: [
      "Anatomical Diagrams & Flowchart Corrections",
      "Case Studies & Tribal Reports Integration",
      "Line-by-Line Expert Review within 48h",
      "One-on-One Mentorship Session"
    ],
    mrpPrice: 12999,
    finalPrice: 7999,
    duration: "Till Mains 2026",
    badge: "Topper Choice",
    purchaseUrl: "/#contact",
    published: true,
    order: 8
  },
  {
    _id: "eval-combo-1",
    title: "GS 1-4 + Optional Full Combo Evaluation",
    category: "Combo",
    paperTag: "Combo Plan",
    description: "Ultimate evaluation package combining complete GS Mains Papers 1 to 4 PLUS your chosen Optional Subject.",
    features: [
      "Unlimited Daily Mains Answer Evaluation",
      "All 4 GS Papers + Complete Optional Coverage",
      "Priority Evaluation within 24 Hours",
      "Dedicated Personal IAS Mentor",
      "Weekly LIVE Zoom Copy Discussion Sessions",
      "Complete Access to Model Answers & PYQ Solutions"
    ],
    mrpPrice: 28999,
    finalPrice: 16999,
    duration: "Till Mains 2026",
    badge: "Best Value Combo",
    purchaseUrl: "/#contact",
    published: true,
    order: 9
  },
  {
    _id: "eval-combo-2",
    title: "GS Mains 1-4 Complete Package",
    category: "Combo",
    paperTag: "GS Combo",
    description: "All-in-one evaluation solution for GS Paper 1, 2, 3 & Ethics Paper 4 with Essay writing.",
    features: [
      "Complete GS 1-4 & Essay Copy Evaluation",
      "Personalized Weakness Analysis Matrix",
      "Step-by-step Structure & Keyword Enrichment",
      "Unlimited Mentor Call Access"
    ],
    mrpPrice: 22999,
    finalPrice: 12999,
    duration: "Till Mains 2026",
    badge: "GS Super Saver",
    purchaseUrl: "/#contact",
    published: true,
    order: 10
  }
];

export const getEvaluations = async (isAdmin = false) => {
  try {
    const res = await fetch(`${API_BASE}${isAdmin ? '?admin=true' : ''}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem("itopper_evaluations_cache", JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn("Backend evaluation API unreachable, checking local cache:", err.message);
  }

  const cached = localStorage.getItem("itopper_evaluations_cache");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Cache parse error:", e);
    }
  }

  return DEFAULT_EVALUATIONS;
};

export const addEvaluation = async (itemData) => {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API add evaluation failed, fallback to local cache:", err.message);
  }

  const current = await getEvaluations(true);
  const newItem = {
    ...itemData,
    _id: "eval-" + Date.now(),
    createdAt: new Date().toISOString()
  };
  const updated = [newItem, ...current];
  localStorage.setItem("itopper_evaluations_cache", JSON.stringify(updated));
  return newItem;
};

export const updateEvaluation = async (id, itemData) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API update evaluation failed, fallback to local cache:", err.message);
  }

  const current = await getEvaluations(true);
  const updated = current.map(item => (item._id === id || item.id === id) ? { ...item, ...itemData } : item);
  localStorage.setItem("itopper_evaluations_cache", JSON.stringify(updated));
  return updated.find(item => item._id === id || item.id === id);
};

export const deleteEvaluation = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.warn("API delete evaluation failed, fallback to local cache:", err.message);
  }

  const current = await getEvaluations(true);
  const updated = current.filter(item => item._id !== id && item.id !== id);
  localStorage.setItem("itopper_evaluations_cache", JSON.stringify(updated));
  return true;
};
