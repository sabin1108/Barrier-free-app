export interface Social {
    platform: "github" | "linkedin" | "instagram" | "website";
    url: string;
}

export interface Skill {
    name: string;
    level?: number;
    icon?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    tags?: string[];
    link?: string;
}

export interface ProfileData {
    name: string;
    role: string;
    description: string;
    avatarUrl?: string;
    stats: {
        projects: number;
        likes: number;
        experience: string;
    };
    contacts: {
        email: string;
        phone: string;
        location: string;
    };
    socials?: Social[];
    skills?: Skill[];
    projects?: Project[];
}
