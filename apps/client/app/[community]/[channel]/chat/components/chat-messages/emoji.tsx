type Props = { emojiId: string };

export const Emoji = ({ emojiId }: Props) => {
  // const emojiQuery = useEmojiQuery({
  //   variables: { emojiId },
  //   fetchPolicy: 'cache-first',
  // });
  // const emoji = emojiQuery?.data?.emoji;

  return (
    <span className="h-6 w-6">
      {/* {emoji && (
        <img
          className="object-contain h-6 w-6"
          alt={`:${emoji.alias}: `}
          src={`https://cdn.sgmn.dev/emojis/${emoji.id}.${
            emoji.type.split('/')[1]
          }`}
        />
      )} */}
    </span>
  );
};
