import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import WeekBar from "@/app/bar_chart_week/page";
import MonthBar from "@/app/bar_chart_month/page";
import Link from "next/link";
import Image from "next/image";

const door = The_Girl_Next_Door({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

interface restaurantInfo {
  restaurant_name: string;
  restaurant_address: string;
  rating: number;
  review_count: number;
  description: string;
  scraped_date: string;
  scraped_time: string;
}

// function to capitalize first letter
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// get list of restaurants
async function getRestaurantList() {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });
  const restaurants = await db.all(
    "SELECT DISTINCT restaurant_name FROM restaurants"
  );

  let list = [];
  for (let i = 0; i < restaurants.length; i++) {
    list.push(restaurants[i].restaurant_name);
  }
  return list;
}

// get function to get restaurant info
async function getRestaurantInfo(restaurant: string) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });
  const data = await db.all(
    `SELECT * FROM restaurants WHERE restaurant_name LIKE '%${restaurant.replace(
      "'",
      "''"
    )}%'`
  );
  return data[0];
}

// get function to get week stats
async function getWeekStats(restaurant: string) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });

  const restaurants = await db.all(
    "WITH data_stats AS (" +
      "SELECT restaurant_name, scraped_date, scraped_weekday, month_year, SUM(booking_count) AS total_booking " +
      "FROM data " +
      "GROUP BY restaurant_name, scraped_date, scraped_weekday, month_year) " +
      "SELECT restaurant_name, scraped_weekday, ROUND(AVG(total_booking), 0) AS avg_total_booking " +
      "FROM data_stats " +
      "GROUP BY restaurant_name, scraped_weekday " +
      `HAVING restaurant_name LIKE '${restaurant.replace("'", "''")}';`
  );

  return restaurants;
}

// get function to get month stats
async function getMonthStats(restaurant: string) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });

  const restaurants = await db.all(
    "WITH data_stats AS (" +
      "SELECT restaurant_name, scraped_date, scraped_weekday, month_year, SUM(booking_count) AS total_booking " +
      "FROM data " +
      "GROUP BY restaurant_name, scraped_date, scraped_weekday, month_year) " +
      "SELECT restaurant_name, month_year, SUM(total_booking) AS sum_total_booking " +
      "FROM data_stats " +
      "GROUP BY restaurant_name, month_year " +
      `HAVING restaurant_name LIKE '${restaurant.replace("'", "''")}';`
  );
  return restaurants;
}

// function to get gap average
async function getGapAvg(restaurant: string) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });

  const restaurants = await db.all(
    "SELECT restaurant_name, ROUND(SUM(booking_day_gap * booking_count) / SUM(booking_count), 0) AS weighted_booking_gap " +
      "FROM data " +
      "GROUP BY restaurant_name " +
      `HAVING restaurant_name LIKE '${restaurant.replace("'", "''")}';`
  );

  return restaurants[0].weighted_booking_gap;
}

// function to get daily average
async function getDailyAvg(restaurant: string) {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });

  const restaurants = await db.all(
    "WITH data_stats AS (" +
      "SELECT restaurant_name, scraped_date, scraped_weekday, month_year, SUM(booking_count) AS total_booking " +
      "FROM data " +
      "GROUP BY restaurant_name, scraped_date, scraped_weekday, month_year) " +
      "SELECT restaurant_name, ROUND(AVG(total_booking), 0) AS avg_total_booking " +
      "FROM data_stats " +
      "GROUP BY restaurant_name " +
      `HAVING restaurant_name LIKE '${restaurant.replace("'", "''")}';`
  );

  return restaurants[0].avg_total_booking;
}

export default async function BookingGuide({
  params,
}: {
  params: { restaurant: string };
}) {
  let restaurant = decodeURIComponent(params.restaurant);
  // fetch statistics from sqlite
  const restaurantInfo = await getRestaurantInfo(restaurant);
  const weekStats = await getWeekStats(restaurant);
  const monthStats = await getMonthStats(restaurant);
  const dailyAvg = await getDailyAvg(restaurant);
  const gapAvg = await getGapAvg(restaurant);

  // create variables to manage going to next restaurant
  const currentRestaurant = restaurant.toString();
  const restaurantList = await getRestaurantList();
  let currentIndex = restaurantList.indexOf(restaurant);
  let nextIndex = (currentIndex + 1) % restaurantList.length;
  let nextRestaurant = restaurantList[nextIndex];

  // get min and max day
  async function getMinDay() {
    let min = weekStats[0].avg_total_booking;
    let minday = "";
    for (const day in weekStats) {
      if (weekStats[day].avg_total_booking <= min) {
        min = weekStats[day].avg_total_booking;
        minday = weekStats[day].scraped_weekday;
      }
    }
    return minday;
  }
  const minDay = await getMinDay();

  // get max day
  async function getMaxDay() {
    let max = weekStats[0].avg_total_booking;
    let maxday = "";
    for (const day in weekStats) {
      if (weekStats[day].avg_total_booking >= max) {
        max = weekStats[day].avg_total_booking;
        maxday = weekStats[day].scraped_weekday;
      }
    }
    return maxday;
  }
  const maxDay = await getMaxDay();

  return (
    <div className="bg-white w-screen pb-10">
      <div className="flex flex-col">
        <div className="px-6 pb-6">
          <div className="flex flex-col bg-white w-2/3 h-54 px-8 pt-16">
            <div className={door.className}>
              <div className="text-2xl">Booking Guide</div>
            </div>
            <div className="py-2 italic text-md">
              Analysis on booking trends and statistics based on daily scraped
              data from Google Reservations. Use this page to discover the
              optimal days to make a reservation and determine the ideal booking
              lead time.
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className={door.className}>
            <div className="bg-white text-xl mx-6 px-8 py-2 font-bold underline">
              About Restaurant
            </div>
          </div>
          <div className="mx-6 flex flex-row w-3/5 px-8">
            <Image
              src={"/" + restaurantInfo.restaurant_name + ".jpeg"}
              alt="Picture of restaurant"
              width={150}
              height={150}
              className="rounded-lg"
              style={{
                maxHeight: "150px",
                maxWidth: "150px",
                minWidth: "150px",
                minHeight: "150px",
                objectFit: "cover", // Add object-fit property
              }}
            />
            <div className="flex items-center">
              <div
                className={classNames(
                  "flex flex-col pl-5 space-y-1",
                  poppins.className
                )}
              >
                <div className="font-bold text-lg">
                  {restaurantInfo.restaurant_name}
                </div>
                <div className="text-sm">
                  {restaurantInfo.restaurant_address}
                </div>
                <div className="text-sm py-1">{restaurantInfo.description}</div>
                <div className="flex flex-row text-sm">
                  <div>{restaurantInfo.rating} out of 5 Rating</div>
                  <div className="px-5 text-sm">
                    {restaurantInfo.review_count} Google reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-row bg-white p-5 rounded-lg shadow-lg border-none text-sm place-content-left place-items-center">
            <div className="font-semibold pr-2">Name: </div>
            <div>{capitalizeFirstLetter(currentRestaurant)}</div>
          </div>
          <div className="flex flex-row bg-white p-5 rounded-lg shadow-lg border-none text-sm place-content-left place-items-center">
            <div className="font-semibold pr-2">Address: </div>
            <div>{restaurantInfo.restaurant_address}</div>
          </div> */}
        {/* <div className="content-center items-center place-items-center">
            <Link
              href="/booking/[restaurant]"
              as={`/booking/${nextRestaurant}`}
            >
              <div className="place-self-center">Next restaurant</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 place-self-center"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div> */}
        {/* <div className="px-6 pb-6">
          <div className="flex flex-row bg-white w-3/5 h-54 px-8 py-6 rounded-lg shadow-lg">
            {restaurantInfo.description}
          </div>
        </div> */}

        <div className="p-6">
          <div className={door.className}>
            <div className="bg-white text-xl mx-5 px-3 pt-10 font-bold underline">
              Bookings Trend Overview
            </div>
          </div>
          <div
            className={classNames(
              "flex flex-col px-8 w-3/5",
              poppins.className
            )}
            id="booking-summary"
          >
            <div className="flex flex-col lg:flex-row gap-6 content-center gap-x-6 py-6">
              <div className="bg-amber-300 rounded-lg">
                <div className="px-2 m-4">
                  <div className="my-2">Average Daily Bookings</div>
                  <div className="text-2xl self-end">{dailyAvg}</div>
                </div>
              </div>
              <div className="bg-gray-300 rounded-lg">
                <div className="px-2 m-4">
                  <div className="my-2">Most Bookings Made on</div>
                  <div className="text-2xl self-end">{maxDay}</div>
                </div>
              </div>
              <div className="bg-amber-300 rounded-lg">
                <div className="px-2 m-4">
                  <div className="my-2">Least Bookings Made on</div>
                  <div className="text-2xl self-end">{minDay}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold">
                For {capitalizeFirstLetter(currentRestaurant)}, on average,
                people make booking {gapAvg} days in advance.
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div
            className={classNames("flex flex-col p-3 w-3/5", poppins.className)}
          >
            <div className={door.className}>
              <div className="text-xl mx-3 px-3 pt-6 font-bold underline">
                Average Daily Number of Bookings
              </div>
            </div>
            <div className="my-6">
              <WeekBar restaurant={currentRestaurant} />
            </div>
          </div>
        </div>

        <div className="px-6">
          <div
            className={classNames(
              "flex flex-col px-3 w-3/5",
              poppins.className
            )}
          >
            <div className={door.className}>
              <div className="text-xl mx-3 px-3 font-bold underline">
                Monthly Total Booking
              </div>
            </div>
            <div className="my-6">
              <MonthBar restaurant={params.restaurant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
