import { useModal } from '@dream/mono-utils-use-modal';
import { Clip } from '@dream/pepega/clip/ui';
import { Modal } from '@dream/pepega/components/modal';
import { useRouter } from 'next/router';

export const ClipModal = () => {
  const router = useRouter();
  const modalProps = useModal();

  if (!router) return null;

  let clipId = '';

  if (typeof router.query['clipId'] === 'string') {
    clipId = router.query['clipId'];
  }

  return (
    <Modal id="clipId" minimal {...modalProps}>
      <div
        className="max-w-[1000px] min-w-[320px] w-[1000px] rounded overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Clip clipId={clipId} autoPlay />
      </div>
    </Modal>
  );
};
