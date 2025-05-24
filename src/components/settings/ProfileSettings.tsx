
/**
 * src/components/settings/ProfileSettings.tsx
 * Компонент настроек профиля пользователя.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ProfileSettings() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: "Алексей",
    lastName: "Иванов",
    email: "admin@example.com",
    phone: "+7 (999) 123-45-67",
    position: "Администратор системы"
  });

  const handleSave = () => {
    toast({
      title: "Профиль обновлен",
      description: "Настройки профиля успешно сохранены"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки профиля</CardTitle>
        <CardDescription>Управление личной информацией</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Имя</Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Фамилия</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="position">Должность</Label>
          <Input
            id="position"
            value={profile.position}
            onChange={(e) => setProfile({...profile, position: e.target.value})}
          />
        </div>
        
        <Button onClick={handleSave}>
          Сохранить изменения
        </Button>
      </CardContent>
    </Card>
  );
}
