export interface RealJob {
    id: string;
    title: string;
    company: string;
    url: string;
    time: number;
}

/**
 * Service to fetch real job postings from public APIs.
 * Primary source here is Hacker News Job Stories (Y Combinator jobs), which are high quality.
 */
export const JobBoardService = {
    async getHackerNewsJobs(): Promise<any[]> {
        try {
            // 1. Get Top Job Stories IDs
            const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json", { next: { revalidate: 3600 } });
            if (!res.ok) return [];

            const ids: number[] = await res.json();
            const top5Ids = ids.slice(0, 8); // Setup limit to 8 to avoid rate limits

            // 2. Fetch details for each job
            const jobs = await Promise.all(
                top5Ids.map(async (id) => {
                    const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                    if (!itemRes.ok) return null;
                    return itemRes.json();
                })
            );

            return jobs
                .filter(Boolean)
                .map((job: any) => {
                    // HN titles are often "Company (YC W20) is hiring a Senior Dev".
                    // We try to parse it simply.
                    let company = "Startup (YC)";
                    let title = job.title;

                    // Naive Company extractor if format is "Company is hiring..."
                    const hiringRegex = /^(.*?) is hiring (.*)/i;
                    const match = job.title.match(hiringRegex);
                    if (match) {
                        company = match[1];
                        title = match[2];
                    }

                    return {
                        id: `hn-${job.id}`,
                        title: title,
                        company: company,
                        location: "Remote / Hybrid", // Assumption for HN jobs usually
                        region: "Global",
                        type: "JOB",
                        salary: "Competitive", // HN doesn't strictly enforce salary in title
                        skills: ["Startup", "Full Stack"], // Fallback skills
                        difficulty: "Intermediate",
                        applyLink: job.url || `https://news.ycombinator.com/item?id=${job.id}`,
                        logoColor: "bg-orange-500", // HN Orange
                        logoUrl: `https://logo.clearbit.com/${company.replace(/\s+/g, '').toLowerCase()}.com`, // Experimental logo fetch
                        postedAt: "Just now" // Dynamic enough
                    };
                });
        } catch (error) {
            console.error("HN Jobs Fetch Error:", error);
            return [];
        }
    }
};
