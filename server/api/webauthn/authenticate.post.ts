import { authUtils } from "~/server/utils/auth";

export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    await authUtils.setChallenge(attemptId, challenge);
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
  async allowCredentials(event, userName) {
    const credentials = authUtils.getCredentials(userName);
    console.log('allowCredential', userName, credentials);
    return credentials ?? []
  },

  async getCredential(event, credentialID) {
    console.log('getCredential', credentialID);
    const credential = await authUtils.getCredentialById(credentialID);
    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Credential not found'
      })
    }
    return credential
  },
  async onSuccess(event, { credential }) {
    console.log('onSuccess', credential);
    await setUserSession(event, {
      user: {
        userName: credential.user.userName
      }
    })
  }
})
