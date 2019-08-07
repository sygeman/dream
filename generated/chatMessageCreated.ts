/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: chatMessageCreated
// ====================================================

export interface chatMessageCreated_chatMessageCreated_author {
  __typename: "User";
  id: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
}

export interface chatMessageCreated_chatMessageCreated {
  __typename: "ChatMessage";
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  author: chatMessageCreated_chatMessageCreated_author;
}

export interface chatMessageCreated {
  chatMessageCreated: chatMessageCreated_chatMessageCreated;
}

export interface chatMessageCreatedVariables {
  chatId: string;
}
