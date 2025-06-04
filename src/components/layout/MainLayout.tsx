
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Ticket, Users, Settings, BarChart3, MessageSquare, LogOut } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navigation = [
    { name: "Дашборд", href: "/dashboard", icon: Home },
    { name: "Тикеты", href: "/tickets", icon: Ticket },
    { name: "CRM", href: "/crm", icon: Users },
    { name: "Сделки", href: "/deals", icon: MessageSquare },
    { name: "Отчеты", href: "/reports", icon: BarChart3 },
    { name: "Настройки", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold">CRM System</h1>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
