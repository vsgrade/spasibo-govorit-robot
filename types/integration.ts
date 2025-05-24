
export interface Integration {
  id: string;
  name: string;
  type: 'telegram' | 'whatsapp' | 'email' | 'api' | 'webhook';
  config: Record<string, any>;
  is_active: boolean;
  department_id?: string;
  created_at: string;
  updated_at: string;
}

export interface IntegrationFormData {
  name: string;
  type: 'telegram' | 'whatsapp' | 'email' | 'api' | 'webhook';
  config: Record<string, any>;
  is_active: boolean;
  department_id?: string;
}
