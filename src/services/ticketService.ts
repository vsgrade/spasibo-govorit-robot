
/**
 * src/services/ticketService.ts
 * Сервис для работы с тикетами.
 * Содержит функции для взаимодействия с API тикетов.
 */

import { appConfig } from '@/config/app';

/**
 * Интерфейс для объекта тикета
 */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'waiting' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  client_name?: string;
  client_email?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Интерфейс для создания нового тикета
 */
export interface CreateTicketDto {
  title: string;
  description: string;
  client_name?: string;
  client_email?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

/**
 * Получение списка всех тикетов
 * @returns Promise<Ticket[]> - промис с массивом тикетов
 */
export async function getTickets(): Promise<Ticket[]> {
  try {
    // В реальном приложении здесь был бы запрос к API
    // но для демонстрационных целей возвращаем моковые данные
    return [
      {
        id: 'T-1001',
        title: 'Проблема с оплатой',
        description: 'Не могу оплатить заказ через сайт',
        status: 'open',
        priority: 'high',
        client_name: 'Иван Петров',
        client_email: 'ivan@example.com',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'T-1002',
        title: 'Вопрос по доставке',
        description: 'Когда будет доставлен мой заказ №12345?',
        status: 'in_progress',
        priority: 'medium',
        client_name: 'Анна Смирнова',
        client_email: 'anna@example.com',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 43200000).toISOString(),
      },
      {
        id: 'T-1003',
        title: 'Возврат товара',
        description: 'Хочу вернуть товар по гарантии',
        status: 'waiting',
        priority: 'low',
        client_name: 'Дмитрий Ковалев',
        client_email: 'dmitry@example.com',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    
    // Реальный запрос выглядел бы так:
    // const response = await fetch(`${appConfig.apiUrl}/tickets`);
    // if (!response.ok) throw new Error('Ошибка загрузки тикетов');
    // return response.json();
  } catch (error) {
    console.error('Ошибка при получении тикетов:', error);
    throw error;
  }
}

/**
 * Получение тикета по ID
 * @param id - ID тикета
 * @returns Promise<Ticket> - промис с данными тикета
 */
export async function getTicketById(id: string): Promise<Ticket> {
  try {
    // В реальном приложении здесь был бы запрос к API
    const tickets = await getTickets();
    const ticket = tickets.find(t => t.id === id);
    
    if (!ticket) {
      throw new Error(`Тикет с ID ${id} не найден`);
    }
    
    return ticket;
    
    // Реальный запрос выглядел бы так:
    // const response = await fetch(`${appConfig.apiUrl}/tickets/${id}`);
    // if (!response.ok) throw new Error(`Ошибка загрузки тикета ${id}`);
    // return response.json();
  } catch (error) {
    console.error(`Ошибка при получении тикета ${id}:`, error);
    throw error;
  }
}

/**
 * Создание нового тикета
 * @param ticket - данные нового тикета
 * @returns Promise<Ticket> - промис с данными созданного тикета
 */
export async function createTicket(ticket: CreateTicketDto): Promise<Ticket> {
  try {
    // В реальном приложении здесь был бы запрос к API
    
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Имитация создания тикета
    const newTicket: Ticket = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      title: ticket.title,
      description: ticket.description,
      status: 'open',
      priority: ticket.priority,
      client_name: ticket.client_name,
      client_email: ticket.client_email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    return newTicket;
    
    // Реальный запрос выглядел бы так:
    // const response = await fetch(`${appConfig.apiUrl}/tickets`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(ticket),
    // });
    // if (!response.ok) throw new Error('Ошибка создания тикета');
    // return response.json();
  } catch (error) {
    console.error('Ошибка при создании тикета:', error);
    throw error;
  }
}

/**
 * Обновление тикета
 * @param id - ID тикета для обновления
 * @param updates - данные для обновления
 * @returns Promise<Ticket> - промис с данными обновленного тикета
 */
export async function updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
  try {
    // В реальном приложении здесь был бы запрос к API
    
    // Получаем текущие данные тикета
    const ticket = await getTicketById(id);
    
    // Обновляем данные
    const updatedTicket = {
      ...ticket,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    return updatedTicket;
    
    // Реальный запрос выглядел бы так:
    // const response = await fetch(`${appConfig.apiUrl}/tickets/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updates),
    // });
    // if (!response.ok) throw new Error(`Ошибка обновления тикета ${id}`);
    // return response.json();
  } catch (error) {
    console.error(`Ошибка при обновлении тикета ${id}:`, error);
    throw error;
  }
}
