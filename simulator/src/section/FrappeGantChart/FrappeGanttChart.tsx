"use client";
import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import { useStateContext } from "../../context/StateContext";

interface Event {
  time: number;
  type: "serviceStart" | "serviceComplete" | "preemption";
  customerId: number;
  server: number;
}

const FrappeGanttChart = () => {
  const ganttRef = useRef(null);
  const { gantChartData }: { gantChartData: Event[][] } = useStateContext();

  useEffect(() => {
    if (!gantChartData || !ganttRef.current) return;

    const tasks: any[] = [];

    gantChartData.forEach((serverEvents, serverIndex) => {
      for (let i = 0; i < serverEvents.length - 1; i++) {
        const event = serverEvents[i];
        const nextEvent = serverEvents[i + 1];

        if (
          (event.type === "serviceStart" || event.type === "preemption") &&
          nextEvent.type === "serviceComplete"
        ) {
          const startTime = event.time;
          const endTime = nextEvent.time;

          // Convert minutes into Date objects
          const base = new Date(2025, 3, 10, 0, 0); // April 10, 2025 00:00
          const start = new Date(base.getTime() + startTime * 60000);
          const end = new Date(base.getTime() + endTime * 60000);

          tasks.push({
            id: `${serverIndex}-${i}`,
            name: `Cust ${event.customerId} (S${serverIndex + 1})`,
            start: start.toISOString(),
            end: end.toISOString(),
            progress: 100,
          });
        }
      }
    });

    if (tasks.length > 0) {
      new Gantt(ganttRef.current, tasks, {
        view_mode: "Minute",
        custom_popup_html: null,
      });
    }
  }, [gantChartData]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Gantt Chart</h2>
      <svg ref={ganttRef}></svg>
    </div>
  );
};

export default FrappeGanttChart;
