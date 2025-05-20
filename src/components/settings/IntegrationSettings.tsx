
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function IntegrationSettings() {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState({
    vk: {
      enabled: true,
      token: "vk_api_token_12345",
      groupIds: "group1,group2",
    },
    telegram: {
      enabled: true,
      botToken: "telegram_bot_token_12345",
    },
    whatsapp: {
      enabled: false,
      apiKey: "",
      phone: "",
    },
    email: {
      enabled: true,
      server: "imap.example.com",
      login: "support@example.com",
      password: "********",
    },
  });

  const handleIntegrationChange = (service: string, field: string, value: string | boolean) => {
    setIntegrations((prev) => ({
      ...prev,
      [service]: {
        ...prev[service as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSaveIntegrations = () => {
    toast({
      title: "Настройки интеграций обновлены",
      description: "Изменения в интеграциях успешно сохранены",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VK</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vk-enabled" 
                checked={integrations.vk.enabled}
                onCheckedChange={(checked) => 
                  handleIntegrationChange("vk", "enabled", Boolean(checked))
                }
              />
              <Label htmlFor="vk-enabled">Активировать интеграцию с VK</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vk-token">API Token</Label>
              <Input
                id="vk-token"
                value={integrations.vk.token}
                onChange={(e) => 
                  handleIntegrationChange("vk", "token", e.target.value)
                }
                disabled={!integrations.vk.enabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vk-groups">ID групп (через запятую)</Label>
              <Input
                id="vk-groups"
                value={integrations.vk.groupIds}
                onChange={(e) => 
                  handleIntegrationChange("vk", "groupIds", e.target.value)
                }
                disabled={!integrations.vk.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Telegram</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="telegram-enabled" 
                checked={integrations.telegram.enabled}
                onCheckedChange={(checked) => 
                  handleIntegrationChange("telegram", "enabled", Boolean(checked))
                }
              />
              <Label htmlFor="telegram-enabled">Активировать интеграцию с Telegram</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram-token">Bot Token</Label>
              <Input
                id="telegram-token"
                value={integrations.telegram.botToken}
                onChange={(e) => 
                  handleIntegrationChange("telegram", "botToken", e.target.value)
                }
                disabled={!integrations.telegram.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="whatsapp-enabled" 
                checked={integrations.whatsapp.enabled}
                onCheckedChange={(checked) => 
                  handleIntegrationChange("whatsapp", "enabled", Boolean(checked))
                }
              />
              <Label htmlFor="whatsapp-enabled">Активировать интеграцию с WhatsApp</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-apikey">API Key</Label>
              <Input
                id="whatsapp-apikey"
                value={integrations.whatsapp.apiKey}
                onChange={(e) => 
                  handleIntegrationChange("whatsapp", "apiKey", e.target.value)
                }
                disabled={!integrations.whatsapp.enabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-phone">Номер телефона</Label>
              <Input
                id="whatsapp-phone"
                value={integrations.whatsapp.phone}
                onChange={(e) => 
                  handleIntegrationChange("whatsapp", "phone", e.target.value)
                }
                disabled={!integrations.whatsapp.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="email-enabled" 
                checked={integrations.email.enabled}
                onCheckedChange={(checked) => 
                  handleIntegrationChange("email", "enabled", Boolean(checked))
                }
              />
              <Label htmlFor="email-enabled">Активировать интеграцию с Email</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email-server">IMAP Сервер</Label>
                <Input
                  id="email-server"
                  value={integrations.email.server}
                  onChange={(e) => 
                    handleIntegrationChange("email", "server", e.target.value)
                  }
                  disabled={!integrations.email.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-login">Логин</Label>
                <Input
                  id="email-login"
                  value={integrations.email.login}
                  onChange={(e) => 
                    handleIntegrationChange("email", "login", e.target.value)
                  }
                  disabled={!integrations.email.enabled}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-password">Пароль</Label>
              <Input
                id="email-password"
                type="password"
                value={integrations.email.password}
                onChange={(e) => 
                  handleIntegrationChange("email", "password", e.target.value)
                }
                disabled={!integrations.email.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveIntegrations} className="mt-4">
        Сохранить настройки интеграций
      </Button>
    </div>
  );
}
