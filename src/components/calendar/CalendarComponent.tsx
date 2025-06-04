
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Календарь</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          Здесь будет компонент календаря для планирования задач и встреч
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarComponent;
