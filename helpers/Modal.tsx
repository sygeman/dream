import { inject, observer } from 'mobx-react';
import { FC } from 'react';
import { IStore } from '../lib/store';
import { IModalProps, Modal as ModalUI } from '../ui/Modal';

interface IProps extends IModalProps {
  store?: IStore;
}

export const ModalWithoutStore: FC<IProps> = props => {
  return (
    <ModalUI
      {...props}
      onOpen={modalId => {
        console.log('open', modalId);
        props.store.modals.set(modalId, { id: modalId });

        if (typeof props.onOpen === 'function') {
          props.onOpen(modalId);
        }
      }}
      onClose={modalId => {
        console.log('close', modalId);
        props.store.modals.delete(modalId);

        if (typeof props.onClose === 'function') {
          props.onClose(modalId);
        }
      }}
    />
  );
};

export const Modal = inject('store')(observer(ModalWithoutStore));
