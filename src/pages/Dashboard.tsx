
/**
 * src/pages/Dashboard.tsx
 * Страница панели управления (дашборд).
 * Отображает ключевые показатели и обзор системы.
 */
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
import { routes } from "@/config/app";

/**
 * Временные данные для демонстрации тикетов
 */
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

/**
 * Функция для получения класса стилизации статуса тикета
 * @param status - статус тикета
 * @returns string - CSS-класс для отображения статуса
 */
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

/**
 * Функция для получения иконки источника тикета
 * @param source - источник тикета
 * @returns string - Emoji-иконка для источника
 */
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

/**
 * Компонент страницы панели управления
 * @returns JSX.Element - разметка дашборда
 */
export default function Dashboard() {
  const [tickets] = useState(recentTickets);

  /**
   * Форматирование даты
   * @param dateString - дата в формате строки
   * @returns string - отформатированная дата
   */
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
          <Link to={routes.newTicket}>
            <Plus className="h-4 w-4 mr-2" /> Создать тикет
          </Link>
        </Button>
      </div>
      
      {/* Карточки с основными метриками */}
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

      {/* Таблица с последними тикетами */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Недавние обращения клиентов</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to={routes.tickets}>
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
                    <Button variant="ghost" size="sm">
                      Просмотреть
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Карточки быстрого доступа */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link to={routes.tickets}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Тикеты</CardTitle>
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={routes.crm.index}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>CRM</CardTitle>
                <Users className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={routes.reports}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Отчеты</CardTitle>
                <ArrowRight className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={routes.settings}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Настройки</CardTitle>
                <Settings className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
