import { WebAuthnCredential } from "#auth-utils"

export type AuthCredential = WebAuthnCredential & {
    user: AuthUser
}

export type AuthUserData = {
    userName: string,
    createdAt: Date,
    lastLoginAt: Date
}

export type AuthUser = AuthUserData & { id: number }

export const authUtils = {
    challenges: {} as { [id: string]: string },
    credentials: {} as { [id: string]: AuthCredential[] },
    credentialsIdIndex: {} as { [id: string]: AuthCredential },
    users: {} as { [id: string]: AuthUser },
    setChallenge(attemptId: string, challenge: string) {
        console.log('storeChallenge', attemptId);
        this.challenges[attemptId] = challenge;
    },
    getChallenge(attemptId: string) {
        console.log('getChallenge', attemptId);
        const challenge = this.challenges[attemptId];
        if (challenge) {
            delete this.challenges[attemptId];
        }
        return challenge;
    },
    addCredential(username: string, credential: AuthCredential) {
        console.log('setCredential', username, credential);
        if (!this.credentials[username]) this.credentials[username] = [];
        this.credentials[username].push(credential);
        this.credentialsIdIndex[credential.id] = credential;
    },
    getCredentials(username: string): AuthCredential[] {
        return this.credentials[username] ?? []
    },
    getCredentialById(credentialID: string): AuthCredential {
        return this.credentialsIdIndex[credentialID];
    },
    getUser(username: string): AuthUser {
        return this.users[username];
    },
    createUser(userData: AuthUserData): AuthUser | null {
        if (this.users[userData.userName]) {
            return null;
        }
        this.users[userData.userName] = { ...userData, id: Object.keys(this.users).length + 1 };
        return this.users[userData.userName];
    }
}