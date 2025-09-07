import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

(async () => {
  try {
    console.log("🔍 Testing database connection...");
    
    if (!process.env.DATABASE_URL) {
      throw new Error("No DATABASE_URL provided!");
    }

    const result = await sql`SELECT NOW() AS now`;
    console.log("✅ Database connected!");
    console.log("Server time:", result[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();
