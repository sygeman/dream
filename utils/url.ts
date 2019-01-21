import { omit } from 'lodash';
import Router from 'next/router';
import queryString from 'query-string';

interface IProcess {
  browser: boolean;
}

declare var process: IProcess;

interface IChangeURLParams {
  set?: object;
  remove?: string[];
}

export const changeURLParams = ({ set, remove }: IChangeURLParams) => {
  if (!process.browser) {
    return;
  }

  const currentPath = location.pathname;
  let currentSearchParsed = queryString.parse(location.search);

  // Remove
  if (remove && remove.length > 0) {
    currentSearchParsed = omit(currentSearchParsed, remove);
  }

  // Add
  if (set && typeof set === 'object' && Object.keys(set).length > 0) {
    currentSearchParsed = { ...currentSearchParsed, ...set };
  }

  let currentSearch = queryString.stringify(currentSearchParsed);

  if (currentSearch) {
    currentSearch = '?' + currentSearch;
  }

  Router.push(currentPath + currentSearch);
};
