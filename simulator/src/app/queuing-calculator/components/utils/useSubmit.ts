import { calculateMMC, calculateMGC, calculateGGC } from "@/utils/queuingUtils";

export const useSubmit = (
    values: any,
    { setQueueUtilization,
        setAverageQueueLengthQueue,
        setAverageWaitingTimeQueue,
        setAverageQueueLengthSystem,
        setAverageWaitingTimeSystem,
      setShowQueuingResults }: any
  ) => {
    const {
      server,
      distributionType,
      lambda,
      mue,
      a,
      b,
      av,
      sv,
    } = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])); // Convert all numeric fields to numbers
  
    let results: any;
    if (distributionType === 0) {
      results = calculateMMC(lambda, mue, server)
    
    }
    else if (distributionType === 1) {
      results = calculateMGC(lambda, a, b, server)
    
    }
    else if (distributionType === 2) {
      results = calculateGGC(lambda, mue, av, sv, server)
    
    }
  
    if (results) {
        setQueueUtilization(results.utilization);
        setAverageWaitingTimeQueue(results.averageWaitingTimeQueue);
        setAverageQueueLengthQueue(results.averageQueueLengthQueue);
        setAverageQueueLengthSystem(results.averageQueueLengthSystem);
        setAverageWaitingTimeSystem(results.averageWaitingTimeSystem);
        setShowQueuingResults(true);
        console.log(results)
    }
  };
  