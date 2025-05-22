
/**
 * src/pages/UsersPage.tsx
 * Страница управления пользователями.
 * Позволяет администраторам создавать, редактировать и управлять пользователями системы.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Интерфейс для объекта пользователя
 */
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "agent";
  department: string;
  status: "active" | "inactive";
  lastActive: string;
}

/**
 * Компонент страницы пользователей
 * @returns JSX.Element - разметка страницы пользователей
 */
export default function UsersPage() {
  const [users] = useState<User[]>([
    { id: 1, name: "Иван Петров", email: "ivan@example.com", role: "admin", department: "IT", status: "active", lastActive: "2023-05-15 10:30" },
    { id: 2, name: "Анна Сидорова", email: "anna@example.com", role: "manager", department: "Продажи", status: "active", lastActive: "2023-05-15 09:45" },
    { id: 3, name: "Сергей Козлов", email: "sergey@example.com", role: "agent", department: "Поддержка", status: "active", lastActive: "2023-05-14 16:20" },
    { id: 4, name: "Елена Новикова", email: "elena@example.com", role: "agent", department: "Поддержка", status: "inactive", lastActive: "2023-05-10 12:10" }
  ]);

  /**
   * Получает цвет бейджа на основе роли пользователя
   * @param role - роль пользователя
   * @returns string - вариант бейджа
   */
  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
      case "admin": return "destructive";
      case "manager": return "default";
      case "agent": return "secondary";
      default: return "outline";
    }
  };

  /**
   * Получает текст названия роли на русском
   * @param role - роль пользователя
   * @returns string - название роли
   */
  const getRoleText = (role: string) => {
    switch(role) {
      case "admin": return "Администратор";
      case "manager": return "Менеджер";
      case "agent": return "Агент";
      default: return role;
    }
  };

  /**
   * Получает инициалы пользователя из полного имени
   * @param name - полное имя пользователя
   * @returns string - инициалы
   */
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Пользователи</h1>
        <Button>Добавить пользователя</Button>
      </div>
      
      <div className="flex items-center mb-4">
        <Input 
          placeholder="Поиск пользователей..." 
          className="max-w-sm mr-4" 
        />
        <Button variant="outline">Фильтры</Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Отдел</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Последняя активность</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role) as any}>
                    {getRoleText(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "outline"}>
                    {user.status === "active" ? "Активен" : "Неактивен"}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Редактировать</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
