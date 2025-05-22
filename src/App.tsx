
/**
 * src/App.tsx
 * Корневой компонент приложения.
 * Содержит настройку маршрутизации и основную структуру приложения.
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Компоненты провайдеров
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// Конфигурация
import { routes } from '@/config/app';

// Лейауты
import MainLayout from '@/components/MainLayout';

// Страницы
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import DepartmentsPage from '@/pages/DepartmentsPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import SettingsPage from '@/pages/SettingsPage';
import CrmPage from '@/pages/Crm';
import ContactsPage from '@/pages/Crm/ContactsPage';
import CompaniesPage from '@/pages/Crm/CompaniesPage';
import DealsPage from '@/pages/Crm/DealsPage';
import TasksPage from '@/pages/Crm/TasksPage';
import UsersPage from '@/pages/UsersPage';

/**
 * Главный компонент приложения
 * @returns JSX.Element - разметка основного приложения
 */
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme-preference">
      <Router>
        <Routes>
          {/* Маршруты внутри основного лейаута */}
          <Route element={<MainLayout />}>
            {/* Главная страница */}
            <Route path={routes.home} element={<Index />} />

            {/* Настройки и администрирование */}
            <Route path={routes.settings} element={<SettingsPage />} />
            <Route path={routes.departments} element={<DepartmentsPage />} />
            <Route path={routes.integrations} element={<IntegrationsPage />} />
            <Route path={routes.users} element={<UsersPage />} />

            {/* CRM маршруты */}
            <Route path={routes.crm.index} element={<CrmPage />} />
            <Route path={routes.crm.contacts} element={<ContactsPage />} />
            <Route path={routes.crm.companies} element={<CompaniesPage />} />
            <Route path={routes.crm.deals} element={<DealsPage />} />
            <Route path={routes.crm.tasks} element={<TasksPage />} />
          </Route>

          {/* Редирект с неизвестных маршрутов */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
