export interface ClientEditingProfile {
    bio: string;
    location: string;
    skills: string[];
}

export interface FreelancerEditingProfile extends ClientEditingProfile {
    skills: string[];
    pricePerHour: number;
}
