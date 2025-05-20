
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ProfileSettings() {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: "Администратор",
    email: "admin@example.com",
    phone: "+7 (900) 123-45-67",
    position: "Главный администратор",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши персональные данные успешно сохранены",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Личные данные</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                name="position"
                value={profileForm.position}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Сменить пароль</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Новый пароль"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердить пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Подтвердить новый пароль"
            />
          </div>

          <Button type="button" onClick={handleSaveProfile} className="mt-4">
            Сохранить изменения
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
