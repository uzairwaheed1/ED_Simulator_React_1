export function extractMetricsAndAverages(processes) {
  // Extract metrics into arrays
  let waitingTimes = processes.map((process) => process.waitTime || 0);
  let responseTimes = processes.map((process) => process.responseTime || 0);
  let turnaroundTimes = processes.map((process) => process.turnAroundTime || 0);
  let serviceTimes = processes.map((process) => process.serviceTime || 0);
  let arrivalTimes = processes.map((process) => process.arrivalTime || 0);
  let endTimes = processes.map((process) => process.endTime || 0);

  // Calculate averages
  const calculateAverage = (arr) =>
    arr.reduce((sum, value) => sum + value, 0) / arr.length || 0;

  const avgWaitingTime = Math.round(calculateAverage(waitingTimes) / 60);
  const avgResponseTime = Math.round(calculateAverage(responseTimes) / 60);
  const avgTurnaroundTime = Math.round(calculateAverage(turnaroundTimes) / 60);
  const avgServiceTime = Math.round(calculateAverage(serviceTimes) / 60);

  // Return results
  return {
    waitingTimes,
    responseTimes,
    turnaroundTimes,
    serviceTimes,
    arrivalTimes,
    endTimes,
    averages: {
      avgWaitingTime,
      avgResponseTime,
      avgTurnaroundTime,
      avgServiceTime,
    },
  };
}
