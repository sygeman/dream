import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
          <span className="text-text text-sm">Chat</span>
        </div>
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface border-l border-background">
          <span className="text-text text-sm">Users</span>
        </div>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {[...Array(50).keys()].map((k) => (
            <div key={k} className="px-4 w-full">
              <span className="text-accent text-xs">user</span>
              <span className="text-text text-xs mr-1">:</span>
              <span className="text-text text-xs">Message {k}</span>
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
