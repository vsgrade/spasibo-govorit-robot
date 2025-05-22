
/**
 * src/pages/Crm/CompaniesPage.tsx
 * Страница управления компаниями в CRM.
 * Позволяет просматривать, создавать, редактировать и удалять компании.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/**
 * Интерфейс для объекта компании
 */
interface Company {
  id: number;
  name: string;
  industry: string;
  employees: number;
  website: string;
  status: "Активный" | "Потенциальный" | "Неактивный";
}

/**
 * Компонент страницы компаний
 * @returns JSX.Element - разметка страницы компаний
 */
export default function CompaniesPage() {
  const [companies] = useState<Company[]>([
    { id: 1, name: "ООО Альфа", industry: "Розничная торговля", employees: 120, website: "alpha.com", status: "Активный" },
    { id: 2, name: "ПАО Бета", industry: "Производство", employees: 450, website: "beta.ru", status: "Активный" },
    { id: 3, name: "ИП Гамма", industry: "Услуги", employees: 15, website: "gamma.ru", status: "Потенциальный" },
    { id: 4, name: "ООО Дельта", industry: "IT", employees: 85, website: "delta-it.ru", status: "Неактивный" }
  ]);

  /**
   * Возвращает соответствующий вариант бейджа для статуса
   * @param status - статус компании
   * @returns string - вариант бейджа
   */
  const getStatusVariant = (status: string) => {
    switch(status) {
      case "Активный": return "default";
      case "Потенциальный": return "secondary";
      case "Неактивный": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Компании</h1>
        <Button>Добавить компанию</Button>
      </div>
      
      <div className="flex items-center mb-4">
        <Input 
          placeholder="Поиск компаний..." 
          className="max-w-sm mr-4" 
        />
        <Button variant="outline">Фильтры</Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Отрасль</TableHead>
              <TableHead>Сотрудников</TableHead>
              <TableHead>Вебсайт</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.employees}</TableCell>
                <TableCell><a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{company.website}</a></TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(company.status) as any}>
                    {company.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Подробнее</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
