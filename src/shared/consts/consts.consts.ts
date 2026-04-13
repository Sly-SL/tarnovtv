export const parseBoolean = (value?: string): boolean =>
    value?.toLowerCase() === "true";

export const CONSTANTS = {
    FRONTEND_DOMEN: process.env.NEXT_PUBLIC_FRONTEND_DOMEN ?? "localhost:3000",
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL ?? "localhost:3000",
    IS_BETA: parseBoolean(process.env.NEXT_PUBLIC_IS_BETA) ?? true,
    FIREBASE:{
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    MAIL:{
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        login: process.env.MAIL_LOGIN,
        password: process.env.MAIL_PASSWORD,
    },
    SESSION: {
        name: process.env.SESSION_NAME ?? "session",
        secret: process.env.SESSION_SECRET ?? "secret",
        cookieSecret: process.env.COOKIES_SECRET ?? "secret",
        domain: process.env.SESSION_DOMAIN ?? "localhost",
        maxAge: process.env.SESSION_MAX_AGE ?? "1d",
        httpOnly: parseBoolean(process.env.SESSION_HTTP_ONLY),
        secure: parseBoolean(process.env.SESSION_SECURE),
        sameSite: (process.env.COOKIE_SAMESITE as "lax" | "strict" | "none") ?? "lax",
    },
    IMAGEBB_API_KEY: process.env.IMAGEBB_API_KEY
} as const;

