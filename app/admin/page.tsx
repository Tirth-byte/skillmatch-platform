"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, RefreshCw, Database, Bot, Terminal } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function AdminPage() {
    const [logs, setLogs] = useState<string[]>([
        "[10:00:01] System initialized.",
        "[10:00:05] AI Worker: Idle."
    ]);
    const [isScraping, setIsScraping] = useState(false);
    const [isTraining, setIsTraining] = useState(false);

    const addLog = (msg: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [`[${time}] ${msg}`, ...prev]);
    };

    const handleRunScraper = () => {
        setIsScraping(true);
        addLog("Discovery Agent: Starting global opportunity scan (Regions: NA, EMEA, APAC)...");
        setTimeout(() => {
            addLog("Discovery Agent: Found 14 new sources in Singapore, Berlin, and San Francisco.");
        }, 1000);
        setTimeout(() => {
            addLog("Discovery Agent: Parsing 42 opportunities (LLM processing)...");
        }, 2500);
        setTimeout(() => {
            addLog("Discovery Agent: Success! 12 new matches added to Database.");
            setIsScraping(false);
        }, 4000);
    };

    const handleRetrain = () => {
        setIsTraining(true);
        addLog("Bias Engine: Aggregating user interaction logs...");
        setTimeout(() => {
            addLog("Bias Engine: Detected trend 'GenAI' (+45% interest).");
        }, 1500);
        setTimeout(() => {
            addLog("Bias Engine: Updating weights for 1,200 entities...");
            setIsTraining(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-24 px-4 pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Bot className="text-purple-600" size={32} />
                        Autonomous Agent Control
                    </h1>
                    <p className="text-gray-500 mt-2">Manage backend AI workers, dataset updates, and learning models.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Discovery Agent */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="text-blue-500" /> Discovery Agent
                            </CardTitle>
                            <CardDescription>Scrapes and indexes new opportunities automatically.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">Status</span>
                                    <span className="text-green-600 font-medium">Active (Listening)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Run</span>
                                    <span className="text-gray-900">14 mins ago</span>
                                </div>
                            </div>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={handleRunScraper}
                                disabled={isScraping}
                            >
                                {isScraping ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running...</> : <><RefreshCw className="mr-2 h-4 w-4" /> Run Manual Scrape</>}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Adaptive Learning Engine */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="text-purple-500" /> Adaptive Learning Engine
                            </CardTitle>
                            <CardDescription>Retrains ranking models based on user clickstream data.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">Model Version</span>
                                    <span className="text-gray-900 font-mono">v4.2.0-alpha</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Accuracy</span>
                                    <span className="text-green-600 font-medium">94.2%</span>
                                </div>
                            </div>
                            <Button
                                className="w-full bg-purple-600 hover:bg-purple-700"
                                onClick={handleRetrain}
                                disabled={isTraining}
                            >
                                {isTraining ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Training...</> : <><RefreshCw className="mr-2 h-4 w-4" /> Retrain Model</>}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* System Logs */}
                <Card className="bg-slate-900 text-slate-100 border-none shadow-xl">
                    <CardHeader className="border-b border-slate-800">
                        <CardTitle className="flex items-center gap-2 text-sm font-mono text-slate-300">
                            <Terminal size={16} /> System Logs
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-2">
                            {logs.map((log, i) => (
                                <div key={i} className="border-l-2 border-slate-700 pl-3 py-0.5 opacity-90">
                                    {log}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
