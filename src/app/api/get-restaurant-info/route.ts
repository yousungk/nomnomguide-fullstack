import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { NextRequest } from "next/server";

//api/get-restaurant-info?restaurant_name=restaurant_name

export async function GET(request: NextRequest) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get("restaurant_name");
  const restaurant_name = param
    ? decodeURIComponent(param).replace("'", "''")
    : "Kalaya";

  const restaurants = await db.all(
    `SELECT * FROM restaurants WHERE restaurant_name LIKE '%${restaurant_name}%'`
  );
  return Response.json(restaurants);
}
