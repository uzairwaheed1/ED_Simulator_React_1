import { simulate } from "@/utils/simulationUtils";

export const handleSimulationSubmit = (
    values: any,
    { setTableData, setShowTable, setGantChartData, setShowGantChart, setServerUtilization, }: any
  ) => {
    const {
      server,
      numberOfCustomers,
      distributionType,
      distribution,
      minPriority,
      lambda,
      mue,
      a,
      b,
      sd,
    } = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])); // Convert all numeric fields to numbers
  
    let results: any;
    if (distributionType === 0) {
      results = simulate(numberOfCustomers, server, lambda, minPriority, "exponential", mue);
    } else if (distributionType === 1) {
      if (distribution === 0) {
        results = simulate(numberOfCustomers, server, lambda, minPriority, "uniform", 0, 0, a, b);
      } else if (distribution === 1) {
        results = simulate(numberOfCustomers, server, lambda, minPriority, "normal", mue, sd);
      }
    }
  
    if (results) {
      setTableData(results.QueueCustomers);
      setShowTable(true);
      setGantChartData(results.events);
      setShowGantChart(true);
      setServerUtilization(results.serverUtilizations);
    }
  };
  