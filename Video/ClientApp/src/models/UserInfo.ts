export interface User {
    userName: string;
    email: string;
    id: number,
    firstName: string;
    lastName: string;
    token?: string,
    imageThumbnailUrl:string
}

export interface UpdateUserProfileVm {
    id: number,
    firstName: string;
    lastName: string;
}