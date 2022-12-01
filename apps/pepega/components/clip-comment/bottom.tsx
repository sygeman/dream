import { useRef } from 'react';
import { useAccess } from '../../utils/use-access';

export const ClipCommentBottom = ({ clipId }: { clipId: string }) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [{ allow: isAllow }] = useAccess();
  let lock = false;

  // const [createClipComment] = useCreateClipCommentMutation({
  //   onCompleted: (data) => {
  //     if (data.createClipComment && textInput.current) {
  //       textInput.current.value = '';
  //       lock = false;
  //     }
  //   },
  // });

  return (
    <div className="h-16 flex relative">
      <input
        className="w-[calc(100%-20px)] px-4 h-8 bg-background rounded text-sm outline-none m-2"
        disabled={!isAllow}
        ref={textInput}
        maxLength={500}
        type="text"
        placeholder={
          isAllow
            ? 'Написать комментарий...'
            : 'Войдите чтобы писать комментарии'
        }
        onKeyPress={(e) => {
          if (!textInput.current) return null;

          const content = textInput.current.value.trim();

          if (e.key === 'Enter' && !lock && content.length > 0) {
            lock = true;
            // createClipComment({
            //   variables: { input: { clipId, content } },
            // });
          }
        }}
      />
    </div>
  );
};
