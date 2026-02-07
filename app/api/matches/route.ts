import { NextRequest, NextResponse } from "next/server";
import { opportunities, Opportunity } from "@/lib/data/opportunities";
import { GitHubService } from "@/lib/services/github";
import { JobBoardService } from "@/lib/services/jobBoard";

// Types for the response
interface ScoredOpportunity extends Opportunity {
    matchScore: number;
}

// Helper: Calculate match score
// Algorithm:
// - Start with 60 base score (optimistic matching)
// - +10 for every exact skill match (handled via synonyms now)
// - +5 for "related" skills
// - History Boost: +5 for jobs that match user's previous interest (dummy logic: same type as last viewed)

// Simple Synonym Map
const SYNONYMS: Record<string, string[]> = {
    "javascript": ["js", "ecmascript", "node.js", "react", "typescript"],
    "react": ["react.js", "next.js", "react native"],
    "python": ["django", "flask", "fastapi", "pandas", "numpy"],
    "backend": ["node.js", "python", "java", "go", "postgresql", "sql"],
    "frontend": ["react", "vue", "angular", "html", "css", "tailwind"],
};

function normalizeSkill(skill: string): string[] {
    const s = skill.toLowerCase();
    const expanded = [s];
    // Add known synonyms/related terms
    for (const [key, values] of Object.entries(SYNONYMS)) {
        if (key === s || values.includes(s)) {
            // If match found, include the key and all values
            if (!expanded.includes(key)) expanded.push(key);
            values.forEach(v => {
                if (!expanded.includes(v)) expanded.push(v);
            });
        }
    }
    return expanded;
}

function calculateMatchScore(job: Opportunity, userSkills: string[], history?: any): number {
    let score = 60;

    // Normalize User Skills (Expand with synonyms)
    const expandedUserSkills = new Set<string>();
    userSkills.forEach(s => normalizeSkill(s).forEach(ns => expandedUserSkills.add(ns)));

    const normalizedJobSkills = job.skills.map(s => s.toLowerCase());

    // 1. Skill Matches
    normalizedJobSkills.forEach(jobSkill => {
        // Check if job skill matches any of the user's expanded skills
        // We check if "jobSkill" is in the expanded set
        // But jobSkill itself might need normalization if we want bi-directional fuzzy match, 
        // but for now let's assume job skills are standard.
        // Actually, let's reverse: Check if any of user's expanded skills partially match job skill
        let matched = false;
        if (expandedUserSkills.has(jobSkill)) {
            matched = true;
        } else {
            // Fallback: check if simple string inclusion
            for (const us of Array.from(expandedUserSkills)) {
                if (jobSkill.includes(us) || us.includes(jobSkill)) {
                    matched = true;
                    break;
                }
            }
        }

        if (matched) score += 10;
    });

    // 2. Personalization Boost (History & Adaptive Weights)
    if (history?.preferences) {
        // Check if job skills heavily match user's "Preferred" skills from history
        // This is the Reinforcement Learning effect
        let adaptiveBoost = 0;
        normalizedJobSkills.forEach(skill => {
            // If user has clicked jobs with this skill often, boost it
            // We look up the raw skill name (or simple lower case) in preferences
            // Use a Log scale to prevent runaway scores (diminishing returns)
            const weight = history.preferences[skill] || 0;
            if (weight > 0) {
                adaptiveBoost += Math.log(weight + 1) * 2; // e.g. 5 clicks -> +3.5 pts
            }
        });
        score += Math.min(15, adaptiveBoost); // Cap the adaptive boost
    }

    // 3. Difficulty Adjustment
    // If user has few skills (<3), boost 'Beginner' roles, penalize 'Advanced'
    const isBeginnerUser = userSkills.length < 3;
    if (isBeginnerUser) {
        if (job.difficulty === 'Beginner') score += 15;
        if (job.difficulty === 'Advanced') score -= 20;
    } else {
        // Experienced user
        if (job.difficulty === 'Advanced') score += 10; // Reward ambition
    }

    // Cap at 99, Min at 40
    return Math.min(99, Math.max(40, score));
}

import Analytics from "@/lib/analytics";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { skills, history, region = "Global" } = body; // Accept region filter

        // Simulate AI Latency
        await new Promise((resolve) => setTimeout(resolve, 800)); // Slightly faster optimization

        if (!skills || !Array.isArray(skills)) {
            return NextResponse.json({ error: "Invalid skills data" }, { status: 400 });
        }

        // 0. Filter by Region (if not Global)
        let filteredOpportunities = opportunities;
        if (region !== "Global") {
            filteredOpportunities = opportunities.filter(job => job.region === region || job.region === "Global");
        }

        // --- NEW: Fetch Real-Time Data ---
        try {
            const [hnJobs, ghIssues] = await Promise.all([
                JobBoardService.getHackerNewsJobs(),
                GitHubService.getOpenSourceOpportunities(`label:help-wanted is:issue language:${skills[0] || "javascript"}`)
            ]);

            // Merge Real Data
            // We map them to match Opportunity interface if not already done in service
            // (Services return objects that match, but we cast to be sure)
            const realOpportunities: any[] = [...hnJobs, ...ghIssues];

            // Prioritize Real Opportunities at the top
            filteredOpportunities = [...realOpportunities, ...filteredOpportunities];

        } catch (e) {
            console.warn("Real-time fetch failed, using static only", e);
        }
        // ---------------------------------

        // 1. Score and Sort Opportunities
        const scoredOpportunities: ScoredOpportunity[] = filteredOpportunities.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, skills, history)
        }));

        // Sort by score desc
        const sortedOpportunities = scoredOpportunities.sort((a, b) => b.matchScore - a.matchScore);

        // 2. Skill Gap Analysis
        // Identify skills present in the top 5 jobs that the user DOESN'T have
        const topJobs = sortedOpportunities.slice(0, 5);
        const userSkillSet = new Set(skills.map(s => s.toLowerCase()));
        const skillCounts: Record<string, number> = {};

        topJobs.forEach(job => {
            job.skills.forEach(skill => {
                if (!userSkillSet.has(skill.toLowerCase())) {
                    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
                }
            });
        });

        // Sort missing skills by frequency
        const missingSkills = Object.entries(skillCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([skill]) => skill)
            .slice(0, 3); // Top 3 recommendations

        // 3. Readiness Score
        // Simple heuristic: ratio of matched skills in top jobs
        const readinessScore = Math.min(98, Math.round(
            sortedOpportunities[0].matchScore // The top match score is a good proxy for readiness
        ));

        return NextResponse.json({
            jobs: sortedOpportunities,
            analysis: {
                readinessScore,
                missingSkills,
                existingSkills: skills
            }
        }, {
            headers: {
                // Cache response for 60 seconds, stale-while-revalidate for 30s
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
            }
        });

    } catch (error) {
        console.error("Match error:", error);
        Analytics.error(error, "Match API Failed");
        return NextResponse.json({ error: "Failed to process matches" }, { status: 500 });
    }
}
