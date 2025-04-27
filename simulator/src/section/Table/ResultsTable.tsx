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

// Define columns with the new names
// Define columns for the CP Data Table (New table)
const cpColumns: GridColDef[] = [
  { field: "cpLookup", headerName: "CP lookup", width: 200 },
  { field: "cp", headerName: "CP", width: 200 },
  { field: "indexOfInterarrival", headerName: "Index of Interarrival", width: 200 },
  { field: "interArrival", headerName: "Inter Arrival", width: 200 },
];

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
  const { tableData, cpData } = useStateContext(); // Assume tableData is the state array

  // Check if cpData is empty
  if (!cpData || cpData.length === 0) {
    return <div>No CP Data available</div>;
  }

  const cpRows = cpData[0].map((_: number, index: number) => ({
    id: index,
    cpLookup: cpData[0][index],
    cp: cpData[1][index],
    indexOfInterarrival: cpData[2][index],
    interArrival: cpData[3][index],
  }));

  return (
    <div className="flex flex-col items-center justify-center  mt-14">
       {/* CP Data Table */}
        <h3 className="md:text-3xl text-xl mb-4">Simulation Results</h3>
       {/* <h3 className="md:text-3xl text-xl mt-10 mb-4">CP Data</h3> */}
      <Box sx={{ height: 360, width: "80%", marginBottom: "50px"
 }}>
        <DataGrid
          rows={cpRows}
          columns={cpColumns}
          // pageSize={5} // Adjust number of rows per page
        />
      </Box>
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
