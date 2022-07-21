import express from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USER: string;
      HOST: string;
      PWD: string;
      DB: string;
    }
  }

  namespace Express {
    interface Request {
      user?: Record<Object | String>;
    }
  }
}
