
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
  sourceId?: string; // ID of the message in the source system
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  content: string;
  senderId: string;
  senderType: 'user' | 'client' | 'system' | 'bot';
  createdAt: Date;
  attachments?: string[];
}

// Mock function to simulate saving a ticket to the "database"
export async function saveTicket(ticket: Partial<Ticket>): Promise<Ticket> {
  // In a real app, this would make a real database call
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
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return savedTicket;
}

// Create a ticket from a Telegram message
export async function createTicketFromTelegram(
  message: string,
  chatId: string,
  departmentId: string
): Promise<Ticket> {
  // In a real app, this would create a ticket in the database
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
