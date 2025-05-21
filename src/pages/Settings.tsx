
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/settings/ProfileSettings";
import DepartmentSettings from "@/components/DepartmentSettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import DatabaseSettings from "@/components/settings/DatabaseSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-5 mb-6">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="departments">Департаменты</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="database">База данных</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="departments">
          <DepartmentSettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
