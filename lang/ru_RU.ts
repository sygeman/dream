import { Locale } from '@prisma/client';

export const langs = {
  [Locale.en_US]: 'Анлийский, США',
  [Locale.ru_RU]: 'Русский',
};

export const messages = {
  ...langs,

  mainTitle: 'Сообщества',
  mainDescription: 'Список всех сообществ',
  mainCreateCommunityButton: 'Создать сообщество',
  mainOnlineLabel: 'Онлайн',

  newCommunityModalTitle: 'Новое сообщество',
  newCommunityTitleLabel: 'Название',
  newCommunityTitlePlaceholder: 'Потрясающее сообщество',
  newCommunityCreateButton: 'Создать',
  newChannelCreateButton: 'Создать канал',

  communitySettingsButton: 'Настройки сообщества',

  userSettingsMenuLabel: 'Настройки пользователя',
  userSettingsOverviewMenuItemLabel: 'Обзор',
  userSettingsLanguageSelectLabel: 'Выберите язык',
  userSettingsLanguageMenuItemLabel: 'Язык',
  userSettingsLogoutMenuItemLabel: 'Выход',
};

export const metadata = {
  id: 'ru',
  flag: 'russia',
  value: Locale.ru_RU,
  name: langs[Locale.ru_RU],
};
