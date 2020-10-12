export interface User {
    userName: string;
    email: string;
    id: number,
    firstName: string;
    lastName: string;
    imageUrl: string;
    token?: string,
}

export interface UpdateUserProfileVm {
    id: number,
    firstName: string;
    lastName: string;
}