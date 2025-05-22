
/**
 * src/pages/Crm/index.tsx
 * Главная страница CRM раздела.
 * Содержит обзор CRM системы и основные показатели.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/config/app";

/**
 * Компонент страницы обзора CRM
 * @returns JSX.Element - разметка главной страницы CRM
 */
export default function CrmPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CRM система</h1>
      
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">156</CardTitle>
            <CardDescription>Всего контактов</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-green-500">+12% с прошлого месяца</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">48</CardTitle>
            <CardDescription>Компании</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-green-500">+3 новых на этой неделе</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">32</CardTitle>
            <CardDescription>Активные сделки</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-yellow-500">6 требуют внимания</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">₽1.2M</CardTitle>
            <CardDescription>Ожидаемая выручка</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-blue-500">На ближайшие 30 дней</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link to={routes.crm.contacts}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Контакты</CardTitle>
              <CardDescription>Управление клиентами и контактами</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Открыть</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={routes.crm.companies}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Компании</CardTitle>
              <CardDescription>Управление организациями</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Открыть</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={routes.crm.deals}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Сделки</CardTitle>
              <CardDescription>Воронка продаж и управление сделками</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Открыть</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={routes.crm.tasks}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Задачи</CardTitle>
              <CardDescription>Управление задачами по клиентам</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Открыть</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
