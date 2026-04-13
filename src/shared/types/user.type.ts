export type UserRecord = {
    id: string;
    name: string;
    email: string;
    password: string;
    bad_attempts: number;
    token: string;
    admin?: boolean;
};