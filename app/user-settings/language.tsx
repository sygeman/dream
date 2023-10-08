import { RadioGroup } from '@headlessui/react';
import { Locale } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { RadioButton } from '@/components/radio';
import { lang } from '@/lang';
import { useIntl } from '@/libs/intl';

import { setLocaleAction } from './actions';

const languages = Object.values(lang);

export const UserSettingsLanguage = () => {
  const { locale, formatMessage } = useIntl();
  const router = useRouter();

  const setLocale = async (newLocale: Locale) => {
    await setLocaleAction(newLocale);
    router.refresh();
  };

  return (
    <div>
      <div className="flex w-full mb-2">
        <RadioGroup
          className="w-full"
          value={locale}
          onChange={(newLocale: Locale) => setLocale(newLocale)}
        >
          <RadioGroup.Label className="text-muted-foreground text-xs">
            {formatMessage({ id: 'userSettingsLanguageSelectLabel' })}
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
                        <div className="text-xs text-muted-foreground px-2">
                          {formatMessage({ id: language.value })}
                        </div>
                        <Image
                          alt=""
                          className="h-5 w-5"
                          width={20}
                          height={20}
                          src={`/flags/${language.flag}.svg`}
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
