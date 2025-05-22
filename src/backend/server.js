
/**
 * src/backend/server.js
 * Основной файл сервера Node.js.
 * Настраивает Express-сервер, подключение к базе данных и обработку маршрутов.
 */

require('dotenv').config(); // Загружаем переменные окружения из файла .env
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const ticketsRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Настройка middleware
 */
// Включение CORS для работы с фронтендом с другого домена
app.use(cors());
// Парсинг JSON в телах запросов
app.use(express.json());

/**
 * Создание пула соединений с базой данных
 * Позволяет эффективно переиспользовать соединения
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Максимальное количество соединений в пуле
  queueLimit: 0 // Максимальное количество запросов в очереди (0 = без ограничений)
});

/**
 * Middleware для добавления соединения с БД к объекту запроса
 * Позволяет удобно использовать БД в маршрутах
 */
app.use((req, res, next) => {
  req.db = pool;
  next();
});

/**
 * Регистрация маршрутов API
 */
app.use('/api/tickets', ticketsRoutes);

/**
 * Тестовый маршрут для проверки работоспособности сервера
 */
app.get('/', (req, res) => {
  res.send('API для системы тикетов работает');
});

/**
 * Middleware для обработки ошибок
 * Перехватывает все ошибки возникающие в маршрутах
 */
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err.stack);
  res.status(500).send({
    status: 'error',
    message: 'Что-то пошло не так на сервере',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/**
 * Запуск сервера на указанном порту
 */
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
