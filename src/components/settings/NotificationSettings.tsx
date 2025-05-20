
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function NotificationSettings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    soundNotifications: true,
    browserNotifications: false,
    telegramNotifications: true,
  });

  const handleNotificationChange = (field: string, checked: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Настройки уведомлений обновлены",
      description: "Ваши предпочтения уведомлений сохранены",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки уведомлений</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="email-notifications" 
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => 
                handleNotificationChange("emailNotifications", Boolean(checked))
              }
            />
            <Label htmlFor="email-notifications">Получать уведомления по email</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sound-notifications" 
              checked={notifications.soundNotifications}
              onCheckedChange={(checked) => 
                handleNotificationChange("soundNotifications", Boolean(checked))
              }
            />
            <Label htmlFor="sound-notifications">Звуковые уведомления</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="browser-notifications" 
              checked={notifications.browserNotifications}
              onCheckedChange={(checked) => 
                handleNotificationChange("browserNotifications", Boolean(checked))
              }
            />
            <Label htmlFor="browser-notifications">Push-уведомления в браузере</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="telegram-notifications" 
              checked={notifications.telegramNotifications}
              onCheckedChange={(checked) => 
                handleNotificationChange("telegramNotifications", Boolean(checked))
              }
            />
            <Label htmlFor="telegram-notifications">Уведомления в Telegram</Label>
          </div>
        </div>

        <div className="mt-6">
          <Label htmlFor="notification-templates">Шаблоны уведомлений</Label>
          <Textarea
            id="notification-templates"
            placeholder="Новый тикет: Поступил новый тикет от {client_name} с темой {subject}."
            className="h-32 mt-2"
          />
        </div>

        <Button onClick={handleSaveNotifications} className="mt-4">
          Сохранить настройки уведомлений
        </Button>
      </CardContent>
    </Card>
  );
}
