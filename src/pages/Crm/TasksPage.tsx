
/**
 * src/pages/Crm/TasksPage.tsx
 * Страница управления задачами в CRM.
 * Позволяет создавать и управлять задачами по клиентам и сделкам.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/**
 * Интерфейс для объекта задачи
 */
interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  assignedTo: string;
  relatedTo: string;
}

/**
 * Компонент страницы задач
 * @returns JSX.Element - разметка страницы задач
 */
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Позвонить клиенту", dueDate: "2023-05-20", priority: "high", completed: false, assignedTo: "Иван Петров", relatedTo: "ООО Альфа" },
    { id: 2, title: "Отправить коммерческое предложение", dueDate: "2023-05-21", priority: "medium", completed: false, assignedTo: "Анна Сидорова", relatedTo: "ПАО Бета" },
    { id: 3, title: "Запланировать встречу", dueDate: "2023-05-25", priority: "medium", completed: false, assignedTo: "Иван Петров", relatedTo: "ИП Гамма" },
    { id: 4, title: "Подготовить презентацию", dueDate: "2023-05-18", priority: "low", completed: true, assignedTo: "Елена Новикова", relatedTo: "ООО Дельта" }
  ]);

  /**
   * Обработчик изменения статуса выполнения задачи
   * @param taskId - идентификатор задачи
   */
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  /**
   * Возвращает соответствующий вариант бейджа для приоритета
   * @param priority - приоритет задачи
   * @returns string - вариант бейджа
   */
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Задачи</h1>
        <Button>Создать задачу</Button>
      </div>
      
      <Card>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Задача</TableHead>
                <TableHead>Срок</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Назначена</TableHead>
                <TableHead>Относится к</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className={task.completed ? "bg-muted/50" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => toggleTaskCompletion(task.id)} 
                    />
                  </TableCell>
                  <TableCell className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString("ru-RU")}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadge(task.priority) as any}>
                      {task.priority === "high" ? "Высокий" : task.priority === "medium" ? "Средний" : "Низкий"}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{task.relatedTo}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Редактировать</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
