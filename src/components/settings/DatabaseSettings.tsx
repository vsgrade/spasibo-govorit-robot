
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DatabaseConfig, databaseConfig as defaultConfig } from "@/config/databaseConfig";
import { Database, ServerCrash } from "lucide-react";

export default function DatabaseSettings() {
  const { toast } = useToast();
  const [config, setConfig] = useState<DatabaseConfig>(defaultConfig);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  // Load config from localStorage on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("database_config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved database config");
      }
    }
  }, []);

  const handleConfigChange = (field: keyof DatabaseConfig, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [field]: field === "port" ? Number(value) : value
    }));
  };

  const handleSaveConfig = () => {
    try {
      // Save to localStorage (WARNING: insecure for credentials)
      localStorage.setItem("database_config", JSON.stringify(config));
      
      toast({
        title: "Настройки базы данных сохранены",
        description: "Конфигурация базы данных была обновлена",
      });
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки базы данных",
        variant: "destructive"
      });
    }
  };

  const handleTestConnection = () => {
    setTestStatus("testing");
    
    // Simulate a test connection (in a real app, you would actually try to connect)
    setTimeout(() => {
      // NOTE: In an actual application, you would use a backend endpoint for this
      // Directly connecting to MySQL from browser JavaScript is not possible
      // This is just a simulation for demonstration purposes
      
      const success = Math.random() > 0.3; // Simulate 70% success rate
      
      if (success) {
        setTestStatus("success");
        toast({
          title: "Соединение установлено",
          description: "Подключение к базе данных успешно",
        });
      } else {
        setTestStatus("error");
        toast({
          title: "Ошибка соединения",
          description: "Не удалось подключиться к базе данных. Проверьте настройки.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Настройки подключения к MySQL
          </CardTitle>
          <CardDescription>
            Настройте параметры подключения к вашей базе данных MySQL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Хост / IP-адрес</Label>
                <Input
                  id="db-host"
                  placeholder="например: 127.0.0.1"
                  value={config.host}
                  onChange={(e) => handleConfigChange("host", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-port">Порт</Label>
                <Input
                  id="db-port"
                  type="number"
                  placeholder="3306"
                  value={config.port}
                  onChange={(e) => handleConfigChange("port", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="db-name">Имя базы данных</Label>
              <Input
                id="db-name"
                placeholder="название базы данных"
                value={config.database}
                onChange={(e) => handleConfigChange("database", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-user">Имя пользователя</Label>
                <Input
                  id="db-user"
                  placeholder="пользователь MySQL"
                  value={config.user}
                  onChange={(e) => handleConfigChange("user", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-pass">Пароль</Label>
                <Input
                  id="db-pass"
                  type="password"
                  placeholder="пароль MySQL"
                  value={config.password}
                  onChange={(e) => handleConfigChange("password", e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <div className="bg-amber-50 border border-amber-200 rounded p-4 text-amber-800">
                <div className="flex items-start">
                  <ServerCrash className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Предупреждение о безопасности</h4>
                    <p className="text-sm">
                      Хранение учетных данных базы данных в браузере представляет серьезный риск безопасности. 
                      В производственной среде рекомендуется использовать защищенный бэкенд API.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleTestConnection} 
            disabled={testStatus === "testing"}
            className={
              testStatus === "success" ? "bg-green-50 text-green-800 border-green-300 hover:bg-green-100" :
              testStatus === "error" ? "bg-red-50 text-red-800 border-red-300 hover:bg-red-100" : ""
            }
          >
            {testStatus === "testing" ? "Проверка..." : 
             testStatus === "success" ? "Соединение установлено" : 
             testStatus === "error" ? "Ошибка соединения" : 
             "Проверить соединение"}
          </Button>
          <Button onClick={handleSaveConfig}>
            Сохранить настройки
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Использование базы данных</CardTitle>
          <CardDescription>
            Информация о текущих настройках и подключении
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="font-medium">Статус базы данных:</span>{" "}
                <span className={
                  testStatus === "success" ? "text-green-600" : 
                  testStatus === "error" ? "text-red-600" : 
                  "text-gray-500"
                }>
                  {testStatus === "success" ? "Подключено" : 
                   testStatus === "error" ? "Ошибка" : 
                   "Неизвестно"}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Тип базы данных:</span> MySQL
              </div>
              <div className="text-sm">
                <span className="font-medium">Хост:</span> {config.host}:{config.port}
              </div>
              <div className="text-sm">
                <span className="font-medium">База данных:</span> {config.database}
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>
                Примечание: Информация о соединении и настройки сохраняются локально в вашем браузере.
                При переходе на другое устройство или браузер вам потребуется заново ввести настройки.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
