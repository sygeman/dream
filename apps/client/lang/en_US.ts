import { Locale } from '@prisma/client';

export const langs = {
  [Locale.en_US]: 'English, US',
  [Locale.ru_RU]: 'Russian',
};

export const messages = {
  ...langs,

  createCommunityButton: 'Create community',

  mainOnlineLabel: 'Online',

  newCommunityModalTitle: 'New community',
  newCommunityTitleLabel: 'Title',
  newCommunityTitlePlaceholder: 'Awesome community',
  newCommunityCreateButton: 'Create',
  newChannelCreateButton: 'Create channel',

  communitySettingsButton: 'Community settings',

  userSettingsMenuLabel: 'User Settings',
  userSettingsOverviewMenuItemLabel: 'Overview',
  userSettingsLanguageSelectLabel: 'Select a language',
  userSettingsLanguageMenuItemLabel: 'Language',
  userSettingsLogoutMenuItemLabel: 'Logout',
};

export const metadata = {
  id: 'en',
  flag: 'usa',
  value: Locale.en_US,
  name: langs[Locale.en_US],
};
