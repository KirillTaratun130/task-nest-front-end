import { CalendarRange, KanbanSquare, LayoutDashboard, Settings, Timer } from "lucide-react";

import { DASHBOARD_PAGES } from "@/config/pages-url.config";

import { IMenuItem } from "@/components/dashboard-layout/sidebar/menu.interface";

export const MENU: IMenuItem[] = [
    {
        icon: LayoutDashboard,
        link: DASHBOARD_PAGES.HOME,
        name: 'Панель управления'
    },
    {
        icon: KanbanSquare,
        link: DASHBOARD_PAGES.TASKS,
        name: 'Задачи'
    },
    {
        icon: Timer,
        link: DASHBOARD_PAGES.TIMER,
        name: 'Таймер'
    },
    {
        icon: CalendarRange,
        link: DASHBOARD_PAGES.TIME_BLOCKING,
        name: 'Календарь'
    },
    {
        icon: Settings,
        link: DASHBOARD_PAGES.SETTINGS,
        name: 'Настройки'
    }
]