import { name, lorem, image } from 'faker';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getMessage(index = 0) {
  return {
    index: index + 1,
    authorName: `${name.firstName()} ${name.lastName()}`,
    authorAvatar: image.avatar(),
    content: lorem.text(),
    createdAt: new Date().getTime().toString(),
  };
}

export const generateMessages = async (length: number, startIndex = 0) => {
  await sleep(1000);
  return [...Array(length).keys()].map((i) => getMessage(i + startIndex));
};
