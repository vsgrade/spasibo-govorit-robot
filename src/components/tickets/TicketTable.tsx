
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockTickets = [
  { id: "T-001", title: "Проблема с входом", status: "Открыт", priority: "Высокий" },
  { id: "T-002", title: "Вопрос по оплате", status: "В работе", priority: "Средний" },
  { id: "T-003", title: "Техническая поддержка", status: "Закрыт", priority: "Низкий" },
];

const TicketTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Приоритет</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id}</TableCell>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{ticket.status}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{ticket.priority}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TicketTable;
