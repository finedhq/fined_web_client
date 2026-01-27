'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Step = 'loading' | 'welcome' | 'goals' | 'compounding';

const goals = [
    { id: 'budget', text: 'Learn how to budget & save more' },
    { id: 'invest', text: 'Start investing and grow my wealth' },
    { id: 'credit', text: 'Learn about credit cards and loans' },
    { id: 'explore', text: 'Not sure yet, just exploring' },
];

export default function OnboardingPage() {
    const [step, setStep] = useState<Step>('loading');
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const [amount, setAmount] = useState(21500);
    const router = useRouter();

    useEffect(() => {
        if (step === 'loading') {
            const timer = setTimeout(() => {
                setStep('welcome');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const compoundingData = useMemo(() => {
        const rate = 0.1591; // 15.91%
        const years = 10;
        const chartData: any[] = [];

        for (let i = 1; i <= years; i++) {
            const monthlyRate = rate / 12;
            const months = i * 12;
            let fv = amount * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * (1 + monthlyRate);

            chartData.push({
                year: `${i}`,
                amount: Math.round(fv),
                invested: amount * 12 * i
            });
        }
        return chartData;
    }, [amount]);

    const finalAmount = compoundingData[compoundingData.length - 1].amount;
    const totalInvested = amount * 12 * 10;
    const returns = finalAmount - totalInvested;

    const renderProgressBar = (activeStep: number) => (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50">
            <div className="flex gap-3 h-2 w-full">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${i === activeStep
                            ? 'bg-[#2D31FA] shadow-[0_0_10px_rgba(45,49,250,0.3)]'
                            : i < activeStep ? 'bg-[#2D31FA]/60' : 'bg-gray-200'
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center font-inter overflow-x-hidden">
            {step === 'loading' && (
                <div className="flex flex-col items-center justify-center space-y-8 animate-[fadeIn_0.6s_ease-out]">
                    <div className="relative">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-gray-50 overflow-hidden relative">
                            {/* Rotating Spinner Ring */}
                            <div className="absolute inset-0 border-4 border-[#2D31FA] border-t-transparent rounded-full animate-spin"></div>
                            {/* Logo */}
                            <div className="relative w-20 h-20">
                                <Image
                                    src="/logo.png"
                                    alt="FinEd Logo"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-800">Preparing your journey...</h2>
                    </div>
                </div>
            )}

            {step === 'welcome' && (
                <div className="max-w-4xl w-full text-center space-y-12 animate-[fadeIn_0.6s_ease-out] flex flex-col items-center px-6">
                    <div className="w-32 h-32 bg-[#6366F1] rounded-full flex items-center justify-center shadow-2xl mb-4 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full opacity-60"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white/40"></div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-[#2D31FA] tracking-tight">
                            Welcome to FinEd
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                            Your Personal Finance Journey Starts Here
                        </h2>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
                        We’ll ask you a few quick questions to guide you to the right courses and tools.
                        <br />
                        <span className="text-[#2D31FA] font-medium">It takes less than 30 seconds.</span>
                    </p>

                    <div className="pt-12 pb-24">
                        <button
                            onClick={() => setStep('goals')}
                            className="bg-[#FFB800] text-white py-4 px-16 rounded-xl font-bold text-xl hover:bg-[#E6A600] transition-all shadow-lg transform hover:-translate-y-1 active:scale-95"
                        >
                            Continue
                        </button>
                    </div>
                    {renderProgressBar(1)}
                </div>
            )}

            {step === 'goals' && (
                <div className="max-w-4xl w-full px-6 py-12 animate-[fadeIn_0.6s_ease-out]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D31FA] mb-6">
                            What’s your main money goal right now?
                        </h2>
                        <p className="text-gray-500 text-xl">Choose one that resonates most with you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {goals.map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setSelectedGoal(goal.id)}
                                className={`flex flex-col justify-center p-8 rounded-2xl border-2 transition-all duration-200 text-left min-h-[140px] relative shadow-sm hover:shadow-md ${selectedGoal === goal.id
                                    ? 'border-[#2D31FA] bg-[#2D31FA] text-white'
                                    : 'bg-white border-gray-100 text-gray-800'
                                    }`}
                            >
                                <span className={`text-xl font-bold leading-tight ${selectedGoal === goal.id ? 'text-white' : 'text-gray-800'}`}>
                                    {goal.text}
                                </span>
                                {selectedGoal === goal.id && (
                                    <div className="absolute bottom-4 right-4">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-20 mb-24 flex justify-center">
                        <button
                            onClick={() => setStep('compounding')}
                            disabled={!selectedGoal}
                            className={`py-4 px-20 rounded-xl font-bold text-xl transition-all duration-300 ${selectedGoal
                                ? 'bg-[#FFB800] text-white shadow-lg hover:bg-[#E6A600] hover:-translate-y-1'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </div>
                    {renderProgressBar(2)}
                </div>
            )}

            {step === 'compounding' && (
                <div className="max-w-6xl w-full py-12 px-6 animate-[fadeIn_0.6s_ease-out]">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D31FA] mb-4">
                            The Power of Compounding
                        </h2>
                        <p className="text-gray-500 text-lg">See how your money can grow over 10 years with smart investing</p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-50 mb-12 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(45,49,250,0.08)]">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-10">
                            <div className="flex-1 w-full">
                                <label className="text-2xl font-bold text-gray-800 mb-6 block">Monthly Investment:</label>
                                <div className="relative pt-2 group">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        step="500"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-[#2D31FA] transition-all"
                                        style={{
                                            background: `linear-gradient(to right, #2D31FA 0%, #2D31FA ${(amount / 100000) * 100}%, #F3F4F6 ${(amount / 100000) * 100}%, #F3F4F6 100%)`
                                        }}
                                    />
                                    <div className="flex justify-between mt-5 text-sm text-gray-400 font-bold uppercase tracking-widest">
                                        <span>₹0</span>
                                        <span>₹1,00,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-72">
                                <div className="flex items-center gap-4 border-2 border-[#2D31FA]/30 rounded-[1.25rem] px-6 py-4 bg-white shadow-sm hover:border-[#2D31FA] transition-colors group">
                                    <span className="text-[#2D31FA] font-black text-2xl">₹</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full text-2xl font-black text-gray-800 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => setAmount(prev => Math.min(prev + 500, 100000))}
                                            className="text-gray-300 hover:text-[#2D31FA] transition-colors p-0.5"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setAmount(prev => Math.max(prev - 500, 0))}
                                            className="text-gray-300 hover:text-[#2D31FA] transition-colors p-0.5"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <div className="bg-[#F8FAFF] p-8 rounded-[2rem] border border-blue-50/50 hover:border-blue-100 transition-all duration-300">
                                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Invested</p>
                                <p className="text-3xl font-black text-gray-800 tracking-tight">₹{totalInvested.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="bg-[#EEF1FF] p-8 rounded-[2rem] border border-blue-100 shadow-[0_20px_40px_rgba(45,49,250,0.1)] scale-105 z-10 transition-transform duration-300">
                                <p className="text-[#2D31FA] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Final Value (10y)</p>
                                <p className="text-3xl font-black text-[#2D31FA] tracking-tight">₹{finalAmount.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="bg-[#F0FFF4] p-8 rounded-[2rem] border border-green-100/50 hover:border-green-100 transition-all duration-300">
                                <p className="text-green-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Profit Gained</p>
                                <p className="text-3xl font-black text-green-700 tracking-tight">₹{returns.toLocaleString('en-IN')}</p>
                            </div>
                        </div>

                        <div className="h-[450px] w-full mt-8 relative rounded-[1.5rem] bg-gray-50/30 p-4 md:p-8">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-4">
                                    <span className="w-1.5 h-10 bg-[#FF9D00] rounded-full"></span>
                                    Projected Growth
                                    <span className="text-xs font-medium text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 ml-2">SIP in Sensex</span>
                                </h3>
                                <div className="hidden sm:flex gap-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#FF9D00]"></div>
                                        <span className="text-gray-600">Growth</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                                        <span className="text-gray-400">Investment</span>
                                    </div>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height="80%">
                                <AreaChart data={compoundingData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                    <defs>
                                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FF9D00" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#FF9D00" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2D31FA" stopOpacity={0.05} />
                                            <stop offset="95%" stopColor="#2D31FA" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="year"
                                        hide={false}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 'bold' }}
                                        label={{ value: 'Years', position: 'bottom', offset: -10, fontSize: 10, fontWeight: 'bold', fill: '#D1D5DB' }}
                                    />
                                    <YAxis
                                        hide={false}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#CBCFD6', fontWeight: 'bold' }}
                                        tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                                        width={50}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '24px',
                                            border: 'none',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                            padding: '20px',
                                            fontWeight: '800'
                                        }}
                                        cursor={{ stroke: '#FF9D00', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Portfolio Value']}
                                        labelFormatter={(label) => `Year ${label}`}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#FF9D00"
                                        strokeWidth={5}
                                        fillOpacity={1}
                                        fill="url(#colorGrowth)"
                                        animationDuration={1500}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="invested"
                                        stroke="#D1D5DB"
                                        strokeWidth={2}
                                        strokeDasharray="8 8"
                                        fill="url(#colorInvested)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50 mb-20">
                        <h3 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tight">Other Investment Avenues</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Fixed Deposit', returns: '6-7%', risk: 'Low', color: 'bg-amber-50 text-amber-700' },
                                { title: 'Gold', returns: '8-10%', risk: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
                                { title: 'Real Estate', returns: '10-12%', risk: 'High', color: 'bg-red-50 text-red-700' },
                                { title: 'Savings Account', returns: '3-4%', risk: 'Very Low', color: 'bg-blue-50 text-blue-700' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:scale-105 transition-transform">
                                    <p className="text-gray-500 font-bold mb-4">{item.title}</p>
                                    <p className={`text-3xl font-black mb-2`}>{item.returns}</p>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                                        Risk: {item.risk}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mb-32">
                        <p className="text-2xl font-bold text-gray-700 mb-10 leading-relaxed">
                            That's how you can put your money to work. <br />
                            <span className="text-[#2D31FA] text-3xl font-black">Let's get you started!</span>
                        </p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => setStep('goals')}
                                className="bg-gray-100 text-gray-700 py-4 px-12 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => router.push('/onboarding/demo')}
                                className="bg-[#FFB800] text-white py-4 px-16 rounded-2xl font-bold text-xl hover:bg-[#E6A600] transition-all shadow-xl transform hover:-translate-y-1 active:scale-95"
                            >
                                Let's explore the platform
                            </button>
                        </div>
                    </div>
                    {renderProgressBar(3)}
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
