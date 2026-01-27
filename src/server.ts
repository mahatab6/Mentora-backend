import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.Server_Port;

async function mentora() {
  try {
    await prisma.$connect();
    console.log("Prisma server connented!!!");

    app.listen(port, () => {
      console.log(`Mentora server listening on port ${port}`);
    });
  } catch (error) {
    console.log("mentora server find some problem")
    await prisma.$disconnect()
    process.exit()
  }
}

mentora();