export type Bindings = {
  DB: D1Database;
  MEDIA: R2Bucket;
  ENV: "development" | "production";
  JWT_SECRET: string;
  JWT_ISSUER: string;
  PAYPAL_API: string;
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  ALLOWED_ORIGINS: string;
};

export type AppVars = {
  user?: {
    id: number;
    email: string;
    role: string;
  };
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: AppVars;
};
