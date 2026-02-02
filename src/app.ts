import express from "express"
const app = express()

import cors from "cors"
import { auth } from "./lib/auth"
import { toNodeHandler } from "better-auth/node"
import { tutorRouter } from "./modules/TutorManagement/tutor.router"
import { bookingRouter } from "./modules/Bookings/bookings.router"
import { reviewsRouter } from "./modules/Reviews/reviews.router"
import { adminRouter } from "./modules/Admin/admin.router"

app.use(express.json())
app.use(cors({
    origin: process.env.App_url,
    credentials: true
}))

app.all('/api/auth/*splat', toNodeHandler(auth))

app.get('/', (req, res) => {
  res.send('mentora server runing')
})

// tutor routes
app.use('/api/tutor', tutorRouter)

// booking routes
app.use('/api/bookings', bookingRouter)

// reviews
app.use('/api/reviews', reviewsRouter)

app.use('/api/admin', adminRouter)



export default app;
