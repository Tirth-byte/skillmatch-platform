"use client";

import { useEcosystem, CommunityPost } from "@/lib/context/EcosystemContext";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
    const { posts, trends, likePost } = useEcosystem();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto pt-24 px-4 pb-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar: Navigation & Trends */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <TrendingUp className="text-purple-600" /> Market Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {trends.map(t => (
                                <div key={t.name} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-700 font-medium">{t.name}</span>
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs">+{t.growth}%</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-5 shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Hackathon Challenge</h3>
                        <p className="text-blue-100 text-sm mb-4">
                            Join 2,400+ developers building AI Apps this weekend.
                        </p>
                        <Button variant="secondary" size="sm" className="w-full bg-white text-purple-600 hover:bg-gray-100 border-0">
                            Join Now
                        </Button>
                    </div>
                </div>

                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">Community Feed</h1>
                        <Button size="sm">New Post</Button>
                    </div>

                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} onLike={() => likePost(post.id)} />
                    ))}
                </div>

                {/* Right Sidebar: Leaderboard */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="text-blue-600" /> Top Contributors
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className={`font-bold w-4 ${i === 1 ? 'text-yellow-500' : i === 2 ? 'text-gray-400' : i === 3 ? 'text-orange-400' : 'text-gray-300'}`}>
                                        {i}
                                    </span>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} />
                                        <AvatarFallback>U{i}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">DevUser_{i}</p>
                                        <p className="text-xs text-gray-500">{1500 - (i * 120)} pts</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

function PostCard({ post, onLike }: { post: CommunityPost, onLike: () => void }) {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(true);
        onLike();
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-semibold text-gray-900 mr-2">{post.user}</span>
                                <span className="text-sm text-gray-500">{post.action}</span>
                            </div>
                            <span className="text-xs text-gray-400">{post.timestamp}</span>
                        </div>
                        <p className="text-gray-800 mt-2 mb-4 leading-relaxed">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                            >
                                <Heart size={16} fill={liked ? "currentColor" : "none"} />
                                {post.likes}
                            </button>
                            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                                <MessageSquare size={16} />
                                Comment
                            </button>
                            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 transition-colors">
                                <Share2 size={16} />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
