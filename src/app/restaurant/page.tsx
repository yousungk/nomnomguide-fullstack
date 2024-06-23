import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import Image from "next/image";
import Head from "next/head";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import Link from "next/link";

const door = The_Girl_Next_Door({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

interface Restaurant {
  restaurant_name: string;
  restaurant_address: string;
  description: string;
  rating: number;
  review_count: number;
  scraped_date: string;
  scraped_time: string;
}

async function fetchRestaurantInfo() {
  const db = await open({
    filename:
      "/Users/yousungkim/Desktop/Personal Projects/Restaurant Scraper/Restaurant Scraper/booking_data.db",
    driver: sqlite3.Database,
  });

  const restaurants = await db.all(`SELECT * FROM restaurants`);
  return restaurants;
}

// async function fetchRestaurantInfo() {
//   //const serverURL = req.headers.host;
//   const response = await fetch(`app/api/get-restaurant-info`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch restaurant information");
//   }
//   return response.json();
// }

export default async function RestaurantGuide() {
  const data = await fetchRestaurantInfo();

  return (
    <>
      <Head>
        <title>Restaurant Recomendation Guide</title>
      </Head>
      <div className="bg-white w-screen pb-10">
        <div className="flex flex-col">
          <div
            className={classNames(
              "flex md:flex-row gap-x-5 p-6 flex-col",
              poppins.className
            )}
          >
            {/* <details className="dropdown">
              <summary className="btn bg-white text-black hover:bg-gray-200 font-normal mb-4 shadow-lg border-none">
                Choose a city
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
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </details>
            <div className="flex flex-row bg-white w-52 h-12 rounded-lg shadow-lg border-none text-sm place-content-center place-items-center">
              <div className="font-semibold pr-2">Address: </div>
              <div>119 S 31st Street</div>
            </div> */}
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col bg-white w-2/3 h-54 px-8 pt-6">
              <div className={door.className}>
                <div className="text-2xl">Restaurant Guide</div>
              </div>
              <div className="py-2 italic text-md">
                Locally curated list of restaurants, selected by locals and
                foodies, presented to you by NomNomGuide.
              </div>
              <p className="italic text-sm">Updated as of March 2024.</p>
            </div>
          </div>
          <div>
            {data.map((restaurant: Restaurant, index: number) => (
              <div className="pl-6" key={index}>
                <Link
                  className="p-6"
                  href={`/booking/${restaurant.restaurant_name}`}
                >
                  <div className="flex flex-row w-2/3 h-54 px-8 py-3">
                    <Image
                      src={"/" + restaurant.restaurant_name + ".jpeg"}
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
                    <div
                      className={classNames(
                        "flex flex-col pl-5 text-black",
                        poppins.className
                      )}
                    >
                      <div className="font-bold text-lg">
                        {restaurant.restaurant_name}
                      </div>
                      <div className="py-3 text-sm">
                        {restaurant.restaurant_address}
                      </div>
                      <div className="py-3 text-sm">
                        {restaurant.description}
                      </div>
                      <div className="flex flex-row">
                        <div className="text-sm">
                          {restaurant.rating} out of 5 rating{" "}
                        </div>
                        <div className="px-5 underline text-sm">
                          {restaurant.review_count} Google reviews
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* <div className="p-6">
            <div className="flex flex-row bg-white w-2/3 h-54 px-8 py-6 rounded-lg shadow-lg">
              <Image
                src="/Little Nonna.jpeg"
                alt="Picture of restaurant"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <div
                className={classNames(
                  "flex flex-col pl-5 text-gray-600",
                  poppins.className
                )}
              >
                <div className="font-bold text-lg">Little</div>
                <div className="text-sm">Italian</div>
                <div className="py-3 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  ut purus.
                </div>
                <div className="flex flex-row">
                  <div className="text-lg">4.9</div>
                  <span className="material-symbols-outlined">star</span>
                  <div className="px-5 underline text-lg">300 reviews</div>
                  <div className="text-lg">$$$</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
