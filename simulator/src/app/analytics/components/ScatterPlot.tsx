import * as React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { useStateContext } from "@/context/StateContext";

// Define the type for your scatter plot data
type ScatterData = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export default function ScatterPlot() {
  // Get arrivalTimes and endTimes (serviceTimes) from your context
  const { arrivalTimes, endTimes } = useStateContext();

  // Combine the arrivalTimes and serviceTimes to create scatter plot data
  const scatterData: ScatterData[] = arrivalTimes.map((arrivalTime, index) => ({
    id: `data-${index + 1}`, // Customer ID is index + 1
    x1: arrivalTime, // Arrival time on x-axis for series 1
    y1: index + 1, // Customer ID on y-axis for series 1
    x2: endTimes[index] || 0, // Service time (or end time) on x-axis for series 2
    y2: index + 1, // Customer ID on y-axis for series 2
  }));

  return (
    <ScatterChart
      width={600}
      height={300}
      series={[
        {
          label: "Arrival Time",
          data: scatterData.map((v) => ({
            x: v.x1, // X-axis = arrivalTime
            y: v.y1, // Y-axis = customer ID
            id: v.id,
          })),
          color: "blue", // Color for the Arrival Time series
        },
        {
          label: "End Time",
          data: scatterData.map((v) => ({
            x: v.x2, // X-axis = serviceTime (or endTime)
            y: v.y2, // Y-axis = customer ID
            id: v.id,
          })),
          color: "#ff7700", // Color for the Service Time series
        },
      ]}
    />
  );
}
