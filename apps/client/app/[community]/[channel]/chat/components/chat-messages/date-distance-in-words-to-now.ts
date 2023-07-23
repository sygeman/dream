import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import locale from 'date-fns/locale/en-US';

export const dateDistanceInWordsToNow = (date: any) => {
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
