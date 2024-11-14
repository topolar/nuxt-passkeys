import { z } from 'zod'
import { authUtils } from '~/server/utils/auth';

export default defineWebAuthnRegisterEventHandler({

  async storeChallenge(event, challenge, attemptId) {
    authUtils.setChallenge(attemptId, challenge);
  },

  async getChallenge(event, attemptId) {
    const challenge = await authUtils.getChallenge(attemptId);
    if (!challenge) {
      throw createError({
        statusCode: 400,
        message: 'Challenge not found or expired'
      })
    }
    return challenge
  },

  validateUser: user => {
    console.log('register.validateUser', user);
    return z.object({
      userName: z.string().min(1).toLowerCase().trim(),
    }).parseAsync(user)
  },

  async onSuccess(event, { user, credential }) {
    console.log('register.onSuccess', user, credential);
    const newUser = await authUtils.createUser({
      userName: user.userName,
    });

    if (!newUser) {
      throw createError({
        statusCode: 400,
        message: 'User already exists'
      })
    }

    await authUtils.addCredential(user.userName, { user: newUser, ...credential });

    await setUserSession(event, {
      user: {
        userName: user.userName,
      }
    })
  },
  async excludeCredentials(event, userName): Promise<any> {
    console.log('register.excludeCredentials', userName);
    const credentials = await authUtils.getCredentials(userName);
    return credentials.map((i: any) => ({ id: i.id, transports: i.transports }));
  },
})
