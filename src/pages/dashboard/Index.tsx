
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Главная страница дашборда с виджетами
 */
const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {user ? `Здравствуйте, ${user.email}` : "Добро пожаловать"}
          </h1>
          <p className="text-muted-foreground">
            Панель управления CRM и тикет-системы. Здесь отображаются основные метрики и данные.
          </p>
        </div>

        {/* Ключевые метрики */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Новых тикетов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +8% за неделю
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Новых сделок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +12% за неделю
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Решено тикетов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">
                +14% за неделю
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выполнение плана</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <p className="text-xs text-muted-foreground">
                +5% за месяц
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Вкладки с данными */}
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="tickets">Тикеты</TabsTrigger>
            <TabsTrigger value="deals">Сделки</TabsTrigger>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DashboardStats />
          </TabsContent>
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Последние тикеты</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[300px]">
                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">Здесь будет отображаться список последних тикетов</p>
                  <Button onClick={() => window.location.href = "/tickets"}>
                    Перейти к тикетам
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deals">
            <Card>
              <CardHeader>
                <CardTitle>Активные сделки</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[300px]">
                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">Здесь будет отображаться список активных сделок</p>
                  <Button onClick={() => window.location.href = "/deals"}>
                    Перейти к сделкам
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Задачи</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[300px]">
                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">Здесь будет список предстоящих задач</p>
                  <Button>
                    Создать задачу
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
