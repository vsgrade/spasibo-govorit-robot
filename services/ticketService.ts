
import { supabase } from '@/integrations/supabase/client';

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'new' | 'open' | 'pending' | 'solved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  channel: 'web' | 'email' | 'phone' | 'telegram' | 'whatsapp' | 'vk';
  assigned_to?: string;
  assigned_group?: string;
  client_id?: string;
  company_id?: string;
  tags: string[];
  due_date?: string;
  resolved_at?: string;
  closed_at?: string;
  related_tickets: string[];
  created_at: string;
  updated_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  author_id: string;
  author_type: string;
  content: string;
  is_internal: boolean;
  created_at: string;
}

export interface CreateTicketData {
  subject: string;
  description: string;
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  channel?: Ticket['channel'];
  assigned_to?: string;
  client_id?: string;
  company_id?: string;
  tags?: string[];
  due_date?: string;
}

export interface TicketFilters {
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  assigned_to?: string;
  client_id?: string;
  company_id?: string;
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Сервис для работы с тикетами
 */
export class TicketService {
  /**
   * Получает список тикетов с фильтрацией
   */
  static async getTickets(filters?: TicketFilters): Promise<{ tickets: Ticket[], total: number }> {
    try {
      let query = supabase
        .from('tickets')
        .select('*', { count: 'exact' });

      // Применяем фильтры
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to);
      }
      if (filters?.client_id) {
        query = query.eq('client_id', filters.client_id);
      }
      if (filters?.company_id) {
        query = query.eq('company_id', filters.company_id);
      }
      if (filters?.search) {
        query = query.or(`subject.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Пагинация
      if (filters?.page && filters?.limit) {
        const from = (filters.page - 1) * filters.limit;
        const to = from + filters.limit - 1;
        query = query.range(from, to);
      }

      // Сортировка
      query = query.order('created_at', { ascending: false });

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        tickets: data || [],
        total: count || 0
      };
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  }

  /**
   * Получает тикет по ID
   */
  static async getTicketById(id: string): Promise<Ticket> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  }

  /**
   * Создает новый тикет
   */
  static async createTicket(ticketData: CreateTicketData): Promise<Ticket> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  /**
   * Обновляет тикет
   */
  static async updateTicket(id: string, updateData: Partial<Ticket>): Promise<Ticket> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  }

  /**
   * Удаляет тикет
   */
  static async deleteTicket(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw error;
    }
  }

  /**
   * Получает комментарии к тикету
   */
  static async getTicketComments(ticketId: string): Promise<TicketComment[]> {
    try {
      const { data, error } = await supabase
        .from('ticket_comments')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching ticket comments:', error);
      throw error;
    }
  }

  /**
   * Добавляет комментарий к тикету
   */
  static async addComment(
    ticketId: string, 
    content: string, 
    isInternal: boolean = false
  ): Promise<TicketComment> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('ticket_comments')
        .insert([{
          ticket_id: ticketId,
          content,
          author_id: user.id,
          author_type: 'agent',
          is_internal: isInternal
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  /**
   * Изменяет статус тикета
   */
  static async changeStatus(id: string, status: Ticket['status']): Promise<Ticket> {
    try {
      const updateData: Partial<Ticket> = { status };
      
      // Автоматически устанавливаем временные метки
      if (status === 'solved') {
        updateData.resolved_at = new Date().toISOString();
      } else if (status === 'closed') {
        updateData.closed_at = new Date().toISOString();
      }

      return await this.updateTicket(id, updateData);
    } catch (error) {
      console.error('Error changing ticket status:', error);
      throw error;
    }
  }

  /**
   * Назначает тикет на пользователя
   */
  static async assignTicket(ticketId: string, userId: string): Promise<Ticket> {
    try {
      return await this.updateTicket(ticketId, { assigned_to: userId });
    } catch (error) {
      console.error('Error assigning ticket:', error);
      throw error;
    }
  }

  /**
   * Получает статистику по тикетам
   */
  static async getTicketStats(): Promise<{
    total: number;
    new: number;
    open: number;
    pending: number;
    solved: number;
    closed: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('status');

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        new: 0,
        open: 0,
        pending: 0,
        solved: 0,
        closed: 0
      };

      data?.forEach(ticket => {
        if (ticket.status in stats) {
          stats[ticket.status as keyof typeof stats]++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching ticket stats:', error);
      throw error;
    }
  }
}
