
/**
 * src/config/app.ts
 * Основные настройки приложения.
 * Содержит конфигурацию и константы, используемые в приложении.
 */

/**
 * Конфигурация приложения
 */
export const appConfig = {
  // Название приложения
  appName: "Ticketing System",
  
  // Версия приложения
  version: "1.0.0",
  
  // URL для API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  
  // Настройки авторизации
  auth: {
    tokenKey: "auth_token",
    refreshTokenKey: "refresh_token",
    expiryKey: "token_expiry",
  },
  
  // Поддерживаемые языки
  supportedLocales: ["ru", "en"],
  
  // Настройки навигации
  navigation: {
    sidebar: {
      minWidth: 64,
      maxWidth: 240,
    }
  }
};

/**
 * Константы для путей маршрутизации
 */
export const routes = {
  home: "/",
  tickets: "/tickets",
  users: "/users",
  settings: "/settings",
  departments: "/departments",
  integrations: "/integrations",
  crm: {
    index: "/crm",
    contacts: "/crm/contacts",
    companies: "/crm/companies",
    deals: "/crm/deals",
    tasks: "/crm/tasks",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  }
};
