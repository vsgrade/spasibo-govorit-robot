
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newReply, setNewReply] = useState("");
  
  const handleSendReply = () => {
    if (!newReply.trim()) return;
    
    toast({
      title: "Сообщение отправлено",
      description: "Ваш ответ был отправлен клиенту.",
    });
    
    setNewReply("");
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => navigate("/tickets")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Назад к списку тикетов
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Детали тикета {id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">Здесь будут детали тикета</p>
              </div>
              
              <div>
                <Textarea 
                  placeholder="Введите ваш ответ клиенту..." 
                  className="min-h-32 mb-4"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSendReply}>
                    <Send className="h-4 w-4 mr-2" /> Отправить
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TicketDetail;
