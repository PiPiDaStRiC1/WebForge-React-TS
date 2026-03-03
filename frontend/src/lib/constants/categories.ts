import { Code, Palette, Megaphone, Smartphone, TrendingUp, Database } from 'lucide-react';

export type CategoriesTypes = 'web-dev' | 'design' | 'marketing' | 'mobile' | 'seo' | 'data';

export const allCategories: Array<CategoriesTypes> = [
    "data", "design", "marketing", "mobile", "seo", "web-dev"
]

export interface Category {
    id: string;
    name: string;
    icon: typeof Code;
    gradient: string;
    freelancers: number;
    avgPrice: number;
    trending: boolean;
    subcategories: string[];
}

export const CATEGORIES: Category[] = [
    {
        id: 'web-dev',
        name: 'Веб-разработка',
        icon: Code,
        gradient: 'from-blue-500 to-purple-600',
        freelancers: 450,
        avgPrice: 1500,
        trending: true,
        subcategories: [
            'React',
            'Vue',
            'Node.js',
            'TypeScript',
            'REST API',
            'PostgreSQL'
        ]
    },
    {
        id: 'design',
        name: 'Дизайн',
        icon: Palette,
        gradient: 'from-pink-500 to-orange-500',
        freelancers: 320,
        avgPrice: 1200,
        trending: false,
        subcategories: [
            'HTML/CSS',
            'Tailwind CSS',
            'Mobile UI',
            'JavaScript',
            'React'
        ]
    },
    {
        id: 'data',
        name: 'Аналитика и данные',
        icon: Database,
        gradient: 'from-cyan-500 to-blue-700',
        freelancers: 95,
        avgPrice: 1600,
        trending: true,
        subcategories: [
            'Python',
            'PostgreSQL',
            'MongoDB',
            'REST API',
            'Node.js'
        ]
    },
    {
        id: 'seo',
        name: 'SEO',
        icon: TrendingUp,
        gradient: 'from-lime-500 to-green-600',
        freelancers: 150,
        avgPrice: 1100,
        trending: false,
        subcategories: [
            'SEO',
            'HTML/CSS',
            'JavaScript',
            'Next.js',
            'React'
        ]
    },
    {
        id: 'marketing',
        name: 'Маркетинг',
        icon: Megaphone,
        gradient: 'from-emerald-500 to-teal-600',
        freelancers: 280,
        avgPrice: 1000,
        trending: true,
        subcategories: [
            'SEO',
            'JavaScript',
            'React',
            'Next.js',
            'REST API'
        ]
    },
    {
        id: 'mobile',
        name: 'Мобильная разработка',
        icon: Smartphone,
        gradient: 'from-indigo-500 to-blue-600',
        freelancers: 180,
        avgPrice: 1800,
        trending: true,
        subcategories: [
            'React Native',
            'TypeScript',
            'Mobile UI',
            'REST API',
            'JavaScript'
        ]
    }
];
