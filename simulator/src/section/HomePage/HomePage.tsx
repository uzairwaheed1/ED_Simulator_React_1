import DistributionForm from "./components/DistributionForm";
import ResultsTable from "@/section/Table/ResultsTable";
import { useStateContext } from "../../context/StateContext";
import GanttChart from "../GantChart/GanttChart";
import Navbar from "./components/Navbar";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { jsonToExcelDownload } from "./utils/downloadexcel";

function HomePage() {
  const { showTable, showGantChart, tableData } = useStateContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark component as client-side
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-10 mx-10">
        <DistributionForm />
        {showTable && <ResultsTable />}
        {showTable && (
          <div className="flex justify-end mr-36 mt-2">
            <button
              className="bg-muiBlue text-white font-bold py-2 px-6 rounded-md shadow hover:bg-muiBlueDark transition duration-200"
              onClick={() =>
                jsonToExcelDownload(tableData, "simulation-results")
              }
            >
              {<DownloadIcon />}
            </button>
          </div>
        )}
        {showGantChart && <GanttChart />}
        {/* Render button only on the client side */}
        {isClient && showGantChart && (
          <div className="my-8 text-center">
            <Link href="/analytics">
              <button className="bg-muiBlue text-white font-bold py-2 px-6 rounded-md shadow hover:bg-muiBlueDark transition duration-200">
                Go to Analytics
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
