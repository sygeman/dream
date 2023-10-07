'use client';
import { Menu, Tab, Transition } from '@headlessui/react';
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useParams, usePathname } from 'next/navigation';
import React, { Fragment, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { Button } from '@/components/ui/button';

import { createMessageAction } from './actions';
import { EmojiPicker } from './components/emoji-picker';
import { GifPicker } from './components/gif-picker';
import { PickerTab } from './components/picker-tab';
import { convertTextToEmojiCode } from './convert-text-to-emoji-code';

interface ChatBottomProperties {
  channelId: string;
}

export const ChatBottom: React.FC<ChatBottomProperties> = ({ channelId }) => {
  const parameters = useParams();
  const textareaReference = useRef<HTMLTextAreaElement>(null);
  let lock = false;

  // const { communityId } = useCommunityChannel();

  // const emojisQuery = useEmojisQuery({
  //   variables: { communityId },
  //   skip: !communityId,
  // });

  // const emojis = emojisQuery?.data?.emojis || [];
  const emojis: any[] = [];

  const sendMessage = async () => {
    const content = convertTextToEmojiCode(
      (textareaReference.current?.value || '').trim(),
      emojis
    );

    if (!lock && content.length > 0) {
      lock = true;

      const formData = new FormData();
      formData.set('content', content);

      await createMessageAction({
        content,
        community: parameters.community as string,
        channel: parameters.channel as string,
      });

      if (textareaReference.current) {
        textareaReference.current.value = '';
        lock = false;
      }
    }
  };

  enum PickerType {
    EMOJI,
    GIF,
  }

  const [pickerType, setPickerType] = useState(PickerType.EMOJI);

  return (
    <div className="px-2">
      <div className="flex relative">
        <TextareaAutosize
          ref={textareaReference}
          maxLength={500}
          maxRows={3}
          rows={1}
          placeholder="Send a message"
          className="bg-background text-white text-xs resize-none p-2 pr-6 rounded w-full focus:outline-none focus:ring-1"
          onKeyDown={(event) => {
            if (!textareaReference.current) {
              return;
            }

            if (event.key === 'Enter') {
              event.preventDefault();
              sendMessage();
            }
          }}
        />

        <Menu>
          <>
            <Menu.Button id="gif" className="absolute right-8 bottom-2">
              {({ open }) => (
                <PhotoIcon
                  onClick={() => setPickerType(PickerType.GIF)}
                  className={clsx(
                    'h-4',
                    open && pickerType === PickerType.GIF
                      ? 'text-white'
                      : 'text-muted-foreground'
                  )}
                />
              )}
            </Menu.Button>
            <Menu.Button id="emoji" className="absolute right-2 bottom-2">
              {({ open }) => (
                <FaceSmileIcon
                  onClick={() => setPickerType(PickerType.EMOJI)}
                  className={clsx(
                    'h-4',
                    open && pickerType === PickerType.EMOJI
                      ? 'text-white'
                      : 'text-muted-foreground'
                  )}
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 bottom-10 bg-background rounded w-full shadow-md">
                <Tab.Group
                  defaultIndex={pickerType === PickerType.GIF ? 0 : 1}
                  onChange={(index) =>
                    setPickerType(
                      index === 0 ? PickerType.GIF : PickerType.EMOJI
                    )
                  }
                >
                  <Tab.List className="p-1">
                    <Tab>
                      {({ selected }) => (
                        <PickerTab selected={selected}>Gif</PickerTab>
                      )}
                    </Tab>
                    <Tab>
                      {({ selected }) => (
                        <PickerTab selected={selected}>Emoji</PickerTab>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels as="div" className="h-80">
                    <Tab.Panel>
                      <GifPicker
                        onSelect={(content) => {
                          // createMessage({
                          //   variables: { input: { channelId, content } },
                          // });
                        }}
                        gifContainer={(gif) => <Menu.Item>{gif}</Menu.Item>}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <EmojiPicker
                        onSelect={(alias) => {
                          const previousValue =
                            textareaReference.current?.value || '';
                          const newValue =
                            previousValue.length === 0
                              ? `:${alias}: `
                              : `${previousValue} :${alias}: `;

                          if (textareaReference.current) {
                            textareaReference.current.value = newValue;
                          }
                        }}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Menu.Items>
            </Transition>
          </>
        </Menu>
      </div>
      <div className="flex justify-end my-2">
        <Button size={'sm'} onClick={sendMessage}>
          Chat
        </Button>
      </div>
    </div>
  );
};
