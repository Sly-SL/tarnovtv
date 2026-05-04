// @/shared/types/domen/token.type.ts
export type TokenKinds = "email-verification" | "change-password" | "two-factor";

export interface TokenType {
    id: string;
    token: string;
    userId: string;
    type: TokenKinds;
    expiresIn: number;
}