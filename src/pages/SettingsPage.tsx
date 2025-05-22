
/**
 * src/pages/SettingsPage.tsx
 * Страница настроек приложения.
 * Позволяет управлять основными параметрами системы.
 */
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

/**
 * Компонент страницы настроек
 * @returns JSX.Element - разметка страницы настроек
 */
export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  /**
   * Обработчик сохранения настроек
   */
  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Настройки системы были успешно обновлены",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Настройки системы</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
          <TabsTrigger value="general">Основные</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="database">База данных</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Основные настройки</CardTitle>
              <CardDescription>
                Настройте основные параметры работы системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Название организации</Label>
                <Input id="company-name" defaultValue="ООО Техносервис" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">URL сайта</Label>
                <Input id="site-url" defaultValue="https://example.com" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Темная тема</Label>
                  <p className="text-sm text-gray-500">Включить темную тему интерфейса</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Часовой пояс</Label>
                <select id="timezone" className="w-full p-2 border rounded">
                  <option>Europe/Moscow (UTC+3)</option>
                  <option>Europe/London (UTC+0)</option>
                  <option>America/New_York (UTC-5)</option>
                </select>
              </div>
              <Button className="mt-4" onClick={handleSaveSettings}>
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Настройте параметры отправки уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notify">Email уведомления</Label>
                    <p className="text-sm text-gray-500">Отправлять уведомления по email</p>
                  </div>
                  <Switch id="email-notify" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="browser-notify">Браузерные уведомления</Label>
                    <p className="text-sm text-gray-500">Показывать уведомления в браузере</p>
                  </div>
                  <Switch id="browser-notify" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="slack-notify">Slack уведомления</Label>
                    <p className="text-sm text-gray-500">Отправлять уведомления в Slack</p>
                  </div>
                  <Switch id="slack-notify" />
                </div>
                <Button className="mt-4" onClick={handleSaveSettings}>
                  Сохранить настройки уведомлений
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>
                Настройки безопасности и доступа к системе
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Политика паролей</Label>
                <select id="password-policy" className="w-full p-2 border rounded">
                  <option>Стандартная (минимум 8 символов)</option>
                  <option>Усиленная (буквы, цифры и спецсимволы)</option>
                  <option>Строгая (12+ символов, буквы в разных регистрах, цифры, спецсимволы)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
                  <p className="text-sm text-gray-500">Требовать 2FA для всех пользователей</p>
                </div>
                <Switch id="2fa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Тайм-аут сессии (минуты)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <Button variant="destructive">Сбросить все сессии пользователей</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>База данных</CardTitle>
              <CardDescription>
                Настройки подключения к базе данных
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Host</Label>
                <Input id="db-host" defaultValue="localhost" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-port">Port</Label>
                <Input id="db-port" defaultValue="3306" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-user">User</Label>
                <Input id="db-user" defaultValue="root" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-name">Database Name</Label>
                <Input id="db-name" defaultValue="ticket_system" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="db-ssl">Использовать SSL</Label>
                </div>
                <Switch id="db-ssl" />
              </div>
              <div className="flex justify-between gap-4">
                <Button variant="outline" className="flex-1">Тестировать соединение</Button>
                <Button className="flex-1" onClick={handleSaveSettings}>Сохранить настройки</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
