import sqlite3 from "sqlite3";
import { open } from "sqlite";

// get restaurant information from the database
export async function GET() {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });
  const restaurants = await db.all(
    "SELECT DISTINCT restaurant_name FROM restaurants"
  );
  return Response.json(restaurants);
}
