import express from "express"
const app = express()

import cors from "cors"
import { auth } from "./lib/auth"
import { toNodeHandler } from "better-auth/node"
import { tutorRouter } from "./modules/TutorManagement/tutor.router"

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



export default app;
