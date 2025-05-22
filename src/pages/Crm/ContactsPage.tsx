
/**
 * src/pages/Crm/ContactsPage.tsx
 * Страница управления контактами в CRM.
 * Позволяет просматривать, создавать, редактировать и удалять контакты.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * Интерфейс для объекта контакта
 */
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
}

/**
 * Компонент страницы контактов
 * @returns JSX.Element - разметка страницы контактов
 */
export default function ContactsPage() {
  const [contacts] = useState<Contact[]>([
    { id: 1, name: "Иван Петров", email: "ivan@example.com", phone: "+7 (999) 123-45-67", company: "ООО Альфа", status: "Клиент" },
    { id: 2, name: "Анна Сидорова", email: "anna@example.com", phone: "+7 (999) 234-56-78", company: "ПАО Бета", status: "Потенциальный" },
    { id: 3, name: "Сергей Козлов", email: "sergey@example.com", phone: "+7 (999) 345-67-89", company: "ИП Гамма", status: "Клиент" },
    { id: 4, name: "Елена Новикова", email: "elena@example.com", phone: "+7 (999) 456-78-90", company: "ООО Дельта", status: "Партнер" },
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Контакты</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Добавить контакт</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый контакт</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">Имя</label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">Email</label>
                <Input id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right">Телефон</label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="company" className="text-right">Компания</label>
                <Input id="company" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Сохранить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center mb-4">
        <Input 
          placeholder="Поиск контактов..." 
          className="max-w-sm mr-4" 
        />
        <Button variant="outline">Фильтры</Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.status}</TableCell>
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
