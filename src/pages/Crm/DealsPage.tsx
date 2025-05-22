
/**
 * src/pages/Crm/DealsPage.tsx
 * Страница управления сделками в CRM.
 * Реализует канбан-доску для управления сделками по стадиям.
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Интерфейс для объекта сделки
 */
interface Deal {
  id: number;
  title: string;
  client: string;
  amount: number;
  stage: "lead" | "negotiation" | "proposal" | "closed_won" | "closed_lost";
  createDate: string;
}

/**
 * Интерфейс для стадий сделок
 */
interface DealStage {
  id: string;
  name: string;
  deals: Deal[];
}

/**
 * Компонент страницы сделок
 * @returns JSX.Element - разметка страницы сделок (канбан-доска)
 */
export default function DealsPage() {
  const [stages] = useState<DealStage[]>([
    {
      id: "lead",
      name: "Лиды",
      deals: [
        { id: 1, title: "Поставка оборудования", client: "ООО Альфа", amount: 250000, stage: "lead", createDate: "2023-05-10" },
        { id: 2, title: "Консультационные услуги", client: "ИП Гамма", amount: 50000, stage: "lead", createDate: "2023-05-12" }
      ]
    },
    {
      id: "negotiation",
      name: "Переговоры",
      deals: [
        { id: 3, title: "Внедрение CRM", client: "ПАО Бета", amount: 380000, stage: "negotiation", createDate: "2023-04-28" }
      ]
    },
    {
      id: "proposal",
      name: "Предложение",
      deals: [
        { id: 4, title: "Разработка сайта", client: "ООО Дельта", amount: 420000, stage: "proposal", createDate: "2023-04-15" }
      ]
    },
    {
      id: "closed_won",
      name: "Завершенные",
      deals: [
        { id: 5, title: "Обучение персонала", client: "ООО Альфа", amount: 120000, stage: "closed_won", createDate: "2023-03-20" }
      ]
    },
    {
      id: "closed_lost",
      name: "Проигранные",
      deals: [
        { id: 6, title: "Поддержка 1С", client: "ООО Зета", amount: 90000, stage: "closed_lost", createDate: "2023-04-05" }
      ]
    }
  ]);

  /**
   * Форматирование суммы в российский формат
   * @param amount - сумма в числовом формате
   * @returns string - отформатированная строка
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Сделки</h1>
        <Button>Добавить сделку</Button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4">
        {stages.map(stage => (
          <div key={stage.id} className="w-80 flex-shrink-0">
            <Card className="h-full">
              <CardHeader className="px-4 py-3 border-b bg-muted">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                  <Badge variant="secondary">{stage.deals.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex flex-col gap-2">
                  {stage.deals.map(deal => (
                    <div key={deal.id} className="bg-card p-3 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <h4 className="font-semibold mb-1">{deal.title}</h4>
                      <p className="text-sm text-muted-foreground">{deal.client}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm font-medium">{formatCurrency(deal.amount)}</span>
                      </div>
                    </div>
                  ))}
                  {stage.deals.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md">
                      <p className="text-sm text-muted-foreground">Нет сделок</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
