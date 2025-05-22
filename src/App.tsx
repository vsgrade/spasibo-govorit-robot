
/**
 * src/App.tsx
 * Корневой компонент приложения.
 * Содержит настройку маршрутизации и основную структуру приложения.
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Компоненты провайдеров
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// Лейауты
import MainLayout from '@/components/MainLayout';

// Страницы
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import SettingsPage from '@/pages/SettingsPage';
import DepartmentsPage from '@/pages/DepartmentsPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import CrmPage from '@/pages/Crm';
import ContactsPage from '@/pages/Crm/ContactsPage';
import CompaniesPage from '@/pages/Crm/CompaniesPage';
import DealsPage from '@/pages/Crm/DealsPage';
import TasksPage from '@/pages/Crm/TasksPage';
import UsersPage from '@/pages/UsersPage';
import { TicketsPage } from '@/pages/TicketsPage';
import NewTicket from '@/pages/NewTicket';

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
            <Route path="/" element={<Dashboard />} />

            {/* Настройки и администрирование */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/users" element={<UsersPage />} />
            
            {/* Тикеты */}
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/tickets/new" element={<NewTicket />} />

            {/* CRM маршруты */}
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/crm/contacts" element={<ContactsPage />} />
            <Route path="/crm/companies" element={<CompaniesPage />} />
            <Route path="/crm/deals" element={<DealsPage />} />
            <Route path="/crm/tasks" element={<TasksPage />} />
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
