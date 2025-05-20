
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Inbox, MessageSquare, Plus, Users } from "lucide-react";
import AnalyticsCharts from "@/components/AnalyticsCharts";

// Временные данные для демонстрации
const recentTickets = [
  {
    id: "T-1001",
    customer: "Александр Петров",
    subject: "Вопрос по оплате",
    status: "Новый",
    source: "Email",
    date: "2025-05-19T09:30:00",
  },
  {
    id: "T-1002",
    customer: "Елена Смирнова",
    subject: "Не работает сервис",
    status: "В работе",
    source: "Telegram",
    date: "2025-05-18T16:45:00",
  },
  {
    id: "T-1003",
    customer: "Иван Соколов",
    subject: "Возврат товара",
    status: "Ожидает клиента",
    source: "WhatsApp",
    date: "2025-05-17T12:15:00",
  },
  {
    id: "T-1004",
    customer: "Мария Иванова",
    subject: "Консультация по товару",
    status: "Закрыт",
    source: "VK.com",
    date: "2025-05-16T14:22:00",
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
    default:
      return "💬";
  }
};

export default function Dashboard() {
  const [tickets] = useState(recentTickets);

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
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <Button asChild>
          <Link to="/tickets/new">
            <Plus className="h-4 w-4 mr-2" /> Создать тикет
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новые тикеты</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2% с прошлой недели
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные чаты</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              -1 с прошлого дня
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">745</div>
            <p className="text-xs text-muted-foreground">
              +5 новых сегодня
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Недавние обращения</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/tickets">
              Все тикеты <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Тема</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
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
                    <span className={getStatusClass(ticket.status)}>
                      {ticket.status}
                    </span>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AnalyticsCharts />
    </div>
  );
}
