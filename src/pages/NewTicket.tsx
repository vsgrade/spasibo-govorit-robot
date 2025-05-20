
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  customer: z.string().min(1, { message: "Выберите клиента" }),
  subject: z.string().min(3, { message: "Тема должна содержать не менее 3 символов" }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов" }),
  source: z.string().min(1, { message: "Выберите источник" }),
  status: z.string().min(1, { message: "Выберите статус" }),
  assignedTo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Тестовые данные для списка клиентов
const clientsData = [
  { id: "C-1001", name: "Александр Петров" },
  { id: "C-1002", name: "Елена Смирнова" },
  { id: "C-1003", name: "Иван Соколов" },
  { id: "C-1004", name: "Мария Иванова" },
  { id: "C-1005", name: "Дмитрий Козлов" },
];

export default function NewTicket() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      subject: "",
      message: "",
      source: "Чат на сайте",
      status: "Новый",
      assignedTo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Тикет создан",
      description: `Новый тикет успешно создан для клиента ${data.customer}`,
    });
    
    setIsSubmitting(false);
    navigate("/tickets");
  };

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate("/tickets")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Назад к списку тикетов
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Создание нового тикета</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Клиент</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите клиента" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clientsData.map((client) => (
                            <SelectItem key={client.id} value={client.name}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Источник</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите источник" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Telegram">Telegram</SelectItem>
                          <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                          <SelectItem value="VK.com">VK.com</SelectItem>
                          <SelectItem value="Чат на сайте">Чат на сайте</SelectItem>
                          <SelectItem value="Форма на сайте">Форма на сайте</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тема</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите тему тикета" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сообщение</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Введите сообщение от клиента" 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Статус</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Новый">Новый</SelectItem>
                          <SelectItem value="В работе">В работе</SelectItem>
                          <SelectItem value="Ожидает клиента">Ожидает клиента</SelectItem>
                          <SelectItem value="Закрыт">Закрыт</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ответственный</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите ответственного" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Не назначен</SelectItem>
                          <SelectItem value="Оператор 1">Оператор 1</SelectItem>
                          <SelectItem value="Оператор 2">Оператор 2</SelectItem>
                          <SelectItem value="Оператор 3">Оператор 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => navigate("/tickets")}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Создание..." : "Создать тикет"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
