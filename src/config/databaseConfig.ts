
/**
 * src/config/databaseConfig.ts
 * Конфигурация подключения к базе данных.
 * Содержит типы и настройки для работы с базой данных.
 */

/**
 * Тип конфигурации базы данных
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

/**
 * Настройки подключения к базе данных по умолчанию
 */
export const databaseConfig: DatabaseConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'crm_system'
};
