
/**
 * src/config/app.ts
 * Конфигурационный файл приложения.
 * Содержит константы для маршрутов и других глобальных настроек.
 */

/**
 * Маршруты приложения
 */
export const routes = {
  // Основные маршруты
  home: '/',
  tickets: '/tickets',
  newTicket: '/tickets/new',
  clients: '/clients',
  reports: '/reports',
  tasks: '/tasks',
  
  // Настройки
  settings: '/settings',
  departments: '/departments',
  integrations: '/integrations',
  users: '/users',
  
  // CRM маршруты
  crm: {
    index: '/crm',
    contacts: '/crm/contacts',
    companies: '/crm/companies',
    deals: '/crm/deals',
    tasks: '/crm/tasks'
  }
};

/**
 * Настройки приложения
 */
export const appConfig = {
  appName: 'CRM система',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  version: '1.0.0'
};
