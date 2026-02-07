"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Invest in Your Career</h1>
                    <p className="text-xl text-gray-600">Choose the plan that fits your growth journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Starter</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">$0</span>
                                <span className="ml-1 text-xl font-semibold text-gray-500">/mo</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">For students & early explorers.</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> Unlimited Job Matching</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> Basic AI Advisor access</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> 1 Certification / month</li>
                            <li className="flex items-center text-sm text-gray-400"><X className="w-5 h-5 text-gray-300 mr-2" /> <span className="line-through">Mentorship Booking</span></li>
                        </ul>
                        <Button variant="outline" className="w-full">Current Plan</Button>
                    </div>

                    {/* Pro */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-600 relative overflow-hidden transform scale-105">
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">POPULAR</div>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-purple-600">Pro Builder</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">$19</span>
                                <span className="ml-1 text-xl font-semibold text-gray-500">/mo</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">For serious career accelerators.</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> <strong>Unlimited</strong> AI Certifications</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> Priority Mentorship Booking</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> Verified Profile Badge</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-green-500 mr-2" /> Advanced Skill Analytics</li>
                        </ul>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200">Get Pro</Button>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Enterprise</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">Custom</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">For teams, universities & recruiters.</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-gray-500 mr-2" /> Enterprise Dashboard access</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-gray-500 mr-2" /> Bulk Job Posting API</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-gray-500 mr-2" /> Dedicated Success Manager</li>
                            <li className="flex items-center text-sm text-gray-700"><Check className="w-5 h-5 text-gray-500 mr-2" /> SSO & Data Compliance</li>
                        </ul>
                        <Button variant="outline" className="w-full">Contact Sales</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
