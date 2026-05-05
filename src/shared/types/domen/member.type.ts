export type MemberType = {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
        instagram?: string;
        tiktok?: string;
        facebook?: string;
    };
    order: number;
};