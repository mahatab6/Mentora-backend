import express from "express"
const app = express()

import cors from "cors"
import { auth } from "./lib/auth"
import { toNodeHandler } from "better-auth/node"

app.use(express.json())
app.use(cors())

app.all('/api/auth/*splat', toNodeHandler(auth))

app.get('/', (req, res) => {
  res.send('mentora server runing')
})



export default app;
