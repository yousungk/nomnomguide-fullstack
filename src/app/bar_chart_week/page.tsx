"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import { useState, useEffect } from "react";

function WeekBar(props: any) {
  const [weekStats, setWeekStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchWeekStats() {
    const response = await fetch(
      `../api/get-week-statistics?restaurant_name=${props.restaurant}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchWeekStats();
      setWeekStats(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
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
        </>
      )}
    </>
  );
}

export default WeekBar;
