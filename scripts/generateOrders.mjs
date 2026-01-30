import { faker } from '@faker-js/faker';
import {clients, freelancers} from './generateUsers.mjs'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SEED = 'SEED1';
const ORDERS_COUNT = 1500;

faker.seed(SEED);

const CATEGORIES = [
    { id: 'web-dev', name: 'Веб-разработка', subcategories: ['React', 'Vue', 'Angular', 'Node.js', 'PHP', 'Python'] },
    { id: 'design', name: 'Дизайн', subcategories: ['UI/UX', 'Графический дизайн', 'Логотипы', 'Брендинг'] },
    { id: 'marketing', name: 'Маркетинг', subcategories: ['SMM', 'Контент-маркетинг', 'Email-маркетинг'] },
    { id: 'mobile', name: 'Мобильная разработка', subcategories: ['iOS', 'Android', 'React Native', 'Flutter'] },
    { id: 'seo', name: 'SEO', subcategories: ['Аудит сайта', 'Внутренняя оптимизация', 'Внешняя оптимизация'] },
    { id: 'data', name: 'Аналитика данных', subcategories: ['Data Science', 'Машинное обучение', 'Визуализация данных'] },
];

const ORDERS_TITLES = [
    'Создание лендинга для нового продукта',
    'Разработка мобильного приложения для iOS и Android',
    'Дизайн логотипа и фирменного стиля компании',
    'Верстка адаптивного сайта по готовому макету',
    'Настройка таргетированной рекламы в социальных сетях',
    'SEO оптимизация интернет-магазина',
    'Разработка REST API для веб-приложения',
    'Создание дизайна для мобильного приложения',
    'Парсинг данных с сайтов конкурентов',
    'Интеграция платежных систем на сайт',
    'Создание корпоративного портала на WordPress',
    'Анимация персонажа для мобильной игры',
    'Разработка чат-бота для Telegram',
    'Написание контент-плана для Instagram',
    'Аудит безопасности веб-приложения',
    'Создание email-рассылки с уникальным дизайном',
    'Разработка CRM-системы для малого бизнеса',
    'Оптимизация производительности React-приложения',
    'Создание 3D модели продукта для сайта',
    'Настройка аналитики Google Analytics и Яндекс.Метрики',
]

const ORDERS_DESC = [
    'Ищу опытного разработчика для создания современного лендинга. Требуется адаптивный дизайн и быстрая загрузка страниц.',
    'Необходима команда для разработки кроссплатформенного мобильного приложения. Важно удобство использования и интеграция с API.',
    'Требуется дизайнер для создания уникального логотипа и фирменного стиля. Важно передать ценности бренда через визуальные элементы.',
    'Нужен frontend-разработчик для верстки сайта по макету Figma. Важна pixel-perfect точность и кроссбраузерность.',
    'Ищу специалиста по настройке рекламы ВКонтакте и Instagram. Опыт работы с таргетом обязателен. Бюджет на рекламу отдельно.',
    'Требуется провести полный SEO-аудит сайта, исправить технические ошибки, настроить метатеги и создать семантическое ядро.',
    'Необходимо разработать RESTful API на Node.js с документацией в Swagger. База данных PostgreSQL. Аутентификация через JWT.',
    'Ищу UI/UX дизайнера для создания дизайна мобильного приложения. Примерно 15-20 экранов. В приоритете простота использования.',
    'Нужен Python-разработчик для написания скрипта парсинга цен и характеристик товаров с 5-7 сайтов конкурентов.',
    'Требуется интегрировать Stripe и PayPal на существующий сайт. Необходима поддержка рекуррентных платежей.',
    'Разработка корпоративного сайта на WordPress с индивидуальной темой. Требуется интеграция с 1С и CRM-системой.',
    'Нужен 2D аниматор для создания анимаций ходьбы, бега, атаки и смерти персонажа в стиле pixel art. Формат Spine.',
    'Создание бота для Telegram с функциями приема заказов, уведомлений и интеграцией с базой данных. Python/aiogram.',
    'Разработать контент-план на месяц для фитнес-клуба: 30 постов, 60 stories, подбор хештегов и время публикаций.',
    'Провести пентест веб-приложения, найти уязвимости OWASP Top 10, предоставить отчет с рекомендациями по исправлению.',
    'Сверстать адаптивный email-шаблон для рассылки новостей. Тестирование в основных почтовых клиентах обязательно.',
    'Разработка CRM с модулями: клиенты, сделки, задачи, отчеты. Технологии: React, Node.js, PostgreSQL. Срок 2 месяца.',
    'Оптимизировать существующее React-приложение: уменьшить время загрузки, исправить memory leaks, внедрить code splitting.',
    'Создать фотореалистичную 3D модель продукта с возможностью вращения 360°. Формат WebGL для встраивания на сайт.',
    'Настроить систему аналитики: цели, события, e-commerce. Создать кастомные дашборды и настроить автоматические отчеты.',
]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateOrders(count) {
    return Array.from({length: count}, (_, i) => {
        const selectedClient = faker.helpers.arrayElement(clients);
        const selectedCategory = faker.helpers.arrayElement(CATEGORIES);
        const budgetMin = faker.number.int({min: 5000, max: 50000, multipleOf: 500});
        const budgetMax = faker.number.int({min: budgetMin + 5000, max: budgetMin + 100000, multipleOf: 500});
        const status = faker.helpers.arrayElement(['new', 'in-progress', 'completed', 'completed', 'completed']);
        const selectedFreelancer = status === 'completed' ? faker.helpers.arrayElement(freelancers) : null;
        
        return {
            id: i + 1,
            title: faker.helpers.arrayElement(ORDERS_TITLES),   
            description: faker.helpers.arrayElement(ORDERS_DESC),
            budgetMin: budgetMin,
            budgetMax: budgetMax,
            category: selectedCategory.id,
            skills: faker.helpers.arrayElements(selectedCategory.subcategories, { min: 2, max: 4 }),
            status: status,
            deadline: faker.number.int({min: 3, max: 60}),
            createdAt: faker.date.past({ years: 1 }).toISOString().split('T')[0],
            clientId: selectedClient.id,
            completedById: selectedFreelancer ? selectedFreelancer.id : null,
        };
    });
}
const outputPath = path.join(__dirname, '../src/lib/data/orders.json');

export const orders = generateOrders(ORDERS_COUNT);
fs.writeFileSync(outputPath, JSON.stringify({ orders }, null, 2), 'utf-8');