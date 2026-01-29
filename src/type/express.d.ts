import { session } from "../lib/auth"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string,
        email: string
      };
    }
  }
}
