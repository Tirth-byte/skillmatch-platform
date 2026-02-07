"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Award, Lock, CheckCircle2 } from "lucide-react";

export default function CertificationPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Skill Verification Center</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Earn verified badges to stand out to recruiters. Our AI-generated assessments benchmark your expertise against industry standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Active Certification */}
                    <Card className="border-purple-200 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                            RECOMMENDED
                        </div>
                        <CardHeader>
                            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                                <Award className="w-6 h-6" />
                            </div>
                            <CardTitle>Advanced React</CardTitle>
                            <CardDescription>Verify your knowledge of Hooks, Context, and Performance.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 mb-6">
                                <Badge variant="secondary">45 min</Badge>
                                <Badge variant="secondary">30 Questions</Badge>
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                Take Assessment
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Locked Certification */}
                    <Card className="opacity-75">
                        <CardHeader>
                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-500">
                                <Lock className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-gray-700">System Design</CardTitle>
                            <CardDescription>Distributed systems, caching, and scalability patterns.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 mb-6">
                                <Badge variant="outline">60 min</Badge>
                                <Badge variant="outline">Hard</Badge>
                            </div>
                            <Button variant="outline" className="w-full" disabled>
                                Unlock at Lvl 6
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Completed Certification */}
                    <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-green-900">TypeScript Pro</CardTitle>
                            <CardDescription className="text-green-700">Generics, Utility Types, and Advanced Config.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 flex items-center text-green-700 text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Verified on Nov 24, 2025
                            </div>
                            <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                                View Certificate
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
