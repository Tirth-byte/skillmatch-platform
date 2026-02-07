"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Flame } from "lucide-react";

const USERS = [
    { rank: 1, name: "Sarah Chen", xp: 12500, role: "Architect", badges: 15, streak: 45 },
    { rank: 2, name: "David Kim", xp: 11200, role: "Senior Dev", badges: 12, streak: 12 },
    { rank: 3, name: "Elena R.", xp: 10800, role: "Designer", badges: 14, streak: 20 },
    { rank: 4, name: "James W.", xp: 9500, role: "Full Stack", badges: 9, streak: 5 },
    { rank: 5, name: "You", xp: 8200, role: "Builder", badges: 6, streak: 3, isUser: true },
];

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                        <Trophy className="text-yellow-500 w-8 h-8" /> Global Leaderboard
                    </h1>
                    <p className="text-gray-500 mt-2">Top performers across the SkillMatch ecosystem.</p>
                </div>

                <Card>
                    <CardHeader className="bg-gray-900 text-white rounded-t-xl py-4 grid grid-cols-12 gap-4 text-sm font-medium uppercase tracking-wider">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-6">User</div>
                        <div className="col-span-3 text-right">XP</div>
                        <div className="col-span-2 text-center">Streak</div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {USERS.map((user) => (
                            <div
                                key={user.rank}
                                className={`grid grid-cols-12 gap-4 items-center p-4 border-b last:border-0 hover:bg-gray-50 transition-colors ${user.isUser ? 'bg-purple-50 hover:bg-purple-100 border-l-4 border-l-purple-600' : ''}`}
                            >
                                <div className="col-span-1 text-center font-bold text-gray-500 relative">
                                    {user.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                    {user.rank === 2 && <Medal className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                    {user.rank === 3 && <Medal className="w-5 h-5 text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                    {user.rank > 3 && user.rank}
                                </div>
                                <div className="col-span-6 flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-gray-900 flex items-center gap-2">
                                            {user.name}
                                            {user.isUser && <span className="text-[10px] bg-purple-200 text-purple-700 px-1.5 rounded-full">YOU</span>}
                                        </div>
                                        <div className="text-xs text-gray-500">{user.role} • {user.badges} Badges</div>
                                    </div>
                                </div>
                                <div className="col-span-3 text-right font-mono font-bold text-purple-600">
                                    {user.xp.toLocaleString()}
                                </div>
                                <div className="col-span-2 flex justify-center items-center gap-1 text-orange-500 font-medium">
                                    <Flame className="w-4 h-4 fill-orange-500" /> {user.streak}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
