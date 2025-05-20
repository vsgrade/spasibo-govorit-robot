
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Данные для графиков
const ticketsBySourceData = [
  { name: 'Email', value: 25 },
  { name: 'Telegram', value: 35 },
  { name: 'WhatsApp', value: 20 },
  { name: 'VK.com', value: 15 },
  { name: 'Чат', value: 10 },
  { name: 'Форма', value: 5 },
];

const ticketsByStatusData = [
  { name: 'Новый', value: 15 },
  { name: 'В работе', value: 25 },
  { name: 'Ожидает клиента', value: 10 },
  { name: 'Закрыт', value: 50 },
];

const ticketsPerDayData = [
  { name: 'Пн', Новые: 4, Закрытые: 3 },
  { name: 'Вт', Новые: 7, Закрытые: 5 },
  { name: 'Ср', Новые: 5, Закрытые: 6 },
  { name: 'Чт', Новые: 6, Закрытые: 4 },
  { name: 'Пт', Новые: 8, Закрытые: 7 },
  { name: 'Сб', Новые: 3, Закрытые: 2 },
  { name: 'Вс', Новые: 2, Закрытые: 1 },
];

const responseTimeData = [
  { name: 'Оператор 1', avg: 15 },
  { name: 'Оператор 2', avg: 23 },
  { name: 'Оператор 3', avg: 12 },
];

// Цвета для графиков
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const STATUS_COLORS = {
  'Новый': '#3b82f6',
  'В работе': '#eab308',
  'Ожидает клиента': '#8b5cf6',
  'Закрыт': '#22c55e',
};

export default function AnalyticsCharts() {
  const [period, setPeriod] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Аналитика и отчеты</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">День</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Тикеты по источникам</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketsBySourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketsBySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Статусы тикетов</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketsByStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketsByStatusData.map((entry) => (
                    <Cell 
                      key={`cell-${entry.name}`} 
                      fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#ccc'} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Динамика тикетов</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ticketsPerDayData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Новые" fill="#3b82f6" />
                <Bar dataKey="Закрытые" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Среднее время ответа (мин)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responseTimeData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
