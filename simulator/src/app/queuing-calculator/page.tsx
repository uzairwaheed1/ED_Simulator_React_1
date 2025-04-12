"use client";
import Navbar from "@/section/HomePage/components/Navbar";
import React from "react";
import QueuingModelForm from "./components/QueuingModelForm";
import ResultsScreen from "./components/ResultsScreen";
import { useStateContext } from "@/context/StateContext";

export default function page() {
  const { showQueuingResults } = useStateContext();
  return (
    <div>
      <Navbar />
      <QueuingModelForm />
      {showQueuingResults && <ResultsScreen />}
    </div>
  );
}
