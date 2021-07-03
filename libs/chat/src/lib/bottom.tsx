import React, { Fragment, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useCreateChannelMessageMutation } from '@dream/types';
import { convertTextToEmojiCode } from '@dream/utils/emoji';
import { Menu, Transition } from '@headlessui/react';
import { GifPicker } from './components/gif-picker';
import { PhotographIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

interface ChatBottomProps {
  channelId: string;
}

export const ChatBottom: React.FC<ChatBottomProps> = ({ channelId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  let lock = false;

  const [createMessage] = useCreateChannelMessageMutation({
    onCompleted: (data) => {
      if (data.createChannelMessage && textareaRef.current) {
        textareaRef.current.value = '';
        lock = false;
      }
    },
  });

  const sendMessage = () => {
    const content = convertTextToEmojiCode(textareaRef.current.value.trim());

    if (!lock && content.length > 0) {
      lock = true;
      createMessage({
        variables: { input: { channelId, content } },
      });
    }
  };

  return (
    <div className="px-2">
      <div className="flex relative">
        <TextareaAutosize
          ref={textareaRef}
          maxLength={500}
          maxRows={3}
          placeholder="Send a message"
          className="bg-background text-white text-xs resize-none p-2 rounded w-full focus:outline-none focus:ring-1"
          onKeyPress={(e) => {
            if (!textareaRef.current) {
              return null;
            }

            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <Menu>
          <>
            <Menu.Button className="absolute right-2 bottom-2">
              {({ open }) => (
                <PhotographIcon
                  className={clsx('h-4', open ? 'text-white' : 'text-accent')}
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 bottom-10 bg-background rounded w-full shadow-md">
                <GifPicker
                  onSelect={(content) => {
                    createMessage({
                      variables: { input: { channelId, content } },
                    });
                  }}
                  gifContainer={(gif) => <Menu.Item>{gif}</Menu.Item>}
                />
              </Menu.Items>
            </Transition>
          </>
        </Menu>
      </div>
      <div className="flex justify-end my-2">
        <button className="btn btn-primary" onClick={sendMessage}>
          Chat
        </button>
      </div>
    </div>
  );
};
