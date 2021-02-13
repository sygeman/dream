import React from 'react';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import { ChatIcon } from '@dream/icons/chat';
import { UsersIcon } from '@dream/icons/users';
import { EmojiIcon } from '@dream/icons/emoji';
import { ChatMessage } from '@dream/components/chat-message';
import { MainLayout } from '../layouts/main';

const LeftPanel = ({ name }) => {
  return (
    <div className="h-screen flex flex-col w-240px bg-surface">
      <div className="flex items-center w-full h-48px px-4 bg-primary hover:opacity-95">
        <span className="text-text">{name}</span>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-2">
          {[...Array(50).keys()].map((k) => (
            <div key={k} className="flex items-center flex-1 w-full px-4 py-1">
              <div className="flex flex-col flex-1">
                <div className="flex flex-1">
                  <span className="text-text text-sm">Channel #{k}</span>
                </div>
                <div className="flex flex-1">
                  <span className="text-gray-500 text-xs">Artist - Track</span>
                </div>
              </div>

              <div>
                <span className="text-text text-xs rounded bg-background px-2 py-1">
                  {k}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-48px bg-surface border-t border-background"></div>
    </div>
  );
};

const Content = () => {
  return <div className="h-screen flex flex-1"></div>;
};

const RightPanel = () => {
  return (
    <div className="h-screen flex flex-col w-320px bg-surface">
      <div className="flex border-b border-background">
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <ChatIcon />
          </span>
        </div>
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <UsersIcon />
          </span>
        </div>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {[...Array(50).keys()].map((k) => (
            <ChatMessage key={k} username="user" content={`message ${k}`} />
          ))}
        </div>
      </div>

      <div className="flex relative">
        <TextareaAutosize
          maxRows={3}
          placeholder="Send a message"
          className="bg-background text-text text-xs resize-none mx-2 mb-4 p-2 rounded w-full focus:outline-none focus:ring-1"
        />
        <div className="flex absolute right-4 bottom-6">
          <EmojiIcon />
        </div>
      </div>
    </div>
  );
};

export function CommunityPage() {
  const router = useRouter();
  const community = router.query?.community;

  return (
    <MainLayout>
      <LeftPanel name={community} />
      <Content />
      <RightPanel />
    </MainLayout>
  );
}

export default CommunityPage;
