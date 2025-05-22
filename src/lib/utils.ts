
/**
 * src/lib/utils.ts
 * Вспомогательные утилиты для приложения.
 * Содержит общие служебные функции, используемые в разных частях приложения.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы CSS, разрешая конфликты с помощью tailwind-merge
 * @param inputs - набор классов для объединения
 * @returns string - итоговая строка с классами
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Функция для форматирования даты
 * @param date - дата для форматирования
 * @param locale - локаль (по умолчанию ru-RU)
 * @returns string - отформатированная дата
 */
export function formatDate(date: Date | string, locale = 'ru-RU'): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

/**
 * Преобразует snake_case в camelCase
 * @param str - строка в формате snake_case
 * @returns string - строка в формате camelCase
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Преобразует camelCase в snake_case
 * @param str - строка в формате camelCase
 * @returns string - строка в формате snake_case
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Преобразует объект с ключами в snake_case в объект с ключами в camelCase
 * @param obj - исходный объект с ключами в snake_case
 * @returns object - новый объект с ключами в camelCase
 */
export function convertKeysToCamel(obj: Record<string, any>): Record<string, any> {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamel(item));
  }
  
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = snakeToCamel(key);
    acc[camelKey] = convertKeysToCamel(obj[key]);
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Преобразует объект с ключами в camelCase в объект с ключами в snake_case
 * @param obj - исходный объект с ключами в camelCase
 * @returns object - новый объект с ключами в snake_case
 */
export function convertKeysToSnake(obj: Record<string, any>): Record<string, any> {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnake(item));
  }
  
  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = camelToSnake(key);
    acc[snakeKey] = convertKeysToSnake(obj[key]);
    return acc;
  }, {} as Record<string, any>);
}
