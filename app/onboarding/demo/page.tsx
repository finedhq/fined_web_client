'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    HiOutlineAcademicCap,
    HiOutlineDocumentText,
    HiOutlineLightningBolt,
    HiOutlineStar,
    HiOutlineArrowRight
} from 'react-icons/hi';

export default function DemoPage() {
    const router = useRouter();

    const features = [
        {
            title: 'Bite-sized Courses',
            description: 'Master personal finance with interactive modules designed for busy people. Zero jargon, just clear, practical, and actionable learning.',
            icon: <HiOutlineAcademicCap className="w-8 h-8" />,
            color: 'blue',
            linkText: 'Browse Courses'
        },
        {
            title: 'Expert Articles',
            description: 'Stay ahead with daily updates on market trends, tax-saving tips, and deep dives into investment strategies from professionals.',
            icon: <HiOutlineDocumentText className="w-8 h-8" />,
            color: 'indigo',
            linkText: 'Read Updates'
        },
        {
            title: 'Smart FinTools',
            description: 'From expense trackers to complex tax calculators. Our tools help you bridge the gap between learning and real-world money moves.',
            icon: <HiOutlineLightningBolt className="w-8 h-8" />,
            color: 'amber',
            linkText: 'Open Toolkit'
        },
        {
            title: 'Finstars & Score',
            description: 'Earn FinStars as you learn and track your progress with your personal FinScore. Financial literacy is now rewarding.',
            icon: <HiOutlineStar className="w-8 h-8" />,
            color: 'purple',
            linkText: 'Check My Score'
        }
    ];

    return (
        <div className="min-h-screen bg-[#F9FBFF] font-inter selection:bg-[#2D31FA]/10">
            <div className="max-w-6xl mx-auto px-6 py-20 lg:py-32">
                {/* Header Section */}
                <div className="text-center space-y-8 mb-24 max-w-3xl mx-auto animate-[fadeIn_0.8s_ease-out]">
                    <div className="inline-flex items-center gap-2 bg-[#2D31FA]/5 text-[#2D31FA] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D31FA] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D31FA]"></span>
                        </span>
                        Platform Tour
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight leading-none">
                        Meet <span className="text-[#2D31FA]">FinEd.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
                        Everything you need to master your money in one <span className="text-gray-900 font-bold underline decoration-[#FFB800] decoration-4 underline-offset-8">simple, powerful</span> platform.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-[fadeIn_1s_ease-out]">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 hover:border-[#2D31FA]/10 hover:shadow-[0_40px_80px_rgba(45,49,250,0.05)] transition-all duration-500 flex flex-col justify-between"
                        >
                            <div className="space-y-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm
                                    ${feature.color === 'blue' ? 'bg-blue-50 text-blue-600' : ''}
                                    ${feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : ''}
                                    ${feature.color === 'amber' ? 'bg-amber-50 text-amber-600' : ''}
                                    ${feature.color === 'purple' ? 'bg-purple-50 text-purple-600' : ''}
                                `}>
                                    {feature.icon}
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{feature.title}</h2>
                                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-10 mt-10 border-t border-gray-50 flex items-center text-[#2D31FA] font-black text-lg group-hover:text-[#1e22c0] cursor-pointer">
                                {feature.linkText}
                                <HiOutlineArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center pt-32 space-y-10 animate-[fadeIn_1.2s_ease-out]">
                    <button
                        onClick={() => router.push('/')}
                        className="group relative bg-[#111827] text-white py-6 px-20 rounded-2xl font-black text-2xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:bg-[#2D31FA] transition-all duration-500 overflow-hidden hover:-translate-y-2 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-4">
                            Launch My Journey
                            <HiOutlineArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-gray-200"></div>
                        <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-[10px]">Financial Empowerment Starts Now</p>
                        <div className="h-px w-12 bg-gray-200"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
