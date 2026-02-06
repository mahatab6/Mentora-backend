import express from "express";
const app = express();

import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { tutorRouter } from "./modules/TutorManagement/tutor.router";
import { bookingRouter } from "./modules/Bookings/bookings.router";
import { reviewsRouter } from "./modules/Reviews/reviews.router";
import { adminRouter } from "./modules/Admin/admin.router";
import { studentRouter } from "./modules/Student/student.router";

const allowedOrigins = [
  process.env.App_url || "http://localhost:3000", // Production frontend URL
].filter(Boolean);

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin);

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

export default app;
