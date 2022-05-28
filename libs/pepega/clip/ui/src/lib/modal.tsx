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
      <div className="w-[1000px]">
        <Clip clipId={clipId} autoPlay />
      </div>
    </Modal>
  );
};
