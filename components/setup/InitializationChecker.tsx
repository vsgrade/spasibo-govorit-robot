
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SetupWizard from "./SetupWizard";

interface InitializationCheckerProps {
  children: React.ReactNode;
}

const InitializationChecker = ({ children }: InitializationCheckerProps) => {
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkInitialization();
  }, []);

  const checkInitialization = async () => {
    try {
      // Проверяем локальное хранилище
      const localInit = localStorage.getItem('projectInitialized');
      
      if (localInit === 'true') {
        // Дополнительно проверяем настройки базы данных
        const dbConfig = localStorage.getItem('dbConfig');
        if (dbConfig) {
          setIsInitialized(true);
        } else {
          setIsInitialized(false);
        }
      } else {
        setIsInitialized(false);
      }
    } catch (error) {
      console.error('Error checking initialization:', error);
      setIsInitialized(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = () => {
    setIsInitialized(true);
    toast({
      title: "Добро пожаловать!",
      description: "Проект настроен. Теперь вы можете войти в систему.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Проверка инициализации...</p>
        </div>
      </div>
    );
  }

  if (isInitialized === false) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  return <>{children}</>;
};

export default InitializationChecker;
