import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import locale from 'date-fns/locale/ru';
import { isNumber, isString, isFinite } from 'lodash';

export const dateDistanceInWordsToNow = date => {
  let numDate;

  if (isNumber(date)) {
    numDate = date;
  } else if (isString(date)) {
    const parsedDate = parseInt(date, 10);

    if (isFinite(parsedDate) && parsedDate.toString().length === date.length) {
      numDate = parsedDate;
    } else {
      numDate = new Date(date);
    }
  }

  if (!numDate) {
    return 'Ошибка даты';
  }

  return formatDistanceToNow(numDate, { locale }) + ' назад';
};
