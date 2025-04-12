"use client";
import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  showTable: boolean;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
  tableData: any[]; // Replace `any` with the actual type of your table data
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
  gantChartData: any[]; // Replace `any` with the actual type of your Gantt chart data
  setGantChartData: React.Dispatch<React.SetStateAction<any[]>>;
  showGantChart: boolean;
  setShowGantChart: React.Dispatch<React.SetStateAction<boolean>>;
  showQueuingResults: boolean;
  setShowQueuingResults: React.Dispatch<React.SetStateAction<boolean>>;
  serverUtilization: any[];
  setServerUtilization: React.Dispatch<React.SetStateAction<any[]>>;

  // Added states for metrics
  waitingTimes: number[];
  setWaitingTimes: React.Dispatch<React.SetStateAction<number[]>>;
  arrivalTimes: number[];
  setArrivalTimes: React.Dispatch<React.SetStateAction<number[]>>;
  endTimes: number[];
  setEndTimes: React.Dispatch<React.SetStateAction<number[]>>;
  responseTimes: number[];
  setResponseTimes: React.Dispatch<React.SetStateAction<number[]>>;
  turnaroundTimes: number[];
  setTurnaroundTimes: React.Dispatch<React.SetStateAction<number[]>>;
  serviceTimes: number[];
  setServiceTimes: React.Dispatch<React.SetStateAction<number[]>>;
  averages: {
    avgWaitingTime: number;
    avgResponseTime: number;
    avgTurnaroundTime: number;
    avgServiceTime: number;
  };
  setAverages: React.Dispatch<
    React.SetStateAction<{
      avgWaitingTime: number;
      avgResponseTime: number;
      avgTurnaroundTime: number;
      avgServiceTime: number;
    }>
  >;

  // Queue metrics
  queueUtilization: number;
  setQueueUtilization: React.Dispatch<React.SetStateAction<number>>;
  averageQueueLengthQueue: number;
  setAverageQueueLengthQueue: React.Dispatch<React.SetStateAction<number>>;
  averageWaitingTimeQueue: number;
  setAverageWaitingTimeQueue: React.Dispatch<React.SetStateAction<number>>;
  averageWaitingTimeSystem: number;
  setAverageWaitingTimeSystem: React.Dispatch<React.SetStateAction<number>>;
  averageQueueLengthSystem: number;
  setAverageQueueLengthSystem: React.Dispatch<React.SetStateAction<number>>;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [gantChartData, setGantChartData] = useState<any[]>([]);
  const [serverUtilization, setServerUtilization] = useState<any[]>([]);
  const [showGantChart, setShowGantChart] = useState(false);
  const [showQueuingResults, setShowQueuingResults] = useState(false);

  // Added states for metrics
  const [waitingTimes, setWaitingTimes] = useState<number[]>([]);
  const [endTimes, setEndTimes] = useState<number[]>([]);
  const [arrivalTimes, setArrivalTimes] = useState<number[]>([]);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState<number[]>([]);
  const [serviceTimes, setServiceTimes] = useState<number[]>([]);
  const [averages, setAverages] = useState({
    avgWaitingTime: 0,
    avgResponseTime: 0,
    avgTurnaroundTime: 0,
    avgServiceTime: 0,
  });

  // Queue metrics
  const [queueUtilization, setQueueUtilization] = useState(0);
  const [averageQueueLengthQueue, setAverageQueueLengthQueue] = useState(0);
  const [averageWaitingTimeQueue, setAverageWaitingTimeQueue] = useState(0);
  const [averageWaitingTimeSystem, setAverageWaitingTimeSystem] = useState(0);
  const [averageQueueLengthSystem, setAverageQueueLengthSystem] = useState(0);

  return (
    <StateContext.Provider
      value={{
        showTable,
        setShowTable,
        tableData,
        setTableData,
        gantChartData,
        setGantChartData,
        showGantChart,
        setShowGantChart,
        serverUtilization,
        setServerUtilization,

        // Metrics
        waitingTimes,
        setWaitingTimes,
        endTimes,
        setEndTimes,
        arrivalTimes,
        setArrivalTimes,
        responseTimes,
        setResponseTimes,
        turnaroundTimes,
        setTurnaroundTimes,
        serviceTimes,
        setServiceTimes,
        averages,
        setAverages,

        // Queue metrics
        queueUtilization,
        setQueueUtilization,
        averageQueueLengthQueue,
        setAverageQueueLengthQueue,
        averageWaitingTimeQueue,
        setAverageWaitingTimeQueue,
        averageWaitingTimeSystem,
        setAverageWaitingTimeSystem,
        averageQueueLengthSystem,
        setAverageQueueLengthSystem,
        showQueuingResults,
        setShowQueuingResults,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
