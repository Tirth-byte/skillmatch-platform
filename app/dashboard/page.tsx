"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TrendingUp, Briefcase, Bookmark, Clock, ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

import { CareerCompass } from "@/components/dashboard/CareerCompass";
import { PredictiveChart } from "@/components/dashboard/PredictiveChart";

export default function DashboardPage() {
    const { user, isLoading, logout } = useAuth();

    // Mock Data
    const stats = {
        matches: 12,
        saved: 5,
        applied: 3
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12 px-4 md:px-8 transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}! 👋</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your job search today.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={logout} className="dark:bg-slate-900 dark:text-white dark:border-gray-700 dark:hover:bg-slate-800">Sign Out</Button>
                        <Link href="/skills">
                            <Button className="bg-purple-600 hover:bg-purple-700 dark:text-white">Update Profile</Button>
                        </Link>
                    </div>
                </div>

                {/* AI Career Compass (Goal Setting) */}
                <CareerCompass />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        title="New Matches"
                        value={stats.matches}
                        icon={<TrendingUp className="text-green-600 dark:text-green-400" size={20} />}
                        trend="+3 today"
                        trendColor="text-green-600 dark:text-green-400"
                    />
                    <StatsCard
                        title="Saved Jobs"
                        value={stats.saved}
                        icon={<Bookmark className="text-purple-600 dark:text-purple-400" size={20} />}
                        trend="View Saved"
                        trendColor="text-purple-600 dark:text-purple-400 cursor-pointer hover:underline"
                    />
                    <StatsCard
                        title="Applications"
                        value={stats.applied}
                        icon={<Briefcase className="text-blue-600 dark:text-blue-400" size={20} />}
                        trend="In Review"
                        trendColor="text-gray-500 dark:text-gray-400"
                    />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Recent Activity / Recommendations */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
                            <Link href="/results" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                                View all <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Mock Job List - Updated to be Generic examples since we don't have real data prop here */}
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow flex sm:items-center justify-between gap-4 group cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-br ${i === 1 ? 'from-orange-400 to-red-500' : i === 2 ? 'from-blue-400 to-indigo-500' : 'from-green-400 to-emerald-500'}`}>
                                            {i === 1 ? 'Y' : i === 2 ? 'V' : 'G'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {i === 1 ? 'Frontend Engineer' : i === 2 ? 'Full Stack Developer' : 'Software Intern'}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {i === 1 ? 'Y Combinator' : i === 2 ? 'Vercel' : 'Google'} • Remote
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400" onClick={() => alert("Job details view coming soon!")}>
                                        View Details
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Skills & Tips */}
                    <div className="space-y-6">

                        {/* 1. Future Projections (NEW) */}
                        <PredictiveChart />

                        {/* 2. AI Match Prediction */}
                        <Card className="bg-white dark:bg-slate-900 border-purple-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
                            <CardHeader className="bg-purple-50 dark:bg-purple-900/10 pb-3">
                                <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-300 flex items-center gap-2">
                                    <Bot className="text-purple-600 dark:text-purple-400 w-4 h-4" /> Match Prediction
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-center mb-2">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">85%</span>
                                </div>
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    Likelihood of landing an interview based on your current skill profile.
                                </p>
                                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-3 overflow-hidden">
                                    <div className="bg-purple-600 dark:bg-purple-500 h-full rounded-full w-[85%]"></div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-900 border-gray-100 dark:border-gray-800 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg text-gray-900 dark:text-white">Skill Profile</CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">Your verified skills</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "TypeScript", "Node.js", "Tailwind"].map(skill => (
                                        <span key={skill} className="bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-md text-xs font-medium border border-purple-100 dark:border-purple-900/20">
                                            {skill}
                                        </span>
                                    ))}
                                    <Link href="/skills">
                                        <span className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-colors">
                                            + Add More
                                        </span>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Personalized Learning Path (Simplified for Dashboard) */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <TrendingUp size={80} />
                            </div>
                            <h3 className="font-bold text-lg mb-1 relative z-10">Next Level</h3>
                            <p className="text-blue-100 text-sm mb-4 relative z-10">
                                You're ready for <strong>Next.js 14</strong>. Learning Server Actions will unlock 5 new job matches.
                            </p>
                            <Button variant="secondary" size="sm" className="w-full relative z-10 bg-white/10 hover:bg-white/20 text-white border-0">
                                View Learning Path
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, trend, trendColor }: any) {
    return (
        <Card className="bg-white dark:bg-slate-900 border-gray-100 dark:border-gray-800 transition-colors">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">{icon}</div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-50 dark:bg-slate-800 ${trendColor}`}>{trend}</span>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
                </div>
            </CardContent>
        </Card>
    )
}
