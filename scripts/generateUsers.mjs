import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SEED = 12345;
const FREELANCERS_COUNT = 100;
const CLIENTS_COUNT = 30;

faker.seed(SEED);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let enrichedUsers = [];

try {
  const response = await fetch(
    `https://randomuser.me/api/1.0/?results=${FREELANCERS_COUNT + CLIENTS_COUNT}&seed=${SEED}&exc=location,registered,dob,cell,id,nat`
  );

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
  'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Рязань'
];

const clientBioTemplates = [
  'Ищу надежных исполнителей для регулярного сотрудничества по веб-проектам.',
  'Развиваю онлайн-проект и периодически привлекаю разработчиков под разные задачи.',
  'Запускаю цифровые продукты и ищу специалистов для долгосрочной работы.',
  'Предприниматель, работаю над несколькими IT-проектами одновременно.',
  'Представляю небольшую компанию, регулярно заказываем разработку и доработки.',
  'Работаю с подрядчиками на постоянной основе, ценю ответственность и качество.',
  'Развиваю стартап и ищу исполнителей для реализации новых идей.',
  'Нужна помощь с разработкой и поддержкой веб-приложений.',
  'Заказываю разработку сайтов, сервисов и внутренних инструментов.',
  'Работаю над запуском нового продукта и собираю команду специалистов.',
  'Представитель digital-направления, размещаю задачи для внешних исполнителей.',
  'Ищу разработчиков для проектной и долгосрочной работы.',
  'Развиваю бизнес в онлайне, регулярно появляются задачи по разработке.',
  'Работаю над улучшением существующих сервисов и ищу надежных подрядчиков.',
  'Создаю и развиваю веб-проекты, открыт к сотрудничеству.',
  'Нужны специалисты для реализации и поддержки цифровых решений.',
  'Представляю продуктовую команду, периодически расширяемся за счет фриланса.',
  'Запускаю новые онлайн-сервисы и ищу исполнителей под конкретные задачи.',
  'Работаю с веб-разработкой и автоматизацией бизнес-процессов.',
  'Ищу исполнителей для разработки и дальнейшей поддержки проектов.'
];

const freelancerBioByStack = {
  frontend: [
    'Frontend-разработчик с {years} опыта коммерческой разработки. Специализируюсь на React, TypeScript и создании удобных интерфейсов.',
    'Создаю современные SPA и веб-приложения с упором на производительность и UX. Опыт разработки — {years}.',
    'Frontend-инженер с опытом {years}. Работаю с React, Next.js и Tailwind.',
    'React / Next.js разработчик. Занимаюсь разработкой интерфейсов и поддержкой существующих проектов.',
    'Frontend-разработчик с хорошим пониманием UI/UX и адаптивной верстки. Опыт — {years}.',
    'Разрабатываю пользовательские интерфейсы для веб-приложений. React, TypeScript, CSS.',
    'Frontend-инженер. Умею работать с дизайн-системами и компонентным подходом.',
    'Специализируюсь на разработке клиентской части веб-приложений. Опыт {years}.',
    'Создаю быстрые и отзывчивые интерфейсы с использованием современных frontend-технологий.',
    'Frontend-разработчик с опытом {years}. Интересуюсь оптимизацией и качеством кода.'
  ],
  backend: [
    'Backend-разработчик на Node.js с опытом {years}. Проектирую и реализую API.',
    'Разрабатываю серверную часть веб-приложений. Node.js, Express, базы данных.',
    'Backend-инженер с опытом {years}. Создаю надёжные и масштабируемые сервисы.',
    'Python / Django разработчик. Работаю над серверной логикой и архитектурой.',
    'Full-stack разработчик с фокусом на backend. PostgreSQL, MongoDB, Redis.',
    'Backend-разработчик. Уделяю внимание производительности и безопасности.',
    'Создаю REST API и backend-сервисы для веб и мобильных приложений.',
    'Backend-инженер с практическим опытом {years}. Работаю с различными БД.',
    'Разработчик серверных решений. Node.js и Python в коммерческих проектах.',
    'Backend-разработчик с опытом {years}. Умею поддерживать и развивать существующие системы.'
  ],
  fullstack: [
    'Full-stack разработчик с опытом {years}. Работаю с React и Node.js.',
    'Универсальный веб-разработчик: frontend, backend и деплой.',
    'Full-stack инженер. Создаю веб-приложения от идеи до production.',
    'Разработчик полного цикла с опытом {years}. TypeScript, React, Node.js.',
    'Full-stack developer. Беру проекты под ключ.',
    'Работаю как с клиентской, так и с серверной частью веб-приложений.',
    'Full-stack разработчик с хорошим пониманием архитектуры.',
    'Создаю и поддерживаю веб-приложения на всех этапах разработки.',
    'Разработчик полного цикла с коммерческим опытом {years}.',
    'Full-stack инженер. Интересуюсь качеством кода и масштабируемостью.'
  ],
  mobile: [
    'Mobile-разработчик с опытом {years}. Создаю приложения на React Native.',
    'Разрабатываю кроссплатформенные мобильные приложения для iOS и Android.',
    'Mobile developer. Специализация — React Native и TypeScript.',
    'Создаю мобильные приложения с упором на UX и стабильность.',
    'Frontend и Mobile разработчик. React и React Native.',
    'Разработчик мобильных приложений с коммерческим опытом {years}.',
    'Mobile-инженер. Работаю с API и интеграцией backend-сервисов.',
    'Разрабатываю и поддерживаю мобильные приложения на React Native.',
    'Mobile developer с опытом {years}. Интересуюсь оптимизацией и производительностью.',
    'Создаю кроссплатформенные решения для мобильных устройств.'
  ]
};

const categories = ['web-dev', 'design', 'marketing', 'mobile', 'seo', 'data'];

const frontendSkills = ['React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Webpack', 'Vite', 'SEO'];
const backendSkills = ['Node.js', 'Python', 'PHP', 'Express', 'Django', 'Laravel', 'PostgreSQL', 'MongoDB', 'Redis', 'REST API'];
const fullstackSkills = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Next.js', 'Express', 'Docker'];
const mobileSkills = ['React Native', 'TypeScript', 'JavaScript', 'Mobile UI', 'REST API'];


function generateClients(count) {
  const clientsById = {};
  const allClientsIds = [];

  const clientsRaw = enrichedUsers.slice(0, count);

  clientsRaw.forEach((user, idx) => {
    const id = idx + 1;

    clientsById[id] = {
      ...user,
      id,
      name: user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1),
      lastName: user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1),
      role: 'client',
      login: user.login.username,
      password: null,
      rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
      bio: faker.helpers.arrayElement(clientBioTemplates),
      location: faker.helpers.arrayElement(russianCities),
      skills: null,
      pricePerHour: null,
      experience: null,
      category: null,
      status: faker.helpers.arrayElement(['verified', 'busy', 'online']),
      registeredAt: faker.date.past({ years: 2 }).toISOString(),
      earning: null,
      spending: faker.number.int({ min: 0, max: 100000 }),
      placedOrders: faker.number.int({ min: 0, max: 50 }),
    };

    allClientsIds.push(id);
  });

  return { clientsById, allClientsIds };
}


function generateFreelancers(count, startId = 1000) {
  const freelancersById = {};
  const allFreelancersIds = [];

  const freelancersRaw = enrichedUsers.slice(CLIENTS_COUNT, CLIENTS_COUNT + count);

  freelancersRaw.forEach((user, idx) => {
    const id = startId + idx;

    const rand = Math.random();
    let skillsPool;
    let bioTemplates;

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

    const yearsExp = faker.number.int({ min: 0, max: 10 });

    const pricePerHour = faker.number.int({
      min: 1000 + yearsExp * 300,
      max: 2000 + yearsExp * 500,
      multipleOf: 100,
    });

    const bioTemplate = faker.helpers.arrayElement(bioTemplates);
    const bio = bioTemplate.replace(
      '{years}',
      `${yearsExp} ${yearsExp === 1 ? 'год' : yearsExp < 5 ? 'года' : 'лет'}`
    );

    freelancersById[id] = {
      ...user,
      id,
      name: user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1),
      lastName: user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1),
      role: 'freelancer',
      login: user.login.username,
      password: null,
      rating: faker.number.float({ min: 3.8, max: 5, fractionDigits: 1 }),
      bio,
      location: faker.helpers.arrayElement(russianCities),
      skills: faker.helpers.arrayElements(skillsPool, { min: 3, max: 6 }),
      pricePerHour,
      experience: yearsExp,
      status: faker.helpers.arrayElement(['verified', 'free', 'busy', 'online']),
      category: faker.helpers.arrayElement(categories),
      registeredAt: faker.date.past({ years: 3 }).toISOString(),
      earning: faker.number.int({ min: 0, max: 500000 }),
    };

    allFreelancersIds.push(id);
  });

  return { freelancersById, allFreelancersIds };
}


export const { clientsById, allClientsIds } = generateClients(CLIENTS_COUNT);
export const { freelancersById, allFreelancersIds } = generateFreelancers(FREELANCERS_COUNT, 1000);

const outputPath = path.join(__dirname, '../src/lib/data/users.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify(
    {
      clientsById,
      allClientsIds,
      freelancersById,
      allFreelancersIds,
    },
    null,
    2
  ),
  'utf-8'
);
