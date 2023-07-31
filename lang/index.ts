import * as en_US from './en_US';
import * as ru_RU from './ru_RU';

export const lang = {
  [en_US.metadata.value]: {
    ...en_US.metadata,
    messages: en_US.messages,
  },
  [ru_RU.metadata.value]: {
    ...ru_RU.metadata,
    messages: ru_RU.messages,
  },
};
