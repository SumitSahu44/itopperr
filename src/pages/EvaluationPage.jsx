import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  BookOpen, 
  Layers, 
  Award,
  PhoneCall,
  HelpCircle,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getEvaluations, DEFAULT_EVALUATIONS } from "../utils/evaluationStorage";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import EvaluationCheckoutModal from "../components/EvaluationCheckoutModal";
import EvaluationHowItWorks from "../components/EvaluationHowItWorks";
import { AuthContext } from "../context/AuthContext";
import { launchRazorpayCheckout } from "../utils/razorpay";

const EvaluationPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("GS");
  const [evaluations, setEvaluations] = useState(DEFAULT_EVALUATIONS);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleEnrollClick = (plan) => {
    setSelectedPlanForPurchase(plan);

    if (user) {
      // User is already logged in: DIRECTLY OPEN RAZORPAY PAYMENT GATEWAY
      launchRazorpayCheckout({
        item: plan,
        user: user,
        amount: plan.finalPrice,
        onSuccess: (paymentId, pricePaid) => {
          try {
            const userKey = user.email ? `itopper_purchased_evals_${user.email}` : 'itopper_purchased_evals_guest';
            const existingUserEvals = JSON.parse(localStorage.getItem(userKey) || "[]");
            const globalEvals = JSON.parse(localStorage.getItem("itopper_purchased_evals_all") || "[]");

            const newRecord = {
              ...plan,
              purchasedAt: new Date().toISOString(),
              receiptId: paymentId,
              finalPaid: pricePaid
            };

            if (!existingUserEvals.some(p => (p._id && p._id === plan._id) || (p.id && p.id === plan.id))) {
              localStorage.setItem(userKey, JSON.stringify([...existingUserEvals, newRecord]));
            }
            if (!globalEvals.some(p => (p._id && p._id === plan._id) || (p.id && p.id === plan.id))) {
              localStorage.setItem("itopper_purchased_evals_all", JSON.stringify([...globalEvals, newRecord]));
            }
          } catch (e) {
            console.error("Failed to save purchased evaluation:", e);
          }
          navigate(`/payment-success?txnid=${paymentId}`);
        }
      });
    } else {
      // User is not logged in: Show Auth Modal for Login/Registration
      setIsCheckoutOpen(true);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await getEvaluations(false);
        if (data && data.length > 0) {
          setEvaluations(data);
        }
      } catch (err) {
        console.error("Failed to load evaluations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Filter plans based on active tab
  const filteredPlans = evaluations.filter((plan) => {
    if (activeTab === "All") return true;
    if (activeTab === "GS") return plan.category === "GS" || plan.category === "GS Mains";
    if (activeTab === "Optional") return plan.category === "Optional";
    if (activeTab === "Combo") return plan.category === "Combo";
    return true;
  });

  const faqs = [
    {
      q: "How fast will my answer copy be evaluated?",
      a: "All submitted answer copies are evaluated line-by-line within 24 to 48 hours by our expert faculty and UPSC CSE rankers."
    },
    {
      q: "Can I get one-on-one mentor discussion after evaluation?",
      a: "Yes! Every evaluation plan includes dedicated one-on-one mentorship calls to discuss your copy, structural errors, and mark-booster techniques."
    },
    {
      q: "What is included in the GS 1-4 + Optional Combo Plan?",
      a: "The Combo Plan covers complete answer writing evaluation for all 4 GS papers, Essay paper, and your selected Optional Subject along with model answers, structure maps, and priority review."
    },
    {
      q: "How do I submit my written answer copies?",
      a: "You can easily upload PDF scans of your handwritten answer copies directly on our student portal or via dedicated Telegram/WhatsApp mentorship channels."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col relative overflow-hidden">
      {/* GLOBAL NAVBAR */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navigation theme="light" />
      </div>

      {/* HERO BANNER - Clean White Background for 100% Navbar Visibility */}
      <section className="relative bg-white text-slate-800 pt-28 sm:pt-36 pb-16 px-4 sm:px-6 overflow-hidden border-b border-slate-100">
        {/* Soft background glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[15%] -left-[10%] w-[45%] h-[45%] rounded-full bg-blue-50 blur-[130px] opacity-80"></div>
          <div className="absolute top-[20%] -right-[10%] w-[45%] h-[55%] rounded-full bg-orange-50 blur-[150px] opacity-70"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Breadcrumb Back link */}
          <div className="mb-6 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0a2968] hover:text-[#EF961D] transition-colors bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a2968] leading-tight max-w-3xl mx-auto"
          >
            UPSC Mains <span className="text-[#EF961D]">Answer Evaluation</span> Plans
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed"
          >
            Detailed line-by-line feedback, model answer frameworks, and 1-on-1 mentorship by top rankers for GS 1–4 & Optionals.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl mx-auto"
          >
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-xs">
              <Clock className="text-[#EF961D]" size={22} />
              <div className="text-left">
                <div className="text-sm font-extrabold text-[#0a2968]">24 - 48 Hrs</div>
                <div className="text-[11px] text-slate-500 font-semibold">Turnaround</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-xs">
              <FileCheck className="text-[#EF961D]" size={22} />
              <div className="text-left">
                <div className="text-sm font-extrabold text-[#0a2968]">50,000+</div>
                <div className="text-[11px] text-slate-500 font-semibold">Copies Reviewed</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-xs">
              <Award className="text-[#EF961D]" size={22} />
              <div className="text-left">
                <div className="text-sm font-extrabold text-[#0a2968]">Rankers</div>
                <div className="text-[11px] text-slate-500 font-semibold">Faculty Evaluation</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-xs">
              <ShieldCheck className="text-[#EF961D]" size={22} />
              <div className="text-left">
                <div className="text-sm font-extrabold text-[#0a2968]">1-on-1</div>
                <div className="text-[11px] text-slate-500 font-semibold">Mentor Call</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS & SAMPLE EVALUATIONS SECTION */}
      <EvaluationHowItWorks />

      {/* EVALUATION PLANS SECTION */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto flex-grow w-full">
        {/* Category Tabs Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a2968] tracking-tight text-center">
            Select Your Evaluation Plan
          </h2>
          <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1.5 text-center max-w-md">
            Individual GS Mains papers, Optional subjects, or complete money-saving combo programs.
          </p>

          {/* TAB BUTTONS - Softer rounded style */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {[
              { id: "GS", label: "GS Papers (1 to 4)", icon: BookOpen },
              { id: "Optional", label: "Optional Subjects", icon: Star },
              { id: "Combo", label: "Combo Programs", icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0a2968] text-white shadow-md"
                      : "text-slate-600 hover:text-[#0a2968] hover:bg-slate-50"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-[#EF961D]" : ""} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CARDS GRID - Refined typography & soft contrast */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 border-3 border-[#0a2968] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 font-semibold text-xs">Loading Evaluation Plans...</p>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-xs">
            <p className="text-base font-semibold text-slate-700">No evaluation plans found in this category.</p>
            <button
              onClick={() => setActiveTab("GS")}
              className="mt-3 px-5 py-2 bg-[#0a2968] text-white rounded-xl font-bold text-xs"
            >
              View GS Papers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPlans.map((plan, index) => {
                const discount = plan.mrpPrice > plan.finalPrice 
                  ? Math.round(((plan.mrpPrice - plan.finalPrice) / plan.mrpPrice) * 100)
                  : 0;

                const isFeatured = plan.category === "Combo" || plan.badge === "Popular" || plan.badge === "Best Value Combo";

                return (
                  <motion.div
                    key={plan._id || plan.id || index}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className={`relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                      isFeatured ? "border-[#0a2968] ring-2 ring-[#0a2968]/10" : "border-slate-200/90 hover:border-[#0a2968]/30"
                    }`}
                  >
                    {/* Badge header strip */}
                    {plan.badge && (
                      <div className="absolute top-0 right-0 bg-[#0a2968] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-xs flex items-center gap-1 z-10">
                        <Sparkles size={11} className="text-[#EF961D]" />
                        {plan.badge}
                      </div>
                    )}

                    <div className="p-6">
                      {/* Sub-tag / Paper indicator */}
                      <span className="inline-block px-2.5 py-1 bg-blue-50 text-[#0a2968] font-bold text-xs rounded-lg uppercase tracking-wider mb-3 border border-blue-100/80">
                        {plan.paperTag || plan.category}
                      </span>

                      {/* Card Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2">
                        {plan.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                        {plan.description}
                      </p>

                      {/* Price Tag */}
                      <div className="mb-5 pb-5 border-b border-slate-100 flex items-baseline gap-2.5">
                        <div>
                          <span className="text-2xl sm:text-3xl font-extrabold text-[#0a2968]">
                            ₹{plan.finalPrice?.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-slate-400 font-medium ml-1">/ {plan.duration}</span>
                        </div>
                        {plan.mrpPrice > plan.finalPrice && (
                          <div className="flex flex-col items-start">
                            <span className="text-xs font-semibold text-slate-400 line-through">
                              ₹{plan.mrpPrice?.toLocaleString("en-IN")}
                            </span>
                            {discount > 0 && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                                {discount}% Off
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Features Bullet List */}
                      <div className="space-y-2.5">
                        <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Features included:</p>
                        {plan.features && plan.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-[#EF961D] shrink-0 mt-0.5" />
                            <span className="text-slate-600 text-xs font-medium leading-snug">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleEnrollClick(plan)}
                        className="w-full py-3 rounded-xl bg-[#0a2968] hover:bg-[#EF961D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
                      >
                        Enroll For Evaluation <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* WHY CHOOSE ITOPPER EVALUATION */}
      <section className="py-12 bg-white border-y border-slate-200/80 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a2968]">Why iTopper Evaluation Stands Out</h2>
            <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">Designed specifically to maximize your Mains score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#0a2968]/10 text-[#0a2968] flex items-center justify-center mb-4 font-bold text-base">
                01
              </div>
              <h3 className="text-lg font-bold text-[#0a2968] mb-1.5">Micro-Detail Feedback</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                We evaluate every paragraph for introduction hooks, structured body sub-headings, flowchart placement, and actionable conclusions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#EF961D]/15 text-[#EF961D] flex items-center justify-center mb-4 font-bold text-base">
                02
              </div>
              <h3 className="text-lg font-bold text-[#0a2968] mb-1.5">Model Answers & Value Additions</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Along with evaluated copies, receive high-scoring model answers, case study matrices, and quote banks for Ethics & Optionals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#0a2968]/10 text-[#0a2968] flex items-center justify-center mb-4 font-bold text-base">
                03
              </div>
              <h3 className="text-lg font-bold text-[#0a2968] mb-1.5">Direct Mentor Discussion</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Clear all your doubts with direct 1-on-1 calls with faculty to rectify repeating mistakes before the final UPSC exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0a2968] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle size={13} /> Got Questions?
          </div>
          <h2 className="text-2xl font-bold text-[#0a2968]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex justify-between items-center font-bold text-slate-800 text-sm hover:text-[#0a2968] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-[#0a2968] transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM MENTOR CONSULTATION BANNER */}
      <section className="py-10 bg-gradient-to-r from-[#0a2968] to-[#12387a] text-white px-4 sm:px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Need Guidance Selecting an Evaluation Plan?</h3>
            <p className="text-slate-300 font-normal text-xs sm:text-sm mt-1">Talk to our IAS Mentors today for personalized study planning.</p>
          </div>
          <a
            href="/#contact"
            className="px-6 py-3 bg-[#EF961D] hover:bg-white hover:text-[#0a2968] text-white font-bold rounded-xl shadow-md uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shrink-0 flex items-center gap-2"
          >
            <PhoneCall size={16} /> Request Callback
          </a>
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* CHECKOUT & AUTH MODAL */}
      <EvaluationCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        plan={selectedPlanForPurchase}
      />
    </div>
  );
};

export default EvaluationPage;
