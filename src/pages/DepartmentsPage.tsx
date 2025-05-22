
/**
 * src/pages/DepartmentsPage.tsx
 * Страница управления отделами/департаментами.
 * Позволяет создавать, редактировать и удалять отделы организации.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Компонент страницы для управления отделами
 * @returns JSX.Element - разметка страницы отделов
 */
export default function DepartmentsPage() {
  const [departments] = useState([
    { id: 1, name: "Техническая поддержка", employeeCount: 12 },
    { id: 2, name: "Продажи", employeeCount: 8 },
    { id: 3, name: "Разработка", employeeCount: 15 },
    { id: 4, name: "Маркетинг", employeeCount: 6 }
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Управление отделами</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map(dept => (
          <Card key={dept.id}>
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>Сотрудников: {dept.employeeCount}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Нажмите для управления отделом и просмотра сотрудников
              </p>
            </CardContent>
          </Card>
        ))}
        
        {/* Карточка для создания нового отдела */}
        <Card className="border-dashed border-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-center">+ Создать отдел</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 text-center">
              Добавить новый отдел в систему
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
