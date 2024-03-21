import React from "react";
import Link from "next/link";
import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";
import classNames from "classnames";

const door = The_Girl_Next_Door({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

function alerter() {
  return (
    <div className="flex flex-col md:flex-row md:place-items-center place-items-start">
      <div className="p-6 w-96">
        <div
          className={classNames(
            "flex flex-col bg-white p-8 rounded-lg shadow-lg",
            poppins.className
          )}
        >
          <div className="font-bold">Booking Time Calculator</div>
          <div className="pt-5 text-sm">
            A tool that calculates the when you should book the reservation for
            maximum chance of securing a reservation
          </div>
          <div className="pt-5">
            <div className="pb-2 text-sm font-bold">Restaurant Name</div>
            <details className="dropdown">
              <summary className="btn bg-white text-black hover:bg-gray-100 font-normal border border-gray-300 shadow-md">
                Little Nonna's
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
          </div>
          <div className="pt-5">
            <div className="pb-2 text-sm font-bold">Booking Time</div>
            <details className="dropdown">
              <summary className="btn bg-white text-black hover:bg-gray-100 font-normal border border-gray-300 shadow-md">
                6 PM
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
          </div>
          <div className="pt-5">
            <div className="pb-2 text-sm font-bold">Location</div>
            <details className="dropdown">
              <summary className="btn bg-white text-black hover:bg-gray-100 font-normal border border-gray-300 shadow-md">
                Philadelphia, PA
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
          </div>
          <button className="btn mt-5 bg-amber-400 border-none text-black shadow-md hover:bg-yellow-400 font-normal">
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

export default alerter;
