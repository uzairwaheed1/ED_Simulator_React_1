import React, { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { extractMetricsAndAverages } from "@/utils/extractMetricsAndAverages";
import ScatterPlot from "./ScatterPlot";

const Averages = () => {
  const {
    setAverages,
    setResponseTimes,
    setWaitingTimes,
    setArrivalTimes,
    setEndTimes,
    setTurnaroundTimes,
    setServiceTimes,
    averages,
    tableData,
  } = useStateContext();

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      const results = extractMetricsAndAverages(tableData);
      setAverages(results.averages);
      setResponseTimes(results.responseTimes);
      setWaitingTimes(results.waitingTimes);
      setTurnaroundTimes(results.turnaroundTimes);
      setServiceTimes(results.serviceTimes);
      setArrivalTimes(results.arrivalTimes);
      setEndTimes(results.endTimes);
    }
  }, [tableData]); // Dependency added here

  return (
    <div className="flex justify-start p-8 w-full ">
      {/* Left side for Graphs */}
      <div className="flex flex-col p-4 px-6 w-[60%] mr-8 ">
        <h2 className="text-3xl font-bold text-muiBlue mb-6 text-center">
          System Performance
        </h2>
        {averages ? (
          <div className="grid grid-cols-4 gap-6 text-center h-[70%] mb-6">
            <div className="bg-muiBlue text-white p-4 border-2 border-muiBlue rounded-md shadow max-w-44 ">
              <h3 className="text-xl font-semibold">Average Waiting Time</h3>
              <p className="text-2xl font-bold mt-6">
                {averages.avgWaitingTime}
              </p>
            </div>
            <div className="bg-brilliantOrange text-white border-2 border-brilliantOrange p-4 rounded-md shadow max-w-44">
              <h3 className="text-xl font-semibold">Average Service Time</h3>
              <p className="text-2xl font-semibold mt-6">
                {averages.avgServiceTime}
              </p>
            </div>
            <div className="bg-muiBlue text-white p-4 rounded-md shadow max-w-44">
              <h3 className="text-xl font-semibold">Average Turnaround Time</h3>
              <p className="text-2xl font-bold mt-6">
                {averages.avgTurnaroundTime}
              </p>
            </div>
            <div className="bg-brilliantOrange text-white p-4 rounded-md shadow max-w-44">
              <h3 className="text-xl font-semibold">Average Response Time</h3>
              <p className="text-2xl font-bold mt-6">
                {averages.avgResponseTime}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No data available to calculate averages.
          </p>
        )}
      </div>

      {/* Right side for Scatter Plot */}
      <div className="flex-grow p-4 ">
        {/* Scatter plot placeholder */}
        <div className=" border-gray-300 p-6 shadow-md border rounded-lg">
          <h3 className="text-center text-xl font-semibold mb-4">
            Scatter Plot
          </h3>
          <ScatterPlot />
        </div>
      </div>
    </div>
  );
};

export default Averages;
