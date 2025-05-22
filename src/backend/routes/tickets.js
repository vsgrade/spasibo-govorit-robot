
/**
 * src/backend/routes/tickets.js
 * Маршруты для API работы с тикетами.
 * Реализует CRUD операции над тикетами и поиск.
 */

const express = require('express');
const router = express.Router();

/**
 * GET /api/tickets
 * Получить все тикеты с возможностью фильтрации по статусу и приоритету
 * 
 * Query параметры:
 *   status - фильтр по статусу тикета
 *   priority - фильтр по приоритету тикета
 * 
 * @param {Object} req - объект запроса Express
 * @param {Object} res - объект ответа Express
 * @param {Function} next - функция перехода к следующему middleware
 * @returns {Object} JSON-объект со списком тикетов
 */
router.get('/', async (req, res, next) => {
  try {
    const db = req.db;
    
    // Базовый запрос
    let query = `
      SELECT * 
      FROM tickets 
      WHERE 1=1
    `;
    
    const params = [];
    
    // Добавляем фильтры, если они указаны
    if (req.query.status) {
      query += ` AND status = ?`;
      params.push(req.query.status);
    }
    
    if (req.query.priority) {
      query += ` AND priority = ?`;
      params.push(req.query.priority);
    }
    
    // Сортировка и лимит
    query += ` ORDER BY created_at DESC`;
    
    const [tickets] = await db.execute(query, params);
    
    return res.status(200).json({
      status: 'success',
      tickets: tickets
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/tickets/search
 * Поиск тикетов по заданному запросу
 * 
 * Query параметры:
 *   query - поисковый запрос (строка для поиска)
 * 
 * @param {Object} req - объект запроса Express
 * @param {Object} res - объект ответа Express
 * @param {Function} next - функция перехода к следующему middleware
 * @returns {Object} JSON-объект с найденными тикетами
 */
router.get('/search', async (req, res, next) => {
  try {
    const db = req.db;
    const searchQuery = req.query.query || '';
    
    const [tickets] = await db.execute(
      `SELECT * FROM tickets 
       WHERE title LIKE ? 
       OR description LIKE ? 
       OR client_name LIKE ? 
       OR client_email LIKE ?
       ORDER BY created_at DESC`,
      [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`]
    );
    
    return res.status(200).json({
      status: 'success',
      tickets: tickets
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/tickets/:id
 * Получить тикет по ID
 * 
 * URL параметры:
 *   id - идентификатор тикета
 * 
 * @param {Object} req - объект запроса Express
 * @param {Object} res - объект ответа Express
 * @param {Function} next - функция перехода к следующему middleware
 * @returns {Object} JSON-объект с данными тикета
 */
router.get('/:id', async (req, res, next) => {
  try {
    const db = req.db;
    const ticketId = req.params.id;
    
    const [tickets] = await db.execute('SELECT * FROM tickets WHERE id = ?', [ticketId]);
    
    if (tickets.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `Тикет с ID ${ticketId} не найден`
      });
    }
    
    return res.status(200).json({
      status: 'success',
      ticket: tickets[0]
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/tickets
 * Создать новый тикет
 * 
 * Body параметры:
 *   title - заголовок тикета (обязательно)
 *   description - описание проблемы (обязательно)
 *   client_name - имя клиента
 *   client_email - email клиента
 *   priority - приоритет тикета
 * 
 * @param {Object} req - объект запроса Express
 * @param {Object} res - объект ответа Express
 * @param {Function} next - функция перехода к следующему middleware
 * @returns {Object} JSON-объект с подтверждением и ID нового тикета
 */
router.post('/', async (req, res, next) => {
  try {
    const db = req.db;
    const { title, description, client_name, client_email, priority } = req.body;
    
    // Валидация
    if (!title || !description) {
      return res.status(400).json({
        status: 'fail',
        message: 'Заголовок и описание обязательны'
      });
    }
    
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const status = 'open'; // Статус по умолчанию для новых тикетов
    
    const [result] = await db.execute(
      `INSERT INTO tickets (title, description, status, priority, client_name, client_email, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, status, priority || 'medium', client_name || null, client_email || null, now, now]
    );
    
    return res.status(201).json({
      status: 'success',
      message: 'Тикет успешно создан',
      ticketId: result.insertId
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/tickets/:id
 * Обновить тикет
 * 
 * URL параметры:
 *   id - идентификатор тикета
 * 
 * Body параметры (все опциональны):
 *   title - заголовок тикета
 *   description - описание проблемы
 *   status - статус тикета
 *   priority - приоритет тикета
 *   client_name - имя клиента
 *   client_email - email клиента
 * 
 * @param {Object} req - объект запроса Express
 * @param {Object} res - объект ответа Express
 * @param {Function} next - функция перехода к следующему middleware
 * @returns {Object} JSON-объект с подтверждением обновления
 */
router.put('/:id', async (req, res, next) => {
  try {
    const db = req.db;
    const ticketId = req.params.id;
    const { title, description, status, priority, client_name, client_email } = req.body;
    
    // Проверяем существование тикета
    const [tickets] = await db.execute('SELECT * FROM tickets WHERE id = ?', [ticketId]);
    
    if (tickets.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `Тикет с ID ${ticketId} не найден`
      });
    }
    
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    await db.execute(
      `UPDATE tickets 
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           status = COALESCE(?, status),
           priority = COALESCE(?, priority),
           client_name = COALESCE(?, client_name),
           client_email = COALESCE(?, client_email),
           updated_at = ?
       WHERE id = ?`,
      [title, description, status, priority, client_name, client_email, now, ticketId]
    );
    
    return res.status(200).json({
      status: 'success',
      message: 'Тикет успешно обновлен'
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/tickets/:id
 * Удалить тикет
 * 
 * URL параметры:
 *   id - идентификатор тикета
 * 
 * @param {Object} req - объект запроса Express
 * @param {Object} res - объект ответа Express
 * @param {Function} next - функция перехода к следующему middleware
 * @returns {Object} JSON-объект с подтверждением удаления
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const db = req.db;
    const ticketId = req.params.id;
    
    // Проверяем существование тикета
    const [tickets] = await db.execute('SELECT * FROM tickets WHERE id = ?', [ticketId]);
    
    if (tickets.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `Тикет с ID ${ticketId} не найден`
      });
    }
    
    await db.execute('DELETE FROM tickets WHERE id = ?', [ticketId]);
    
    return res.status(200).json({
      status: 'success',
      message: 'Тикет успешно удален'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
