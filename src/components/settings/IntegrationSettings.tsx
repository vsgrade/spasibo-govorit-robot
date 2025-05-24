
/**
 * src/components/settings/IntegrationSettings.tsx
 * Компонент настроек интеграций.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function IntegrationSettings() {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState({
    telegram: true,
    whatsapp: false,
    email: true,
    vk: false
  });

  const handleToggle = (service: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
    
    toast({
      title: "Настройки обновлены",
      description: `Интеграция ${service} ${integrations[service] ? 'отключена' : 'включена'}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки интеграций</CardTitle>
        <CardDescription>Управление подключенными сервисами</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <p className="text-sm text-muted-foreground">Получение сообщений из Telegram</p>
          </div>
          <Switch
            id="telegram"
            checked={integrations.telegram}
            onCheckedChange={() => handleToggle('telegram')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <p className="text-sm text-muted-foreground">Интеграция с WhatsApp Business</p>
          </div>
          <Switch
            id="whatsapp"
            checked={integrations.whatsapp}
            onCheckedChange={() => handleToggle('whatsapp')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email">Email</Label>
            <p className="text-sm text-muted-foreground">Обработка входящих писем</p>
          </div>
          <Switch
            id="email"
            checked={integrations.email}
            onCheckedChange={() => handleToggle('email')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="vk">ВКонтакте</Label>
            <p className="text-sm text-muted-foreground">Сообщения из сообщества VK</p>
          </div>
          <Switch
            id="vk"
            checked={integrations.vk}
            onCheckedChange={() => handleToggle('vk')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
