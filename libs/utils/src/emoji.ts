// :Ebalo: -> <:Ebalo:ebalo_id>
export const convertTextToEmojiCode = (text: string, emojis) => {
  return text
    .split(' ')
    .map((word) => {
      const emoji = emojis.find((e) => `:${e.alias}:` === word);

      console.log(word, emoji);

      if (!emoji) return word;

      return `<:${emoji.alias}:${emoji.id}>`;
    })
    .join(' ');
};

export const splitTextToEmojiArray = (text: string) => {
  return text.split(/(\<\:[^:]+\:[a-zA-Z0-9]+\>)/g).map((txt) => {
    const findEmoji = txt.match(/\<\:([^:]+)\:([a-zA-Z0-9]+)\>/);

    if (findEmoji) {
      return { type: 'emoji', name: findEmoji[1], id: findEmoji[2] };
    }

    return { type: 'text', value: txt };
  });
};
