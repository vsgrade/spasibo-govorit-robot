
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";

// Временные данные для демонстрации
const ticketsData = [
  {
    id: "T-1001",
    customer: "Александр Петров",
    subject: "Вопрос по оплате",
    status: "Новый",
    source: "Email",
    date: "2025-05-19T09:30:00",
    assignedTo: "Оператор 1",
    messages: [
      {
        id: "m-1",
        from: "client",
        text: "Добрый день! У меня возник вопрос по оплате заказа №12345. Деньги списались, но статус заказа не изменился.",
        date: "2025-05-19T09:30:00",
      },
      {
        id: "m-2",
        from: "operator",
        text: "Добрый день! Спасибо за обращение. Проверим информацию и вернемся к вам в ближайшее время.",
        date: "2025-05-19T09:45:00",
        operator: "Оператор 1",
      },
      {
        id: "m-3",
        from: "client",
        text: "Спасибо за оперативный ответ. Буду ждать информацию.",
        date: "2025-05-19T10:15:00",
      },
    ],
    customerId: "C-1001",
  },
  {
    id: "T-1002",
    customer: "Елена Смирнова",
    subject: "Не работает сервис",
    status: "В работе",
    source: "Telegram",
    date: "2025-05-18T16:45:00",
    assignedTo: "Оператор 2",
    messages: [
      {
        id: "m-4",
        from: "client",
        text: "Здравствуйте! Я не могу войти в личный кабинет. Пишет ошибку авторизации.",
        date: "2025-05-18T16:45:00",
      },
    ],
    customerId: "C-1002",
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

const getSourceIcon = (source: string) => {
  switch (source) {
    case "Email":
      return "📧";
    case "Telegram":
      return "📱";
    case "WhatsApp":
      return "📞";
    case "VK.com":
      return "👥";
    case "Чат на сайте":
      return "💬";
    case "Форма на сайте":
      return "📝";
    default:
      return "💬";
  }
};

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const ticket = ticketsData.find(t => t.id === id);
  const [newReply, setNewReply] = useState("");
  const [ticketStatus, setTicketStatus] = useState(ticket?.status || "Новый");
  const [ticketAssignee, setTicketAssignee] = useState(ticket?.assignedTo || "");
  
  if (!ticket) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => navigate("/tickets")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Назад к списку тикетов
        </Button>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold">Тикет не найден</h2>
          <p className="mt-2">Тикет с ID {id} не существует или был удален.</p>
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

  const handleStatusChange = (value: string) => {
    setTicketStatus(value);
    toast({
      title: "Статус обновлен",
      description: `Тикет ${ticket.id} теперь имеет статус "${value}"`,
    });
  };

  const handleAssigneeChange = (value: string) => {
    setTicketAssignee(value);
    toast({
      title: "Назначен ответственный",
      description: `Тикет ${ticket.id} назначен на "${value}"`,
    });
  };

  const handleSendReply = () => {
    if (!newReply.trim()) return;
    
    toast({
      title: "Сообщение отправлено",
      description: "Ваш ответ был отправлен клиенту.",
    });
    
    setNewReply("");
  };

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate("/tickets")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Назад к списку тикетов
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{ticket.subject}</h1>
                  <div className="text-sm text-muted-foreground">
                    {ticket.id} • {formatDate(ticket.date)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={getStatusClass(ticketStatus)}>
                    {ticketStatus}
                  </span>
                  <Badge variant="outline" className="ml-2">
                    {getSourceIcon(ticket.source)} {ticket.source}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <div className="space-y-6 mb-6">
            {ticket.messages.map((message) => (
              <Card key={message.id} className={`${message.from === 'client' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500'}`}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">
                      {message.from === 'client' ? ticket.customer : message.operator}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(message.date)}
                    </div>
                  </div>
                  <div className="mt-2 whitespace-pre-line">{message.text}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Ответить</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Введите ваш ответ клиенту..." 
                className="min-h-32 mb-4"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleSendReply}>
                  <Send className="h-4 w-4 mr-2" /> Отправить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Детали тикета</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Клиент</h3>
                <div className="flex items-center">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => navigate(`/clients/${ticket.customerId}`)}
                  >
                    {ticket.customer}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Статус</h3>
                <Select value={ticketStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className={getStatusClass(ticketStatus)}>
                    <SelectValue placeholder={ticketStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Новый">Новый</SelectItem>
                    <SelectItem value="В работе">В работе</SelectItem>
                    <SelectItem value="Ожидает клиента">Ожидает клиента</SelectItem>
                    <SelectItem value="Закрыт">Закрыт</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Ответственный</h3>
                <Select value={ticketAssignee} onValueChange={handleAssigneeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Не назначен" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Не назначен</SelectItem>
                    <SelectItem value="Оператор 1">Оператор 1</SelectItem>
                    <SelectItem value="Оператор 2">Оператор 2</SelectItem>
                    <SelectItem value="Оператор 3">Оператор 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Источник</h3>
                <div>
                  <Badge variant="outline">
                    {getSourceIcon(ticket.source)} {ticket.source}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Создан</h3>
                <div className="text-sm">{formatDate(ticket.date)}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Добавить заметку
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Перенаправить тикет
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Объединить с другим тикетом
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700">
                Закрыть тикет
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
