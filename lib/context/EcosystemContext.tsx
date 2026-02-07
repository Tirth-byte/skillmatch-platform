"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CommunityPost {
    id: string;
    user: string;
    avatar: string;
    action: "shared" | "applied" | "joined";
    content: string;
    timestamp: string;
    likes: number;
}

interface Trend {
    name: string;
    growth: number; // percentage
}

interface EcosystemContextType {
    posts: CommunityPost[];
    trends: Trend[];
    addToCommunity: (post: Omit<CommunityPost, "id" | "timestamp" | "likes">) => void;
    likePost: (id: string) => void;
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<CommunityPost[]>([
        {
            id: "1",
            user: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            action: "applied",
            content: "Just applied to the Frontend Engineer role at Vercel! Wish me luck 🚀",
            timestamp: "2m ago",
            likes: 12
        },
        {
            id: "2",
            user: "Alex Kim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            action: "shared",
            content: "Found this amazing resource for learning Next.js Server Actions.",
            timestamp: "15m ago",
            likes: 8
        }
    ]);

    const [trends, setTrends] = useState<Trend[]>([
        { name: "Generative AI", growth: 45 },
        { name: "Next.js 14", growth: 32 },
        { name: "TypeScript", growth: 18 },
        { name: "Rust", growth: 12 }
    ]);

    // Simulate Real-Time Updates
    useEffect(() => {
        const interval = setInterval(() => {
            const randomUsers = ["Jordan", "Taylor", "Casey", "Morgan"];
            const randomActions = ["viewed", "saved", "started learning"];
            const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];

            const newPost: CommunityPost = {
                id: Date.now().toString(),
                user: randomUser,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`,
                action: "joined",
                content: `${randomUser} just ${randomActions[Math.floor(Math.random() * randomActions.length)]} a new Python course.`,
                timestamp: "Just now",
                likes: 0
            };

            setPosts(prev => [newPost, ...prev].slice(0, 50));
        }, 15000); // New post every 15s

        return () => clearInterval(interval);
    }, []);

    const addToCommunity = (post: Omit<CommunityPost, "id" | "timestamp" | "likes">) => {
        const newPost: CommunityPost = {
            ...post,
            id: Date.now().toString(),
            timestamp: "Just now",
            likes: 0
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const likePost = (id: string) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    };

    return (
        <EcosystemContext.Provider value={{ posts, trends, addToCommunity, likePost }}>
            {children}
        </EcosystemContext.Provider>
    );
}

export function useEcosystem() {
    const context = useContext(EcosystemContext);
    if (context === undefined) {
        throw new Error("useEcosystem must be used within an EcosystemProvider");
    }
    return context;
}
