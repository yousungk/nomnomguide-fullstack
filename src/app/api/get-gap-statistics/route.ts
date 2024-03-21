import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { NextRequest } from "next/server";
import { useRouter } from "next/router";

//api/get-gap-statistics?restaurant_name=restaurant_name

export async function GET(request: NextRequest) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get("restaurant_name");
  const restaurant_name = param ? param : "Kalaya";

  const restaurants = await db.all(
    "WITH temp AS ( " +
      "SELECT * " +
      "FROM data " +
      "WHERE booking_count > 0) " +
      "SELECT restaurant_name, ROUND(SUM(booking_day_gap * booking_count) / SUM(booking_count), 0) AS weighted_booking_gap " +
      "FROM temp " +
      "GROUP BY restaurant_name " +
      `HAVING restaurant_name LIKE '${restaurant_name}';`
  );
  console.log(restaurants);
  return Response.json(restaurants);
}
