import express, { Application } from "express";


import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { tutorRouter } from "./modules/TutorManagement/tutor.router";
import { bookingRouter } from "./modules/Bookings/bookings.router";
import { reviewsRouter } from "./modules/Reviews/reviews.router";
import { adminRouter } from "./modules/Admin/admin.router";
import { studentRouter } from "./modules/Student/student.router";
import { RagRouter } from "./modules/rag/rag.route";


const app:Application = express();


// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
].filter(Boolean); // Remove undefined values



app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);



app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("mentora server runing");
});

// tutor routes
app.use("/api/tutor", tutorRouter);

// booking routes
app.use("/api/bookings", bookingRouter);

// reviews
app.use("/api/reviews", reviewsRouter);

// admin
app.use("/api/admin", adminRouter);

// student
app.use("/api/student", studentRouter);

// rag
app.use("/api/rag", RagRouter)

export default app;
