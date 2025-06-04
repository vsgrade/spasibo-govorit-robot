
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Key } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * Страница авторизации
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminLogin, setAdminLogin] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    try {
      await login(email, password);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в систему",
      });
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message || "Неверные учетные данные");
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: error.message || "Неверные учетные данные или ошибка соединения",
      });
    }
  };

  const handleQuickLogin = async () => {
    setEmail("admin@example.com");
    setPassword("password");
    
    try {
      await login("admin@example.com", "password");
      toast({
        title: "Успешный вход",
        description: "Вход выполнен как администратор",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Создайте пользователя admin@example.com через регистрацию",
      });
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminLogin || !adminPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите логин и пароль администратора",
      });
      return;
    }

    try {
      await login(adminLogin, adminPassword);
      toast({
        title: "Успешный вход администратора",
        description: "Добро пожаловать в систему",
      });
      setShowAdminPanel(false);
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Неверные учетные данные администратора",
      });
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">CRM и Тикет-система</h1>
          <p className="text-muted-foreground mt-2">Войдите в свой аккаунт</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Вход в систему</CardTitle>
            <CardDescription>
              Введите свои учетные данные для входа
            </CardDescription>
          </CardHeader>
          
          {errorMessage && (
            <div className="px-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Вход..." : "Войти"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleQuickLogin}
                disabled={isLoading}
              >
                Быстрый вход как админ
              </Button>
              
              <div className="text-sm text-center text-muted-foreground">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-primary underline underline-offset-4">
                  Зарегистрироваться
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
