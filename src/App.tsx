// src/App.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, Link, Outlet, useLocation } from "react-router-dom"; // Добавлены Link, Outlet, useLocation

// Ваши UI компоненты и утилиты
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

// Иконки
import {
  Home,
  Settings,
  Users,
  Building,     // Department
  Briefcase,    // Integrations
  Ticket,       // <--- НОВАЯ ИКОНКА ДЛЯ ТИКЕТОВ
  PanelLeft,    // Для мобильного меню
  // Search,       // Пример иконки для поиска в Header (если нужна)
  // Bell,         // Пример иконки для уведомлений в Header (если нужна)
  // CircleUser,   // Пример иконки для профиля пользователя в Header (если нужна)
} from "lucide-react";

// Импорт ваших существующих страниц (оставляем как было)
const DepartmentsPage = lazy(() => import("@/pages/DepartmentsPage").then(module => ({ default: module.DepartmentsPage })) );
const IntegrationsPage = lazy(() => import("@/pages/IntegrationsPage").then(module => ({ default: module.IntegrationsPage })) );
const SettingsPage = lazy(() => import("@/pages/SettingsPage").then(module => ({ default: module.SettingsPage })) );
const CrmPage = lazy(() => import("@/pages/Crm").then(module => ({ default: module.CrmPage })) );
const ContactsPage = lazy(() => import("@/pages/Crm/ContactsPage").then(module => ({ default: module.ContactsPage })) );
const CompaniesPage = lazy(() => import("@/pages/Crm/CompaniesPage").then(module => ({ default: module.CompaniesPage })) );
const DealsPage = lazy(() => import("@/pages/Crm/DealsPage").then(module => ({ default: module.DealsPage })) );
const TasksPage = lazy(() => import("@/pages/Crm/TasksPage").then(module => ({ default: module.TasksPage })) );
const UsersPage = lazy(() => import("@/pages/UsersPage").then(module => ({ default: module.UsersPage })) );

// --- ДОБАВЛЕН ИМПОРТ ДЛЯ НОВОЙ СТРАНИЦЫ ТИКЕТОВ ---
const TicketsPage = lazy(() => import("@/pages/TicketsPage").then(module => ({ default: module.TicketsPage })) );
// --- КОНЕЦ ДОБАВЛЕНИЯ ИМПОРТА ---


// КОМПОНЕНТ МАКЕТА (LAYOUT) ОПРЕДЕЛЕН ПРЯМО ЗДЕСЬ
function Layout() {
  const location = useLocation();
  // МАССИВ НАВИГАЦИИ ОПРЕДЕЛЯЕТСЯ ЗДЕСЬ ЖЕ
  const navigation = [
    { name: "Главная", href: appConfig.defaultApp === "CRM" ? "/crm" : "/departments", icon: Home, current: location.pathname === (appConfig.defaultApp === "CRM" ? "/crm" : "/departments"), disabled: false },

    // --- НАЧАЛО НОВОГО ЭЛЕМЕНТА ДЛЯ ТИКЕТОВ ---
    {
      name: "Тикеты",
      href: "/tickets",
      icon: Ticket,
      current: location.pathname.startsWith("/tickets"),
      disabled: false
    },
    // --- КОНЕЦ НОВОГО ЭЛЕМЕНТА ДЛЯ ТИКЕТОВ ---

    { name: appConfig.sidebarNavName || "CRM", href: "/crm", icon: Users, current: location.pathname.startsWith("/crm"), disabled: !appConfig.enableCrm },
    { name: "Отделы", href: "/departments", icon: Building, current: location.pathname.startsWith("/departments"), disabled: !appConfig.enableDepartments },
    { name: "Интеграции", href: "/integrations", icon: Briefcase, current: location.pathname.startsWith("/integrations"), disabled: !appConfig.enableIntegrations },
    { name: "Пользователи", href: "/users", icon: Users, current: location.pathname.startsWith("/users"), disabled: !appConfig.enableUsers },
    { name: "Настройки", href: "/settings", icon: Settings, current: location.pathname.startsWith("/settings"), disabled: !appConfig.enableSettings },
  ];

  // JSX для DesktopSidebar
  const DesktopSidebar = () => (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
             <Home className="h-6 w-6" /> {/* Или ваша иконка приложения */}
            <span className="">{appConfig.appName || "Панель"}</span>
          </Link>
        </div>
        <div className="flex-1">
          <ScrollArea className="h-full">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navigation.map((item) => (
                !item.disabled && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                      item.current ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </div>
  );

  // JSX для MobileSheet (меню для мобильных)
  const MobileSheetMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Открыть навигационное меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6" /> {/* Или ваша иконка приложения */}
              <span className="">{appConfig.appName || "Панель"}</span>
            </Link>
        </div>
        <ScrollArea className="flex-1">
            <nav className="grid gap-2 p-4 text-lg font-medium">
            {navigation.map((item) => (
                !item.disabled && (
                <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    item.current ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                </Link>
                )
            ))}
            </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopSidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSheetMenu />
          <div className="w-full flex-1">
            {/* Поиск и другие элементы хедера, если нужны */}
          </div>
          {/* Профиль пользователя, если нужен */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Основная функция App
function App() {
  const defaultRedirectPath = appConfig.defaultApp === "CRM" ? "/crm" : "/departments";

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            Загрузка...
          </div>
        }
      >
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to={defaultRedirectPath} replace />} />

                {/* --- ДОБАВЛЕН МАРШРУТ ДЛЯ ТИКЕТОВ --- */}
                <Route path="/tickets" element={<TicketsPage />} />
                {/* --- КОНЕЦ ДОБАВЛЕНИЯ МАРШРУТА --- */}

                {appConfig.enableDepartments && <Route path="/departments" element={<DepartmentsPage />} />}
                {appConfig.enableIntegrations && <Route path="/integrations" element={<IntegrationsPage />} />}
                {appConfig.enableSettings && <Route path="/settings" element={<SettingsPage />} />}

                {appConfig.enableCrm && <Route path="/crm" element={<CrmPage />} />}
                {appConfig.enableCrmContacts && <Route path="/crm/contacts" element={<ContactsPage />} />}
                {appConfig.enableCrmCompanies && <Route path="/crm/companies" element={<CompaniesPage />} />}
                {appConfig.enableCrmDeals && <Route path="/crm/deals" element={<DealsPage />} />}
                {appConfig.enableCrmTasks && <Route path="/crm/tasks" element={<TasksPage />} />}

                {appConfig.enableUsers && <Route path="/users" element={<UsersPage />} />}

                <Route path="*" element={<Navigate to={defaultRedirectPath} replace />} />
              </Route>
            </Routes>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
