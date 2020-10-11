export default class ValidationConstants {
    static get auth(): any {
        return {
            required: 'This value is required',
            invalidEmail: 'Invalid email address',
            passwordLegth: 'Must contain at least 5 characters',
            passwordsNotMatch: "Passwords don't match"
        };
    }

    static get folder(): any {
        return {
            name: 'Name is required',
        };
    }
}