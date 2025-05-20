
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Info, MessageSquare, Plus, Ticket, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Временные данные для демонстрации
const clientsData = [
  {
    id: "C-1001",
    name: "Александр Петров",
    email: "petrov@example.com",
    phone: "+7 (900) 123-45-67",
    socialLinks: {
      vk: "vk.com/petrov",
      telegram: "@petrov",
      whatsapp: "+79001234567",
    },
    tags: ["VIP", "Розница"],
    ticketsCount: 5,
    lastContact: "2025-05-17T14:30:00",
    notes: "Предпочитает получать информацию по WhatsApp. Постоянный клиент с 2023 года.",
    tickets: [
      {
        id: "T-1001",
        subject: "Вопрос по оплате",
        status: "Новый",
        date: "2025-05-19T09:30:00",
      },
      {
        id: "T-985",
        subject: "Консультация по товару",
        status: "Закрыт",
        date: "2025-05-15T14:22:00",
      },
      {
        id: "T-952",
        subject: "Изменение заказа",
        status: "Закрыт",
        date: "2025-05-10T11:15:00",
      },
    ]
  },
  {
    id: "C-1002",
    name: "Елена Смирнова",
    email: "smirnova@example.com",
    phone: "+7 (900) 234-56-78",
    socialLinks: {
      telegram: "@smirnova",
    },
    tags: ["B2B"],
    ticketsCount: 2,
    lastContact: "2025-05-15T11:20:00",
    notes: "Представитель компании 'ТехноПлюс'. Связываться в рабочее время с 9 до 18.",
    tickets: [
      {
        id: "T-1002",
        subject: "Не работает сервис",
        status: "В работе",
        date: "2025-05-18T16:45:00",
      },
    ]
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Новый":
      return "bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium";
    case "В работе":
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium";
    case "Ожидает клиента":
      return "bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium";
    case "Закрыт":
      return "bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium";
    default:
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium";
  }
};

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const client = clientsData.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState("info");
  const [notes, setNotes] = useState(client?.notes || "");
  const [isEditing, setIsEditing] = useState(false);
  
  if (!client) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => navigate("/clients")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Назад к списку клиентов
        </Button>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold">Клиент не найден</h2>
          <p className="mt-2">Клиент с ID {id} не существует или был удален.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    toast({
      title: "Заметки сохранены",
      description: "Информация о клиенте успешно обновлена.",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate("/clients")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Назад к списку клиентов
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{client.name}</h1>
          <p className="text-gray-500">{client.id}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/tickets/new?client=${client.id}`)}
          >
            <Plus className="h-4 w-4 mr-2" /> Создать тикет
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" /> Написать сообщение
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {client.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="info">
            <Info className="h-4 w-4 mr-2" /> Информация
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <Ticket className="h-4 w-4 mr-2" /> Тикеты ({client.tickets.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Контактные данные</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={client.email} readOnly />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" value={client.phone} readOnly />
                </div>
                <div className="md:col-span-2">
                  <Label>Социальные сети</Label>
                  <div className="mt-2 space-y-2">
                    {client.socialLinks.vk && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">VK:</span>
                        <a href={`https://${client.socialLinks.vk}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {client.socialLinks.vk}
                        </a>
                      </div>
                    )}
                    {client.socialLinks.telegram && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Telegram:</span>
                        {client.socialLinks.telegram}
                      </div>
                    )}
                    {client.socialLinks.whatsapp && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">WhatsApp:</span>
                        {client.socialLinks.whatsapp}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Количество обращений:</span>
                  <p className="text-lg font-medium">{client.ticketsCount}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Последний контакт:</span>
                  <p className="text-lg font-medium">{formatDate(client.lastContact)}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Заметки</CardTitle>
                {!isEditing ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" /> Редактировать
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSaveNotes}>
                    Сохранить
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea 
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Введите заметки о клиенте..."
                    className="min-h-32"
                  />
                ) : (
                  <p className="whitespace-pre-line">{notes}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>История обращений</CardTitle>
              <Button onClick={() => navigate(`/tickets/new?client=${client.id}`)}>
                <Plus className="h-4 w-4 mr-2" /> Создать тикет
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тема</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.tickets.length > 0 ? (
                    client.tickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <span className={getStatusClass(ticket.status)}>
                            {ticket.status}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(ticket.date)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => navigate(`/tickets/${ticket.id}`)}
                          >
                            Просмотреть
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        У клиента нет активных тикетов
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
