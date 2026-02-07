import { NextRequest, NextResponse } from "next/server";
import { GitHubService } from "@/lib/services/github";

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();

        if (!username) {
            return NextResponse.json({ error: "Username required" }, { status: 400 });
        }

        const [profile, skills] = await Promise.all([
            GitHubService.getUser(username),
            GitHubService.getUserSkills(username)
        ]);

        if (!profile) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            profile,
            skills
        });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
