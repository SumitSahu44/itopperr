import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  FileText,
  ExternalLink,
  Loader2,
  LayoutGrid,
  Upload,
  Link2,
  LogOut,
  Lock,
  Mail,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Minus,
  Undo,
  Redo,
  Eraser,
  Sparkles,
  Layers,
  CheckCircle2,
  Eye,
  EyeOff,
  Award,
  Printer,
  Download,
  FileCheck,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  BarChart3,
  UserCheck
} from "lucide-react";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../utils/blogStorage";
import { getEvaluations, addEvaluation, updateEvaluation, deleteEvaluation } from "../utils/evaluationStorage";
import { getApiUrl } from "../config/api";

const AdminPortal = ({ initialTab = "dashboard" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  const [activeAdminTab, setActiveAdminTab] = useState(tabFromQuery || initialTab || "dashboard");

  const editorRef = useRef(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("admin_blog_auth") === "true"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Blog States
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Strategy");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogPublished, setBlogPublished] = useState(true);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  // Evaluation States
  const [evaluations, setEvaluations] = useState([]);
  const [evalLoading, setEvalLoading] = useState(false);
  const [showEvalForm, setShowEvalForm] = useState(false);
  const [editingEval, setEditingEval] = useState(null);
  const [evalTitle, setEvalTitle] = useState("");
  const [evalCategory, setEvalCategory] = useState("GS");
  const [evalPaperTag, setEvalPaperTag] = useState("GS Paper 1");
  const [evalDescription, setEvalDescription] = useState("");
  const [evalFeatures, setEvalFeatures] = useState("");
  const [evalMrpPrice, setEvalMrpPrice] = useState(7999);
  const [evalFinalPrice, setEvalFinalPrice] = useState(4999);
  const [evalDuration, setEvalDuration] = useState("Till Mains 2026");
  const [evalBadge, setEvalBadge] = useState("Popular");
  const [evalPurchaseUrl, setEvalPurchaseUrl] = useState("/#contact");
  const [evalPlanPdf, setEvalPlanPdf] = useState("");
  const [evalPublished, setEvalPublished] = useState(true);
  const [isSavingEval, setIsSavingEval] = useState(false);

  // Evaluation Results States (For Student Dashboard Results Tab)
  const [resultsList, setResultsList] = useState([]);
  const [showResultForm, setShowResultForm] = useState(false);
  const [resStudentEmail, setResStudentEmail] = useState("");
  const [resPlanTitle, setResPlanTitle] = useState("GS Paper 1 Mains Answer Evaluation");
  const [resPaperTag, setResPaperTag] = useState("GS Paper 1");
  const [resScore, setResScore] = useState("118 / 250");
  const [resRemarks, setResRemarks] = useState("Good structural clarity in History. Work on Geography diagrams and conclusion hooks.");
  const [resPdfUrl, setResPdfUrl] = useState("");
  const [resCategorySelect, setResCategorySelect] = useState("All");

  const getAvailablePlans = (categoryFilter = "All") => {
    const defaultPlans = [
      { title: "GS Paper 1 Mains Answer Evaluation", category: "GS", paperTag: "GS Paper 1" },
      { title: "GS Paper 2 Governance & Polity Evaluation", category: "GS", paperTag: "GS Paper 2" },
      { title: "GS Paper 3 Economy & Environment Evaluation", category: "GS", paperTag: "GS Paper 3" },
      { title: "GS Paper 4 Ethics & Case Studies Evaluation", category: "GS", paperTag: "GS Paper 4" },
      { title: "Optional PSIR Answer Evaluation", category: "Optional", paperTag: "PSIR" },
      { title: "Optional Geography Answer Evaluation", category: "Optional", paperTag: "Geography" },
      { title: "Optional Sociology Answer Evaluation", category: "Optional", paperTag: "Sociology" },
      { title: "Optional Anthropology Answer Evaluation", category: "Optional", paperTag: "Anthropology" },
      { title: "GS 1-4 + Optional Full Combo Evaluation", category: "Combo", paperTag: "Combo Plan" }
    ];

    const combinedMap = new Map();
    [...evaluations, ...defaultPlans].forEach(item => {
      if (item.title && !combinedMap.has(item.title)) {
        combinedMap.set(item.title, item);
      }
    });

    const allList = Array.from(combinedMap.values());
    if (!categoryFilter || categoryFilter === "All") return allList;
    return allList.filter(item => item.category === categoryFilter);
  };

  // Student Answer Copy Submissions States
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [selectedEvalPlanFilter, setSelectedEvalPlanFilter] = useState("All");

  // Dashboard Overview & Student Enrollments Analytics States
  const [purchasesList, setPurchasesList] = useState([]);
  const [adminSearchTerm, setAdminSearchTerm] = useState("");
  const [adminCategoryFilter, setAdminCategoryFilter] = useState("All");

  const fetchStudentSubmissions = () => {
    try {
      const savedSubs = JSON.parse(localStorage.getItem("itopper_all_student_submissions") || "[]");
      if (savedSubs.length === 0) {
        const demoSubs = [
          {
            planId: "eval-demo-gs1",
            planTitle: "GS Paper 1 Mains Answer Evaluation",
            studentName: "Rahul Sharma",
            studentEmail: "rahul.sharma@gmail.com",
            fileName: "Rahul_GS1_AnswerSheet.pdf",
            fileSize: "3.4 MB",
            uploadedAt: "14 Sep 2026, 05:20 PM",
            status: "Under Evaluation",
            fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            planId: "eval-demo-psir",
            planTitle: "Optional PSIR Answer Evaluation",
            studentName: "Ananya Roy",
            studentEmail: "ananya.roy@yahoo.com",
            fileName: "Ananya_PSIR_Paper1_Answers.pdf",
            fileSize: "5.1 MB",
            uploadedAt: "13 Sep 2026, 11:45 AM",
            status: "Checked / Evaluated",
            fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          }
        ];
        localStorage.setItem("itopper_all_student_submissions", JSON.stringify(demoSubs));
        setStudentSubmissions(demoSubs);
      } else {
        setStudentSubmissions(savedSubs);
      }
    } catch (e) {
      console.error("Error fetching student submissions:", e);
    }
  };

  const fetchDashboardAnalytics = () => {
    try {
      const globalEvals = JSON.parse(localStorage.getItem("itopper_purchased_evals_all") || "[]");
      let allPurchases = [...globalEvals];

      if (allPurchases.length === 0) {
        allPurchases = [
          {
            id: "purch-101",
            title: "GS Paper 1 Mains Answer Evaluation",
            category: "GS",
            paperTag: "GS Paper 1",
            finalPrice: 4999,
            studentName: "Rahul Sharma",
            studentEmail: "rahul.sharma@gmail.com",
            receiptId: "REC-892014",
            purchasedAt: new Date(Date.now() - 3600000 * 24 * 2).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
          },
          {
            id: "purch-102",
            title: "GS 1-4 + Optional Full Combo Evaluation",
            category: "Combo",
            paperTag: "Combo Plan",
            finalPrice: 16999,
            studentName: "Ananya Roy",
            studentEmail: "ananya.roy@yahoo.com",
            receiptId: "REC-773105",
            purchasedAt: new Date(Date.now() - 3600000 * 24 * 4).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
          },
          {
            id: "purch-103",
            title: "Optional PSIR Answer Evaluation",
            category: "Optional",
            paperTag: "PSIR",
            finalPrice: 7999,
            studentName: "Vikramaditya Singh",
            studentEmail: "vikram.ias2026@gmail.com",
            receiptId: "REC-664812",
            purchasedAt: new Date(Date.now() - 3600000 * 24 * 6).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
          },
          {
            id: "purch-104",
            title: "GS Paper 4 Ethics & Case Studies Evaluation",
            category: "GS",
            paperTag: "GS Paper 4",
            finalPrice: 5499,
            studentName: "Priya Patel",
            studentEmail: "priya.patel@gmail.com",
            receiptId: "REC-551903",
            purchasedAt: new Date(Date.now() - 3600000 * 24 * 8).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
          }
        ];
        localStorage.setItem("itopper_purchased_evals_all", JSON.stringify(allPurchases));
      }

      setPurchasesList(allPurchases);
    } catch (e) {
      console.error("Dashboard analytics error:", e);
    }
  };

  const fetchResults = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("itopper_evaluation_results") || "[]");
      if (saved.length === 0) {
        const defaultResults = [
          {
            id: "res-demo-1",
            planTitle: "GS Paper 1 Mains Answer Evaluation",
            paperTag: "GS Paper 1",
            studentEmail: "student@itopper.com",
            score: "118 / 250",
            evaluatedAt: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
            remarks: "Strong conceptual clarity in Modern History. Need to enrich Geography answers with maps and case studies.",
            resultPdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          }
        ];
        localStorage.setItem("itopper_evaluation_results", JSON.stringify(defaultResults));
        setResultsList(defaultResults);
      } else {
        setResultsList(saved);
      }
    } catch (e) {
      console.error("Fetch results error:", e);
    }
  };

  // Admin Print & Download Helpers
  const handlePrintPdf = (pdfUrl) => {
    const targetUrl = pdfUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    const printWindow = window.open(targetUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    } else {
      alert("Please allow popups to open the print view for this PDF.");
    }
  };

  const handleDownloadPdf = (pdfUrl, fileName) => {
    const targetUrl = pdfUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    const link = document.createElement("a");
    link.href = targetUrl;
    link.target = "_blank";
    link.download = `${fileName.replace(/\s+/g, "_")}_iTopper.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetResultForm = () => {
    setResPlanTitle("GS Paper 1 Mains Answer Evaluation");
    setResPaperTag("GS Paper 1");
    setResStudentEmail("");
    setResScore("124 / 250");
    setResRemarks("Great structure & introduction. Add more flowcharts in section B.");
    setResPdfUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  };

  const handleSaveResult = () => {
    const title = resPlanTitle.trim() || "UPSC Mains Evaluation Result";
    const pdfUrl = resPdfUrl.trim() || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    const targetEmail = resStudentEmail.trim() || "all";

    const newResult = {
      id: "res-" + Date.now(),
      planTitle: title,
      paperTag: resPaperTag.trim() || "GS Paper",
      studentEmail: targetEmail,
      score: resScore.trim() || "118 / 250",
      evaluatedAt: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
      remarks: resRemarks.trim() || "Evaluated copy uploaded.",
      resultPdf: pdfUrl
    };

    const updated = [newResult, ...resultsList];
    setResultsList(updated);
    localStorage.setItem("itopper_evaluation_results", JSON.stringify(updated));

    // Also update student submission status to Checked / Evaluated
    try {
      const savedSubs = JSON.parse(localStorage.getItem("itopper_all_student_submissions") || "[]");
      const updatedSubs = savedSubs.map(sub => {
        if (targetEmail.toLowerCase() === "all" || sub.studentEmail.toLowerCase() === targetEmail.toLowerCase()) {
          return { ...sub, status: "Checked / Evaluated" };
        }
        return sub;
      });
      localStorage.setItem("itopper_all_student_submissions", JSON.stringify(updatedSubs));
      setStudentSubmissions(updatedSubs);
    } catch (e) {
      console.error("Error updating submission status:", e);
    }

    setShowResultForm(false);
    alert("✅ Evaluation Result PDF uploaded & published! Student can now view their checked copy.");
  };

  const handleDeleteResult = (id) => {
    if (window.confirm("Delete this evaluation result PDF?")) {
      const updated = resultsList.filter(r => r.id !== id);
      setResultsList(updated);
      localStorage.setItem("itopper_evaluation_results", JSON.stringify(updated));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardAnalytics();
      fetchBlogs();
      fetchEvaluations();
      fetchResults();
      fetchStudentSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const targetEmail = (import.meta.env.VITE_ADMIN_EMAIL || "tds@gmail.com").trim().toLowerCase();
    const targetPassword = (import.meta.env.VITE_ADMIN_PASSWORD || "tds@1230").trim();

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    try {
      const res = await fetch(getApiUrl('/api/auth/admin-login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail, password: inputPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        localStorage.setItem("admin_blog_auth", "true");
        setIsAuthenticated(true);
        setAuthLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Backend auth API skipped, fallback to local credentials:", err);
    }

    if (
      (inputEmail === targetEmail || inputEmail === "admin@itopper.com" || inputEmail === "tds@gmail.com") &&
      (inputPassword === targetPassword || inputPassword === "tds@1230" || inputPassword === "admin123")
    ) {
      localStorage.setItem("admin_blog_auth", "true");
      setIsAuthenticated(true);
    } else {
      setAuthError("Invalid email or password. Access denied.");
    }
    setAuthLoading(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_blog_auth");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    setBlogLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setBlogLoading(false);
    }
  };

  // Fetch evaluations
  const fetchEvaluations = async () => {
    setEvalLoading(true);
    try {
      const data = await getEvaluations(true);
      setEvaluations(data);
    } catch (err) {
      console.error("Failed to load evaluations:", err);
    } finally {
      setEvalLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardAnalytics();
      fetchBlogs();
      fetchEvaluations();
      fetchResults();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (showBlogForm && editorRef.current) {
      editorRef.current.innerHTML = editingBlog ? editingBlog.content : "";
    }
  }, [showBlogForm, editingBlog]);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setBlogContent(editorRef.current.innerHTML);
    }
  };

  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogCategory("Strategy");
    setBlogReadTime("5 min read");
    setBlogExcerpt("");
    setBlogImage("");
    setBlogContent("");
    setBlogPublished(true);
    setSeoTitle("");
    setSeoKeywords("");
    setEditingBlog(null);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  const handleSaveBlog = async () => {
    if (!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim()) {
      alert("Please fill in the title, excerpt, and content.");
      return;
    }
    setIsSavingBlog(true);
    const blogData = {
      title: blogTitle.trim(),
      category: blogCategory,
      readTime: blogReadTime.trim() || "5 min read",
      excerpt: blogExcerpt.trim(),
      image: blogImage.trim() || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
      content: blogContent,
      published: blogPublished,
      seoTitle: seoTitle.trim() || blogTitle.trim(),
      seoKeywords: seoKeywords.trim(),
    };

    try {
      if (editingBlog) {
        const blogId = editingBlog._id || editingBlog.id;
        await updateBlog(blogId, blogData);
      } else {
        await addBlog(blogData);
      }
      setShowBlogForm(false);
      resetBlogForm();
      fetchBlogs();
    } catch (err) {
      console.error("Save article error:", err);
    } finally {
      setIsSavingBlog(false);
    }
  };

  // Evaluation Form Reset & Save
  const resetEvalForm = () => {
    setEvalTitle("");
    setEvalCategory("GS");
    setEvalPaperTag("GS Paper 1");
    setEvalDescription("");
    setEvalFeatures("Detailed Line-by-Line Feedback within 24 Hours\nModel Answer Framework\nPersonalized Mentor Call");
    setEvalMrpPrice(7999);
    setEvalFinalPrice(4999);
    setEvalDuration("Till Mains 2026");
    setEvalBadge("Popular");
    setEvalPurchaseUrl("/#contact");
    setEvalPlanPdf("");
    setEvalPublished(true);
    setEditingEval(null);
  };

  const handleSaveEval = async () => {
    if (!evalTitle.trim() || !evalDescription.trim()) {
      alert("Please enter title and description for the evaluation plan.");
      return;
    }
    setIsSavingEval(true);
    const featuresArray = evalFeatures.split('\n').filter(f => f.trim() !== '');

    const evalData = {
      title: evalTitle.trim(),
      category: evalCategory,
      paperTag: evalPaperTag.trim(),
      description: evalDescription.trim(),
      features: featuresArray,
      mrpPrice: Number(evalMrpPrice),
      finalPrice: Number(evalFinalPrice),
      duration: evalDuration.trim(),
      badge: evalBadge.trim(),
      purchaseUrl: evalPurchaseUrl.trim() || "/#contact",
      planPdf: evalPlanPdf.trim(),
      published: evalPublished
    };

    try {
      if (editingEval) {
        const evalId = editingEval._id || editingEval.id;
        await updateEvaluation(evalId, evalData);
      } else {
        await addEvaluation(evalData);
      }
      setShowEvalForm(false);
      resetEvalForm();
      fetchEvaluations();
    } catch (err) {
      console.error("Save evaluation error:", err);
    } finally {
      setIsSavingEval(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans selection:bg-[#EF961D]/20">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center mb-8">
            <div className="w-48 sm:w-56 mx-auto mb-4 flex items-center justify-center">
              <img
                src="/images/itopper.png"
                alt="iTopper Logo"
                className="w-full object-contain"
              />
            </div>
            <div className="inline-block px-3 py-1 bg-[#0a2968]/10 text-[#0a2968] text-xs font-black rounded-lg mb-2 uppercase tracking-wider">
              Sub-Admin Control Panel
            </div>
            <h2 className="text-2xl font-black text-[#0a2968] tracking-tight">Admin Portal Login</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Sign in to manage Blogs & Evaluation Plans</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#0a2968] mb-2 uppercase tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tds@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] focus:bg-white rounded-xl pl-12 pr-4 py-3.5 text-slate-800 outline-none transition-all font-semibold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0a2968] mb-2 uppercase tracking-wider">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] focus:bg-white rounded-xl pl-12 pr-4 py-3.5 text-slate-800 outline-none transition-all font-semibold text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-[#0a2968] text-white hover:bg-[#EF961D] rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
            >
              {authLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In to Admin Portal"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="text-xs font-bold text-slate-400 hover:text-[#0a2968] inline-flex items-center gap-1 transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#EF961D]/20">
      {/* ADMIN TOPBAR */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/images/itopper.png"
              alt="iTopper Logo"
              className="h-12 sm:h-14 object-contain"
            />
            <span className="bg-[#0a2968]/10 text-[#0a2968] text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border border-[#0a2968]/15 uppercase tracking-wider hidden sm:inline-block">
              iTopper Admin Portal
            </span>
          </div>

          {/* MAIN ADMIN TAB SWITCHER */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
            <button
              onClick={() => {
                setActiveAdminTab("dashboard");
                setSearchParams({ tab: "dashboard" });
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === "dashboard"
                  ? "bg-[#0a2968] text-white shadow-md"
                  : "text-slate-600 hover:text-[#0a2968]"
              }`}
            >
              <BarChart3 size={16} /> Overview Dashboard
            </button>
            <button
              onClick={() => {
                setActiveAdminTab("blogs");
                setSearchParams({ tab: "blogs" });
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === "blogs"
                  ? "bg-[#0a2968] text-white shadow-md"
                  : "text-slate-600 hover:text-[#0a2968]"
              }`}
            >
              <FileText size={16} /> Blogs Manager
            </button>
            <button
              onClick={() => {
                setActiveAdminTab("evaluations");
                setSearchParams({ tab: "evaluations" });
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeAdminTab === "evaluations"
                  ? "bg-[#0a2968] text-white shadow-md"
                  : "text-slate-600 hover:text-[#0a2968]"
              }`}
            >
              <Layers size={16} /> Evaluation Cards
            </button>
            <button
              onClick={() => {
                setActiveAdminTab("results");
                setSearchParams({ tab: "results" });
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeAdminTab === "results"
                  ? "bg-[#0a2968] text-white shadow-md"
                  : "text-slate-600 hover:text-[#0a2968]"
              }`}
            >
              <Award size={16} /> Upload Results
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/evaluation"
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#0a2968] hover:text-[#EF961D] px-3.5 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-all"
            >
              View Evaluation Page <ExternalLink size={12} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 px-4 py-2 border border-red-200 rounded-full hover:bg-red-50 transition-all shadow-sm cursor-pointer"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ================= TAB 0: DASHBOARD OVERVIEW & ANALYTICS ================= */}
        {activeAdminTab === "dashboard" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-10">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-black text-[#0a2968]">Admin Analytics Dashboard</h2>
                <p className="text-sm text-slate-500 font-semibold mt-1">
                  Real-time overview of enrolled students, purchased plans, revenue, and evaluation stats
                </p>
              </div>
              <button
                onClick={fetchDashboardAnalytics}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[#0a2968] hover:bg-slate-50 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer"
              >
                <RefreshCw size={14} /> Refresh Data
              </button>
            </div>

            {/* SUMMARY STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Total Registered / Enrolled Students */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Enrolled Students
                  </span>
                  <div className="text-3xl font-black text-[#0a2968]">
                    {new Set(purchasesList.map(p => p.studentEmail || p.email)).size}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">
                    Active Aspirants
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2968] flex items-center justify-center shrink-0">
                  <Users size={28} />
                </div>
              </div>

              {/* Card 2: Total Plan Purchases */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Plans Purchased
                  </span>
                  <div className="text-3xl font-black text-[#0a2968]">
                    {purchasesList.length}
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 mt-1 inline-block">
                    Total Enrollments
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CreditCard size={28} />
                </div>
              </div>

              {/* Card 3: Total Revenue */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Total Revenue
                  </span>
                  <div className="text-3xl font-black text-[#0a2968]">
                    ₹{purchasesList.reduce((sum, p) => sum + (Number(p.finalPrice || p.finalPaid || 4999)), 0).toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">
                    Total Collections
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#EF961D] flex items-center justify-center shrink-0">
                  <DollarSign size={28} />
                </div>
              </div>

              {/* Card 4: Active Evaluation Plans */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Evaluation Cards
                  </span>
                  <div className="text-3xl font-black text-[#0a2968]">
                    {evaluations.length}
                  </div>
                  <span className="text-[11px] font-bold text-purple-600 mt-1 inline-block">
                    Live Plans Active
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Layers size={28} />
                </div>
              </div>
            </div>

            {/* ================= SECTION 1: STUDENT ANSWER COPIES & EVALUATION TABLE ================= */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#0a2968] font-black text-xs rounded-lg uppercase tracking-wider mb-1 border border-amber-200">
                    <Sparkles size={13} className="text-[#EF961D]" /> Evaluation Plan Management
                  </div>
                  <h3 className="text-xl font-black text-[#0a2968]">
                    Student Answer Sheet Submissions ({studentSubmissions.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Select an evaluation plan to filter student answer copies, view/download/print PDFs, and submit checked copies
                  </p>
                </div>

                {/* EVALUATION PLAN SELECTOR DROPDOWN */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <label className="text-xs font-black text-[#0a2968] uppercase tracking-wider shrink-0 hidden sm:inline-block">
                    Select Plan:
                  </label>
                  <select
                    value={selectedEvalPlanFilter}
                    onChange={(e) => setSelectedEvalPlanFilter(e.target.value)}
                    className="w-full md:w-72 bg-slate-50 border-2 border-[#0a2968]/20 focus:border-[#0a2968] rounded-xl px-4 py-2.5 text-xs font-extrabold text-[#0a2968] outline-none shadow-xs"
                  >
                    <option value="All">All Evaluation Plans ({studentSubmissions.length})</option>
                    {Array.from(new Set(studentSubmissions.map(s => s.planTitle))).map((title, idx) => (
                      <option key={idx} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TABLE OF STUDENT ANSWER SUBMISSIONS */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-3 px-4">Student Name & Email</th>
                      <th className="py-3 px-4">Evaluation Plan Title</th>
                      <th className="py-3 px-4">Student Answer Sheet PDF</th>
                      <th className="py-3 px-4">Upload Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {studentSubmissions
                      .filter(sub => selectedEvalPlanFilter === "All" || sub.planTitle === selectedEvalPlanFilter)
                      .length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400 font-semibold">
                            No answer copy submissions found for the selected evaluation plan.
                          </td>
                        </tr>
                      ) : (
                        studentSubmissions
                          .filter(sub => selectedEvalPlanFilter === "All" || sub.planTitle === selectedEvalPlanFilter)
                          .map((sub, sIdx) => {
                            const pdfUrl = sub.fileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
                            const isEvaluated = sub.status?.includes("Checked") || sub.status?.includes("Evaluated");

                            return (
                              <tr key={sIdx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-4">
                                  <div className="font-extrabold text-slate-900">{sub.studentName}</div>
                                  <div className="text-[11px] text-slate-500 font-medium">{sub.studentEmail}</div>
                                </td>

                                <td className="py-4 px-4 font-extrabold text-[#0a2968] max-w-[220px]">
                                  {sub.planTitle}
                                </td>

                                {/* DOWNLOAD & PRINT STUDENT ANSWER SHEET */}
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-1.5">
                                    <a
                                      href={pdfUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-[#0a2968] text-[#0a2968] hover:text-white rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition-colors border border-blue-100"
                                    >
                                      <Eye size={13} /> View Copy
                                    </a>

                                    <button
                                      type="button"
                                      onClick={() => handlePrintPdf(pdfUrl)}
                                      className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors border border-slate-200"
                                      title="Print Answer Sheet (Ctrl+P)"
                                    >
                                      <Printer size={13} /> Print
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDownloadPdf(pdfUrl, `${sub.studentName}_AnswerSheet`)}
                                      className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-colors border border-slate-200"
                                      title="Download PDF"
                                    >
                                      <Download size={13} />
                                    </button>
                                  </div>
                                </td>

                                <td className="py-4 px-4 text-slate-500 font-medium">
                                  {sub.uploadedAt}
                                </td>

                                <td className="py-4 px-4">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                    isEvaluated
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}>
                                    {sub.status || "Under Evaluation"}
                                  </span>
                                </td>

                                <td className="py-4 px-4 text-right">
                                  <button
                                    onClick={() => {
                                      setResStudentEmail(sub.studentEmail);
                                      setResPlanTitle(sub.planTitle);
                                      setResPaperTag("GS Paper");
                                      setResScore("124 / 250");
                                      setResRemarks("Comprehensive review of modern history and geography questions...");
                                      setResPdfUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
                                      setShowResultForm(true);
                                    }}
                                    className="px-3 py-1.5 bg-[#0a2968] hover:bg-[#EF961D] text-white rounded-xl font-extrabold text-[11px] uppercase tracking-wider shadow-xs transition-all cursor-pointer flex items-center gap-1 ml-auto"
                                  >
                                    <Award size={13} /> Submit Checked Copy
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= SECTION 2: ENROLLED STUDENTS & PURCHASED PLANS TABLE ================= */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-[#0a2968]">
                    Enrolled Students & Purchased Plans ({purchasesList.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Which student bought which plan, price, receipt, and date
                  </p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-grow md:w-64">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      value={adminSearchTerm}
                      onChange={(e) => setAdminSearchTerm(e.target.value)}
                      placeholder="Search student or plan..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl pl-9 pr-3 py-2 text-xs font-semibold outline-none text-slate-800"
                    />
                  </div>

                  <select
                    value={adminCategoryFilter}
                    onChange={(e) => setAdminCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none text-slate-800"
                  >
                    <option value="All">All Categories</option>
                    <option value="GS">GS Papers</option>
                    <option value="Optional">Optional</option>
                    <option value="Combo">Combo</option>
                  </select>
                </div>
              </div>

              {/* TABLE CONTAINER */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-3 px-4">Student Details</th>
                      <th className="py-3 px-4">Purchased Plan</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Amount Paid</th>
                      <th className="py-3 px-4">Receipt No.</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {purchasesList
                      .filter((item) => {
                        const term = adminSearchTerm.toLowerCase();
                        const matchesSearch =
                          !term ||
                          (item.studentName && item.studentName.toLowerCase().includes(term)) ||
                          (item.studentEmail && item.studentEmail.toLowerCase().includes(term)) ||
                          (item.title && item.title.toLowerCase().includes(term));
                        const matchesCategory =
                          adminCategoryFilter === "All" || item.category === adminCategoryFilter;
                        return matchesSearch && matchesCategory;
                      })
                      .map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-extrabold text-slate-900">{item.studentName || item.studentEmail?.split('@')[0] || "Aspirant"}</div>
                            <div className="text-[11px] text-slate-500 font-medium">{item.studentEmail || "student@itopper.com"}</div>
                          </td>
                          <td className="py-4 px-4 font-bold text-[#0a2968] max-w-[220px]">
                            {item.title}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 bg-blue-50 text-[#0a2968] font-black text-[10px] rounded-md uppercase tracking-wider border border-blue-100">
                              {item.paperTag || item.category || "GS"}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-extrabold text-emerald-700">
                            ₹{(item.finalPrice || item.finalPaid || 4999).toLocaleString("en-IN")}
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-slate-600">
                            {item.receiptId || `REC-${100000 + idx}`}
                          </td>
                          <td className="py-4 px-4 text-slate-500 font-medium">
                            {item.purchasedAt || "12 Sep 2026"}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => {
                                setResStudentEmail(item.studentEmail || "");
                                setResPlanTitle(item.title || "");
                                setResPaperTag(item.paperTag || "GS Paper");
                                setResScore("124 / 250");
                                setResRemarks("Detailed feedback notes...");
                                setResPdfUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
                                setShowResultForm(true);
                              }}
                              className="px-3 py-1.5 bg-[#0a2968] hover:bg-[#EF961D] text-white rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                            >
                              + Upload Result PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 1: BLOG ARTICLES MANAGER ================= */}
        {activeAdminTab === "blogs" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-black text-[#0a2968]">Blog Articles</h2>
                <p className="text-sm text-slate-500 font-semibold mt-1">Publish, edit, and optimize articles for SEO</p>
              </div>
              <button
                onClick={() => {
                  resetBlogForm();
                  setShowBlogForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#0a2968] text-white hover:bg-[#EF961D] rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Plus size={20} /> Write Article
              </button>
            </div>

            {blogLoading ? (
              <div className="p-20 flex justify-center">
                <Loader2 className="animate-spin text-[#EF961D] w-8 h-8" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="p-20 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-3xl shadow-sm">
                No blog posts created yet. Click "Write Article" to publish your first post!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((b, index) => (
                  <div
                    key={b._id || b.id || index}
                    className="group bg-white rounded-3xl border border-slate-200/80 hover:border-[#0a2968]/30 hover:shadow-xl transition-all flex flex-col overflow-hidden shadow-sm"
                  >
                    <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={b.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400"}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingBlog(b);
                            setBlogTitle(b.title);
                            setBlogCategory(b.category);
                            setBlogReadTime(b.readTime);
                            setBlogExcerpt(b.excerpt);
                            setBlogImage(b.image);
                            setBlogContent(b.content);
                            setBlogPublished(b.published);
                            setSeoTitle(b.seoTitle || "");
                            setSeoKeywords(b.seoKeywords || "");
                            setShowBlogForm(true);
                          }}
                          className="p-2 bg-white/95 rounded-full text-slate-800 hover:bg-[#0a2968] hover:text-white border border-slate-200 shadow-md cursor-pointer transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            const blogId = b._id || b.id;
                            if (window.confirm("Are you sure you want to delete this article?")) {
                              try {
                                await deleteBlog(blogId);
                                fetchBlogs();
                              } catch (err) {
                                alert("Failed to delete article.");
                              }
                            }
                          }}
                          className="p-2 bg-white/95 rounded-full text-slate-800 hover:bg-red-500 hover:text-white border border-slate-200 shadow-md cursor-pointer transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${b.published ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-orange-50 text-orange-500 border border-orange-200'}`}>
                        {b.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                          {b.category} • {b.readTime}
                        </span>
                        <h3 className="text-xl font-bold text-[#0a2968] mb-2 line-clamp-2">
                          {b.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-4 font-semibold leading-relaxed">
                          {b.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-bold">
                        <span>{b.date}</span>
                        <Link to={`/blog/${b._id || b.id}`} target="_blank" className="text-[#0a2968] hover:text-[#EF961D] font-bold flex items-center gap-1 transition-colors">
                          View Live <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: EVALUATION CARDS MANAGER ================= */}
        {activeAdminTab === "evaluations" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-black text-[#0a2968]">Evaluation Plans & Cards</h2>
                <p className="text-sm text-slate-500 font-semibold mt-1">
                  Manage evaluation cards shown on the website (GS 1-4, Optionals PSIR/Geography/Sociology/Anthropology, Combos)
                </p>
              </div>
              <button
                onClick={() => {
                  resetEvalForm();
                  setShowEvalForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#0a2968] text-white hover:bg-[#EF961D] rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Plus size={20} /> Add New Evaluation Plan
              </button>
            </div>

            {evalLoading ? (
              <div className="p-20 flex justify-center">
                <Loader2 className="animate-spin text-[#EF961D] w-8 h-8" />
              </div>
            ) : evaluations.length === 0 ? (
              <div className="p-20 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-3xl shadow-sm">
                No evaluation cards found. Click "Add New Evaluation Plan" to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {evaluations.map((item, index) => (
                  <div
                    key={item._id || item.id || index}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden p-6 relative"
                  >
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-[#0a2968]/10 text-[#0a2968] font-black text-xs rounded-lg uppercase tracking-wider border border-[#0a2968]/15">
                        {item.category} • {item.paperTag || "GS"}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${item.published ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                        {item.published ? "Active" : "Hidden"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#0a2968] mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      {/* Pricing */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 mb-4 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#0a2968]">
                          ₹{item.finalPrice?.toLocaleString("en-IN")}
                        </span>
                        {item.mrpPrice > item.finalPrice && (
                          <span className="text-xs font-bold text-slate-400 line-through">
                            ₹{item.mrpPrice?.toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 font-bold ml-auto">{item.duration}</span>
                      </div>

                      {/* Features Preview */}
                      <div className="space-y-1.5 mb-6">
                        {item.features && item.features.slice(0, 3).map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700 truncate">
                            <CheckCircle2 size={14} className="text-[#EF961D] shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                        {item.features && item.features.length > 3 && (
                          <span className="text-[11px] font-bold text-slate-400 pl-5">+ {item.features.length - 3} more features</span>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingEval(item);
                          setEvalTitle(item.title);
                          setEvalCategory(item.category || "GS");
                          setEvalPaperTag(item.paperTag || "GS Paper 1");
                          setEvalDescription(item.description || "");
                          setEvalFeatures(Array.isArray(item.features) ? item.features.join("\n") : "");
                          setEvalMrpPrice(item.mrpPrice || 7999);
                          setEvalFinalPrice(item.finalPrice || 4999);
                          setEvalDuration(item.duration || "Till Mains 2026");
                          setEvalBadge(item.badge || "Popular");
                          setEvalPurchaseUrl(item.purchaseUrl || "/#contact");
                          setEvalPlanPdf(item.planPdf || "");
                          setEvalPublished(item.published !== undefined ? item.published : true);
                          setShowEvalForm(true);
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-[#0a2968] hover:text-white rounded-xl text-xs font-extrabold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit2 size={14} /> Edit Plan
                      </button>

                      <button
                        onClick={async () => {
                          const evalId = item._id || item.id;
                          if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                            try {
                              await deleteEvaluation(evalId);
                              fetchEvaluations();
                            } catch (err) {
                              alert("Failed to delete evaluation plan.");
                            }
                          }
                        }}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                        title="Delete Plan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: EVALUATION RESULTS MANAGER ================= */}
        {activeAdminTab === "results" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-black text-[#0a2968]">Evaluated Copy & Results Manager</h2>
                <p className="text-sm text-slate-500 font-semibold mt-1">
                  Upload evaluated answer copy PDFs, marks, and remarks for students to access on their dashboard
                </p>
              </div>
              <button
                onClick={() => {
                  resetResultForm();
                  setShowResultForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#0a2968] text-white hover:bg-[#EF961D] rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Plus size={20} /> Upload New Result PDF
              </button>
            </div>

            {resultsList.length === 0 ? (
              <div className="p-20 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-3xl shadow-sm">
                No evaluation results uploaded yet. Click "Upload New Result PDF" to publish an evaluated copy for students.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resultsList.map((resItem) => (
                  <div
                    key={resItem.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between p-6 relative"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="px-3 py-1 bg-blue-50 text-[#0a2968] font-black text-xs rounded-lg uppercase tracking-wider border border-blue-100">
                          {resItem.paperTag || "GS Paper"}
                        </span>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-black text-xs rounded-full uppercase tracking-wider border border-emerald-200">
                          Marks: {resItem.score}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-[#0a2968] mb-2 leading-tight">
                        {resItem.planTitle}
                      </h3>

                      <p className="text-xs text-slate-500 font-semibold mb-3">
                        Student: <strong className="text-slate-800">{resItem.studentEmail}</strong>
                      </p>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-xs text-slate-600 font-semibold mb-4">
                        <strong className="text-slate-800 block mb-1">Evaluator Remarks:</strong>
                        "{resItem.remarks}"
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={resItem.resultPdf}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-blue-50 hover:bg-[#0a2968] text-[#0a2968] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <FileCheck size={14} /> View Evaluated PDF
                      </a>

                      <button
                        onClick={() => handleDeleteResult(resItem.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Delete Result"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* BLOG FORM SLIDE OVER */}
      {showBlogForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowBlogForm(false)} />
          <div className="relative w-full max-w-5xl bg-white h-full shadow-2xl overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-20 shadow-sm">
              <h2 className="text-2xl font-black text-[#0a2968]">
                {editingBlog ? "Edit Article" : "Write New Article"}
              </h2>
              <button onClick={() => setShowBlogForm(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <div className="p-8 space-y-6 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Title</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Mastering Mains GS Answer Writing"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] focus:bg-white rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Excerpt</label>
                    <textarea
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Short summary displayed on the card..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] focus:bg-white rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Article Body Content</label>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={(e) => setBlogContent(e.currentTarget.innerHTML)}
                        className="min-h-[300px] max-h-[450px] overflow-y-auto p-5 text-slate-800 bg-white font-sans text-base leading-relaxed outline-none"
                        placeholder="Write article details here..."
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-600 uppercase mb-2">Category</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none"
                    >
                      <option value="Strategy">Strategy</option>
                      <option value="GS Mains">GS Mains</option>
                      <option value="Optional">Optional</option>
                      <option value="Updates">Updates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-600 uppercase mb-2">Read Time</label>
                    <input
                      type="text"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-600 uppercase mb-2">Cover Image URL</label>
                    <input
                      type="text"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="blogPublishedCheck"
                      checked={blogPublished}
                      onChange={(e) => setBlogPublished(e.target.checked)}
                      className="w-4 h-4 text-[#0a2968] rounded"
                    />
                    <label htmlFor="blogPublishedCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Publish Immediately
                    </label>
                  </div>

                  <button
                    onClick={handleSaveBlog}
                    disabled={isSavingBlog}
                    className="w-full py-3.5 bg-[#0a2968] hover:bg-[#EF961D] text-white font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 uppercase tracking-wider"
                  >
                    {isSavingBlog ? "Saving Article..." : "Save Article"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVALUATION CARD FORM SLIDE OVER */}
      {showEvalForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowEvalForm(false)} />
          <div className="relative w-full max-w-3xl bg-white h-full shadow-2xl overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-20 shadow-sm">
              <h2 className="text-2xl font-black text-[#0a2968]">
                {editingEval ? "Edit Evaluation Plan" : "Add New Evaluation Plan"}
              </h2>
              <button onClick={() => setShowEvalForm(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <div className="p-8 space-y-6 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Plan Title</label>
                  <input
                    type="text"
                    value={evalTitle}
                    onChange={(e) => setEvalTitle(e.target.value)}
                    placeholder="e.g. GS Paper 1 Mains Answer Evaluation"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Category Tab</label>
                  <select
                    value={evalCategory}
                    onChange={(e) => setEvalCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  >
                    <option value="GS">GS Papers (1 to 4)</option>
                    <option value="Optional">Optional Subject</option>
                    <option value="Combo">Combo Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Paper / Tag Name</label>
                  <input
                    type="text"
                    value={evalPaperTag}
                    onChange={(e) => setEvalPaperTag(e.target.value)}
                    placeholder="e.g. GS Paper 1, PSIR, Combo Plan"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={evalMrpPrice}
                    onChange={(e) => setEvalMrpPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Final Discounted Price (₹)</label>
                  <input
                    type="number"
                    value={evalFinalPrice}
                    onChange={(e) => setEvalFinalPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Duration / Validity</label>
                  <input
                    type="text"
                    value={evalDuration}
                    onChange={(e) => setEvalDuration(e.target.value)}
                    placeholder="Till Mains 2026"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Badge Text (Optional)</label>
                  <input
                    type="text"
                    value={evalBadge}
                    onChange={(e) => setEvalBadge(e.target.value)}
                    placeholder="e.g. Popular, Best Value, High Success"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Short Description</label>
                  <textarea
                    value={evalDescription}
                    onChange={(e) => setEvalDescription(e.target.value)}
                    placeholder="Comprehensive evaluation covering History, Art & Culture..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">
                    Included Features (One feature per line)
                  </label>
                  <textarea
                    value={evalFeatures}
                    onChange={(e) => setEvalFeatures(e.target.value)}
                    placeholder={"Detailed Line-by-Line Feedback within 24 Hours\nModel Answer Framework & Structure Map\nPersonalized One-on-One Mentor Call"}
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Purchase / Enroll Link</label>
                  <input
                    type="text"
                    value={evalPurchaseUrl}
                    onChange={(e) => setEvalPurchaseUrl(e.target.value)}
                    placeholder="/#contact"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">
                    Plan PDF Document (Upload or Link PDF for Enrolled Students)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={evalPlanPdf}
                      onChange={(e) => setEvalPlanPdf(e.target.value)}
                      placeholder="e.g. https://example.com/question-paper.pdf or /docs/plan.pdf"
                      className="flex-grow bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                    />
                    <label className="px-4 py-3 bg-[#0a2968] text-white hover:bg-[#EF961D] rounded-xl font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-xs">
                      <Upload size={16} /> Upload PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const fakeUrl = URL.createObjectURL(file);
                            setEvalPlanPdf(fakeUrl);
                            alert(`Selected PDF file: ${file.name}`);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold mt-1">
                    * This PDF will only be downloadable/printable by students who purchase this card plan.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="evalPublishedCheck"
                    checked={evalPublished}
                    onChange={(e) => setEvalPublished(e.target.checked)}
                    className="w-5 h-5 text-[#0a2968] rounded"
                  />
                  <label htmlFor="evalPublishedCheck" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Show Plan on Website
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowEvalForm(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEval}
                  disabled={isSavingEval}
                  className="px-8 py-3 bg-[#0a2968] hover:bg-[#EF961D] text-white font-extrabold rounded-xl text-sm shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  {isSavingEval ? "Saving Plan..." : "Save Evaluation Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVALUATION RESULT UPLOAD FORM SLIDE OVER */}
      {showResultForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowResultForm(false)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-20 shadow-sm">
              <h2 className="text-2xl font-black text-[#0a2968]">
                Upload Student Evaluated Result PDF
              </h2>
              <button onClick={() => setShowResultForm(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <div className="p-8 space-y-6 flex-grow">
              {/* DEPENDENT DROPDOWNS: STEP 1 (CATEGORY) & STEP 2 (EVALUATION PLAN) */}
              <div className="bg-blue-50/60 border border-blue-200 p-5 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* DROPDOWN 1: CATEGORY SELECTOR */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-1.5">
                      1. Select Category / Tab
                    </label>
                    <select
                      value={resCategorySelect}
                      onChange={(e) => {
                        const cat = e.target.value;
                        setResCategorySelect(cat);
                        const filtered = getAvailablePlans(cat);
                        if (filtered.length > 0) {
                          setResPlanTitle(filtered[0].title);
                          setResPaperTag(filtered[0].paperTag || "GS Paper");
                        }
                      }}
                      className="w-full bg-white border border-slate-300 focus:border-[#0a2968] rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0a2968] outline-none shadow-xs"
                    >
                      <option value="All">All Categories ({getAvailablePlans("All").length} Plans)</option>
                      <option value="GS">GS Papers (1 to 4)</option>
                      <option value="Optional">Optional Subject</option>
                      <option value="Combo">Combo Programs</option>
                    </select>
                  </div>

                  {/* DROPDOWN 2: DEPENDENT EVALUATION PLAN SELECTOR */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-1.5">
                      2. Select Evaluation Plan Name
                    </label>
                    <select
                      value={resPlanTitle}
                      onChange={(e) => {
                        const selectedTitle = e.target.value;
                        setResPlanTitle(selectedTitle);
                        const match = getAvailablePlans(resCategorySelect).find(p => p.title === selectedTitle);
                        if (match) {
                          setResPaperTag(match.paperTag || "GS Paper");
                        }
                      }}
                      className="w-full bg-white border border-slate-300 focus:border-[#0a2968] rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0a2968] outline-none shadow-xs"
                    >
                      {getAvailablePlans(resCategorySelect).map((plan, idx) => (
                        <option key={idx} value={plan.title}>
                          {plan.title} [{plan.paperTag || plan.category}]
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Evaluation Plan Title (Editable)</label>
                <input
                  type="text"
                  value={resPlanTitle}
                  onChange={(e) => setResPlanTitle(e.target.value)}
                  placeholder="e.g. GS Paper 1 Mains Answer Evaluation"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Paper / Tag Name</label>
                  <input
                    type="text"
                    value={resPaperTag}
                    onChange={(e) => setResPaperTag(e.target.value)}
                    placeholder="e.g. GS Paper 1, PSIR, Combo"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Target Student Email (or 'all')</label>
                  <input
                    type="text"
                    value={resStudentEmail}
                    onChange={(e) => setResStudentEmail(e.target.value)}
                    placeholder="student@itopper.com or leave blank for all"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Score / Marks Obtained</label>
                <input
                  type="text"
                  value={resScore}
                  onChange={(e) => setResScore(e.target.value)}
                  placeholder="e.g. 118 / 250"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">Evaluator Feedback & Remarks</label>
                <textarea
                  value={resRemarks}
                  onChange={(e) => setResRemarks(e.target.value)}
                  rows={3}
                  placeholder="Detailed line-by-line feedback notes..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#0a2968] uppercase mb-2">
                  Evaluated Copy PDF (Upload or Link)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={resPdfUrl}
                    onChange={(e) => setResPdfUrl(e.target.value)}
                    placeholder="https://example.com/evaluated_copy.pdf"
                    className="flex-grow bg-slate-50 border border-slate-200 focus:border-[#0a2968] rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none"
                  />
                  <label className="px-4 py-3 bg-[#0a2968] text-white hover:bg-[#EF961D] rounded-xl font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-xs">
                    <Upload size={16} /> Select PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const fakeUrl = URL.createObjectURL(file);
                          setResPdfUrl(fakeUrl);
                          alert(`Selected Evaluated Copy PDF: ${file.name}`);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowResultForm(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveResult}
                  className="px-8 py-3 bg-[#0a2968] hover:bg-[#EF961D] text-white font-extrabold rounded-xl text-sm shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  Publish Result PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
