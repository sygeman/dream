export const convertTextToEmojiCode = (text: string, emojis) => {
  return text
    .split(' ')
    .map((word) => {
      const emoji = emojis.find((e) => `:${e.alias}:` === word);

      if (!emoji) return word;

      return `<:${emoji.alias}:${emoji.id}>`;
    })
    .join(' ');
};
