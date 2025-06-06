
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TicketStatus, TicketPriority, TicketChannel } from "@/types";

interface TicketFormProps {
  onTicketCreated?: () => void;
  initialData?: any;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TicketForm = ({ onTicketCreated, initialData, isEditing = false, onCancel }: TicketFormProps) => {
  const [formData, setFormData] = useState({
    subject: initialData?.subject || "",
    description: initialData?.description || "",
    status: initialData?.status || TicketStatus.NEW,
    priority: initialData?.priority || TicketPriority.MEDIUM,
    channel: initialData?.channel || TicketChannel.WEB,
    tags: initialData?.tags?.join(", ") || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const ticketData = {
        subject: formData.subject,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        channel: formData.channel,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        updated_at: new Date().toISOString(),
      };

      if (isEditing && initialData?.id) {
        const { error } = await supabase
          .from('tickets')
          .update(ticketData)
          .eq('id', initialData.id);

        if (error) throw error;

        toast({
          title: "Тикет обновлен",
          description: "Тикет успешно обновлен",
        });
      } else {
        const { error } = await supabase
          .from('tickets')
          .insert([ticketData]);

        if (error) throw error;

        toast({
          title: "Тикет создан",
          description: "Новый тикет успешно создан",
        });

        // Очищаем форму после создания
        setFormData({
          subject: "",
          description: "",
          status: TicketStatus.NEW,
          priority: TicketPriority.MEDIUM,
          channel: TicketChannel.WEB,
          tags: "",
        });
      }

      onTicketCreated?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить тикет",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Редактировать тикет" : "Создать новый тикет"}</CardTitle>
        <CardDescription>
          {isEditing ? "Внесите изменения в тикет" : "Заполните информацию о новом тикете"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Тема</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Введите тему тикета"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Подробное описание проблемы"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Статус</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as TicketStatus })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TicketStatus.NEW}>Новый</SelectItem>
                  <SelectItem value={TicketStatus.OPEN}>Открыт</SelectItem>
                  <SelectItem value={TicketStatus.IN_PROGRESS}>В работе</SelectItem>
                  <SelectItem value={TicketStatus.WAITING_CUSTOMER}>Ожидание клиента</SelectItem>
                  <SelectItem value={TicketStatus.RESOLVED}>Решен</SelectItem>
                  <SelectItem value={TicketStatus.CLOSED}>Закрыт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Приоритет</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as TicketPriority })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TicketPriority.LOW}>Низкий</SelectItem>
                  <SelectItem value={TicketPriority.MEDIUM}>Средний</SelectItem>
                  <SelectItem value={TicketPriority.HIGH}>Высокий</SelectItem>
                  <SelectItem value={TicketPriority.CRITICAL}>Критический</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Канал</Label>
              <Select value={formData.channel} onValueChange={(value) => setFormData({ ...formData, channel: value as TicketChannel })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TicketChannel.EMAIL}>Email</SelectItem>
                  <SelectItem value={TicketChannel.TELEGRAM}>Telegram</SelectItem>
                  <SelectItem value={TicketChannel.WHATSAPP}>WhatsApp</SelectItem>
                  <SelectItem value={TicketChannel.VK}>VK</SelectItem>
                  <SelectItem value={TicketChannel.PHONE}>Телефон</SelectItem>
                  <SelectItem value={TicketChannel.WEB}>Веб</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="например: срочно, баг, фича"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Сохранение..." : isEditing ? "Обновить" : "Создать"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Отмена
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
