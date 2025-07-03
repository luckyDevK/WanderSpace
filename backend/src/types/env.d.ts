// types/env.d.ts

declare namespace NodeJs {
  interface ProcessEnv {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    NODE_ENV: 'development' | 'production';
    MONGO_URI: string;
    USERNAME_ADMIN: string;
    EMAIL_ADMIN: string;
    PASSWORD_ADMIN: string;
  }
}
