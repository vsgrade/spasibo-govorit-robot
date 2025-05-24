
/**
 * src/components/DepartmentSettings.tsx
 * Компонент для управления настройками отделов.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/**
 * Интерфейс отдела
 */
interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
}

/**
 * Компонент настроек отделов
 */
export default function DepartmentSettings() {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Техническая поддержка",
      description: "Обработка технических запросов клиентов",
      manager: "Иван Петров",
      employeeCount: 12
    },
    {
      id: "2", 
      name: "Продажи",
      description: "Работа с новыми клиентами и сделками",
      manager: "Анна Сидорова",
      employeeCount: 8
    }
  ]);

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    manager: ""
  });

  /**
   * Обработчик создания нового отдела
   */
  const handleCreateDepartment = () => {
    if (!newDepartment.name.trim()) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Название отдела обязательно для заполнения"
      });
      return;
    }

    const department: Department = {
      id: String(departments.length + 1),
      name: newDepartment.name,
      description: newDepartment.description,
      manager: newDepartment.manager,
      employeeCount: 0
    };

    setDepartments([...departments, department]);
    setNewDepartment({ name: "", description: "", manager: "" });
    
    toast({
      title: "Отдел создан",
      description: `Отдел "${department.name}" успешно создан`
    });
  };

  /**
   * Обработчик удаления отдела
   */
  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: "Отдел удален",
      description: "Отдел успешно удален из системы"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Управление отделами</h2>
        <p className="text-muted-foreground">Настройка структуры организации</p>
      </div>

      {/* Список существующих отделов */}
      <div className="grid gap-4 md:grid-cols-2">
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>{dept.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Руководитель:</strong> {dept.manager}</p>
                <p><strong>Сотрудников:</strong> {dept.employeeCount}</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteDepartment(dept.id)}
                >
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Форма создания нового отдела */}
      <Card>
        <CardHeader>
          <CardTitle>Создать новый отдел</CardTitle>
          <CardDescription>Добавить отдел в структуру организации</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dept-name">Название отдела</Label>
            <Input
              id="dept-name"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
              placeholder="Название отдела"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dept-description">Описание</Label>
            <Input
              id="dept-description"
              value={newDepartment.description}
              onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
              placeholder="Описание деятельности отдела"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dept-manager">Руководитель</Label>
            <Input
              id="dept-manager"
              value={newDepartment.manager}
              onChange={(e) => setNewDepartment({...newDepartment, manager: e.target.value})}
              placeholder="ФИО руководителя"
            />
          </div>
          
          <Button onClick={handleCreateDepartment}>
            Создать отдел
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
