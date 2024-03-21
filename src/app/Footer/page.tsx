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

function Footer() {
  return (
    <footer className="bg-neutral-900 p-6">
      <div className={door.className}>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              NomNomGuide
            </span>
            <ul className="flex flex-wrap items-center mb-6 text-md font-medium text-white sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:yousungkim98@gmail.com"
                  className="hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
          <span className="block text-sm text-white sm:text-center">
            © 2024 NomNomGuide™. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
