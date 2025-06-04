
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatComponent = () => {
  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Командный чат</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-1 space-y-2 mb-4">
          <div className="text-sm text-muted-foreground">Здесь будут сообщения чата</div>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Введите сообщение..." />
          <Button size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatComponent;
