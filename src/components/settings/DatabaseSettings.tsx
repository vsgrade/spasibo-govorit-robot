
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DatabaseSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки базы данных</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          Здесь будут настройки подключения к базе данных
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseSettings;
