import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";
import Head from "next/head";
import classNames from "classnames";

const door = The_Girl_Next_Door({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function MainPage() {
  return (
    <>
      <Head>
        <title>About Website Page</title>
      </Head>
      <div
        className="w-auto min-h-screen bg-slate-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${"skyline.png"})` }}
      >
        <div className={door.className}>
          <div className="text-7xl text-black text-center pt-14">
            NomNomGuide
          </div>
          <div className="text-xl text-black text-center font-bold">
            The official reservation helper and booking guide for Philadelphia
            and NYC restaurants.{" "}
          </div>
          <div
            className={classNames(
              "flex flex-col px-14 space-y-2 my-8 pt-8 pb-12 bg-white rounded-sm w-2/3 mx-6",
              poppins.className
            )}
          >
            <div className="text-lg">What is NomNomGuide?</div>
            <p className="text-sm">
              Finding great restaurants in a new city can be challenging, and
              securing a reservation can be even harder. Created by a foodie for
              fellow foodies, NomNomGuide offers{" "}
              <span className="font-bold">
                a curated list of recommended local restaurants{" "}
              </span>
              and{" "}
              <span className="font-bold">
                booking statistics on your favorite restaurants{" "}
              </span>
              that help you determine the best day to book a reservation for
              maximal chance of securing a table.
            </p>
          </div>
          <div
            className={classNames(
              "flex flex-col px-14 space-y-2 my-8 pt-8 pb-12 bg-white rounded-sm ml-auto w-2/3 mx-6",
              poppins.className
            )}
          >
            <div className="text-lg">Where do you get your bookings data?</div>
            <p className="text-sm">
              We scrape Google Reservations data on a daily basis to provide you
              with the most up-to-date booking statistics. Check out our GitHub
              to find the code we have developed to scrape booking data.
            </p>
          </div>
          <div
            className={classNames(
              "flex flex-col px-14 space-y-2 my-8 pt-8 pb-10 bg-white rounded-sm w-2/3 mx-6",
              poppins.className
            )}
          >
            <div className="text-lg">Website Updates</div>
            <ul className="text-sm">
              <li>Jan 3, 2023 - Added Restaurant Guide Page</li>
              <li>Feb 5, 2023 - Added additional restaurants to list</li>
            </ul>
          </div>
          {/* <div className="flex place-content-center">
            <div className="flex flex-col my-6 bg-white text-center w-auto h-auto border-solid border-black border-2">
              <div className="text-lg p-2">Website Updates</div>
              <div className="text-left px-4 pb-2">
                <ul>
                  <li>Jan 3, 2023 - Added Restaurant Guide Page</li>
                  <li>Feb 5, 2023 - Added additional restaurants to list</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
