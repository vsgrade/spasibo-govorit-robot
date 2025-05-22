
/**
 * src/components/MainLayout.tsx
 * Основной макет приложения.
 * Содержит боковую панель навигации и основную область для контента.
 */
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Inbox, Users, MessageSquare, Settings, Menu, X, ChevronDown, Building, BarChart } from "lucide-react";
import { routes } from "@/config/app";

/**
 * Компонент основного макета приложения
 * @returns JSX.Element - разметка макета с боковой панелью и контентом
 */
export default function MainLayout() {
  // Состояние боковой панели
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCrmSubmenuOpen, setIsCrmSubmenuOpen] = useState(false);
  
  // Определяем текущий маршрут
  const location = useLocation();
  
  // Функция для переключения состояния боковой панели
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Функция для переключения состояния мобильного меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Проверка активного маршрута для CRM подменю
  const isCrmActive = location.pathname.startsWith('/crm');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <Collapsible
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        className="hidden md:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
      >
        <div className={`h-full flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold dark:text-white">CRM-система</h1>
            ) : (
              <h1 className="text-xl font-bold dark:text-white">CRM</h1>
            )}
            <CollapsibleTrigger asChild>
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5 dark:text-gray-300" />
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent 
            className="flex-1 py-4"
            forceMount
          >
            <nav className="space-y-1 px-2">
              {/* Основная навигация */}
              <NavLink
                to={routes.home}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <Inbox className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Панель управления</span>}
              </NavLink>

              <NavLink
                to={routes.tickets}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Тикеты</span>}
              </NavLink>

              {/* CRM подменю */}
              <div>
                <button 
                  onClick={() => setIsCrmSubmenuOpen(!isCrmSubmenuOpen)}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors ${
                    isCrmActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-3" />
                    {isSidebarOpen && <span>CRM</span>}
                  </div>
                  {isSidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform ${isCrmSubmenuOpen ? 'rotate-180' : ''}`} />}
                </button>
                
                {isSidebarOpen && isCrmSubmenuOpen && (
                  <div className="pl-10 pt-1 space-y-1">
                    <NavLink
                      to={routes.crm.index}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <span>Обзор</span>
                    </NavLink>
                    <NavLink
                      to={routes.crm.contacts}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <span>Контакты</span>
                    </NavLink>
                    <NavLink
                      to={routes.crm.companies}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <span>Компании</span>
                    </NavLink>
                    <NavLink
                      to={routes.crm.deals}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <span>Сделки</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Настройки */}
              <NavLink
                to={routes.settings}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <Settings className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Настройки</span>}
              </NavLink>

              {/* Пользователи */}
              <NavLink
                to={routes.users}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <Users className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Пользователи</span>}
              </NavLink>

              {/* Отчеты */}
              <NavLink
                to={routes.reports}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <BarChart className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Отчеты</span>}
              </NavLink>
            </nav>
          </CollapsibleContent>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                А
              </div>
              {isSidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium dark:text-white">Админ</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Collapsible>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold dark:text-white">CRM-система</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-800 z-50 mt-16">
          <nav className="p-4 space-y-2">
            <NavLink
              to={routes.home}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Inbox className="h-5 w-5 mr-3" />
              <span>Панель управления</span>
            </NavLink>

            <NavLink
              to={routes.tickets}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Тикеты</span>
            </NavLink>

            <NavLink
              to={routes.crm.index}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Building className="h-5 w-5 mr-3" />
              <span>CRM</span>
            </NavLink>

            <NavLink
              to={routes.settings}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Настройки</span>
            </NavLink>

            <NavLink
              to={routes.users}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5 mr-3" />
              <span>Пользователи</span>
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
