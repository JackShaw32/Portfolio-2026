import { es } from './es';
import { en } from './en';

export const translations = { es, en } as const;
export type Translations = typeof translations;
export type Lang = keyof Translations;
