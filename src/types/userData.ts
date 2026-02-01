export interface UserData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: 'freelancer' | 'client';
    createdAt: string;
}