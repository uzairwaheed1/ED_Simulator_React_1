import { useStateContext } from "@/context/StateContext";
import React from "react";
import {
  People,
  Timer,
  Timeline,
  SystemUpdateAlt,
  QueryBuilder,
} from "@mui/icons-material";

const ResultsScreen = () => {
  const {
    queueUtilization,
    averageQueueLengthQueue,
    averageWaitingTimeQueue,
    averageQueueLengthSystem,
    averageWaitingTimeSystem,
  } = useStateContext();

  return (
    <div className="flex flex-col items-center p-8 w-full h-[40%]">
      <h2 className="text-3xl font-bold text-muiBlue mb-6 text-center">
        Queuing Simulation Results
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Queue Utilization */}
        <div className="bg-muiBlue text-white p-6 rounded-md shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all flex flex-col items-center">
          <People className="text-white text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-center">
            Queue Utilization
          </h3>
          <p className="text-2xl font-bold text-center mt-2">
            {queueUtilization}
          </p>
        </div>

        {/* Average Queue Length (Queue) */}
        <div className="bg-brilliantOrange text-white p-6 rounded-md shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all flex flex-col items-center">
          <Timeline className="text-white text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-center">
            Avg Queue Length (Queue)
          </h3>
          <p className="text-2xl font-bold text-center mt-2">
            {averageQueueLengthQueue}
          </p>
        </div>

        {/* Average Waiting Time (Queue) */}
        <div className="bg-muiBlue text-white p-6 rounded-md shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all flex flex-col items-center">
          <Timer className="text-white text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-center">
            Avg Waiting Time (Queue)
          </h3>
          <p className="text-2xl font-bold text-center mt-2">
            {averageWaitingTimeQueue}
          </p>
        </div>

        {/* Average Queue Length (System) */}
        <div className="bg-brilliantOrange text-white p-6 rounded-md shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all flex flex-col items-center">
          <SystemUpdateAlt className="text-white text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-center">
            Avg Queue Length (System)
          </h3>
          <p className="text-2xl font-bold text-center mt-2">
            {averageQueueLengthSystem}
          </p>
        </div>

        {/* Average Waiting Time (System) */}
        <div className="bg-muiBlue text-white p-6 rounded-md shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all flex flex-col items-center">
          <QueryBuilder className="text-white text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-center">
            Avg Waiting Time (System)
          </h3>
          <p className="text-2xl font-bold text-center mt-2">
            {averageWaitingTimeSystem}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
