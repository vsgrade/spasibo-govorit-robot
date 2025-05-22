
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const ticketsRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Создание пула соединений с базой данных
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Передаем пул соединений в middleware для использования в маршрутах
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// Маршруты
app.use('/api/tickets', ticketsRoutes);

// Тестовый маршрут для проверки работоспособности
app.get('/', (req, res) => {
  res.send('API для системы тикетов работает');
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 'error',
    message: 'Что-то пошло не так на сервере',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
