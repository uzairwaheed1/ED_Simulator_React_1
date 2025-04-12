// Utility Functions
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function calculatePo(c, rho) {
  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += Math.pow(c * rho, n) / factorial(n);
  }
  return 1 / (sum + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));
}

function absoluteValues(inputObject) {
  const resultObject = {};
  for (const key in inputObject) {
    if (Object.hasOwnProperty.call(inputObject, key)) {
      resultObject[key] =
        isNaN(inputObject[key]) || !isFinite(inputObject[key])
          ? 0
          : Math.abs(inputObject[key]);
    }
  }
  return resultObject;
}

function getUtilization(utilization) {
  if (utilization > 1) return 1;
  if (utilization < 0) return 0;
  return utilization;
}

// M/M/c Queue Model
export function calculateMMC(lambda, mew, servers) {
  const arrivalRate = lambda;
  const serviceRate = mew;
  const utilization = getUtilization(arrivalRate / (servers * serviceRate));

  // Corrected: Assign utilization value directly to serverUtilizations

  const averageQueueLengthQueue =
    (calculatePo(servers, utilization) *
      Math.pow(arrivalRate / serviceRate, servers) *
      utilization) /
    (factorial(servers) * Math.pow(1 - utilization, 2));
  const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate;
  const averageWaitingTimeSystem = averageWaitingTimeQueue + 1 / serviceRate;
  const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem;

  return absoluteValues({
    utilization,
    averageQueueLengthQueue,
    averageWaitingTimeQueue,
    averageWaitingTimeSystem,
    averageQueueLengthSystem,
  });
}

// M/G/c Queue Model
export function calculateMGC(lambda, minVal, maxVal, servers) {
  const arrivalRate = lambda;
  const serviceRate = 1 / ((minVal + maxVal) / 2);
  const cs = Math.pow(maxVal - minVal, 2) / (12 * Math.pow(1 / serviceRate, 2));
  const utilization = getUtilization(arrivalRate / (servers * serviceRate));

  // Corrected: Assign utilization value directly to serverUtilizations

  const expectedQueueLength =
    (calculatePo(servers, utilization) *
      Math.pow(arrivalRate / serviceRate, servers) *
      utilization) /
    (factorial(servers) * Math.pow(1 - utilization, 2));
  const averageWaitingTimeQueue =
    (expectedQueueLength / arrivalRate) * ((1 + cs) / 2);
  const averageQueueLengthQueue = averageWaitingTimeQueue * arrivalRate;
  const averageWaitingTimeSystem = averageWaitingTimeQueue + 1 / serviceRate;
  const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem;

  return absoluteValues({
    utilization,
    averageQueueLengthQueue,
    averageWaitingTimeQueue,
    averageWaitingTimeSystem,
    averageQueueLengthSystem,
  });
}

// G/G/c Queue Model
export function calculateGGC(
  arrivalMean,
  serviceMean,
  arrivalVariance,
  serviceVariance,
  servers
) {
  const arrivalRate = 1 / arrivalMean;
  const serviceRate = 1 / serviceMean;
  const ca = arrivalVariance / Math.pow(1 / arrivalRate, 2);
  const cs = serviceVariance / Math.pow(1 / serviceRate, 2);

  const utilization = getUtilization(arrivalRate / (servers * serviceRate));

  // Corrected: Assign utilization value directly to serverUtilizations
  const expectedQueueLength =
    (calculatePo(servers, utilization) *
      Math.pow(arrivalRate / serviceRate, servers) *
      utilization) /
    (factorial(servers) * Math.pow(1 - utilization, 2));

  const averageQueueLengthQueue = expectedQueueLength * ((ca + cs) / 2);
  const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate;
  const averageWaitingTimeSystem = averageWaitingTimeQueue + 1 / serviceRate;
  const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem;

  return absoluteValues({
    utilization,
    averageQueueLengthQueue,
    averageWaitingTimeQueue,
    averageWaitingTimeSystem,
    averageQueueLengthSystem,
  });
}

// Export the updated functions
