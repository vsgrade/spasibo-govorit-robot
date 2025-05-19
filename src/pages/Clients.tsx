
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Временные данные для демонстрации
const clientsData = [
  {
    id: "C-1001",
    name: "Александр Петров",
    email: "petrov@example.com",
    phone: "+7 (900) 123-45-67",
    socialLinks: {
      vk: "vk.com/petrov",
      telegram: "@petrov",
      whatsapp: "+79001234567",
    },
    tags: ["VIP", "Розница"],
    ticketsCount: 5,
    lastContact: "2025-05-17T14:30:00",
  },
  {
    id: "C-1002",
    name: "Елена Смирнова",
    email: "smirnova@example.com",
    phone: "+7 (900) 234-56-78",
    socialLinks: {
      telegram: "@smirnova",
    },
    tags: ["B2B"],
    ticketsCount: 2,
    lastContact: "2025-05-15T11:20:00",
  },
  {
    id: "C-1003",
    name: "Иван Соколов",
    email: "sokolov@example.com",
    phone: "+7 (900) 345-67-89",
    socialLinks: {
      whatsapp: "+79003456789",
      vk: "vk.com/sokolov",
    },
    tags: ["Опт", "Проблемный"],
    ticketsCount: 8,
    lastContact: "2025-05-19T09:45:00",
  },
  {
    id: "C-1004",
    name: "Мария Иванова",
    email: "ivanova@example.com",
    phone: "+7 (900) 456-78-90",
    socialLinks: {
      vk: "vk.com/ivanova",
    },
    tags: ["Розница"],
    ticketsCount: 1,
    lastContact: "2025-05-10T16:15:00",
  },
  {
    id: "C-1005",
    name: "Дмитрий Козлов",
    email: "kozlov@example.com",
    phone: "+7 (900) 567-89-01",
    socialLinks: {
      telegram: "@kozlov",
      whatsapp: "+79005678901",
    },
    tags: ["VIP", "B2B"],
    ticketsCount: 3,
    lastContact: "2025-05-18T13:40:00",
  },
];

// Типы и интерфейсы
interface SocialLinks {
  vk?: string;
  telegram?: string;
  whatsapp?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialLinks: SocialLinks;
  tags: string[];
  ticketsCount: number;
  lastContact: string;
}

interface ClientDetailsProps {
  client: Client;
}

// Компонент для отображения детальной информации о клиенте
const ClientDetails = ({ client }: ClientDetailsProps) => {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Контактная информация</h3>
          <p className="mb-1"><strong>Email:</strong> {client.email}</p>
          <p className="mb-1"><strong>Телефон:</strong> {client.phone}</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Социальные сети</h3>
          <ul className="space-y-1">
            {client.socialLinks.vk && (
              <li>
                <strong>VK:</strong> <a href={`https://${client.socialLinks.vk}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{client.socialLinks.vk}</a>
              </li>
            )}
            {client.socialLinks.telegram && (
              <li>
                <strong>Telegram:</strong> {client.socialLinks.telegram}
              </li>
            )}
            {client.socialLinks.whatsapp && (
              <li>
                <strong>WhatsApp:</strong> {client.socialLinks.whatsapp}
              </li>
            )}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Теги</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {client.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Статистика</h3>
          <p className="mb-1"><strong>Количество обращений:</strong> {client.ticketsCount}</p>
          <p className="mb-1">
            <strong>Последний контакт:</strong>{" "}
            {new Intl.DateTimeFormat("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(client.lastContact))}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">История обращений</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Тема</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>T-1001</TableCell>
              <TableCell>Вопрос по оплате</TableCell>
              <TableCell>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  Новый
                </span>
              </TableCell>
              <TableCell>19.05.2025 09:30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>T-985</TableCell>
              <TableCell>Консультация по товару</TableCell>
              <TableCell>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Закрыт
                </span>
              </TableCell>
              <TableCell>15.05.2025 14:22</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default function Clients() {
  const [clients] = useState(clientsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Собираем уникальные теги из всех клиентов
  const allTags = Array.from(new Set(clients.flatMap(client => client.tags)));

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    
    const matchesTags = 
      selectedTags.length === 0 ||
      selectedTags.some(tag => client.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">База клиентов</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 mb-6">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              placeholder="Поиск по имени, email или телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          <div className="bg-white rounded-md shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Теги</TableHead>
                  <TableHead>Обращения</TableHead>
                  <TableHead>Последний контакт</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <Dialog key={client.id}>
                    <DialogTrigger asChild>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>
                          <div>{client.email}</div>
                          <div className="text-sm text-muted-foreground">{client.phone}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {client.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{client.ticketsCount}</TableCell>
                        <TableCell>{formatDate(client.lastContact)}</TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Клиент: {client.name}</DialogTitle>
                      </DialogHeader>
                      <ClientDetails client={client} />
                    </DialogContent>
                  </Dialog>
                ))}
                
                {filteredClients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Нет клиентов, соответствующих критериям поиска
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Фильтры</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="text-sm font-medium mb-2">Теги клиентов</h3>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tag-${tag}`} 
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
