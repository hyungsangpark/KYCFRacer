import axios, {AxiosResponse} from 'axios';
import {
  CodeBlockDTO,
  CodeBlockResponse,
  AvatarResponse,
  UserProfile,
  CreateMatchHistoryItem,
  CodeBlock
} from "../utils/Types/ApiTypes";

/**
 * This file contains methods using AXIOS to make API calls to the backend
 */

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

/**
 * Retrieve a random code block from the database
 * @param codeBlockDTO
 */
export const getRandomCodeBlock: (codeBlockDTO: CodeBlockDTO) => Promise<AxiosResponse<CodeBlockResponse>> = async (codeBlockDTO: CodeBlockDTO) => {
  return await axios.get(`${API_ENDPOINT}/codeblocks`,{
      params: {
          ...codeBlockDTO
      }
  });
}

/**
 * Retrieve a random avatar from the database to use as a profile picture for unauthenticated users
 */
export const getRandomAvatar: () => Promise<AxiosResponse<AvatarResponse>> = async () => {
  return await axios.get(`${API_ENDPOINT}/avatar`);
}

/**
 * Retrieve a user profile from the database using their token in the auth header from Auth0
 * @param token
 */
export const getUser: (token: string) => Promise<AxiosResponse<UserProfile>> = async (token: string) => {
  return await axios.get(`${API_ENDPOINT}/user`, {
      headers: {
          Authorization: `bearer ${token}`
      }
  });
}

/**
 * Create a match history item after a solo game
 * @param createMatchHistoryItem
 * @param token
 */
export const postSoloMatchHistoryResults = async (createMatchHistoryItem :CreateMatchHistoryItem, token: string) => {
  return await axios.post(`${API_ENDPOINT}/match-history/solo`, createMatchHistoryItem, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
}

/**
 * Retrieve all avatars from the database
 */
export const getAllAvatars = async () => {
  return await axios.get(`${API_ENDPOINT}/avatar/all`);
}

/**
 * Set the avatar for the user using their token in the auth header from Auth0
 * @param token
 * @param avatarId
 */
export const setUserAvatar: (token: string, avatarId: string) => Promise<AxiosResponse<string>> = async (token: string, avatarId: string) => {
  return await axios.post(`${API_ENDPOINT}/avatar/setAvatar`, {avatarId}, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
}

/**
 * Retrieve a code block from the database using its id
 * @param codeBlockId
 */
export const getCodeBlock: (codeBlockId: string) => Promise<AxiosResponse<{codeBlock: CodeBlock}>> = async (codeBlockId: string) => {
  return await axios.get(`${API_ENDPOINT}/codeblocks/${codeBlockId}`);
}