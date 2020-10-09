export class NotificationConstants {
    static get emailActivation(): string {
        return 'You are almost ready to start using your account. Please check email to activate your account.';
    }
    static get successUserActivation(): string {
        return 'Your account successfully activate. Please login.';
    }
    static get failedUserActivation(): string {
        return 'Your activation failed. Please try activate later.';
    }
}