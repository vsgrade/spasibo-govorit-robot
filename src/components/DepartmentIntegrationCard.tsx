
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Vk, Telegram, WhatsApp, Edit, Trash2, X, Check } from "lucide-react";

interface Integration {
  id: string;
  type: 'vk' | 'telegram' | 'whatsapp';
  name: string;
  enabled: boolean;
  config: Record<string, string>;
}

interface DepartmentIntegrationCardProps {
  integration: Integration;
  onUpdate: (data: Partial<Integration>) => void;
  onDelete: () => void;
}

export default function DepartmentIntegrationCard({
  integration,
  onUpdate,
  onDelete,
}: DepartmentIntegrationCardProps) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Integration>(integration);
  
  const handleSave = () => {
    onUpdate(formData);
    setEditing(false);
  };
  
  const handleCancel = () => {
    setFormData(integration);
    setEditing(false);
  };

  const renderIcon = () => {
    switch (integration.type) {
      case 'vk':
        return <Vk className="h-5 w-5 text-blue-600" />;
      case 'telegram':
        return <Telegram className="h-5 w-5 text-blue-500" />;
      case 'whatsapp':
        return <WhatsApp className="h-5 w-5 text-green-600" />;
    }
  };

  const renderConfigFields = () => {
    switch (integration.type) {
      case 'vk':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor={`token-${integration.id}`}>API Token</Label>
              <Input
                id={`token-${integration.id}`}
                type="text"
                value={formData.config.token}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, token: e.target.value }
                })}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`group-ids-${integration.id}`}>ID групп (через запятую)</Label>
              <Input
                id={`group-ids-${integration.id}`}
                type="text"
                value={formData.config.groupIds}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, groupIds: e.target.value }
                })}
                disabled={!editing}
              />
            </div>
          </>
        );
        
      case 'telegram':
        return (
          <div className="space-y-2">
            <Label htmlFor={`bot-token-${integration.id}`}>Bot Token</Label>
            <Input
              id={`bot-token-${integration.id}`}
              type="text"
              value={formData.config.botToken}
              onChange={(e) => setFormData({
                ...formData,
                config: { ...formData.config, botToken: e.target.value }
              })}
              disabled={!editing}
            />
          </div>
        );
        
      case 'whatsapp':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor={`api-key-${integration.id}`}>API Key</Label>
              <Input
                id={`api-key-${integration.id}`}
                type="text"
                value={formData.config.apiKey}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, apiKey: e.target.value }
                })}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`phone-${integration.id}`}>Номер телефона</Label>
              <Input
                id={`phone-${integration.id}`}
                type="text"
                value={formData.config.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, phone: e.target.value }
                })}
                disabled={!editing}
              />
            </div>
          </>
        );
    }
  };

  return (
    <Card className={`${integration.enabled ? 'border-green-300' : 'border-gray-200'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {renderIcon()}
            <div className="flex flex-col">
              {editing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-7 mt-0 text-sm font-medium"
                />
              ) : (
                <h4 className="text-sm font-medium">{integration.name}</h4>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <Checkbox
                id={`status-${integration.id}`}
                checked={formData.enabled}
                onCheckedChange={(checked) => {
                  const newState = { ...formData, enabled: Boolean(checked) };
                  setFormData(newState);
                  if (!editing) onUpdate(newState);
                }}
              />
              <Label htmlFor={`status-${integration.id}`} className="ml-2 text-xs">
                {formData.enabled ? "Активно" : "Неактивно"}
              </Label>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <div className="space-y-3 text-sm">
          {renderConfigFields()}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-2 flex justify-between">
        {editing ? (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" />
              Отмена
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Check className="h-4 w-4 mr-1" />
              Сохранить
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Удалить
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
