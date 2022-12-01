import { ClipComment } from './comment';
import { ClipCommentBottom } from './bottom';

export const ClipComments = ({ clipId }: { clipId: string }) => {
  // const clipCommentsQuery = useClipCommentsQuery({
  //   variables: { clipId },
  // });

  // useClipCommentCreatedSubscription({
  //   variables: { clipId },
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     if (!subscriptionData.data) return;

  //     const newClipComment = subscriptionData.data.clipCommentCreated;

  //     clipCommentsQuery.updateQuery((prev) => {
  //       const isDuplicate =
  //         prev.clipComments.findIndex((c) => {
  //           return c.id === newClipComment.id;
  //         }) >= 0;

  //       if (isDuplicate) {
  //         return prev;
  //       }

  //       return {
  //         ...prev,
  //         clipComments: [...prev.clipComments.slice(-50), newClipComment],
  //       };
  //     });
  //   },
  // });

  // useClipCommentRemovedSubscription({
  //   variables: { clipId },
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     if (!subscriptionData.data) return;

  //     const messageId = subscriptionData.data.clipCommentRemoved;

  //     clipCommentsQuery.updateQuery((prev) => {
  //       return {
  //         ...prev,
  //         clipComments: [
  //           ...prev.clipComments.filter((message) => {
  //             return message.id !== messageId;
  //           }),
  //         ],
  //       };
  //     });
  //   },
  // });

  // const comments =
  // clipCommentsQuery.loading ||
  // clipCommentsQuery.error ||
  // !clipCommentsQuery.data
  //   ? []
  //   : clipCommentsQuery.data.clipComments;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col flex-1">
        {/* {comments.map((comment) => (
          <ClipComment key={comment.id} {...comment} />
        ))} */}
      </div>
      <ClipCommentBottom clipId={clipId} />
    </div>
  );
};
