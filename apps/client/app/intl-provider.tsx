'use client';

import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { lang } from '../lang';
import { Locale } from '@prisma/client';

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

  const formatMessage = ({ id }: { id: string }) => lang[locale][id];

  return { locale, formatMessage };
};
