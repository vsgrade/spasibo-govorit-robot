import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DepartmentSettings from "@/components/DepartmentSettings";
import { Users, Plus, Trash2, Edit, Link } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Форма профиля
  const [profileForm, setProfileForm] = useState({
    name: "Администратор",
    email: "admin@example.com",
    phone: "+7 (900) 123-45-67",
    position: "Главный администратор",
  });

  // Настройки интеграций
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

  // Настройки уведомлений
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    soundNotifications: true,
    browserNotifications: false,
    telegramNotifications: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntegrationChange = (service: string, field: string, value: string | boolean) => {
    setIntegrations((prev) => ({
      ...prev,
      [service]: {
        ...prev[service as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleNotificationChange = (field: string, checked: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши персональные данные успешно сохранены",
    });
  };

  const handleSaveIntegrations = () => {
    toast({
      title: "Настройки интеграций обновлены",
      description: "Изменения в интеграциях успешно сохранены",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Настройки уведомлений обновлены",
      description: "Ваши предпочтения уведомлений сохранены",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="departments">Департаменты</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Должность</Label>
                    <Input
                      id="position"
                      name="position"
                      value={profileForm.position}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Сменить пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Новый пароль"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердить пароль</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердить новый пароль"
                  />
                </div>

                <Button 
                  type="button" 
                  onClick={handleSaveProfile}
                  className="mt-4"
                >
                  Сохранить изменения
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <DepartmentSettings />
        </TabsContent>

        <TabsContent value="integrations">
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

            <Button 
              onClick={handleSaveIntegrations}
              className="mt-4"
            >
              Сохранить настройки интеграций
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
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

              <Button 
                onClick={handleSaveNotifications}
                className="mt-4"
              >
                Сохранить настройки уведомлений
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
