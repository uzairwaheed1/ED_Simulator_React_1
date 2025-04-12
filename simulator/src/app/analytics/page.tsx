"use client";
import Navbar from "@/section/HomePage/components/Navbar";
import React from "react";
import Averages from "./components/Averages";
import Graph from "./components/Graph";
import { useStateContext } from "@/context/StateContext";

export default function page() {
  const { waitingTimes, serviceTimes, responseTimes, turnaroundTimes } =
    useStateContext();

  return (
    <>
      <Navbar />
      <Averages />
      <div className="grid grid-cols-2 items-center justify-items-center gap-4 p-4 w-full">
        <Graph
          data={waitingTimes}
          serviceTimes={serviceTimes}
          label="Waiting Time"
        />
        <Graph
          data={serviceTimes}
          serviceTimes={serviceTimes}
          label="Service Time"
        />
        <Graph
          data={responseTimes}
          serviceTimes={serviceTimes}
          label="Response Time"
        />
        <Graph
          data={turnaroundTimes}
          serviceTimes={serviceTimes}
          label="Turn Around Time"
        />
      </div>
    </>
  );
}
