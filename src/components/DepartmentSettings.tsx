
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Trash2, Edit, ChevronDown, ChevronRight, Database, Loader2 } from "lucide-react";
import { VKIcon, TelegramIcon, WhatsAppIcon } from "./settings/IntegrationIcons";
import DepartmentIntegrationCard from "./DepartmentIntegrationCard";
import { dbService } from "@/services/databaseService";

// Типы для департаментов и интеграций
interface Integration {
  id: string;
  type: 'vk' | 'telegram' | 'whatsapp';
  name: string;
  enabled: boolean;
  config: Record<string, string>;
}

interface Department {
  id: string;
  name: string;
  description: string;
  integrations: Integration[];
}

export default function DepartmentSettings() {
  const { toast } = useToast();
  
  // Состояние для управления департаментами
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  
  // Состояние для формы нового департамента
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: ''
  });
  
  // Состояние для отслеживания открытых коллапсов
  const [openDepartments, setOpenDepartments] = useState<Record<string, boolean>>({});
  
  // Состояние для режима редактирования
  const [editingDepartment, setEditingDepartment] = useState<string | null>(null);
  
  // Загрузка департаментов из "базы данных"
  useEffect(() => {
    const loadDepartments = async () => {
      setIsLoading(true);
      try {
        // Проверяем наличие конфигурации базы данных
        const dbConfig = localStorage.getItem("database_config");
        if (!dbConfig) {
          toast({
            title: "Нет настроек базы данных",
            description: "Пожалуйста, настройте подключение к базе данных",
            variant: "destructive"
          });
          setDepartments([]);
          setDbConnected(false);
          setIsLoading(false);
          return;
        }

        // Подключаемся к базе
        const connected = await dbService.connect();
        setDbConnected(connected);
        
        if (connected) {
          // Выполняем запрос (симуляция)
          const result = await dbService.query(
            "SELECT id, name, description FROM departments"
          );
          
          // Получаем интеграции для каждого департамента
          const departmentsWithIntegrations = await Promise.all(
            result.rows.map(async (dept: any) => {
              const integrationsResult = await dbService.query(
                "SELECT id, type, name, enabled, config FROM integrations WHERE department_id = ?",
                [dept.id]
              );
              
              return {
                ...dept,
                integrations: integrationsResult.rows.map((row: any) => ({
                  ...row,
                  config: typeof row.config === 'string' ? JSON.parse(row.config) : row.config
                }))
              };
            })
          );
          
          setDepartments(departmentsWithIntegrations);
          
          toast({
            title: "Данные загружены",
            description: `Загружено ${departmentsWithIntegrations.length} департаментов`
          });
        } else {
          // Загружаем демо-данные, если нет подключения к БД
          setDepartments([
            {
              id: '1',
              name: 'Отдел продаж (демо)',
              description: 'Работа с клиентами и продажами',
              integrations: [
                {
                  id: '101',
                  type: 'vk',
                  name: 'ВКонтакте - продажи',
                  enabled: true,
                  config: { token: 'vk_token_sales', groupIds: 'group1,group2' }
                },
                {
                  id: '102',
                  type: 'telegram',
                  name: 'Telegram канал продаж',
                  enabled: true,
                  config: { botToken: 'telegram_token_sales' }
                }
              ]
            },
            {
              id: '2',
              name: 'Техподдержка (демо)',
              description: 'Помощь клиентам с техническими вопросами',
              integrations: [
                {
                  id: '201',
                  type: 'telegram',
                  name: 'Telegram-поддержка',
                  enabled: true,
                  config: { botToken: 'telegram_token_support' }
                },
                {
                  id: '202',
                  type: 'whatsapp',
                  name: 'WhatsApp поддержка',
                  enabled: false,
                  config: { apiKey: '', phone: '' }
                }
              ]
            }
          ]);
          
          toast({
            title: "Демо-режим",
            description: "Загружены демонстрационные данные (нет подключения к БД)",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Failed to load departments:", error);
        toast({
          title: "Ошибка загрузки данных",
          description: "Не удалось загрузить данные департаментов",
          variant: "destructive"
        });
        
        // Загружаем демо-данные в случае ошибки
        setDepartments([
          {
            id: '1',
            name: 'Отдел продаж (демо)',
            description: 'Работа с клиентами и продажами',
            integrations: []
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDepartments();
    
    // Очистка при размонтировании
    return () => {
      dbService.disconnect();
    };
  }, [toast]);
  
  // Переключение состояния коллапса
  const toggleDepartment = (id: string) => {
    setOpenDepartments((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Добавление нового департамента
  const handleAddDepartment = async () => {
    if (!newDepartment.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название департамента",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (dbConnected) {
        // Сохраняем в "базу данных" (симуляция)
        const result = await dbService.query(
          "INSERT INTO departments (name, description) VALUES (?, ?)",
          [newDepartment.name, newDepartment.description]
        );
        
        const newDept: Department = {
          id: String(result.insertId),
          name: newDepartment.name,
          description: newDepartment.description,
          integrations: []
        };
        
        setDepartments((prev) => [...prev, newDept]);
      } else {
        // Локальное создание без БД
        const newDept: Department = {
          id: Date.now().toString(),
          name: newDepartment.name,
          description: newDepartment.description,
          integrations: []
        };
        
        setDepartments((prev) => [...prev, newDept]);
      }
      
      setNewDepartment({ name: '', description: '' });
      
      toast({
        title: "Департамент создан",
        description: `Департамент "${newDepartment.name}" успешно создан`
      });
    } catch (error) {
      console.error("Failed to add department:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать департамент",
        variant: "destructive"
      });
    }
  };
  
  // Обновление существующего департамента
  const handleUpdateDepartment = async (id: string, data: Partial<Department>) => {
    try {
      if (dbConnected) {
        // Обновляем в "базе данных" (симуляция)
        await dbService.query(
          "UPDATE departments SET name = ?, description = ? WHERE id = ?",
          [data.name || "", data.description || "", id]
        );
      }
      
      setDepartments((prev) => 
        prev.map((dept) => 
          dept.id === id ? { ...dept, ...data } : dept
        )
      );
      setEditingDepartment(null);
      
      toast({
        title: "Департамент обновлен",
        description: "Изменения сохранены"
      });
    } catch (error) {
      console.error("Failed to update department:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить департамент",
        variant: "destructive"
      });
    }
  };
  
  // Удаление департамента
  const handleDeleteDepartment = async (id: string, name: string) => {
    try {
      if (dbConnected) {
        // Удаляем из "базы данных" (симуляция)
        await dbService.query(
          "DELETE FROM departments WHERE id = ?",
          [id]
        );
        
        // Удаляем связанные интеграции
        await dbService.query(
          "DELETE FROM integrations WHERE department_id = ?",
          [id]
        );
      }
      
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
      
      toast({
        title: "Департамент удален",
        description: `Департамент "${name}" удален`
      });
    } catch (error) {
      console.error("Failed to delete department:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить департамент",
        variant: "destructive"
      });
    }
  };
  
  // Добавление новой интеграции
  const handleAddIntegration = async (departmentId: string, type: 'vk' | 'telegram' | 'whatsapp') => {
    const typeName = {
      'vk': 'ВКонтакте',
      'telegram': 'Telegram',
      'whatsapp': 'WhatsApp'
    };
    
    const defaultConfig = {
      'vk': { token: '', groupIds: '' },
      'telegram': { botToken: '' },
      'whatsapp': { apiKey: '', phone: '' }
    };
    
    try {
      let newIntegrationId = Date.now().toString();
      
      if (dbConnected) {
        // Сохраняем в "базу данных" (симуляция)
        const configJson = JSON.stringify(defaultConfig[type]);
        const result = await dbService.query(
          "INSERT INTO integrations (department_id, type, name, enabled, config) VALUES (?, ?, ?, ?, ?)",
          [departmentId, type, `${typeName[type]} - Новый канал`, false, configJson]
        );
        
        newIntegrationId = String(result.insertId);
      }
      
      const newIntegration: Integration = {
        id: newIntegrationId,
        type,
        name: `${typeName[type]} - Новый канал`,
        enabled: false,
        config: defaultConfig[type]
      };
      
      setDepartments((prev) => 
        prev.map((dept) => 
          dept.id === departmentId 
            ? { ...dept, integrations: [...dept.integrations, newIntegration] } 
            : dept
        )
      );
      
      toast({
        title: "Интеграция добавлена",
        description: `Добавлен новый канал ${typeName[type]}`
      });
    } catch (error) {
      console.error("Failed to add integration:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить интеграцию",
        variant: "destructive"
      });
    }
  };
  
  // Обновление настроек интеграции
  const handleUpdateIntegration = async (departmentId: string, integrationId: string, data: Partial<Integration>) => {
    try {
      if (dbConnected) {
        // Обновляем в "базе данных" (симуляция)
        const configJson = JSON.stringify(data.config);
        await dbService.query(
          "UPDATE integrations SET name = ?, enabled = ?, config = ? WHERE id = ? AND department_id = ?",
          [data.name, data.enabled ? 1 : 0, configJson, integrationId, departmentId]
        );
      }
      
      setDepartments((prev) => 
        prev.map((dept) => 
          dept.id === departmentId 
            ? {
                ...dept,
                integrations: dept.integrations.map((integration) => 
                  integration.id === integrationId 
                    ? { ...integration, ...data } 
                    : integration
                )
              } 
            : dept
        )
      );
      
      toast({
        title: "Интеграция обновлена",
        description: "Настройки интеграции сохранены"
      });
    } catch (error) {
      console.error("Failed to update integration:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить интеграцию",
        variant: "destructive"
      });
    }
  };
  
  // Удаление интеграции
  const handleDeleteIntegration = async (departmentId: string, integrationId: string, name: string) => {
    try {
      if (dbConnected) {
        // Удаляем из "базы данных" (симуляция)
        await dbService.query(
          "DELETE FROM integrations WHERE id = ? AND department_id = ?",
          [integrationId, departmentId]
        );
      }
      
      setDepartments((prev) => 
        prev.map((dept) => 
          dept.id === departmentId 
            ? {
                ...dept,
                integrations: dept.integrations.filter(
                  (integration) => integration.id !== integrationId
                )
              } 
            : dept
        )
      );
      
      toast({
        title: "Интеграция удалена",
        description: `Интеграция "${name}" удалена`
      });
    } catch (error) {
      console.error("Failed to delete integration:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить интеграцию",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Информация о подключении к базе данных */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Статус подключения к базе данных
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${dbConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{dbConnected ? 'Подключено к MySQL' : 'Нет подключения к базе данных'}</span>
          </div>
          
          {!dbConnected && (
            <div className="mt-2 text-sm text-gray-500">
              Для настройки подключения перейдите на вкладку "База данных"
            </div>
          )}
        </CardContent>
      </Card>

      {/* Форма для добавления нового департамента */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Добавить новый департамент
          </CardTitle>
          <CardDescription>
            Создайте новый департамент для организации интеграций
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dept-name">Название департамента</Label>
              <Input
                id="dept-name"
                placeholder="Например: Отдел продаж"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-description">Описание</Label>
              <Input
                id="dept-description"
                placeholder="Краткое описание департамента"
                value={newDepartment.description}
                onChange={(e) => setNewDepartment(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddDepartment} 
            className="flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Добавить департамент
          </Button>
        </CardFooter>
      </Card>

      {/* Список существующих департаментов */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Мои департаменты</h2>
        
        {isLoading ? (
          <Card>
            <CardContent className="p-6 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Загрузка департаментов...</span>
            </CardContent>
          </Card>
        ) : departments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Пока нет ни одного департамента. Создайте первый департамент.
            </CardContent>
          </Card>
        ) : (
          departments.map((department) => (
            <Collapsible
              key={department.id}
              open={openDepartments[department.id]}
              onOpenChange={() => toggleDepartment(department.id)}
              className="w-full"
            >
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex items-center justify-between p-0 hover:bg-transparent hover:no-underline"
                      >
                        <div className="flex items-center">
                          <Users className="mr-2 h-5 w-5" />
                          <div className="text-left">
                            <h3 className="text-base font-bold">{department.name}</h3>
                            {department.description && (
                              <p className="text-sm text-gray-500">{department.description}</p>
                            )}
                          </div>
                        </div>
                        {openDepartments[department.id] ? (
                          <ChevronDown className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 flex-shrink-0" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  {!openDepartments[department.id] && (
                    <div className="flex items-center justify-end mt-2 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingDepartment(department.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Редактировать
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDepartment(department.id, department.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Удалить
                      </Button>
                    </div>
                  )}
                </CardHeader>
                
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 px-4">
                    {/* Форма редактирования департамента */}
                    {editingDepartment === department.id ? (
                      <div className="space-y-4 mb-4 border p-4 rounded-md">
                        <h4 className="font-medium">Редактировать департамент</h4>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-name-${department.id}`}>Название</Label>
                          <Input
                            id={`edit-name-${department.id}`}
                            value={department.name}
                            onChange={(e) => handleUpdateDepartment(department.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-desc-${department.id}`}>Описание</Label>
                          <Input
                            id={`edit-desc-${department.id}`}
                            value={department.description}
                            onChange={(e) => handleUpdateDepartment(department.id, { description: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingDepartment(null)}>
                            Отмена
                          </Button>
                          <Button size="sm" onClick={() => setEditingDepartment(null)}>
                            Сохранить
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    {/* Интеграции департамента */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Интеграции ({department.integrations.length})</h4>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddIntegration(department.id, 'vk')}
                          >
                            <VKIcon /> VK
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddIntegration(department.id, 'telegram')}
                          >
                            <TelegramIcon /> Telegram
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddIntegration(department.id, 'whatsapp')}
                          >
                            <WhatsAppIcon /> WhatsApp
                          </Button>
                        </div>
                      </div>

                      {department.integrations.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                          В этом департаменте пока нет интеграций.
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleAddIntegration(department.id, 'vk')}
                              className="mx-1"
                            >
                              <Plus className="h-4 w-4 mr-1" /> Добавить интеграцию
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {department.integrations.map((integration) => (
                            <DepartmentIntegrationCard
                              key={integration.id}
                              integration={integration}
                              onUpdate={(data) => handleUpdateIntegration(department.id, integration.id, data)}
                              onDelete={() => handleDeleteIntegration(department.id, integration.id, integration.name)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Действия с департаментом */}
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingDepartment(department.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Редактировать
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDepartment(department.id, department.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Удалить
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))
        )}
      </div>
    </div>
  );
}
