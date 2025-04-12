import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// TypeScript type for props
interface GraphProps {
  data: number[]; // Data for waiting times
  serviceTimes: number[]; // Data for service times
  label: string; // Label for the chart heading
}

export default function Graph({ data, serviceTimes, label }: GraphProps) {
  // Generate customer IDs (starting from 1) for the X-axis
  const customerIds = data.map((_, index) => index + 1);

  return (
    <div className="grid grid-cols-2 gap-4 w-full border-gray-300 p-6 shadow-md border-2 rounded-lg">
      <div className="w-full">
        <h3 className="text-center flex justify-center text-lg font-semibold mb-2">
          {label}
        </h3>
        <BarChart
          series={[
            {
              data: data, // Pass waiting times as the first data series
              color: "#1975D1", // Blue color for waiting times
              label: `${label}`, // Label for the first series
            },
            {
              data: serviceTimes, // Pass service times as the second data series
              color: "#ff7700", // Orange color for service times
              label: "Service Time", // Label for the second series
            },
          ]}
          height={300} // Adjust height to fit multiple charts
          xAxis={[{ data: customerIds, scaleType: "band" }]} // Customer IDs on the X-axis
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          width={600}
        />
      </div>
    </div>
  );
}
