// src/App.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/layout"; // У вас используется такой импорт Layout
import { appConfig } from "@/config/app";

// Импорт ваших существующих страниц
const DepartmentsPage = lazy(() => import("@/pages/DepartmentsPage").then(module => ({ default: module.DepartmentsPage })) );
const IntegrationsPage = lazy(() => import("@/pages/IntegrationsPage").then(module => ({ default: module.IntegrationsPage })) );
const SettingsPage = lazy(() => import("@/pages/SettingsPage").then(module => ({ default: module.SettingsPage })) );
const CrmPage = lazy(() => import("@/pages/Crm").then(module => ({ default: module.CrmPage })) );
const ContactsPage = lazy(() => import("@/pages/Crm/ContactsPage").then(module => ({ default: module.ContactsPage })) );
const CompaniesPage = lazy(() => import("@/pages/Crm/CompaniesPage").then(module => ({ default: module.CompaniesPage })) );
const DealsPage = lazy(() => import("@/pages/Crm/DealsPage").then(module => ({ default: module.DealsPage })) );
const TasksPage = lazy(() => import("@/pages/Crm/TasksPage").then(module => ({ default: module.TasksPage })) );
const UsersPage = lazy(() => import("@/pages/UsersPage").then(module => ({ default: module.UsersPage })) );

// --- ДОБАВЬТЕ ЭТОТ ИМПОРТ ДЛЯ НОВОЙ СТРАНИЦЫ ТИКЕТОВ ---
const TicketsPage = lazy(() => import("@/pages/TicketsPage").then(module => ({ default: module.TicketsPage })) );
// --- КОНЕЦ ДОБАВЛЕНИЯ ИМПОРТА ---


function App() {
  // Определяем путь для редиректа по умолчанию
  const defaultRedirectPath = appConfig.defaultApp === "CRM" ? "/crm" : "/departments";

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            {/* Здесь может быть ваш компонент загрузчика, если есть */}
            Загрузка...
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            {/* Редирект с главной страницы */}
            <Route path="/" element={<Navigate to={defaultRedirectPath} replace />} />

            {/* --- ДОБАВЬТЕ ЭТОТ МАРШРУТ ДЛЯ ТИКЕТОВ --- */}
            <Route path="/tickets" element={<TicketsPage />} />
            {/* --- КОНЕЦ ДОБАВЛЕНИЯ МАРШРУТА --- */}
            
            {/* Существующие маршруты */}
            {appConfig.enableDepartments && <Route path="/departments" element={<DepartmentsPage />} />}
            {appConfig.enableIntegrations && <Route path="/integrations" element={<IntegrationsPage />} />}
            {appConfig.enableSettings && <Route path="/settings" element={<SettingsPage />} />}
            
            {/* CRM Routes */}
            {appConfig.enableCrm && <Route path="/crm" element={<CrmPage />} />}
            {appConfig.enableCrmContacts && <Route path="/crm/contacts" element={<ContactsPage />} />}
            {appConfig.enableCrmCompanies && <Route path="/crm/companies" element={<CompaniesPage />} />}
            {appConfig.enableCrmDeals && <Route path="/crm/deals" element={<DealsPage />} />}
            {appConfig.enableCrmTasks && <Route path="/crm/tasks" element={<TasksPage />} />}
            
            {/* Users Route */}
            {appConfig.enableUsers && <Route path="/users" element={<UsersPage />} />}
            
            {/* Обработка всех остальных путей - редирект */}
            <Route path="*" element={<Navigate to={defaultRedirectPath} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
