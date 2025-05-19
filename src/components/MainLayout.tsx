
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Inbox, Users, MessageSquare, Settings, Menu, X } from "lucide-react";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Collapsible
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        className="hidden md:block bg-white border-r border-gray-200 transition-all duration-300 ease-in-out"
      >
        <div className={`h-full flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold">CRM-система</h1>
            ) : (
              <h1 className="text-xl font-bold">CRM</h1>
            )}
            <CollapsibleTrigger asChild>
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent 
            className="flex-1 py-4"
            forceMount
          >
            <nav className="space-y-1 px-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Inbox className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Панель управления</span>}
              </NavLink>

              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Тикеты</span>}
              </NavLink>

              <NavLink
                to="/clients"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Users className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Клиенты</span>}
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Settings className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Настройки</span>}
              </NavLink>
            </nav>
          </CollapsibleContent>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                А
              </div>
              {isSidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Админ</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Collapsible>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">CRM-система</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 mt-16">
          <nav className="p-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Inbox className="h-5 w-5 mr-3" />
              <span>Панель управления</span>
            </NavLink>

            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Тикеты</span>
            </NavLink>

            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5 mr-3" />
              <span>Клиенты</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Настройки</span>
            </NavLink>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className={`flex-1 md:pt-0 pt-16 ${isMobileMenuOpen ? 'hidden' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
