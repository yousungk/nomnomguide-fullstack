function alerter() {
  return (
    <div>
      <div className="p-6 w-auto h-full">
        <div
          className={classNames(
            "flex flex-col bg-white p-8 rounded-lg shadow-lg",
            poppins.className
          )}
        ></div>
        <div className="font-bold">Booking Availability Alerter</div>
        <div className="pt-5 text-sm">
          A tool that alerts you when booking becomes available.
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
        <div className="flex flex-row">
          <div className="pt-5 pr-4">
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
        </div>

        <div className="pt-5">
          <div className="pb-2 text-sm font-bold">Email Address</div>
          <details className="dropdown">
            <summary className="btn bg-white text-black hover:bg-gray-100 font-normal border border-gray-300 shadow-md">
              kys161616@gmail.com
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
          Alert me!
        </button>
      </div>
    </div>
  );
}

export default alerter;
