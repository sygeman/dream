// import { useMeQuery, useSetUserLocaleMutation } from '../user.api';
import { RadioGroup } from '@headlessui/react';
import { RadioButton } from '../../components/radio';

import { Locale } from '@prisma/client';
import { useIntl } from '../intl-provider';

const languages = [
  {
    id: 'en',
    flag: 'usa',
    name: 'English, US',
    value: Locale.en_US,
    langId: 'userSettingsLanguageEnglishUS',
  },
  {
    id: 'ru',
    flag: 'russia',
    name: 'Русский',
    value: Locale.ru_RU,
    langId: 'userSettingsLanguageRussian',
  },
];

export const UserSettingsLanguage = () => {
  const { locale, formatMessage } = useIntl();

  const setUserLocale = async (newLocale: Locale) => {
    const formData = new FormData();
    formData.set('locale', newLocale);

    await fetch(`user-settings/$set-locale`, {
      body: formData,
      method: 'POST',
    });

    window?.location.reload();
  };

  return (
    <div>
      <div className="flex w-full mb-2">
        <RadioGroup
          className="w-full"
          value={locale}
          onChange={(newLocale: Locale) => setUserLocale(newLocale)}
        >
          <RadioGroup.Label className="text-accent text-xs">
            Select a language
          </RadioGroup.Label>
          <div className="flex flex-col w-full">
            {languages.map((language) => (
              <RadioGroup.Option key={language.id} value={language.value}>
                {({ checked }) => (
                  <div className="flex w-full rounded my-1 bg-background hover:bg-background-light cursor-pointer">
                    <div className="px-4 flex items-center">
                      <RadioButton checked={checked} />
                    </div>
                    <div className="flex w-full py-2">
                      <RadioGroup.Label as="div" className="text-sm">
                        {language.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="div"
                        className="ml-auto px-2 flex"
                      >
                        <div className="text-xs text-accent px-2">
                          {formatMessage({ id: language.langId })}
                        </div>
                        <img
                          className="h-5 w-5"
                          src={`/flags/${language.flag}.svg`}
                          alt={language.name}
                        />
                      </RadioGroup.Description>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
