export const convertTextToEmojiCode = (text: string, emojis: any) => {
  return text
    .split(' ')
    .map((word) => {
      const emoji = emojis.find((e: any) => `:${e.alias}:` === word);

      if (!emoji) return word;

      return `<:${emoji.alias}:${emoji.id}>`;
    })
    .join(' ');
};
