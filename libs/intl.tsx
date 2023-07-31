'use client';

import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { lang } from '../lang';
import { Locale } from '@prisma/client';
import { LanguageMessageId } from '../lang/types';

type IntlContextValue = {
  locale: Locale;
};

export const IntlContext = createContext<IntlContextValue>({
  locale: Locale.en_US,
});

export const IntlProvider = ({
  children,
  locale = Locale.en_US,
}: { locale?: Locale } & PropsWithChildren) => {
  const value = useMemo(() => ({ locale }), [locale]);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};

export const useIntl = () => {
  const { locale } = useContext(IntlContext);

  const formatMessage = ({ id }: { id: LanguageMessageId }) =>
    lang[locale]?.messages[id];

  return { locale, formatMessage };
};
