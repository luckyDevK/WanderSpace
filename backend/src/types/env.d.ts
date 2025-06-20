// types/env.d.ts

declare namespace NodeJs {
  interface ProcessEnv {
    JWT_SECRET: string;
    NODE_ENV: 'development' | 'production';
    MONGO_URI: string;
  }
}
