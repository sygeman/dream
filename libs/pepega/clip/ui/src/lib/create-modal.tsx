import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/pepega/components/modal';
import { CreateClip } from './create';

export const CreateClipModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="newClip" title="Предложить клип" {...modalProps}>
      <CreateClip />
    </Modal>
  );
};
