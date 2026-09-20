import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck, Download, Printer, Upload, FileText, CheckCircle2,
  Trophy, LogOut, LayoutDashboard, BrainCircuit, Zap,
  ArrowUpRight, Award, Sparkles, ExternalLink, Eye, ChevronDown, ChevronUp
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const StudentDashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [purchasedEvaluations, setPurchasedEvaluations] = useState([]);
  const [uploadedAnswerSheets, setUploadedAnswerSheets] = useState({});
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [expandedPdfId, setExpandedPdfId] = useState(null);
  const [activeTab, setActiveTab] = useState('evaluations'); // 'evaluations' | 'results' | 'quizzes'

  // View Paper Modal State
  const [paperModalData, setPaperModalData] = useState(null); // { title, pdfUrl }
  // View Checked Copy Modal State
  const [checkedCopyModalData, setCheckedCopyModalData] = useState(null); // { planTitle, resultPdf, score, remarks, evaluatedAt }

  useEffect(() => {
    loadPurchasedEvaluations();
    loadUploadedAnswerSheets();
    loadEvaluationResults();
  }, [user, activeTab]);

  // Load purchased evaluation cards for this student
  const loadPurchasedEvaluations = () => {
    try {
      const userEmail = user?.email;
      if (!userEmail) {
        setPurchasedEvaluations([]);
        return;
      }
      const userKey = `itopper_purchased_evals_${userEmail}`;
      const userEvals = JSON.parse(localStorage.getItem(userKey) || "[]");
      setPurchasedEvaluations(userEvals);
    } catch (e) {
      console.error("Error loading purchased evaluations:", e);
      setPurchasedEvaluations([]);
    }
  };

  // Load uploaded answer sheets
  const loadUploadedAnswerSheets = () => {
    try {
      const userEmail = user?.email || 'default';
      const savedSheets = localStorage.getItem(`itopper_answer_sheets_${userEmail}`);
      if (savedSheets) {
        setUploadedAnswerSheets(JSON.parse(savedSheets));
      } else {
        setUploadedAnswerSheets({});
      }
    } catch (e) {
      console.error("Error loading answer sheets:", e);
    }
  };

  // Load evaluation results uploaded by admin
  const loadEvaluationResults = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("itopper_evaluation_results") || "[]");
      const userEmail = user?.email?.toLowerCase();

      if (!userEmail) {
        setEvaluationResults([]);
        return;
      }

      const studentResults = saved.filter(item => {
        if (!item.studentEmail) return false;
        return item.studentEmail.toLowerCase() === userEmail;
      });

      setEvaluationResults(studentResults);
    } catch (e) {
      console.error("Error loading evaluation results:", e);
      setEvaluationResults([]);
    }
  };

  // Handle Answer Sheet File Upload & sync to global admin submissions list
  const handleAnswerSheetUpload = (plan, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const planId = plan._id || plan.id || plan.title;
    const userEmail = user?.email || 'student@itopper.com';
    const fakeFileUrl = URL.createObjectURL(file);

    const sheetInfo = {
      planId: planId,
      planTitle: plan.title,
      studentName: user?.name || userEmail.split('@')[0] || "Aspirant",
      studentEmail: userEmail,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      uploadedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      status: "Under Evaluation",
      fileUrl: fakeFileUrl
    };

    // Save to user local state
    const updatedSheets = {
      ...uploadedAnswerSheets,
      [planId]: sheetInfo
    };
    setUploadedAnswerSheets(updatedSheets);
    localStorage.setItem(`itopper_answer_sheets_${userEmail}`, JSON.stringify(updatedSheets));

    // Also sync to global submissions array for Admin Portal table view
    try {
      const allSubmissions = JSON.parse(localStorage.getItem("itopper_all_student_submissions") || "[]");
      const existingIdx = allSubmissions.findIndex(s => s.planId === planId && s.studentEmail === userEmail);
      if (existingIdx >= 0) {
        allSubmissions[existingIdx] = sheetInfo;
      } else {
        allSubmissions.unshift(sheetInfo);
      }
      localStorage.setItem("itopper_all_student_submissions", JSON.stringify(allSubmissions));
    } catch (e) {
      console.error("Error syncing submission to admin storage:", e);
    }

    alert(`✅ Answer Sheet "${file.name}" uploaded successfully! Sent to faculty for line-by-line evaluation.`);
  };

  // Download PDF Helper
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

  // Print PDF Helper
  const handlePrintPdf = (pdfUrl) => {
    const targetUrl = pdfUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    const printWindow = window.open(targetUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    } else {
      alert("Please allow popups to open the print view for your PDF.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-[#EF961D]/20">
      {/* GLOBAL LIGHT NAVBAR */}
      <Navigation theme="light" />

      {/* TOP HEADER BANNER */}
      <section className="bg-white border-b border-slate-200 pt-6 sm:pt-10 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0a2968] rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 border border-blue-100">
              <Sparkles size={14} className="text-[#EF961D]" /> Student Portal & Evaluation Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0a2968] tracking-tight">
              Welcome, <span className="text-[#EF961D]">{user?.name ? user.name.split(' ')[0] : 'Aspirant'}</span> 👋🏻
            </h1>
            <p className="text-slate-500 text-sm font-semibold mt-1">
              Access your enrolled evaluation plans, download question PDFs, submit answer copies, and view checked copies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/evaluation"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0a2968] rounded-xl text-xs font-extrabold transition-all border border-slate-200 flex items-center gap-1.5"
            >
              Browse All Plans <ExternalLink size={14} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-extrabold transition-all border border-red-200 cursor-pointer shadow-xs"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </section>

      {/* STATS METRICS BAR */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-grow w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Stat 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#0a2968]/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0a2968] flex items-center justify-center shrink-0">
              <FileCheck size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0a2968]">{purchasedEvaluations.length}</div>
              <div className="text-xs font-bold text-slate-500">Enrolled Plans</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#0a2968]/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#EF961D] flex items-center justify-center shrink-0">
              <Upload size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0a2968]">{Object.keys(uploadedAnswerSheets).length}</div>
              <div className="text-xs font-bold text-slate-500">Submitted Copies</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#0a2968]/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0a2968]">{evaluationResults.length}</div>
              <div className="text-xs font-bold text-slate-500">Evaluated Results</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#0a2968]/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Trophy size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0a2968]">Active</div>
              <div className="text-xs font-bold text-slate-500">Student Account</div>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex bg-white rounded-2xl border border-slate-200 p-1.5 mb-8 shadow-xs w-fit max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('evaluations')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'evaluations'
                ? 'bg-[#0a2968] text-white shadow-md'
                : 'text-slate-600 hover:text-[#0a2968] hover:bg-slate-50'
            }`}
          >
            <FileCheck size={16} /> Evaluation Plans ({purchasedEvaluations.length})
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'results'
                ? 'bg-[#0a2968] text-white shadow-md'
                : 'text-slate-600 hover:text-[#0a2968] hover:bg-slate-50'
            }`}
          >
            <Award size={16} /> Evaluated Results & Copy PDFs ({evaluationResults.length})
          </button>
        </div>

        {/* ================= TAB 1: PURCHASED EVALUATION PLANS & DOWNLOAD/PRINT/UPLOAD ================= */}
        {activeTab === 'evaluations' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {purchasedEvaluations.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs">
                <FileCheck size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-2xl font-black text-[#0a2968] mb-2">No Enrolled Evaluation Plans</h3>
                <p className="text-slate-500 font-semibold text-sm mb-6 max-w-md mx-auto">
                  You haven't enrolled in any evaluation plan yet. Choose a plan to download PDFs and get line-by-line expert answer evaluation.
                </p>
                <Link
                  to="/evaluation"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a2968] hover:bg-[#EF961D] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Browse Evaluation Plans <ArrowUpRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {purchasedEvaluations.map((plan, index) => {
                  const planId = plan._id || plan.id || `eval-${index}`;
                  const uploadedSheet = uploadedAnswerSheets[planId];
                  const pdfUrl = plan.planPdf || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

                  // Find if admin uploaded a checked copy for this plan
                  const matchingResult = evaluationResults.find(r => 
                    r.planTitle?.toLowerCase().includes(plan.title?.toLowerCase()) || 
                    plan.title?.toLowerCase().includes(r.planTitle?.toLowerCase())
                  );

                  return (
                    <div
                      key={planId}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                    >
                      {/* Top Header Card */}
                      <div className="p-6 pb-4 border-b border-slate-100">
                        <div className="flex justify-between items-start mb-3">
                          <span className="px-3 py-1 bg-blue-50 text-[#0a2968] font-black text-xs rounded-lg uppercase tracking-wider border border-blue-100">
                            {plan.paperTag || plan.category || "GS Paper"}
                          </span>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-black text-[11px] rounded-full uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 size={13} /> Active Enrolled Plan
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-[#0a2968] mb-2">
                          {plan.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-4">
                          {plan.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-500 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span>Validity: <strong className="text-slate-800">{plan.duration || "Till Mains 2026"}</strong></span>
                          {plan.receiptId && <span>Receipt: <strong className="text-[#0a2968]">{plan.receiptId}</strong></span>}
                        </div>
                      </div>

                      {/* PDF QUESTION PAPER ACTIONS (VIEW PAPER, PRINT PAPER, DOWNLOAD) */}
                      <div className="p-6 bg-slate-50/50 space-y-4">
                        <div>
                          <label className="block text-xs font-extrabold text-[#0a2968] uppercase tracking-wider mb-2">
                            📄 Evaluation Question Paper & Plan PDF
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {/* VIEW PAPER BUTTON */}
                            <button
                              type="button"
                              onClick={() => setPaperModalData({ title: plan.title, pdfUrl })}
                              className="py-3 px-2 bg-[#0a2968] hover:bg-[#12387a] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            >
                              <Eye size={15} className="text-[#EF961D]" />
                              View Paper
                            </button>

                            {/* PRINT PAPER BUTTON */}
                            <button
                              type="button"
                              onClick={() => handlePrintPdf(pdfUrl)}
                              className="py-3 px-2 bg-white hover:bg-slate-100 text-[#0a2968] border border-slate-300 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            >
                              <Printer size={15} className="text-[#0a2968]" />
                              Print Paper
                            </button>

                            {/* DOWNLOAD PDF BUTTON */}
                            <button
                              type="button"
                              onClick={() => handleDownloadPdf(pdfUrl, plan.title)}
                              className="py-3 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            >
                              <Download size={15} className="text-slate-600" />
                              Download
                            </button>
                          </div>
                        </div>

                        {/* SUBMIT YOUR ANSWER SHEET SECTION */}
                        <div className="pt-4 border-t border-slate-200">
                          <label className="block text-xs font-extrabold text-[#0a2968] uppercase tracking-wider mb-2">
                            📤 Submit Your Answer Sheet (For Faculty Review)
                          </label>

                          {uploadedSheet ? (
                            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                    <FileText size={20} />
                                  </div>
                                  <div>
                                    <div className="text-xs font-black text-slate-900 truncate max-w-[180px]">
                                      {uploadedSheet.fileName}
                                    </div>
                                    <div className="text-[11px] text-emerald-700 font-bold">
                                      {uploadedSheet.fileSize} • Uploaded {uploadedSheet.uploadedAt}
                                    </div>
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 bg-emerald-600 text-white font-black text-[10px] rounded-md uppercase tracking-wider shadow-xs">
                                  {uploadedSheet.status || "Submitted"}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pt-1">
                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-lg border border-emerald-300 cursor-pointer transition-colors">
                                  <Upload size={13} /> Re-upload / Replace Copy
                                  <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={(e) => handleAnswerSheetUpload(plan, e)}
                                  />
                                </label>

                                {matchingResult && (
                                  <button
                                    onClick={() => setCheckedCopyModalData(matchingResult)}
                                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
                                  >
                                    <Award size={13} /> View Checked Copy
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <label className="border-2 border-dashed border-slate-300 hover:border-[#0a2968] bg-white p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-blue-50/30">
                                <Upload className="text-[#0a2968] mb-1.5" size={24} />
                                <span className="text-xs font-black text-[#0a2968]">Submit Your Answer Sheet PDF</span>
                                <span className="text-[11px] text-slate-400 font-semibold">Click to browse file (PDF/Image)</span>
                                <input
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  className="hidden"
                                  onChange={(e) => handleAnswerSheetUpload(plan, e)}
                                />
                              </label>

                              {matchingResult && (
                                <button
                                  onClick={() => setCheckedCopyModalData(matchingResult)}
                                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                                >
                                  <Award size={15} /> View Admin Checked Copy Available!
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: EVALUATED RESULTS & PDF PREVIEW ================= */}
        {activeTab === 'results' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {evaluationResults.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs">
                <Award size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-2xl font-black text-[#0a2968] mb-2">No Evaluated Results Uploaded Yet</h3>
                <p className="text-slate-500 font-semibold text-sm">
                  Once your answer copy is evaluated by faculty, your checked copy PDF, marks, and detailed feedback will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {evaluationResults.map((result) => {
                  const isPdfExpanded = expandedPdfId === result.id;
                  const pdfUrl = result.resultPdf || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

                  return (
                    <div
                      key={result.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-50 text-[#0a2968] font-black text-xs rounded-lg uppercase tracking-wider border border-blue-100">
                              {result.paperTag || "GS Paper"}
                            </span>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-black text-xs rounded-full uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                              <Award size={14} /> Score: {result.score}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-[#0a2968]">
                            {result.planTitle}
                          </h3>
                          <p className="text-xs text-slate-400 font-semibold mt-1">
                            Evaluated on: <strong className="text-slate-700">{result.evaluatedAt}</strong>
                          </p>
                        </div>

                        {/* PDF ACTION BUTTONS */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDownloadPdf(pdfUrl, `${result.planTitle}_Checked`)}
                            className="py-2.5 px-4 bg-[#0a2968] hover:bg-[#EF961D] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                          >
                            <Download size={15} /> Download Checked Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePrintPdf(pdfUrl)}
                            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#0a2968] border border-slate-200 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Printer size={15} /> Print
                          </button>
                        </div>
                      </div>

                      {/* Evaluator Remarks Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                        <h4 className="text-xs font-black text-[#0a2968] uppercase tracking-wider mb-1.5">
                          ✍️ Faculty & Evaluator Feedback Remarks:
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                          "{result.remarks}"
                        </p>
                      </div>

                      {/* INLINE PDF VIEWER PREVIEW WINDOW */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-100">
                        <button
                          onClick={() => setExpandedPdfId(isPdfExpanded ? null : result.id)}
                          className="w-full p-4 bg-white hover:bg-slate-50 flex items-center justify-between font-extrabold text-xs text-[#0a2968] border-b border-slate-200 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Eye size={16} className="text-[#EF961D]" />
                            {isPdfExpanded ? "Hide Inline PDF Preview" : "Open & Preview Evaluated Copy PDF Inline"}
                          </span>
                          {isPdfExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {isPdfExpanded && (
                          <div className="p-2 bg-slate-900 h-[500px]">
                            <iframe
                              src={pdfUrl}
                              title="Evaluated Answer Sheet PDF"
                              className="w-full h-full rounded-xl border-0"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* VIEW QUESTION PAPER MODAL */}
      {paperModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#0a2968] font-extrabold text-[10px] rounded uppercase tracking-wider">
                  Question Paper & Plan PDF
                </span>
                <h3 className="text-lg font-black text-[#0a2968] mt-0.5">
                  {paperModalData.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintPdf(paperModalData.pdfUrl)}
                  className="px-3 py-2 bg-[#0a2968] hover:bg-[#EF961D] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer uppercase tracking-wider"
                >
                  <Printer size={15} /> Print (Ctrl + P)
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(paperModalData.pdfUrl, paperModalData.title)}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Download size={15} /> Download
                </button>
                <button
                  onClick={() => setPaperModalData(null)}
                  className="p-2 bg-slate-200 hover:bg-red-500 hover:text-white rounded-full text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body - PDF Viewer */}
            <div className="flex-1 bg-slate-900 p-2 min-h-[500px]">
              <iframe
                src={paperModalData.pdfUrl}
                title="Question Paper PDF"
                className="w-full h-full min-h-[500px] rounded-xl border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* VIEW CHECKED COPY MODAL */}
      {checkedCopyModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-black text-[10px] rounded uppercase tracking-wider">
                    Evaluated Checked Copy
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-[#0a2968] font-black text-[10px] rounded uppercase tracking-wider">
                    Score: {checkedCopyModalData.score}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0a2968] mt-1">
                  {checkedCopyModalData.planTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintPdf(checkedCopyModalData.resultPdf)}
                  className="px-3 py-2 bg-[#0a2968] hover:bg-[#EF961D] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer uppercase tracking-wider"
                >
                  <Printer size={15} /> Print (Ctrl + P)
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(checkedCopyModalData.resultPdf, `${checkedCopyModalData.planTitle}_Checked`)}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Download size={15} /> Download
                </button>
                <button
                  onClick={() => setCheckedCopyModalData(null)}
                  className="p-2 bg-slate-200 hover:bg-red-500 hover:text-white rounded-full text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Faculty Remarks bar */}
            <div className="px-5 py-3 bg-amber-50 border-b border-amber-200 text-xs font-bold text-amber-900">
              💬 <strong>Faculty Remarks:</strong> "{checkedCopyModalData.remarks}"
            </div>

            {/* Modal Body - PDF Viewer */}
            <div className="flex-1 bg-slate-900 p-2 min-h-[480px]">
              <iframe
                src={checkedCopyModalData.resultPdf}
                title="Checked Answer Copy PDF"
                className="w-full h-full min-h-[480px] rounded-xl border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;