import { WebAuthnCredential } from "#auth-utils"
import { nanoid } from "nanoid"

export type AuthCredential = {
    userId: string;
} & WebAuthnCredential

export type AuthUserData = {
    userName: string,
    [id: string]: any
}

export type AuthUser = {
    id: string
    createdAt: Date,
} & AuthUserData

export const authUtils = {
    async setChallenge(attemptId: string, challenge: string) {
        console.log(`store challenge:${attemptId}`, attemptId, challenge);
        await hubKV().set(`challenge:${attemptId}`, challenge, { ttl: 120 })
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
    async getUserById(id: string): Promise<AuthUser | null> {
        return await hubKV().get<AuthUser>(`user:${id}`);
    },
    async createUser(userData: AuthUserData): Promise<AuthUser> {
        const user: AuthUser = { id: nanoid(), createdAt: new Date(), ...userData }
        await hubKV().set(`user:${user.id}`, user)
        return user;
    }
}