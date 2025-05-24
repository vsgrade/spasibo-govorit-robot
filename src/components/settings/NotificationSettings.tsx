
/**
 * src/components/settings/NotificationSettings.tsx
 * Компонент настроек уведомлений.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function NotificationSettings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    slack: false,
    telegram: true
  });

  const handleToggle = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    toast({
      title: "Настройки уведомлений обновлены",
      description: `Уведомления ${type} ${notifications[type] ? 'отключены' : 'включены'}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки уведомлений</CardTitle>
        <CardDescription>Управление способами получения уведомлений</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications">Email уведомления</Label>
            <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
          </div>
          <Switch
            id="email-notifications"
            checked={notifications.email}
            onCheckedChange={() => handleToggle('email')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="browser-notifications">Браузерные уведомления</Label>
            <p className="text-sm text-muted-foreground">Push-уведомления в браузере</p>
          </div>
          <Switch
            id="browser-notifications"
            checked={notifications.browser}
            onCheckedChange={() => handleToggle('browser')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="slack-notifications">Slack уведомления</Label>
            <p className="text-sm text-muted-foreground">Уведомления в Slack канал</p>
          </div>
          <Switch
            id="slack-notifications"
            checked={notifications.slack}
            onCheckedChange={() => handleToggle('slack')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="telegram-notifications">Telegram уведомления</Label>
            <p className="text-sm text-muted-foreground">Уведомления в Telegram бот</p>
          </div>
          <Switch
            id="telegram-notifications"
            checked={notifications.telegram}
            onCheckedChange={() => handleToggle('telegram')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
