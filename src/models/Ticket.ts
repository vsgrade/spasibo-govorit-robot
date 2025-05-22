
/**
 * src/models/Ticket.ts
 * Модель данных для тикетов.
 */

/**
 * Статус тикета
 */
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'closed';

/**
 * Приоритет тикета
 */
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Источник тикета
 */
export type TicketSource = 'email' | 'website' | 'phone' | 'telegram' | 'whatsapp' | 'vk';

/**
 * Интерфейс тикета
 */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  source?: TicketSource;
  client_name?: string;
  client_email?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Данные для создания тикета
 */
export interface CreateTicketDto {
  title: string;
  description: string;
  priority: TicketPriority;
  source?: TicketSource;
  client_name?: string;
  client_email?: string;
  assigned_to?: string;
}

/**
 * Данные для обновления тикета
 */
export type UpdateTicketDto = Partial<Omit<Ticket, 'id' | 'created_at' | 'updated_at'>>;

/**
 * Фильтры для поиска тикетов
 */
export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  source?: TicketSource;
  search?: string;
  date_from?: string;
  date_to?: string;
  assigned_to?: string;
}
