import React from 'react';

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      className="p-2 my-2 border-none bg-background rounded outline-none w-full text-sm"
      {...props}
    />
  );
};
