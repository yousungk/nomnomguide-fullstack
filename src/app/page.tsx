import React, { useEffect, useState } from "react";
import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";
import Head from "next/head";

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
        className="w-auto h-screen bg-slate-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${"skyline.png"})` }}
      >
        <div className={door.className}>
          <div className="text-7xl text-black text-center pt-14">
            NomNomGuide
          </div>
          <p className="py-5 px-14">
            Finding great restaurants can be difficult when visiting a new city
            - and booking a reservation can be even more difficult. Created for
            foodies, made by a foodie, NomNomGuide provides you with a list of
            locally created list of reccommended restaurants along with booking
            statistics and tool that suggests booking day to maximize your
            chance of successfully making a booking reservation.
          </p>
          <div className="flex place-content-center">
            <div className="flex flex-col bg-white text-center w-auto h-auto border-solid border-black border-2">
              <div className="text-lg p-2">Website Updates</div>
              <div className="text-left px-4 pb-2">
                <ul>
                  <li>Jan 3, 2023 - Added Restaurant Guide Page</li>
                  <li>Feb 5, 2023 - Added additional restaurants to list</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
