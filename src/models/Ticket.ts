
/**
 * src/models/Ticket.ts
 * Определение типов и интерфейсов для тикетов.
 * Содержит также вспомогательные функции для работы с тикетами.
 */

/**
 * Интерфейс тикета
 */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  departmentId: string;
  clientId?: string;
  assignedToUserId?: string;
  sourceType?: 'telegram' | 'vk' | 'whatsapp' | 'email' | 'manual';
  sourceId?: string; // ID сообщения в системе-источнике
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Интерфейс сообщения в тикете
 */
export interface TicketMessage {
  id: string;
  ticketId: string;
  content: string;
  senderId: string;
  senderType: 'user' | 'client' | 'system' | 'bot';
  createdAt: Date;
  attachments?: string[];
}

/**
 * Функция для имитации сохранения тикета в "базу данных"
 * В реальном приложении это будет выполнять запрос к API
 * 
 * @param ticket - объект с данными тикета для сохранения
 * @returns Promise<Ticket> - промис с сохраненным тикетом
 */
export async function saveTicket(ticket: Partial<Ticket>): Promise<Ticket> {
  // В реальном приложении здесь был бы вызов API
  console.log("Saving ticket to database (simulated)", ticket);
  
  const now = new Date();
  const savedTicket: Ticket = {
    id: ticket.id || Date.now().toString(),
    title: ticket.title || "Новый тикет",
    description: ticket.description || "",
    status: ticket.status || "new",
    priority: ticket.priority || "medium",
    departmentId: ticket.departmentId || "",
    clientId: ticket.clientId,
    assignedToUserId: ticket.assignedToUserId,
    sourceType: ticket.sourceType,
    sourceId: ticket.sourceId,
    createdAt: ticket.createdAt || now,
    updatedAt: now
  };
  
  // Имитация задержки API
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return savedTicket;
}

/**
 * Функция для создания тикета из сообщения Telegram
 * 
 * @param message - текст сообщения из Telegram
 * @param chatId - ID чата в Telegram
 * @param departmentId - ID отдела, куда назначается тикет
 * @returns Promise<Ticket> - промис с созданным тикетом
 */
export async function createTicketFromTelegram(
  message: string,
  chatId: string,
  departmentId: string
): Promise<Ticket> {
  // В реальном приложении здесь был бы вызов API
  return saveTicket({
    title: `Telegram обращение (${new Date().toLocaleString("ru")})`,
    description: message,
    status: "new",
    priority: "medium",
    departmentId,
    sourceType: "telegram",
    sourceId: chatId
  });
}
