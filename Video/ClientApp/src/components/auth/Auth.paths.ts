export class AuthPaths {
    static get microsoftAuth(): string { return 'auth/microsoft'; }
    static get googleAuth(): string { return 'auth/google'; }
    static get signIn(): string { return 'auth/signin'; }
    static get signUp(): string { return 'auth/signup'; }
    static get updateUser(): string { return 'user'; }
    static activateUser(token: string): string { return `user/activate/${token}`; }
}