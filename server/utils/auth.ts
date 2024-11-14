import { WebAuthnCredential } from "#auth-utils"

export type AuthCredential = WebAuthnCredential & {
    user: AuthUser
}

export type AuthUserData = {
    userName: string,
    [id: string]: any
}

export type AuthUser = {
    userName: string,
    createdAt: Date,
}


export const authUtils = {
    async setChallenge(attemptId: string, challenge: string) {
        console.log('storeChallenge', attemptId);
        await hubKV().set(`challenge:${attemptId}`, challenge, { ttl: 60 })
    },
    async getChallenge(attemptId: string) {
        console.log('getChallenge', attemptId);
        const challenge = await hubKV().get<string>(`challenge:${attemptId}`);
        if (challenge) {
            await hubKV().del(`challenge:${attemptId}`);
        }
        return challenge;
    },
    async addCredential(username: string, credential: AuthCredential) {
        const userCredentialIds = await hubKV().get<string[]>(`user:credentials:${username}`) ?? []
        userCredentialIds.push(credential.id);
        await hubKV().set(`credential:${credential.id}`, credential);
        await hubKV().set(`user:credentials:${username}`, userCredentialIds);
        console.log('addCredential done');
    },
    async getCredentials(username: string): Promise<AuthCredential[]> {
        const userCredentialIds = await hubKV().get<string[]>(`user:credentials:${username}`) ?? []
        const keys = userCredentialIds.map(id => `credential:${id}`);
        return (await hubKV().getItems<AuthCredential>(keys)).map(i => i.value);
    },
    async getCredentialById(credentialID: string): Promise<AuthCredential | null> {
        return await hubKV().get<AuthCredential>(`credential:${credentialID}`);
    },
    async getUser(username: string): Promise<AuthUser | null> {
        return await hubKV().get<AuthUser>(`user:${username}`);
    },
    async createUser(userData: AuthUserData): Promise<AuthUser | null> {
        if (await this.getUser(userData.userName)) {
            return null;
        }
        const user = { createdAt: new Date(), ...userData }
        await hubKV().set(`user:${userData.userName}`, user)
        return user;
    }
}