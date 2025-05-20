
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, X, Maximize, Minimize, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: "client" | "operator";
  text: string;
  timestamp: Date;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "operator",
      text: "Добрый день! Чем могу помочь?",
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "client",
      text: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Имитация ответа оператора через 1 секунду
    setTimeout(() => {
      const operatorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "operator",
        text: "Спасибо за ваше сообщение! Оператор свяжется с вами в ближайшее время.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, operatorResponse]);
      
      toast({
        title: "Новое сообщение в чате",
        description: "Получено новое сообщение от клиента",
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className={`w-80 shadow-lg transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Онлайн-чат
              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">Онлайн</Badge>
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={handleMinimize} className="h-6 w-6">
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleToggleChat} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-4 h-[calc(100%-96px)] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "client" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          msg.sender === "client"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.sender === "operator" && (
                          <div className="flex items-center mb-1 text-xs font-semibold">
                            <User className="h-3 w-3 mr-1" /> Оператор
                          </div>
                        )}
                        <p>{msg.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            msg.sender === "client" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-2">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Введите сообщение..."
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage} 
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      ) : (
        <Button 
          onClick={handleToggleChat} 
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
