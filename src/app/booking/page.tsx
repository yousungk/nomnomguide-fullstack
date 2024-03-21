"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import { BarChart } from "@mui/x-charts/BarChart";

const door = The_Girl_Next_Door({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

const chartSetting = {
  xAxis: [
    {
      label: "Day of Week",
    },
  ],
  yAxis: [
    {
      label: "Average Total Bookings",
    },
  ],
  width: 500,
  height: 400,
};

function BookingGuide() {
  const [currentRestaurant, setCurrentRestaurant] = useState("Kalaya");
  const [restaurantList, setRestaurantList] = useState<string[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurant_name: "",
    restaurant_address: "",
    rating: 0,
    review_count: 0,
    description: "",
    scraped_date: "",
    scraped_time: "",
  });
  const [weekStats, setWeekStats] = useState([]);
  const [monthStats, setMonthStats] = useState([]);
  const [maxDay, setMaxDay] = useState("");
  const [minDay, setMinDay] = useState("");
  const [dailyAvg, setDailyAvg] = useState(0);
  const [gapAvg, setGapAvg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRestaurantList() {
    const response = await fetch("api/get-restaurants");
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    let restaurant_list: string[] = [];
    for (const restaurant of data) {
      restaurant_list.push(restaurant.restaurant_name);
    }
    setRestaurantList(restaurant_list);
  }

  async function fetchRestaurantInfo() {
    const response = await fetch(
      `api/get-restaurant-info?restaurant_name=${currentRestaurant}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    setRestaurantInfo(data[0]);
  }

  async function fetchDailyStats() {
    const response = await fetch(
      `api/get-daily-statistics?restaurant_name=${currentRestaurant}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    setDailyAvg(data[0].avg_total_booking);
  }

  async function fetchGapStats() {
    const response = await fetch(
      `api/get-gap-statistics?restaurant_name=${currentRestaurant}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    setGapAvg(data[0].weighted_booking_gap);
  }

  async function fetchWeekStats() {
    const response = await fetch(
      `api/get-week-statistics?restaurant_name=${currentRestaurant}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    setWeekStats(data);

    // set min
    let min = data[0].avg_total_booking;
    let minday = "";
    for (const day in data) {
      if (data[day].avg_total_booking <= min) {
        min = data[day].avg_total_booking;
        minday = data[day].scraped_weekday;
      }
    }
    setMinDay(minday);

    // set max
    let max = data[0].avg_total_booking;
    let maxday = "";
    for (const day in data) {
      if (data[day].avg_total_booking >= max) {
        max = data[day].avg_total_booking;
        maxday = data[day].scraped_weekday;
      }
    }
    setMaxDay(maxday);
  }

  async function fetchMonthStats() {
    const response = await fetch(
      `api/get-month-statistics?restaurant_name=${currentRestaurant}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    setMonthStats(data);
  }

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchRestaurantList(),
        fetchRestaurantInfo(),
        fetchDailyStats(),
        fetchGapStats(),
        fetchWeekStats(),
        fetchMonthStats(),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, [currentRestaurant]);

  return (
    <>
      {isLoading && <div className="bg-white">Loading...</div>}
      {!isLoading && (
        <div className="bg-slate-100 w-screen pb-10">
          <div className="flex flex-col">
            <div className={door.className}>
              <div className="bg-white top-0 w-screen h-20 p-7 text-2xl">
                Booking Guide
              </div>
            </div>
            <div
              className={classNames(
                "flex md:flex-row gap-x-5 p-7 flex-col",
                poppins.className
              )}
            >
              <details className="dropdown">
                <summary className="btn bg-white text-black hover:bg-gray-200 font-normal mb-4 shadow-lg border-none">
                  <div className="font-semibold pr-2">Restaurant Name: </div>
                  {currentRestaurant}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] text-black bg-white rounded-box w-52">
                  {restaurantList.map((restaurant) => (
                    <li key={restaurant}>
                      <a
                        onClick={() => {
                          setCurrentRestaurant(restaurant);
                          setIsLoading(true);
                        }}
                      >
                        {restaurant}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="flex flex-row bg-white h-12 p-5 rounded-lg shadow-lg border-none text-sm place-content-center place-items-center">
                <div className="font-semibold pr-2">Address: </div>
                <div>{restaurantInfo.restaurant_address}</div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-row bg-white w-3/5 h-54 px-8 py-6 rounded-lg shadow-lg">
                {restaurantInfo.description}
              </div>
            </div>
            <div className="p-6">
              <div
                className={classNames(
                  "flex flex-col bg-white p-8 w-3/5 rounded-lg shadow-lg",
                  poppins.className
                )}
                id="booking-summary"
              >
                <div className="font-bold">Booking Summary</div>
                <div className="flex flex-col lg:flex-row gap-6 content-center gap-x-6 py-8">
                  <div className="bg-rose-300 rounded-lg">
                    <div className="px-2 m-4">
                      <div className="font-medium my-2">
                        Average Daily Bookings
                      </div>
                      <div className="text-3xl self-end">{dailyAvg}</div>
                    </div>
                  </div>
                  <div className="bg-gray-300 rounded-lg">
                    <div className="px-3 m-4">
                      <div className="font-medium my-2">
                        Most Bookings Made on
                      </div>
                      <div className="text-3xl self-end">{maxDay}</div>
                    </div>
                  </div>
                  <div className="bg-rose-300 rounded-lg">
                    <div className="px-3 m-4">
                      <div className="font-medium my-2">
                        Least Bookings Made on
                      </div>
                      <div className="text-3xl">{minDay}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    For {currentRestaurant}, on average, people make booking{" "}
                    {gapAvg} days in advance.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div
                className={classNames(
                  "flex flex-col bg-white p-8 w-3/5 rounded-lg shadow-lg",
                  poppins.className
                )}
              >
                <div className="font-bold">Average Weekly Bookings</div>
                <div className="flex flex-row content-center gap-x-6 py-6">
                  <BarChart
                    dataset={weekStats}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "scraped_weekday",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "avg_total_booking",
                        label: "Average booking",
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div
                className={classNames(
                  "flex flex-col bg-white p-8 w-3/5 rounded-lg shadow-lg",
                  poppins.className
                )}
              >
                <div className="font-bold">
                  Historical Total Monthly Booking
                </div>
                <div className="flex flex-row content-center gap-x-6 py-6">
                  <BarChart
                    dataset={monthStats}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "month_year",
                      },
                    ]}
                    series={[
                      {
                        color: "#fdb462",
                        dataKey: "sum_total_booking",
                        label: "Total booking",
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingGuide;
