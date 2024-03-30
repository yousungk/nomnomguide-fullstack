import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { NextRequest } from "next/server";
import { useRouter } from "next/router";

//api/get-week-statistics?restaurant_name=restaurant_name

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
    "WITH data_stats AS (" +
      "SELECT restaurant_name, scraped_date, scraped_weekday, month_year, SUM(booking_count) AS total_booking " +
      "FROM data " +
      "GROUP BY restaurant_name, scraped_date, scraped_weekday, month_year) " +
      "SELECT restaurant_name, scraped_weekday, ROUND(AVG(total_booking), 0) AS avg_total_booking " +
      "FROM data_stats " +
      "GROUP BY restaurant_name, scraped_weekday " +
      `HAVING restaurant_name LIKE '${restaurant_name}';`
  );
  console.log(restaurants);
  return Response.json(restaurants);
}
