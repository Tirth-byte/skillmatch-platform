export type OpportunityType = 'INTERNSHIP' | 'JOB' | 'HACKATHON' | 'OPEN_SOURCE';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type Region = 'Global' | 'NA' | 'EMEA' | 'APAC' | 'LATAM';

export interface Opportunity {
    id: string;
    title: string;
    company: string;
    type: OpportunityType;
    location: string;
    region: Region;
    salary: string; // or prize/bounty
    skills: string[];
    difficulty: DifficultyLevel;
    applyLink: string;
    logoColor: string;
    logoUrl?: string; // New field for real logos
    postedAt: string;
}

// STATIC DATA CLEARED TO ENFORCE REAL-TIME DATA ONLY
export const opportunities: Opportunity[] = [];
