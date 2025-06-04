
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Пн", tickets: 12 },
  { name: "Вт", tickets: 19 },
  { name: "Ср", tickets: 8 },
  { name: "Чт", tickets: 15 },
  { name: "Пт", tickets: 22 },
  { name: "Сб", tickets: 6 },
  { name: "Вс", tickets: 4 },
];

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Статистика тикетов за неделю</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">Здесь будут быстрые действия и статистика</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
