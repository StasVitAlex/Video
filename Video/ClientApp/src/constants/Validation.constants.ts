export default class ValidationConstants {
    static get auth(): any {
        return {
            required: 'This value is required',
            invalidEmail: 'Invalid email address',
            passwordLegth: 'Must contain at least 5 characters'
        };
    }
}