
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

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
  },
  {
    id: "T-1002",
    customer: "Елена Смирнова",
    subject: "Не работает сервис",
    status: "В работе",
    source: "Telegram",
    date: "2025-05-18T16:45:00",
    assignedTo: "Оператор 2",
  },
  {
    id: "T-1003",
    customer: "Иван Соколов",
    subject: "Возврат товара",
    status: "Ожидает клиента",
    source: "WhatsApp",
    date: "2025-05-17T12:15:00",
    assignedTo: "Оператор 1",
  },
  {
    id: "T-1004",
    customer: "Мария Иванова",
    subject: "Консультация по товару",
    status: "Закрыт",
    source: "VK.com",
    date: "2025-05-16T14:22:00",
    assignedTo: "Оператор 3",
  },
  {
    id: "T-1005",
    customer: "Дмитрий Козлов",
    subject: "Проблема с доставкой",
    status: "Новый",
    source: "Чат на сайте",
    date: "2025-05-19T11:20:00",
    assignedTo: "",
  },
  {
    id: "T-1006",
    customer: "Анна Морозова",
    subject: "Запрос на прайс-лист",
    status: "В работе",
    source: "Форма на сайте",
    date: "2025-05-18T10:05:00",
    assignedTo: "Оператор 2",
  },
  {
    id: "T-1007",
    customer: "Сергей Волков",
    subject: "Технический сбой в личном кабинете",
    status: "Новый",
    source: "Email",
    date: "2025-05-19T08:45:00",
    assignedTo: "",
  },
  {
    id: "T-1008",
    customer: "Ольга Павлова",
    subject: "Изменение заказа",
    status: "Закрыт",
    source: "WhatsApp",
    date: "2025-05-15T13:30:00",
    assignedTo: "Оператор 1",
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

export default function Tickets() {
  const [tickets, setTickets] = useState(ticketsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const { toast } = useToast();

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          toast({
            title: "Статус обновлен",
            description: `Тикет ${ticketId} теперь имеет статус "${newStatus}"`,
          });
          return { ...ticket, status: newStatus };
        }
        return ticket;
      })
    );
  };

  const handleAssignmentChange = (ticketId: string, operator: string) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          toast({
            title: "Назначен ответственный",
            description: `Тикет ${ticketId} назначен на "${operator}"`,
          });
          return { ...ticket, assignedTo: operator };
        }
        return ticket;
      })
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      searchQuery === "" ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || ticket.status === statusFilter;
    const matchesSource = sourceFilter === "" || ticket.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление тикетами</h1>
        <Button asChild>
          <Link to="/tickets/new">
            <Plus className="h-4 w-4 mr-2" /> Создать тикет
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Input
            placeholder="Поиск по ID, клиенту или теме..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все статусы</SelectItem>
              <SelectItem value="Новый">Новый</SelectItem>
              <SelectItem value="В работе">В работе</SelectItem>
              <SelectItem value="Ожидает клиента">Ожидает клиента</SelectItem>
              <SelectItem value="Закрыт">Закрыт</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Фильтр по источнику" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все источники</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Telegram">Telegram</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="VK.com">VK.com</SelectItem>
              <SelectItem value="Чат на сайте">Чат на сайте</SelectItem>
              <SelectItem value="Форма на сайте">Форма на сайте</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Тема</TableHead>
              <TableHead>Источник</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Ответственный</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <span title={ticket.source}>
                      {getSourceIcon(ticket.source)} {ticket.source}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={ticket.status} 
                      onValueChange={(value) => handleStatusChange(ticket.id, value)}
                    >
                      <SelectTrigger className={getStatusClass(ticket.status)}>
                        <SelectValue placeholder={ticket.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Новый">Новый</SelectItem>
                        <SelectItem value="В работе">В работе</SelectItem>
                        <SelectItem value="Ожидает клиента">Ожидает клиента</SelectItem>
                        <SelectItem value="Закрыт">Закрыт</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={ticket.assignedTo || ""} 
                      onValueChange={(value) => handleAssignmentChange(ticket.id, value)}
                    >
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
                  </TableCell>
                  <TableCell>{formatDate(ticket.date)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/tickets/${ticket.id}`}>
                        Просмотреть
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Нет тикетов, соответствующих критериям поиска
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
