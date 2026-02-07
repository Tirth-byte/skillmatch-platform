import { Octokit } from "octokit";

// Initialize Octokit (public access or authenticated)
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

export interface GitHubProfile {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
    public_repos: number;
}

export interface GitHubRepo {
    name: string;
    html_url: string;
    description: string;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
}

export const GitHubService = {
    /**
     * Fetch user profile by username
     */
    async getUser(username: string): Promise<GitHubProfile | null> {
        try {
            const { data } = await octokit.request("GET /users/{username}", {
                username,
            });
            return {
                login: data.login,
                avatar_url: data.avatar_url,
                html_url: data.html_url,
                name: data.name || data.login,
                bio: data.bio || "",
                public_repos: data.public_repos,
            };
        } catch (error) {
            console.error("GitHub User Fetch Error:", error);
            return null;
        }
    },

    /**
     * Fetch user's top repositories and extract dominant languages
     */
    async getUserSkills(username: string): Promise<string[]> {
        try {
            const { data } = await octokit.request("GET /users/{username}/repos", {
                username,
                sort: "updated",
                per_page: 10,
            });

            const languages = new Set<string>();
            data.forEach((repo: any) => {
                if (repo.language) {
                    languages.add(repo.language);
                }
            });

            return Array.from(languages);
        } catch (error) {
            console.error("GitHub Skills Fetch Error:", error);
            return [];
        }
    },

    /**
     * Fetch 'help-wanted' issues across GitHub to simulate 'Open Source' opportunities
     * Note: Searching issues requires a search query.
     */
    async getOpenSourceOpportunities(query: string = "label:help-wanted"): Promise<any[]> {
        try {
            // Search for issues with "help-wanted" label in popular repos (simulated query)
            // We search universally or narrowed by language if we wanted.
            const { data } = await octokit.request("GET /search/issues", {
                q: `${query} is:open state:open`,
                sort: "updated",
                per_page: 5,
            });

            return data.items.map((issue: any) => ({
                id: `gh-${issue.id}`,
                title: issue.title,
                company: issue.repository_url.split("/").slice(-2)[0], // Simple owner extraction
                type: "OPEN_SOURCE",
                location: "Remote",
                region: "Global",
                salary: "Contribution",
                skills: ["Open Source", "GitHub"], // Generic, hard to infer specific skills from issue without deeper scrape
                difficulty: "Intermediate",
                applyLink: issue.html_url,
                logoColor: "bg-gray-800", // GitHub style
                logoUrl: issue.user?.avatar_url || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                postedAt: new Date(issue.created_at).toLocaleDateString(),
            }));
        } catch (error) {
            console.error("GitHub Issues Fetch Error:", error);
            return [];
        }
    }
};
