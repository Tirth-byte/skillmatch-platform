"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
    updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on load
        const storedUser = localStorage.getItem("asm_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        // Simulate API latency
        setTimeout(() => {
            // Mock User Data based on email
            const mockUser: User = {
                id: btoa(email), // Simple ID generation
                name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1), // "john@test" -> "John"
                email: email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` // Generate random avatar
            };

            localStorage.setItem("asm_user", JSON.stringify(mockUser));
            setUser(mockUser);
            router.push("/dashboard");
        }, 500);
    };

    const logout = () => {
        localStorage.removeItem("asm_user");
        setUser(null);
        router.push("/");
    };

    const updateProfile = (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem("asm_user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
