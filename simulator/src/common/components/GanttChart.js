// components/GanttChart.js
"use client";
import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

export default function GanttChart() {
  const ganttRef = useRef(null);

  // Replace this with your actual arrival + service time data
  const data = [
    { id: 1, name: "Patient A", arrival: "2025-04-10 09:00", serviceTime: 30 },
    { id: 2, name: "Patient B", arrival: "2025-04-10 09:20", serviceTime: 20 },
    { id: 3, name: "Patient C", arrival: "2025-04-10 09:45", serviceTime: 40 },
  ];

  useEffect(() => {
    const tasks = data.map((item) => {
      const start = new Date(item.arrival);
      const end = new Date(start.getTime() + item.serviceTime * 60000);
      return {
        id: `task-${item.id}`,
        name: item.name,
        start: start.toISOString(),
        end: end.toISOString(),
        progress: 100,
      };
    });

    new Gantt(ganttRef.current, tasks, {
      view_mode: "Hour",
      custom_popup_html: null,
    });
  }, []);

  return <svg ref={ganttRef}></svg>
}
