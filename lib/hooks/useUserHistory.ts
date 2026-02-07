import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
    VIEWED_JOBS: 'asm_viewed_jobs',
    PAST_SKILLS: 'asm_past_skills',
};

export interface HistoryState {
    viewedJobs: string[]; // Job IDs
    pastSkills: string[];
    preferences: Record<string, number>; // "Backend": 5, "React": 2
}

export function useUserHistory() {
    const [history, setHistory] = useState<HistoryState>({
        viewedJobs: [],
        pastSkills: [],
        preferences: {}
    });

    // Load from local storage on mount
    useEffect(() => {
        const viewed = JSON.parse(localStorage.getItem(STORAGE_KEYS.VIEWED_JOBS) || '[]');
        const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAST_SKILLS) || '[]');
        const prefs = JSON.parse(localStorage.getItem("asm_preferences") || '{}');
        setHistory({ viewedJobs: viewed, pastSkills: skills, preferences: prefs });
    }, []);

    const addToViewedJobs = useCallback((jobId: string, skills: string[] = []) => {
        setHistory((prev) => {
            // 1. Update Viewed Jobs
            const newViewed = prev.viewedJobs.includes(jobId)
                ? prev.viewedJobs
                : [jobId, ...prev.viewedJobs].slice(0, 20);

            localStorage.setItem(STORAGE_KEYS.VIEWED_JOBS, JSON.stringify(newViewed));

            // 2. Adaptive Learning: Boost weights for skills in this job
            const newPrefs = { ...prev.preferences };
            skills.forEach(skill => {
                // Simple Reinforcement: +1 for every view
                newPrefs[skill] = (newPrefs[skill] || 0) + 1;
            });
            localStorage.setItem("asm_preferences", JSON.stringify(newPrefs));

            return { ...prev, viewedJobs: newViewed, preferences: newPrefs };
        });
    }, []);

    const saveSkills = useCallback((skills: string[]) => {
        // Merge new skills with existing ones, unique only
        setHistory(prev => {
            const combined = Array.from(new Set([...skills, ...prev.pastSkills])).slice(0, 50);
            localStorage.setItem(STORAGE_KEYS.PAST_SKILLS, JSON.stringify(combined));
            return { ...prev, pastSkills: combined };
        });
    }, []);

    return {
        history,
        addToViewedJobs,
        saveSkills
    };
}
