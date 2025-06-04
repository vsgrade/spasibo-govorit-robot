
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPPORT_AGENT = 'support_agent',
  SALES_AGENT = 'sales_agent',
  READ_ONLY = 'read_only'
}

export interface DatabaseConfig {
  type: 'supabase' | 'mysql';
  url?: string;
  apiKey?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
}

export interface DatabaseStatus {
  isConnected: boolean;
  lastChecked: Date | null;
  error?: string;
}
