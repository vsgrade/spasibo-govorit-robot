
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KanbanBoard = () => {
  const columns = [
    { name: "Новые", tickets: ["Ticket 1", "Ticket 2"] },
    { name: "В работе", tickets: ["Ticket 3"] },
    { name: "Ожидание", tickets: ["Ticket 4", "Ticket 5"] },
    { name: "Закрыто", tickets: ["Ticket 6"] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {columns.map((column) => (
        <Card key={column.name}>
          <CardHeader>
            <CardTitle className="text-sm">{column.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {column.tickets.map((ticket, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded text-sm">
                  {ticket}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KanbanBoard;
