"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { SkillTag } from "@/components/skills/SkillTag";
import { GitHubConnect } from "@/components/skills/GitHubConnect";

import Analytics from "@/lib/analytics";

export default function SkillsPage() {
    const router = useRouter();
    const [skills, setSkills] = useState<string[]>([
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js"
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddSkill = () => {
        if (inputValue.trim()) {
            const newSkill = inputValue.trim();
            if (!skills.includes(newSkill)) {
                setSkills([...skills, newSkill]);
            }
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleSubmit = () => {
        if (skills.length === 0) return;

        // Track Analytics
        Analytics.track('SKILLS_SUBMITTED', {
            count: skills.length,
            skills: skills.join(', ')
        });

        setIsSubmitting(true);
        // Serialize skills to query param for the results page to fetch
        const query = new URLSearchParams({ skills: JSON.stringify(skills) }).toString();
        router.push(`/results?${query}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6 transition-colors">
            <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12 transition-colors">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Let's Build Your Profile
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
                        Import your skills from multiple sources to find the perfect opportunity match.
                    </p>
                </div>

                {/* Input Grid */}
                <div className="mb-12">
                    <GitHubConnect onConnect={(username, newSkills) => {
                        // Merge new skills
                        const uniqueSkills = Array.from(new Set([...skills, ...newSkills]));
                        setSkills(uniqueSkills);
                    }} />
                </div>

                {/* Your Skills Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Skills</h2>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{skills.length} added</span>
                    </div>

                    <div className="flex flex-wrap gap-3 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl min-h-[120px] content-start border border-slate-100 dark:border-slate-700/50 transition-colors">
                        {skills.map((skill, index) => (
                            <SkillTag
                                key={`${skill}-${index}`}
                                label={skill}
                                onRemove={() => removeSkill(skill)}
                            />
                        ))}

                        <div className="relative flex-1 min-w-[200px]">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a skill and press Enter..."
                                className="w-full bg-transparent border-none focus:ring-0 p-1 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none"
                            />
                            <Sparkles className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 flex justify-end items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-8 transition-colors">
                    <span className="text-sm text-slate-400">Step 1 of 3</span>
                    <Button
                        size="lg"
                        className="rounded-xl px-8 h-12 text-base shadow-lg shadow-purple-500/20"
                        onClick={handleSubmit}
                        disabled={skills.length === 0 || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>Analyzing <Loader2 className="ml-2 h-5 w-5 animate-spin" /></>
                        ) : (
                            <>Find Opportunities <ArrowRight className="ml-2 h-5 w-5" /></>
                        )}
                    </Button>
                </div>

            </div>
        </div>
    );
}
