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
    clientName: string;
    clientId: number;
    completedBy: string;
    completedById: number | null;
}