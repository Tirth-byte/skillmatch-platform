"use client";

import { Header } from "@/components/layout/Header";
import { ApplicantTable } from "@/components/enterprise/ApplicantTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Briefcase, TrendingUp, Plus } from "lucide-react";

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Building2 className="text-gray-400 w-5 h-5" />
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Enterprise Portal</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Talent Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage jobs, analyze applicants, and track hiring performance.</p>
                    </div>
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">
                        <Plus className="w-4 h-4 mr-2" /> Post New Job
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-500 text-sm font-medium">Active Jobs</span>
                                <Briefcase className="text-blue-500 w-4 h-4" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">12</h3>
                            <span className="text-xs text-green-600 font-medium">+2 this week</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-500 text-sm font-medium">Total Applicants</span>
                                <Users className="text-purple-500 w-4 h-4" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">1,248</h3>
                            <span className="text-xs text-green-600 font-medium">+15% vs last month</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-500 text-sm font-medium">Avg Match Score</span>
                                <TrendingUp className="text-green-500 w-4 h-4" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">88%</h3>
                            <span className="text-xs text-gray-400 font-medium">Target: 85%</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 text-white border-0">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-400 text-sm font-medium">API Usage</span>
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white font-mono">PRO</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">45k</h3>
                            <span className="text-xs text-gray-400 font-medium">requests / month</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Applicant Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <ApplicantTable />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Skill Demand (Your Jobs)</CardTitle>
                                <CardDescription>Most requested skills in your open roles.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700">React</span>
                                        <span className="font-bold text-gray-900">92%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full w-[92%]"></div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700">TypeScript</span>
                                        <span className="font-bold text-gray-900">78%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full w-[78%]"></div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700">Node.js</span>
                                        <span className="font-bold text-gray-900">65%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full w-[65%]"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Connect via API</h3>
                            <p className="text-purple-100 text-sm mb-4">Integrate your ATS directly with our AI Matcher.</p>
                            <div className="bg-black/20 p-3 rounded-lg font-mono text-xs text-purple-200 mb-4 border border-white/10">
                                POST /api/enterprise/jobs
                            </div>
                            <Button size="sm" className="w-full bg-white text-purple-700 hover:bg-white/90">
                                View Documentation
                            </Button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
