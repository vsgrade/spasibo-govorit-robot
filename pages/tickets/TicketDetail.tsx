
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Send, Edit } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  channel: string;
  assigned_to?: string;
  client_id?: string;
  company_id?: string;
  tags: string[];
  due_date?: string;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: string;
  content: string;
  author_id: string;
  author_type: string;
  is_internal: boolean;
  created_at: string;
}

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchTicket = async () => {
    if (!id) return;

    try {
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (ticketError) throw ticketError;
      setTicket(ticketData);

      const { data: commentsData, error: commentsError } = await supabase
        .from('ticket_comments')
        .select('*')
        .eq('ticket_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;
      setComments(commentsData || []);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось загрузить тикет",
      });
      navigate('/tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !ticket) return;

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Необходимо войти в систему",
        });
        return;
      }

      const { error } = await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticket.id,
          content: newComment,
          author_id: user.id,
          author_type: 'agent',
          is_internal: isInternal
        });

      if (error) throw error;

      setNewComment("");
      toast({
        title: "Комментарий добавлен",
        description: "Комментарий успешно добавлен к тикету",
      });

      fetchTicket();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось добавить комментарий",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return;

    try {
      const { error } = await supabase
        .from('tickets')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticket.id);

      if (error) throw error;

      setTicket({ ...ticket, status: newStatus });
      toast({
        title: "Статус обновлен",
        description: `Статус тикета изменен на ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось обновить статус",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'open': return 'default';
      case 'pending': return 'secondary';
      case 'solved': return 'default';
      case 'closed': return 'secondary';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-6">
          <div className="text-center">Загрузка тикета...</div>
        </div>
      </MainLayout>
    );
  }

  if (!ticket) {
    return (
      <MainLayout>
        <div className="container py-6">
          <div className="text-center">Тикет не найден</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/tickets')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к тикетам
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl">{ticket.subject}</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      ID: {ticket.id}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{ticket.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Комментарии */}
            <Card>
              <CardHeader>
                <CardTitle>Комментарии ({comments.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-lg border ${
                      comment.is_internal ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author_type}</span>
                        {comment.is_internal && (
                          <Badge variant="secondary" className="text-xs">
                            Внутренний
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{comment.content}</p>
                  </div>
                ))}

                {/* Форма добавления комментария */}
                <div className="border-t pt-4 space-y-3">
                  <Textarea
                    placeholder="Добавить комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isInternal}
                        onChange={(e) => setIsInternal(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Внутренний комментарий</span>
                    </label>
                    <Button 
                      onClick={handleAddComment} 
                      disabled={!newComment.trim() || submitting}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? "Отправка..." : "Отправить"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Информация о тикете</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Статус</label>
                  <Select value={ticket.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="open">Открыт</SelectItem>
                      <SelectItem value="pending">Ожидание</SelectItem>
                      <SelectItem value="solved">Решен</SelectItem>
                      <SelectItem value="closed">Закрыт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Приоритет</label>
                  <div className="mt-1">
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Канал</label>
                  <div className="mt-1">
                    <Badge variant="outline">{ticket.channel}</Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Создан</label>
                  <div className="text-sm text-muted-foreground">
                    {new Date(ticket.created_at).toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Обновлен</label>
                  <div className="text-sm text-muted-foreground">
                    {new Date(ticket.updated_at).toLocaleString()}
                  </div>
                </div>

                {ticket.tags && ticket.tags.length > 0 && (
                  <div>
                    <label className="text-sm font-medium">Теги</label>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {ticket.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketDetailPage;
