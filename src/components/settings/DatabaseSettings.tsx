
/**
 * src/components/settings/DatabaseSettings.tsx
 * Компонент настроек базы данных.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function DatabaseSettings() {
  const { toast } = useToast();
  const [dbConfig, setDbConfig] = useState({
    host: "localhost",
    port: "3306",
    database: "crm_system",
    username: "root",
    password: ""
  });

  const handleSave = () => {
    toast({
      title: "Настройки БД сохранены",
      description: "Конфигурация базы данных обновлена"
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Тестирование подключения",
      description: "Проверка соединения с базой данных..."
    });
    
    // Имитация проверки подключения
    setTimeout(() => {
      toast({
        title: "Соединение успешно",
        description: "Подключение к базе данных работает корректно"
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки базы данных</CardTitle>
        <CardDescription>Конфигурация подключения к БД</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="db-host">Хост</Label>
            <Input
              id="db-host"
              value={dbConfig.host}
              onChange={(e) => setDbConfig({...dbConfig, host: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-port">Порт</Label>
            <Input
              id="db-port"
              value={dbConfig.port}
              onChange={(e) => setDbConfig({...dbConfig, port: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="db-name">База данных</Label>
          <Input
            id="db-name"
            value={dbConfig.database}
            onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="db-username">Пользователь</Label>
          <Input
            id="db-username"
            value={dbConfig.username}
            onChange={(e) => setDbConfig({...dbConfig, username: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="db-password">Пароль</Label>
          <Input
            id="db-password"
            type="password"
            value={dbConfig.password}
            onChange={(e) => setDbConfig({...dbConfig, password: e.target.value})}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleTestConnection} variant="outline">
            Проверить соединение
          </Button>
          <Button onClick={handleSave}>
            Сохранить настройки
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
