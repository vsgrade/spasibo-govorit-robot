
// src/services/ticketService.ts

// В реальном приложении URL берется из переменных окружения
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    client_name: string | null;
    client_email: string | null;
    created_at: string;
    updated_at: string;
}

export const getTickets = async (): Promise<Ticket[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to fetch tickets: ${errorData.message || response.status}`);
        }
        const data = await response.json();
        if (data.status === 'success') {
            return data.tickets;
        } else {
            console.error("API returned an error status for getTickets:", data);
            throw new Error("Failed to fetch tickets: API returned an error status.");
        }
    } catch (error) {
        console.error("Error in getTickets service:", error);
        throw error;
    }
};

export const getTicketById = async (id: number): Promise<Ticket> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to fetch ticket: ${errorData.message || response.status}`);
        }
        const data = await response.json();
        if (data.status === 'success') {
            return data.ticket;
        } else {
            throw new Error("Failed to fetch ticket: API returned an error status.");
        }
    } catch (error) {
        console.error(`Error in getTicketById(${id}) service:`, error);
        throw error;
    }
};

export interface CreateTicketPayload {
    title: string;
    description: string;
    client_name?: string;
    client_email?: string;
    priority?: string;
}

export interface TicketResponse {
    status: string;
    message: string;
    ticketId?: number;
}

export const createTicket = async (ticketData: CreateTicketPayload): Promise<TicketResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to create ticket: ${errorData.message || response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error in createTicket service:", error);
        throw error;
    }
};

export const updateTicket = async (id: number, ticketData: Partial<CreateTicketPayload>): Promise<TicketResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to update ticket: ${errorData.message || response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error in updateTicket(${id}) service:`, error);
        throw error;
    }
};

export const deleteTicket = async (id: number): Promise<TicketResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to delete ticket: ${errorData.message || response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error in deleteTicket(${id}) service:`, error);
        throw error;
    }
};

export const searchTickets = async (query: string): Promise<Ticket[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to search tickets: ${errorData.message || response.status}`);
        }
        const data = await response.json();
        if (data.status === 'success') {
            return data.tickets;
        } else {
            throw new Error("Failed to search tickets: API returned an error status.");
        }
    } catch (error) {
        console.error(`Error in searchTickets('${query}') service:`, error);
        throw error;
    }
};
