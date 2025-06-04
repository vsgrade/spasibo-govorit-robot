
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportsManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Менеджер отчетов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          Здесь будет конструктор отчетов и аналитика
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsManager;
