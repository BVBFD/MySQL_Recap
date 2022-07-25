import express from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: any;
      USER: any;
      HOST: any;
      PWD: any;
      DB: any;
    }
  }

  namespace Express {
    interface Request {
      user?: Record<Object | String>;
    }
  }
}
