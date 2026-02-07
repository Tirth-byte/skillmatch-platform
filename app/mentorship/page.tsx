"use client";

import { Header } from "@/components/layout/Header";
import { MentorCard } from "@/components/mentorship/MentorCard";
import { Search, Filter } from "lucide-react";

const MENTORS = [
    {
        name: "Elena Rodriguez",
        role: "Senior Product Designer",
        company: "Airbnb",
        rating: 4.9,
        reviews: 124,
        skills: ["Figma", "UI/UX", "Design Systems"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        hourlyRate: "$120"
    },
    {
        name: "James Chen",
        role: "Staff Engineer",
        company: "Google",
        rating: 5.0,
        reviews: 89,
        skills: ["System Design", "Go", "Distributed Systems"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        hourlyRate: "$200"
    },
    {
        name: "Sarah Miller",
        role: "DevRel Lead",
        company: "Vercel",
        rating: 4.8,
        reviews: 210,
        skills: ["Next.js", "Content Creation", "Community"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        hourlyRate: "$150"
    },
    {
        name: "David Kim",
        role: "AI Researcher",
        company: "OpenAI",
        rating: 4.9,
        reviews: 56,
        skills: ["Python", "PyTorch", "LLMs"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        hourlyRate: "$250"
    }
];

export default function MentorshipPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
                        <p className="text-gray-500 mt-2">Book 1:1 sessions with industry experts matched to your goals.</p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by skill or company..."
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50">
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MENTORS.map((m, i) => (
                        <MentorCard key={i} mentor={m} />
                    ))}
                </div>
            </main>
        </div>
    );
}
