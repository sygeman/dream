export const emojiList = {
  Ebalo: 'ebalo',
  Pepega: 'pepega',
  BibleThump: 'biblethump',
  EZ: 'ez',
  gachiBASS: 'gachibass',
  SMOrc: 'SMOrc'
};

// Ebalo -> <eid:Ebalo:ebalo>
export const convertTextToEmojiCode = (text: string) => {
  return text
    .split(' ')
    .map(word => (emojiList[word] ? `<eid:${word}:${emojiList[word]}>` : word))
    .join(' ');
};

// Text <eid:Ebalo:ebalo> bla-bla -> [
//   {type: 'text', value: 'Text'},
//   {type: 'emoji', name: 'Ebalo', id: 'ebalo'},
//   {type: 'text', value: 'bla-bla'},
// ]
export const splitTextToEmojiArray = (text: string) => {
  return text.split(/(\<eid\:[^:]+\:[a-zA-Z0-9]+\>)/g).map(txt => {
    const findEmoji = txt.match(/\<eid\:([^:]+)\:([a-zA-Z0-9]+)\>/);

    if (findEmoji) {
      return { type: 'emoji', name: findEmoji[1], id: findEmoji[2] };
    }

    return { type: 'text', value: txt };
  });
};
