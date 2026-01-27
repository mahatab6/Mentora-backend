import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    trustedOrigins:[process.env.BETTER_AUTH_URL!],
    emailAndPassword:{
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: true,
    }
});