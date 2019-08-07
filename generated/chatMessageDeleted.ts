/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: chatMessageDeleted
// ====================================================

export interface chatMessageDeleted_chatMessageDeleted_author {
  __typename: "User";
  id: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
}

export interface chatMessageDeleted_chatMessageDeleted {
  __typename: "ChatMessage";
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  author: chatMessageDeleted_chatMessageDeleted_author;
}

export interface chatMessageDeleted {
  chatMessageDeleted: chatMessageDeleted_chatMessageDeleted;
}

export interface chatMessageDeletedVariables {
  chatId: string;
}
