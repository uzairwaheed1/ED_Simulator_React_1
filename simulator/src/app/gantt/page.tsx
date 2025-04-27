"use client";
import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import 'frappe-gantt/dist/frappe-gantt.css';

const GanttPage = () => {
  const ganttRef = useRef(null);

  useEffect(() => {
    const tasks = [
      {
        id: "Task 1",
        name: "Customer 1 (S1)",
        start: "2025-04-13T09:00:00",
        end: "2025-04-13T10:00:00",
        progress: 100,
      },
      {
        id: "Task 2",
        name: "Customer 2 (S2)",
        start: "2025-04-13T10:30:00",
        end: "2025-04-13T12:00:00",
        progress: 100,
      },
    ];

    if (ganttRef.current) {
      new Gantt(ganttRef.current, tasks, {
        view_mode: "Hour",
      });
    }
  }, []);

  return (
    <div>
      <h1>Gantt Chart</h1>
      <div ref={ganttRef} />
    </div>
  );
};

export default GanttPage;
