export const compactMessages = (messages: any) => {
  const compactInterval = 90e3; // 1,5 min

  return messages.map((message: any, index: any, array: any) => {
    let compact = false;

    if (index > 0) {
      const diff =
        Number.parseInt(message.createdAt, 10) -
        Number.parseInt(array[index - 1].createdAt, 10);

      if (
        diff < compactInterval &&
        message.user?.id === array[index - 1]?.user?.id
      ) {
        compact = true;
      }
    }

    return { ...message, compact };
  });
};
