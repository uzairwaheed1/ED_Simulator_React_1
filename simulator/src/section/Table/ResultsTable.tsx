import React from "react";
import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useStateContext } from "../../context/StateContext";

// Define the type for your data
interface RowData {
  id: number;
  arrivalTime: number;
  serviceTime: number;
  remainingServiceTime: number;
  priority: number;
  waitTime: number;
  startTime: number;
  endTime: number;
  isServiceComplete: boolean;
  serving: boolean;
  serverId: number;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "arrivalTime", headerName: "Arrival Time", width: 120 },
  { field: "serviceTime", headerName: "Service Time", width: 120 },

  { field: "priority", headerName: "Priority", width: 120 },
  { field: "waitTime", headerName: "Wait Time", width: 120 },
  { field: "responseTime", headerName: "Response Time", width: 120 },
  { field: "turnAroundTime", headerName: "Turn Around Time", width: 140 },
  { field: "startTime", headerName: "Start Time", width: 120 },
  { field: "endTime", headerName: "End Time", width: 120 },
];

const ResultsTable = () => {
  const { tableData } = useStateContext(); // Assume tableData is the state array

  return (
    <div className="flex flex-col items-center justify-center  mt-14">
      <h3 className="md:text-3xl text-xl mb-4">Simulation Results</h3>
      <Box sx={{ height: 360, width: "80%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          // You can change this to control the number of rows per page
          // You can add more options here like [5, 10, 25]
        />
      </Box>
    </div>
  );
};

export default ResultsTable;
