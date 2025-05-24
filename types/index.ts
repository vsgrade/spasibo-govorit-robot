
/**
 * Типы для CRM и тикет-системы
 */

/**
 * Статус тикета
 */
export enum TicketStatus {
  NEW = "new",
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  WAITING_CUSTOMER = "waiting_customer",
  WAITING_INTERNAL = "waiting_internal",
  RESOLVED = "resolved",
  CLOSED = "closed",
  REOPENED = "reopened"
}

/**
 * Приоритет тикета
 */
export enum TicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical"
}

/**
 * Канал поступления тикета
 */
export enum TicketChannel {
  EMAIL = "email",
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  VK = "vk",
  PHONE = "phone",
  WEB = "web"
}

/**
 * Интерфейс тикета
 */
export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  clientId?: string;
  companyId?: string;
  assignedTo?: string;
  assignedGroup?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  dueDate?: string;
  tags: string[];
  relatedTickets?: string[];
  attachments?: Attachment[];
  comments: TicketComment[];
}

/**
 * Интерфейс вложения
 */
export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

/**
 * Интерфейс комментария к тикету
 */
export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  authorType: "agent" | "client";
  content: string;
  isInternal: boolean;
  createdAt: string;
  attachments?: Attachment[];
}

/**
 * Интерфейс контакта
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string[];
  phone: string[];
  position?: string;
  companyIds?: string[];
  source?: string;
  responsibleUserId?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  customFields?: Record<string, any>;
}

/**
 * Интерфейс компании
 */
export interface Company {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  website?: string;
  address?: string;
  primaryContactId?: string;
  responsibleUserId?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  customFields?: Record<string, any>;
}

/**
 * Статус сделки
 */
export enum DealStage {
  LEAD = "lead",
  QUALIFIED = "qualified",
  PROPOSAL = "proposal",
  NEGOTIATION = "negotiation",
  CLOSED_WON = "closed_won",
  CLOSED_LOST = "closed_lost"
}

/**
 * Интерфейс сделки
 */
export interface Deal {
  id: string;
  name: string;
  stage: DealStage;
  amount: number;
  currency: string;
  probability: number;
  expectedCloseDate: string;
  clientId?: string;
  companyId?: string;
  responsibleUserId: string;
  products?: DealProduct[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  customFields?: Record<string, any>;
}

/**
 * Интерфейс продукта в сделке
 */
export interface DealProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discount?: number;
  total: number;
}

/**
 * Интерфейс пользователя системы
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  position?: string;
  department?: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

/**
 * Роль пользователя
 */
export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  SUPPORT_AGENT = "support_agent",
  SALES_AGENT = "sales_agent",
  READ_ONLY = "read_only"
}

/**
 * Интерфейс департамента
 */
export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  userIds: string[];
  integrations: DepartmentIntegration[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Интерфейс интеграции департамента
 */
export interface DepartmentIntegration {
  id: string;
  type: "telegram" | "whatsapp" | "email" | "vk" | "phone";
  name: string;
  config: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Интерфейс статьи базы знаний
 */
export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Интерфейс категории базы знаний
 */
export interface KnowledgeCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
