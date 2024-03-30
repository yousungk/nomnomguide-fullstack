"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import { useState, useEffect } from "react";

function MonthBar(props: any) {
  const [monthStats, setMonthStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMonthStats() {
    const response = await fetch(
      `../api/get-month-statistics?restaurant_name=${props.restaurant}`
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
      const data = await fetchMonthStats();
      setMonthStats(data);
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
        </>
      )}
    </>
  );
}

export default MonthBar;
