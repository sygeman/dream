import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const ChatIcon = () => {
  return (
    <svg
      height="16px"
      width="16px"
      className="fill-current text-text"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const UsersIcon = () => {
  return (
    <svg
      height="16px"
      width="16px"
      className="fill-current text-accent"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  );
};

const LeftPanel = () => {
  return (
    <div className="h-screen flex flex-col w-240px bg-surface">
      <div className="w-full px-4 py-2 bg-primary hover:opacity-95">
        <span className="text-text">Community</span>
      </div>

      <div className="flex-1 w-full px-4 py-2">
        <span className="text-text text-sm">Channel #1</span>
      </div>

      <div className="px-4 py-2 bg-surface border-t border-background">
        <div className="rounded-full bg-background h-32px w-32px"></div>
      </div>
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
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface border-l border-background">
          <span className="text-text text-sm">
            <UsersIcon />
          </span>
        </div>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {[...Array(50).keys()].map((k) => (
            <div key={k} className="px-2 w-full">
              <span className="text-accent text-xs">user</span>
              <span className="text-text text-xs mr-1">:</span>
              <span className="text-text text-xs">message {k}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex">
        <TextareaAutosize
          maxRows={3}
          placeholder="Send a message"
          className="bg-background text-text text-xs resize-none mx-2 mb-4 p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>
    </div>
  );
};

export function Index() {
  return (
    <div className="h-screen bg-background flex">
      <LeftPanel />
      <Content />
      <RightPanel />
    </div>
  );
}

export default Index;
