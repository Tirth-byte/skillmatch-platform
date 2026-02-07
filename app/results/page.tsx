"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { JobCard } from "@/components/results/JobCard";
import { SkillGapCard } from "@/components/results/SkillGapCard";
import { Briefcase, Bookmark, Zap, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserHistory } from "@/lib/hooks/useUserHistory";

interface Job {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    matchScore: number;
    skills: string[];
    logoColor: string;
}

interface Analysis {
    readinessScore: number;
    missingSkills: string[];
    existingSkills: string[];
}

// Define a new interface to hold both jobs and analysis
interface MatchResponse {
    jobs: Job[];
    analysis: Analysis;
}

function ResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter(); // Initialize useRouter
    const [loading, setLoading] = useState(true); // Renamed isLoading to loading
    const [data, setData] = useState<MatchResponse | null>(null); // New state for combined data
    const [skills, setSkills] = useState<string[]>([]); // New state for skills
    const [selectedRegion, setSelectedRegion] = useState("Global"); // Add this line

    const { saveSkills, history } = useUserHistory(); // Use Hook

    // Effect to parse skills from URL and save to history
    useEffect(() => {
        const skillsParam = searchParams.get("skills");
        if (skillsParam) {
            try {
                const parsedSkills = JSON.parse(skillsParam);
                setSkills(parsedSkills);
                saveSkills(parsedSkills); // Save to history
            } catch (e) {
                console.error("Failed to parse skills", e);
            }
        } else {
            // Default fallback if no skills in URL
            setSkills(["React", "JavaScript"]);
        }
    }, [searchParams, saveSkills]); // Added saveSkills to dependency array

    // Effect to fetch matches when skills change
    useEffect(() => {
        if (skills.length === 0) {
            // If skills are empty, and not loading, we might be in an initial state
            // or an error state where skills couldn't be parsed.
            // We can choose to show a loading spinner or an empty state here.
            // For now, we'll just return if skills are empty to prevent unnecessary API calls.
            if (!loading) setLoading(true); // Keep loading if skills are not yet set
            return;
        }

        const fetchMatches = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const res = await fetch("/api/matches", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        skills,
                        history,
                        region: selectedRegion // Send selected region
                    }),
                });

                if (!res.ok) throw new Error("Failed to fetch matches");

                const result = await res.json();
                setData(result); // Set the combined data
            } catch (error) {
                console.error("Error fetching matches:", error);
                setData(null); // Clear data on error
            } finally {
                setLoading(false); // Set loading to false after fetch completes
            }
        };

        fetchMatches();
    }, [skills, history, selectedRegion]); // Added selectedRegion to dependency array

    if (loading) { // Use 'loading' state
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
                <h2 className="text-xl font-bold text-gray-900">AI is analyzing your profile...</h2>
                <p className="text-gray-500">Matching your skills against 15,000+ opportunities</p>
            </div>
        );
    }

    // Error/Empty State
    if (!data || data.jobs.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50/50 pt-20 pb-20 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No Matches Found</h2>
                    <p className="text-gray-500 mb-6">We couldn't find any opportunities matching your specific skills. Try adding more general skills like "JavaScript" or "Python".</p>
                    <Button onClick={() => window.history.back()}>
                        Adjust Skills
                    </Button>
                </div>
            </div>
        );
    }

    const { jobs: jobData, analysis } = data;

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 pb-20 transition-colors">
            {/* Decorative background strip */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 h-16 w-full absolute top-16 left-0 z-0 transition-colors"></div>

            <div className="container mx-auto px-4 md:px-6 pt-12 relative z-10 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Opportunity Feed</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">We found <span className="font-bold text-gray-900 dark:text-white">{jobData.length}</span> jobs that match your profile.</p>
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block p-2.5 transition-colors"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            <option value="Global">Global (All)</option>
                            <option value="NA">North America</option>
                            <option value="EMEA">Europe</option>
                            <option value="APAC">Asia Pacific</option>
                            <option value="LATAM">Latin America</option>
                        </select>
                        <Button
                            className="bg-gray-900 dark:bg-slate-700 text-white hover:bg-gray-800 dark:hover:bg-slate-600"
                            onClick={() => {
                                setLoading(true); // Re-trigger loading state
                                setTimeout(() => setLoading(false), 500); // Fake refresh for feedback
                            }}
                        >
                            Update Preferences
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar - Stats */}
                    <aside className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-6 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                    <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Match Score</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {analysis ? (analysis.readinessScore > 75 ? "Excellent" : "Good") : "Average"}
                                    </p>
                                </div>
                            </div>
                            <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Saved</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        12 <Bookmark className="w-4 h-4 text-gray-400" />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Applied</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        8 <Briefcase className="w-4 h-4 text-gray-400" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-8">

                        {/* Skill Gap Analysis */}
                        {analysis && (
                            <SkillGapCard
                                readinessScore={analysis.readinessScore}
                                missingSkills={analysis.missingSkills}
                                existingSkills={analysis.existingSkills.slice(0, 5)} // Limit display
                            />
                        )}

                        {/* Job Feed */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recommended for You</h2>
                            </div>

                            <div className="grid gap-4">
                                {jobData.map((job, i) => (
                                    <JobCard key={i} {...job} />
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading interface...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
