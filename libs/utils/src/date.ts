import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import locale from 'date-fns/locale/ru';

export const dateDistanceInWordsToNow = (date) => {
  let numDate;

  if (Number.isInteger(date)) {
    numDate = date;
  } else if (typeof date === 'string') {
    const parsedDate = parseInt(date, 10);

    if (
      Number.isFinite(parsedDate) &&
      parsedDate.toString().length === date.length
    ) {
      numDate = parsedDate;
    } else {
      numDate = new Date(date);
    }
  }

  if (!numDate) return '';

  return formatDistanceToNow(numDate, { locale, addSuffix: true });
};
