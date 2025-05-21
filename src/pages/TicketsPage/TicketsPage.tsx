// src/pages/TicketsPage/TicketsPage.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTickets, createTicket, Ticket as ApiTicket } from '../../services/ticketService'; // Убедитесь, что путь к сервису правильный

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react"; // Иконка для кнопки

export function TicketsPage() {
  const queryClient = useQueryClient();

  const { data: tickets, isLoading, error, refetch } = useQuery<ApiTicket[], Error>({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  const [newTicketTitle, setNewTicketTitle] = React.useState('');
  const [newTicketDescription, setNewTicketDescription] = React.useState('');
  const [newTicketClientName, setNewTicketClientName] = React.useState('');
  const [newTicketClientEmail, setNewTicketClientEmail] = React.useState('');

  const [showCreateForm, setShowCreateForm] = React.useState(false); // Состояние для отображения формы

  const createTicketMutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      setNewTicketTitle('');
      setNewTicketDescription('');
      setNewTicketClientName('');
      setNewTicketClientEmail('');
      setShowCreateForm(false); // Скрываем форму после создания
      // Можно добавить уведомление об успехе, если используете систему уведомлений
      // alert('Тикет успешно создан!'); 
    },
    onError: (err: Error) => {
      console.error("Ошибка создания тикета:", err);
      // Можно добавить уведомление об ошибке
      // alert(`Ошибка создания тикета: ${err.message}`);
    }
  });

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      alert('Заголовок и описание обязательны для нового тикета.');
      return;
    }
    createTicketMutation.mutate({
      title: newTicketTitle,
      description: newTicketDescription,
      client_name: newTicketClientName || undefined,
      client_email: newTicketClientEmail || undefined,
      priority: 'medium'
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Управление тикетами</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <PlusCircle className="mr-2 h-4 w-4" /> 
          {showCreateForm ? 'Отменить создание' : 'Создать тикет'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Создать новый тикет</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок</Label>
                <Input 
                  id="title" 
                  value={newTicketTitle} 
                  onChange={(e) => setNewTicketTitle(e.target.value)} 
                  placeholder="Краткое описание проблемы"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea 
                  id="description" 
                  value={newTicketDescription} 
                  onChange={(e) => setNewTicketDescription(e.target.value)} 
                  placeholder="Подробное описание проблемы"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientName">Имя клиента</Label>
                <Input 
                  id="clientName" 
                  value={newTicketClientName} 
                  onChange={(e) => setNewTicketClientName(e.target.value)} 
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email клиента</Label>
                <Input 
                  id="clientEmail" 
                  type="email"
                  value={newTicketClientEmail} 
                  onChange={(e) => setNewTicketClientEmail(e.target.value)} 
                  placeholder="ivan@example.com"
                />
              </div>
              <Button type="submit" disabled={createTicketMutation.isPending}>
                {createTicketMutation.isPending ? 'Создание...' : 'Сохранить тикет'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Список тикетов</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>
              {isLoading && "Загрузка тикетов..."}
              {error && `Ошибка загрузки тикетов: ${error.message}`}
              {!isLoading && !error && tickets && tickets.length === 0 && "Тикетов пока нет. Создайте первый!"}
            </CardDescription>
            <Button onClick={() => refetch()} disabled={isLoading} variant="outline">
              Обновить список
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tickets && tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{ticket.title}</CardTitle>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                            ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            ticket.status === 'closed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {ticket.status}
                        </span>
                    </div>
                    <CardDescription>
                      ID: {ticket.id} | Приоритет: {ticket.priority}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Клиент: {ticket.client_name || 'N/A'} ({ticket.client_email || 'N/A'})
                    </p>
                    <p>{ticket.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Создан: {new Date(ticket.created_at).toLocaleString()} | Обновлен: {new Date(ticket.updated_at).toLocaleString()}
                    </p>
                    {/* Сюда позже можно добавить кнопки для действий с тикетом */}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            !isLoading && !error && <p>Нет доступных тикетов.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
