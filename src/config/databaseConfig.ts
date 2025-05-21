
// WARNING: This file contains sensitive database credentials
// For production use, consider using a backend API layer or a secure connection method

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

// Default configuration - replace with your actual values
export const databaseConfig: DatabaseConfig = {
  host: '127.0.0.1',  // MySQL server IP address
  port: 3306,         // Default MySQL port
  user: 'root',       // MySQL username
  password: '',       // MySQL password
  database: 'crm_database', // Database name
};
