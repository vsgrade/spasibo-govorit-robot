
/**
 * src/pages/IntegrationsPage.tsx
 * Страница для настройки интеграций с внешними сервисами.
 * Позволяет подключить мессенджеры, почту и другие каналы коммуникаций.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

/**
 * Типы интеграций
 */
interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: string;
}

/**
 * Компонент страницы интеграций
 * @returns JSX.Element - разметка страницы интеграций
 */
export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "telegram",
      name: "Telegram",
      description: "Интеграция с ботом Telegram для получения запросов",
      connected: true,
      icon: "📱"
    },
    {
      id: "vk",
      name: "ВКонтакте",
      description: "Интеграция с сообществом ВКонтакте",
      connected: false,
      icon: "💬"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Бизнес API WhatsApp для обработки сообщений",
      connected: false,
      icon: "📞"
    },
    {
      id: "email",
      name: "Электронная почта",
      description: "Интеграция с почтовыми ящиками IMAP/SMTP",
      connected: true,
      icon: "✉️"
    }
  ]);

  /**
   * Обработчик переключения статуса интеграции
   * @param id - идентификатор интеграции
   */
  const handleToggleIntegration = (id: string) => {
    setIntegrations(integrations.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  /**
   * Обработчик настройки интеграции
   * @param id - идентификатор интеграции
   */
  const handleConfigureIntegration = (id: string) => {
    console.log(`Настройка интеграции ${id}`);
    // Здесь будет логика открытия модального окна с настройками
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Интеграции</h1>
      <p className="text-gray-500 mb-8">
        Настройте интеграции с мессенджерами и другими каналами связи для получения запросов
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map(integration => (
          <Card key={integration.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{integration.icon}</span>
                <CardTitle>{integration.name}</CardTitle>
              </div>
              <Switch 
                checked={integration.connected} 
                onCheckedChange={() => handleToggleIntegration(integration.id)}
              />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{integration.description}</CardDescription>
              <Button 
                variant="outline" 
                onClick={() => handleConfigureIntegration(integration.id)}
                disabled={!integration.connected}
              >
                Настроить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
