import { useRouter } from 'next/router';
import { useModal } from '../../utils/use-modal';
import { Clip } from './index';
import { Modal } from '../modal';

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
