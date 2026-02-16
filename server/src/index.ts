import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./db.js";

const PORT = Number(process.env.PORT || 4000);

async function start() {
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI");
  if (!process.env.SESSION_SECRET) throw new Error("Missing SESSION_SECRET");

  await connectDB(process.env.MONGO_URI);

  const app = createApp();
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`),
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
