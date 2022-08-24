interface UserWithSub extends Express.User {
  sub?: string;
}

/**
 * Helper method used to extract the user sub from the request.
 * @param user
 * @constructor
 */
export const GetUserIdFromExpressUser: (
  user: Express.User | undefined
) => string = (user: Express.User | undefined) => {
  if (user === undefined) {
    return "";
  }

  const userWithSub: UserWithSub = user;

  if (userWithSub.sub === undefined) {
    return "";
  }

  return userWithSub.sub.split("|")[1];
};
