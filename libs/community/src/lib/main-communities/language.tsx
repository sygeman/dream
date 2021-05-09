import React, { Fragment } from 'react';
import { useMeQuery, useSetUserLocaleMutation, Locale } from '@dream/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { Listbox, Transition } from '@headlessui/react';

const Language = ({ name, flag }) => {
  return (
    <div className="flex items-center">
      <img className="h-5 w-5" src={`/flags/${flag}.svg`} alt={name} />
      <span className="block truncate px-2">{name}</span>
    </div>
  );
};

export const LanguageControl = () => {
  const client = useApolloClient();
  const userQuery = useMeQuery();
  const user = userQuery?.data?.me;

  const [setUserLocale] = useSetUserLocaleMutation();

  const clientLocaleQuery = useQuery(gql`
    query clientLocale {
      clientLocale @client
    }
  `);

  const clientLocale = clientLocaleQuery?.data?.clientLocale;
  const locale = user?.locale || clientLocale || Locale.EnUs;

  const setLocale = (locale: Locale) => {
    if (isUser) {
      setUserLocale({
        variables: { locale },
        update() {
          userQuery.refetch();
        },
      });
    }

    localStorage.setItem('locale', locale);
    client.cache.evict({ fieldName: 'clientLocale' });
    client.cache.gc();
  };

  const isUser = !!user;

  const languages = [
    { id: 'en', flag: 'usa', name: 'English', value: Locale.EnUs },
    { id: 'ru', flag: 'russia', name: 'Русский', value: Locale.RuRu },
  ];

  const selected = languages.find((l) => l.value === locale);

  return (
    <Listbox
      value={selected}
      onChange={(language) => setLocale(language.value)}
    >
      {({ open }) => (
        <div className="relative mr-2">
          <Listbox.Button className="flex relative w-full h-8 items-center pl-4 pr-10 text-left bg-background text-white rounded cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <Language name={selected.name} flag={selected.flag} />

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-accent w-3 h-3"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute w-full mt-2 overflow-auto text-base bg-surface rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {languages.map((language, languageIdx) => (
                <Listbox.Option
                  key={languageIdx}
                  className={({ active }) =>
                    `${active ? 'text-white bg-surface-light' : 'text-accent'}
                    cursor-pointer select-none relative px-4 py-2`
                  }
                  value={language}
                >
                  {({ selected }) => (
                    <div className="flex relative">
                      <Language name={language.name} flag={language.flag} />

                      {selected ? (
                        <span className="absolute right-0 top-0 -mr-2 flex items-center h-full">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-accent w-3 h-3"
                          />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
