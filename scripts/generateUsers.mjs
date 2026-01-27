import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SEED = 'cdf';
const FREELANCERS_COUNT = 100;
const CLIENTS_COUNT = 30;

// Seed для жесткого закрепления результатов (faker-js)
faker.seed(SEED);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let enrichedUsers = [];
try {
    const response = await fetch(`https://randomuser.me/api/1.0/?results=${FREELANCERS_COUNT + CLIENTS_COUNT}&seed=${SEED}&exc=location,registered,dob,cell,id,nat`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    enrichedUsers = data.results;
} catch (error) {
    console.error(error.message);
}


const russianCities = [
    'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
    'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
    'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград',
    'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск'
];

const clientBioTemplates = [
    'Ищу надежного исполнителя для долгосрочного сотрудничества',
    'Развиваю стартап в сфере e-commerce, нужна помощь с разработкой',
    'Владелец digital-агентства, регулярно размещаю заказы',
    'Представитель IT-компании, работаем над корпоративными проектами',
    'Предприниматель, запускаю несколько веб-проектов одновременно',
    'Руководитель отдела разработки, нужны дополнительные ресурсы',
    'Основатель SaaS-проекта, ищу команду для MVP',
    'Маркетолог, часто заказываю лендинги и промо-сайты',
    'Product owner, работаю над обновлением существующих продуктов',
    'CTO стартапа, нужны специалисты для технической реализации'
];

const freelancerBioByStack = {
    frontend: [
        'Frontend-разработчик с {years} опыта. Специализируюсь на React и TypeScript',
        'Создаю современные SPA приложения. Опыт коммерческой разработки {years}',
        'Full-stack разработчик с уклоном во frontend. Люблю чистый код и Tailwind',
        'React/Next.js разработчик. Работал над {orders}+ проектами',
        'Frontend-инженер. Пишу быстрые и отзывчивые интерфейсы'
    ],
    backend: [
        'Backend-разработчик на Node.js. Опыт {years}, выполнено {orders} заказов',
        'Разрабатываю RESTful API и микросервисы. Специализация: Node.js/Express',
        'Python/Django разработчик. Создаю надежные серверные решения',
        'Full-stack с фокусом на backend. PostgreSQL, MongoDB, Redis',
        'Backend-инженер. Оптимизирую производительность и масштабирование'
    ],
    fullstack: [
        'Full-stack разработчик. React + Node.js. Берусь за проекты под ключ',
        'Универсальный специалист: frontend, backend, деплой. Опыт {years}',
        'Full-stack инженер. Создаю веб-приложения от идеи до production',
        'Разработчик полного цикла. TypeScript, React, Node.js, PostgreSQL',
        'Full-stack developer. Выполнил {orders}+ проектов различной сложности'
    ],
    mobile: [
        'Mobile-разработчик. React Native для iOS и Android',
        'Создаю кроссплатформенные мобильные приложения',
        'Frontend + Mobile разработка. React и React Native',
        'Разработчик мобильных приложений. Опыт {years}',
        'Mobile developer. Специализация: React Native, TypeScript'
    ]
};

const categories = ['web-dev', 'design', 'marketing', 'mobile', 'seo', 'data'];


function generateRichInfoClients(count) {
    return enrichedUsers.slice(0, count).map((user, idx) => (
        {
            ...user,
            id: idx + 1,
            name: `${user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)} ${user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}`,
            role: 'client',
            login: user.login.username,
            rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
            completedOrders: null,
            bio: faker.helpers.arrayElement(clientBioTemplates),
            location: faker.helpers.arrayElement(russianCities),
            skills: null,
            pricePerHour: null,
            experience: null,
            category: null,
            status: faker.helpers.arrayElement(['verified', 'busy', 'online']),
            registeredAt: faker.date.past({ years: 2 }).toISOString(),
        }
    ))
}

function generateRichInfoFreelancers(count) {
    const frontendSkills = ['React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Webpack', 'Vite', 'SEO'];
    const backendSkills = ['Node.js', 'Python', 'PHP', 'Express', 'Django', 'Laravel', 'PostgreSQL', 'MongoDB', 'Redis', 'REST API'];
    const fullstackSkills = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Next.js', 'Express', 'Docker'];
    const mobileSkills = ['React Native', 'TypeScript', 'JavaScript', 'Mobile UI', 'REST API'];
    

    return enrichedUsers.slice(count).map((user, idx) => {
        
        const rand = Math.random();
        let skillsPool, bioTemplates;
        
        if (rand < 0.35) {
            skillsPool = frontendSkills;
            bioTemplates = freelancerBioByStack.frontend;
        } else if (rand < 0.6) {
            skillsPool = backendSkills;
            bioTemplates = freelancerBioByStack.backend;
        } else if (rand < 0.85) {
            skillsPool = fullstackSkills;
            bioTemplates = freelancerBioByStack.fullstack;
        } else {
            skillsPool = mobileSkills;
            bioTemplates = freelancerBioByStack.mobile;
        }
        
        const completedOrders = faker.number.int({ min: 5, max: 150 });
        const yearsExp = Math.min(Math.floor(completedOrders / 30) + 1, 7);
        const pricePerHour = faker.number.int({ 
            min: 1000 + (yearsExp * 300), 
            max: 2000 + (yearsExp * 500), 
            multipleOf: 100 
        });
        
        const bioTemplate = faker.helpers.arrayElement(bioTemplates);
        const bio = bioTemplate
            .replace('{years}', `${yearsExp} ${yearsExp === 1 ? 'год' : yearsExp < 5 ? 'года' : 'лет'}`)
            .replace('{orders}', completedOrders);
        
        return {
            ...user,
            id: idx + 1000,
            name: `${user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)} ${user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}`,
            role: 'freelancer',
            login: user.login.username,
            rating: faker.number.float({ min: 3.8, max: 5, fractionDigits: 1 }),
            completedOrders: completedOrders,
            bio: bio,
            location: faker.helpers.arrayElement(russianCities),
            skills: faker.helpers.arrayElements(skillsPool, { min: 3, max: 6 }),
            pricePerHour: pricePerHour,
            experience: faker.number.int({ min: 0, max: 7 }),
            status: faker.helpers.arrayElement(['verified', 'free', 'busy', 'online']),
            category: faker.helpers.arrayElement(categories),
            registeredAt: faker.date.past({ years: 3 }).toISOString(),
        };
    });
}

export const clients = generateRichInfoClients(CLIENTS_COUNT);
export const freelancers = generateRichInfoFreelancers(CLIENTS_COUNT);
export const allUsers = [...clients, ...freelancers];


const outputPath = path.join(__dirname, '../src/lib/data/users.json');
fs.writeFileSync(outputPath, JSON.stringify({ clients, freelancers, allUsers }, null, 2), 'utf-8');