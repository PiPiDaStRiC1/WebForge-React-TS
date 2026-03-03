export const frontendSkills = ['React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Webpack', 'Vite', 'SEO'] as const;
export const backendSkills = ['Node.js', 'Python', 'PHP', 'Express', 'Django', 'Laravel', 'PostgreSQL', 'MongoDB', 'Redis', 'REST API'] as const;
export const fullstackSkills = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Next.js', 'Express', 'Docker'] as const;
export const mobileSkills = ['React Native', 'TypeScript', 'JavaScript', 'Mobile UI', 'REST API'] as const;


export type FrontendSkills = typeof frontendSkills[number];
export type BackendSkills = typeof backendSkills[number];
export type FullstackSkills = typeof fullstackSkills[number];
export type MobileSkills = typeof mobileSkills[number];
export type AllSkills = FrontendSkills | BackendSkills | FullstackSkills | MobileSkills;
export type AllFilteredSkills = Exclude<AllSkills, 'SEO' | 'Node.js' | 'Next.js' | 'React'>;


export const allSkills: Array<AllSkills> = Array.from(new Set<AllSkills>([
    ...frontendSkills,
    ...backendSkills,
    ...fullstackSkills,
    ...mobileSkills
]));