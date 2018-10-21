import { AuthenticationError } from 'apollo-server-express';

export const isAuthenticated = async(
  resolve,
  parent,
  args,
  ctx,
  info
) => {
  if (!ctx.session.userId) {
    throw new AuthenticationError('Not authenticated');
  }

  return resolve(parent, args, ctx, info); 
}