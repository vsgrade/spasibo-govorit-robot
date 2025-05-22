
require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  let connection;

  try {
    // Подключаемся к MySQL серверу (без указания базы данных)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    console.log('Подключение к MySQL серверу установлено');

    // Создаем базу данных, если она не существует
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`База данных ${process.env.DB_NAME} создана или уже существует`);

    // Переключаемся на созданную базу данных
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Создаем таблицу tickets
    await connection.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('new', 'open', 'pending', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'new',
        priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
        client_name VARCHAR(100),
        client_email VARCHAR(100),
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('Таблица tickets создана или уже существует');

    // Добавляем пример данных для тестирования
    await connection.query(`
      INSERT INTO tickets 
        (title, description, status, priority, client_name, client_email, created_at, updated_at)
      VALUES
        ('Проблема с входом в систему', 'Не могу войти в систему с моими учетными данными', 'open', 'high', 'Иван Петров', 'ivan@example.com', NOW(), NOW()),
        ('Ошибка в отчете продаж', 'В отчете продаж за прошлый месяц неверные данные', 'pending', 'medium', 'Мария Сидорова', 'maria@example.com', NOW(), NOW()),
        ('Запрос на новую функцию', 'Хотелось бы иметь возможность экспорта данных в Excel', 'new', 'low', 'Александр Иванов', 'alex@example.com', NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        title = VALUES(title);
    `);
    console.log('Тестовые данные добавлены в таблицу tickets');

    console.log('Настройка базы данных успешно завершена!');
  } catch (error) {
    console.error('Ошибка при настройке базы данных:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Соединение с MySQL сервером закрыто');
    }
  }
}

// Запускаем функцию настройки базы данных
setupDatabase();
