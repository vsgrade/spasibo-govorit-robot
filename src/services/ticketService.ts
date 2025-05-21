// src/services/ticketService.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    client_name: string | null;
    client_email: string | null;
    created_at: string; // В базе данных это TIMESTAMP, здесь будет строка
    updated_at: string; // В базе данных это TIMESTAMP, здесь будет строка
}

interface GetTicketsApiResponse {
    status: string;
    tickets: Ticket[];
}

interface CreateTicketPayload {
    title: string;
    description: string;
    client_name?: string;
    client_email?: string;
    priority?: string;
}

interface CreateTicketApiResponse {
    status: string;
    message: string;
    ticketId: number;
}

export const getTickets = async (): Promise<Ticket[]> => {
    if (!API_BASE_URL) {
        console.error("VITE_API_BASE_URL is not defined!");
        throw new Error("API base URL is not configured. Please set VITE_API_BASE_URL environment variable.");
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Failed to fetch tickets: ${errorData.message || response.status}`);
        }
        const data: GetTicketsApiResponse = await response.json();
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

export const createTicket = async (ticketData: CreateTicketPayload): Promise<CreateTicketApiResponse> => {
    if (!API_BASE_URL) {
        console.error("VITE_API_BASE_URL is not defined!");
        throw new Error("API base URL is not configured.");
    }
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
