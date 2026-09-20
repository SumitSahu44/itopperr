import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Loader2 } from 'lucide-react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const txnid = searchParams.get('txnid');
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/my-courses');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/20 blur-[80px] rounded-full" />
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    
                    <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Payment Successful!
                    </h1>
                    <p className="text-zinc-400 mb-6">
                        Your enrollment has been confirmed. Welcome to the academy!
                    </p>
                    
                    <div className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/5">
                        <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Transaction ID</div>
                        <div className="text-sm font-mono text-zinc-200">{txnid || 'N/A'}</div>
                    </div>

                    <div className="mb-6 py-2 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Redirecting to your Dashboard in {countdown}s...</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <Link 
                            to="/my-courses"
                            className="w-full py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <span>Go to My Dashboard Now</span>
                            <ArrowRight size={18} />
                        </Link>
                        <Link 
                            to="/"
                            className="w-full py-4 bg-zinc-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-700 transition-all"
                        >
                            <Home size={18} />
                            <span>Back Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
