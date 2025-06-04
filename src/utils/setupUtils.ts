
import { createClient } from '@supabase/supabase-js';
import { DatabaseConfig } from '@/types';

export const getStoredDatabaseConfig = (): DatabaseConfig | null => {
  const stored = localStorage.getItem('databaseConfig');
  return stored ? JSON.parse(stored) : null;
};

export const createDynamicSupabaseClient = async () => {
  const config = getStoredDatabaseConfig();
  if (!config || !config.url || !config.apiKey) {
    throw new Error('Database configuration not found');
  }
  return createClient(config.url, config.apiKey);
};
