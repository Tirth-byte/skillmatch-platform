import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { EcosystemProvider } from "@/lib/context/EcosystemContext";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "AI Skill Matcher",
    description: "Turn your skills into real opportunities with AI.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark:bg-slate-950">
            <body className={`${inter.className} min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors`}>
                <AuthProvider>
                    <EcosystemProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Header />
                            <main className="pt-16 min-h-[calc(100vh-theme(spacing.16))]">
                                {children}
                            </main>
                            <Footer />
                        </ThemeProvider>
                    </EcosystemProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
