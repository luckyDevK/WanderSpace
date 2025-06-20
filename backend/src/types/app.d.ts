declare namespace Express {
  interface Request {
    userId?: string;
    params: {
      id: string;
    };
  }
}
