
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IntegrationsManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление интеграциями</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          Здесь будет управление интеграциями с внешними сервисами
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsManager;
