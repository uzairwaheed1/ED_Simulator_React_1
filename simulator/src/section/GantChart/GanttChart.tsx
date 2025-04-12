import React from "react";
import { useStateContext } from "../../context/StateContext"; // Adjust the path based on where your context is located

// Type for the Event
interface Event {
  time: number;
  type: "serviceStart" | "serviceComplete" | "preemption";
  customerId: number;
  server: number;
}

// Type for the GanttChart data
type GanttChartData = Event[][];
type ServerUtilization = any[];

const GanttChart = () => {
  // Get the gantChartData from the context
  const {
    gantChartData,
    serverUtilization,
  }: { gantChartData: GanttChartData; serverUtilization: ServerUtilization } =
    useStateContext();

  return (
    <div className="p-5 flex justify-center items-center w-full">
      <div className="text-center w-full max-w-full">
        <div className="md:text-3xl text-2xl mt-14 mb-4">Gantt Chart</div>
        {/* Wrapping Gantt chart rows in a scrollable container */}
        {gantChartData.map((server, serverIndex) => (
          <div key={serverIndex} className="server-row mb-4 mt-4">
            <h3 className="mb-2 mt-4 text-2xl">
              Server {serverIndex + 1}{" "}
              {`(${serverUtilization[serverIndex].toFixed(2)}%)`}
            </h3>
            <div className="flex justify-start mt-4 overflow-x-auto overflow-y-hidden border border-gray-300 p-5 w-full max-w-full">
              {server.map((event, eventIndex) => {
                const previousEvent =
                  eventIndex > 0 ? server[eventIndex - 1] : null;

                if (
                  event.type === "serviceStart" ||
                  event.type === "preemption"
                ) {
                  const nextEvent = server[eventIndex + 1];
                  const serviceEndTime =
                    nextEvent && nextEvent.type === "serviceComplete"
                      ? nextEvent.time
                      : event.time;

                  const serviceDuration = serviceEndTime - event.time;
                  let idle = false;
                  let idleTime;
                  // let idleTime =
                  //   previousEvent &&
                  //   event.type !== "preemption" &&
                  //   event.time > previousEvent.time
                  //     ? previousEvent.time
                  //     : 0;
                  if (
                    previousEvent &&
                    event.type !== "preemption" &&
                    event.time > previousEvent.time
                  ) {
                    idleTime = previousEvent.time;
                    idle = true;
                  } else if (!previousEvent && event.time > 0) {
                    idleTime = 0;
                    idle = true;
                  }

                  return (
                    <React.Fragment key={`${serverIndex}-${eventIndex}`}>
                      {idle && (
                        <div className="relative bg-stone-300 text-black p-2 border border-black w-32 text-center">
                          <div>Idle</div>
                          <div className="absolute -bottom-6 -left-1 text-lg mt-4 text-black">
                            {idleTime}
                          </div>
                        </div>
                      )}
                      <div className="relative bg-muiBlue text-white p-2 border border-black w-32 text-center">
                        <div>Customer {event.customerId} (Service)</div>
                        <div className="absolute -bottom-6 -left-1 text-lg mt-4 text-black">
                          {event.time}
                        </div>
                        {eventIndex == server.length - 2 && (
                          <div className="absolute -bottom-6 -right-1  text-lg mt-4 text-black ">
                            {serviceEndTime}
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
