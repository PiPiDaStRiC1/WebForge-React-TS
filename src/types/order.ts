export interface Order {
    id: number;
    title: string;
    description: string;
    budgetMin: number;
    budgetMax: number;
    category: string;
    skills: string[];
    deadline: number;
    status: 'new' | 'in-progress' | 'completed';
    responsesCount: number;
    createdAt: string;
    clientId: number;
    completedById: number | null;
}