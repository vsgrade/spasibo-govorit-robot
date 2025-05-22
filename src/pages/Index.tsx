
/**
 * src/pages/Index.tsx
 * Главная страница приложения.
 * Отображает панель управления с ключевыми показателями и доступом к основным разделам.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/config/app";
import { BarChart, Clock, MessageSquare, Users } from "lucide-react";

/**
 * Компонент главной страницы
 * @returns JSX.Element - разметка главной страницы
 */
const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Панель управления</h1>
      
      {/* Виджеты с ключевыми показателями */}
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">42</CardTitle>
            <CardDescription>Активные тикеты</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-yellow-500">12 ожидают ответа</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">156</CardTitle>
            <CardDescription>Клиентов всего</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-green-500">+8 новых за неделю</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">89%</CardTitle>
            <CardDescription>Решено вовремя</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-blue-500">+4% к прошлому месяцу</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">4.2ч</CardTitle>
            <CardDescription>Среднее время решения</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-green-500">Быстрее на 15% чем в прошлом месяце</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Быстрый доступ к основным разделам */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link to={routes.tickets}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Тикеты</CardTitle>
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>Управление обращениями</CardDescription>
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
              <CardDescription>Управление клиентами</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/reports">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Отчеты</CardTitle>
                <BarChart className="h-5 w-5 text-purple-500" />
              </div>
              <CardDescription>Аналитика и статистика</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/tasks">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Задачи</CardTitle>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <CardDescription>Планирование работы</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Перейти</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Index;
