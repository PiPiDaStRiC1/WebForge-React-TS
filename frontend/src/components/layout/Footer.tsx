import { Link, useLocation } from "react-router-dom";
import { Mail, Github, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/common/index";

const NAV_SECTIONS = [
    {
        title: "Исполнителям",
        links: [
            { to: "/orders", label: "Биржа заказов" },
            { to: "/top-performers", label: "Топ исполнителей" },
            { to: "/categories", label: "Категории" },
        ],
    },
    {
        title: "Заказчикам",
        links: [
            { to: "/performers", label: "Найти исполнителя" },
            { to: "/create-order", label: "Создать заказ" },
        ],
    },
    {
        title: "Ресурсы",
        links: [
            { to: "/guides", label: "Руководства" },
            { to: "/faq", label: "FAQ" },
        ],
    },
    {
        title: "Правовое",
        links: [
            { to: "/terms", label: "Условия использования" },
            { to: "/privacy", label: "Политика конфиденциальности" },
        ],
    },
];

const SOCIALS = [
    { href: "https://github.com/PiPiDaStRiC1/WebForge-React-TS", icon: Github, label: "GitHub" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

export const Footer = () => {
    const location = useLocation();
    const isChatPage = location.pathname.includes("/messages/");

    if (isChatPage) return null;

    return (
        <footer className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-10 md:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10 mb-10 md:mb-12">
                    <div className="sm:col-span-2 flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2.5 w-fit">
                            <Logo />
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Фриланс-платформа для веб-разработки. Находите лучших специалистов или
                            зарабатывайте на своих навыках.
                        </p>
                        <div className="flex gap-2 mt-1">
                            {SOCIALS.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all"
                                >
                                    <Icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {NAV_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2.5">
                                {section.links.map(({ to, label }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-400 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} WebForge. Все права защищены.</p>
                    <a
                        href="mailto:support@webforge.com"
                        className="inline-flex items-center gap-2 hover:text-indigo-400 transition-colors"
                    >
                        <Mail size={15} />
                        support@webforge.com
                    </a>
                </div>
            </div>
        </footer>
    );
};
