/**
 * This file defines typescript types for the API
 */

export type CodeBlockResponse = {
  codeBlocks: CodeBlock[];
};

export type CodeBlock = {
  _id?: string;
  language: string;
  time: string;
  code: string;
};

export type CodeBlockDTO = {
  language: string;
  time: string;
};

export type AvatarResponse = {
  avatar: Avatar;
};

export type Avatar = {
  _id?: string;
  url: string;
};

export type UserProfile = {
  username: string;
  profilePicture: string;
  avgStats: UserProfileStats;
  matchHistory: MatchHistoryItem[];
};

export type UserProfileStats = {
  avgCPM: number;
  avgAccuracy: number;
  avgErrors: number;
  victories: number;
};

export type CreateMatchHistoryItem = {
  avgCPM: number;
  avgAccuracy: number;
  avgErrors: number;
  codeBlockId: string;
};

export type MatchHistoryItem = {
  _id?: string;
  users: MatchHistoryUser[];
  codeBlock: CodeBlock;
  date: string;
};

export type MatchHistoryUser = {
  userId: string;
  username: string;
  profilePicture: string;
  stats: MatchHistoryUserStats;
};

export type MatchHistoryUserStats = {
  avgCPM: number;
  avgAccuracy: number;
  avgErrors: number;
};
