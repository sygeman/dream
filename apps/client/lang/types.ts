import { Locale } from '@prisma/client';
import { messages } from './en_US';

export type LanguageMetadata = {
  id: string;
  flag: string;
  name: string;
  value: Locale;
  langId: string;
};

export type LanguageMessageId = keyof typeof messages;
