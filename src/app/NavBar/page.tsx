import React from "react";
import Link from "next/link";
import { The_Girl_Next_Door } from "next/font/google";
import { Poppins } from "next/font/google";

const door = The_Girl_Next_Door({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

function NavBar() {
  return (
    <div className="flex top-0 left-0 w-64 bg-white pr-4">
      <div className="flex flex-row">
        <div className="bg-black w-8"></div>
        <div>
          <nav className="flex-col gap-y-7 pt-10 px-7 pb-40">
            <div className={door.className}>
              <div className="text-2xl py-7 pb-12 pl-2">
                <Link href="/">NomNomGuide</Link>
              </div>
            </div>
            <div className={poppins.className}>
              <ul className="space-y-8">
                <li>
                  <Link
                    href="/"
                    className="text-neutral-700 hover:bg-amber-300 hover:text-white hover:no-underline rounded-md p-2 text-sm"
                  >
                    About Website
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking/mawn"
                    className="text-neutral-700 hover:bg-amber-300 hover:text-white hover:no-underline rounded-md p-2 text-sm"
                  >
                    Booking Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/restaurant"
                    className="text-neutral-700 hover:bg-amber-300 hover:text-white hover:no-underline rounded-md p-2 text-sm"
                  >
                    Restaurant Guide
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
