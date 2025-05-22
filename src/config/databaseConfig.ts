
/**
 * src/config/databaseConfig.ts
 * Конфигурация подключения к базе данных.
 * Содержит настройки для подключения к MySQL.
 * 
 * ПРЕДУПРЕЖДЕНИЕ: Этот файл содержит конфиденциальные учетные данные базы данных.
 * Для производственной среды рекомендуется использовать уровень API или безопасный метод соединения.
 */

/**
 * Интерфейс конфигурации базы данных
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

/**
 * Конфигурация по умолчанию - замените своими значениями
 * В реальном приложении эти данные лучше хранить в переменных окружения
 */
export const databaseConfig: DatabaseConfig = {
  host: '127.0.0.1',  // IP-адрес сервера MySQL
  port: 3306,         // Стандартный порт MySQL
  user: 'root',       // Имя пользователя MySQL
  password: '',       // Пароль MySQL
  database: 'crm_database', // Имя базы данных
};

/**
 * Функция для получения строки подключения
 * @returns string - строка подключения к базе данных
 */
export function getConnectionString(): string {
  return `mysql://${databaseConfig.user}:${encodeURIComponent(databaseConfig.password)}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`;
}

/**
 * Функция для проверки соединения с базой данных
 * Заглушка, которая будет заменена реальной функцией при интеграции
 * @returns Promise<boolean> - промис с результатом проверки
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    // В реальном приложении здесь было бы реальное тестовое соединение
    console.log('Проверка соединения с базой данных...');
    
    // Имитация задержки проверки соединения
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь был бы код проверки соединения
    // и возврат true/false в зависимости от результата
    return true;
  } catch (error) {
    console.error('Ошибка при проверке соединения с базой данных:', error);
    return false;
  }
}
