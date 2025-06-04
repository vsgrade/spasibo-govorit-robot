
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DepartmentSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки департаментов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          Здесь будут настройки департаментов и управление структурой команды
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentSettings;
