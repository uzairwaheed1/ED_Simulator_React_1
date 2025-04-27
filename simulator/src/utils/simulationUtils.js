// import { cp } from "fs";
// import { console } from "inspector";

function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
// function calculateCP(lambda, x) {
//   return (Math.pow(lambda, x) * Math.exp(-lambda)) / factorial(x);
// }
function calculateLcg(seed, A = 55, B = 9, M = 1994) {
  return (A * seed + B) % M;
}
// function generateInterarrivalTimes(lambda, numCustomers) {
//   const interarrivalTimes = [0];
//   for (let i = 0; i < numCustomers - 1; i++) {
//     const rand = Math.random();
//     let cumulativeProbability = 0;
//     let x = 0;
//     while (true) {
//       cumulativeProbability += calculateCP(lambda, x);
//       if (rand <= cumulativeProbability) {
//         interarrivalTimes.push(x);
//         break;
//       }
//       x++;
//     }
//   }
//   return interarrivalTimes;
// }

function cpCalc(arrivalMean) {
  let cplookup = 0;
  let cp = 0;
  let count = 0;
  let cparray = [];
  let cplookuparray = [];

  while (cp < 1) {
      let calc = Math.pow(2.71828, -arrivalMean);
      calc = calc * Math.pow(arrivalMean, count);
      calc = calc / factorial(count);

      cplookup = cp;
      cplookuparray[count] = cplookup;

      cp = calc + cplookup;
      cparray[count] = cp;

      // console.log(cp + '\n' + count)
      count = count + 1;
  }

  let array = [cparray, cplookuparray];
  return array;
}
let cplookupGlobal = []; // 🌟 GLOBAL array bana diya
let cpDataArray = []


function generateInterarrivalTimes(arrivalMean) {
    let interarrival = [];
    console.log("Arrival Mean: ", arrivalMean);

    let arraymain = cpCalc(arrivalMean);
    let cparray = arraymain[0];
    let cplookuparray = arraymain[1];
    cpDataArray[0] = cplookuparray;
    cpDataArray[1] = cparray;

    console.log("CP Array: ", cparray);
    console.log("CP Lookup Array: ", cplookuparray);

    // Global array mein store kar diya
    cplookupGlobal = cplookuparray;

    interarrival[0] = 0;
    console.log("Initial Interarrival: ", interarrival[0]);

    let interarrivalIndex = [];
    interarrivalIndex[0] = 0;

    for (let i = 1; i < cparray.length; i++) {
        interarrivalIndex[i] = i;
        console.log("Interarrival Index: ", interarrivalIndex[i]);
        let random = Math.random();
        if (random == 0) random += 0.1;
        console.log(`Random Number [${i}]: `, random);

        for (let j = 0; j < cplookuparray.length; j++) {
            if (random > cplookuparray[j] && random < cparray[j]) {
                interarrival[i] = j + 1;
                console.log(`Random ${random} lies between CPlookup[${j}] (${cplookuparray[j]}) and CP[${j}] (${cparray[j]}), so Interarrival[${i}] = ${interarrival[i]}`);

            }
        }
    }
    cpDataArray[2] = interarrivalIndex;
    cpDataArray[3] = interarrival;
    console.log("Final Interarrival Array: ", interarrival);
    console.log("cpDataArray: ", cpDataArray);

    return interarrival;
}



function generateServiceTimes(mu, numCustomers) {
  const serviceTimes = [];
  for (let i = 0; i < numCustomers; i++) {
    const rand = Math.random();
    serviceTimes.push(Math.ceil(-mu * Math.log(rand)));
  }
  return serviceTimes;
}
function generateNormalServiceTimes(numCustomers, mu, sd) {
  const serviceTimes = [];
  for (let i = 0; i < numCustomers; i++) {
    const rand1 = Math.random(); // Rand#1 in [0, 1)
    const rand2 = Math.random(); // Rand#2 in [0, 1)
    const z = Math.sqrt(-2 * Math.log(rand1)) * Math.cos(2 * Math.PI * rand2); // Box-Muller transform
    const serviceTime = mu + sd * z;
    serviceTimes.push(Math.ceil(Math.abs(serviceTime))); // Ensure positive service times
  }
  return serviceTimes;
}

function generateUniformServiceTimes(numCustomers, a, b) {
  const serviceTimes = [];
  for (let i = 0; i < numCustomers; i++) {
    const rand = Math.random(); // Rand# in [0, 1)
    const serviceTime = a + (b - a) * rand;
    serviceTimes.push(Math.ceil(serviceTime)); // Round up to ensure service times are integers
  }
  return serviceTimes;
}
function generatePriorities(numCustomers, a, b, m = 1994) {
  const priorities = [];
  let seed = Math.pow(1, 7);

  for (let i = 0; i < numCustomers; i++) {
    seed = calculateLcg(seed);
    const xi = seed;
    const priority = a + (b - a) * (xi / m);
    priorities.push(Math.round(priority));
  }
  return priorities;
}

function runPreemptiveSimulation(
  arrivals,
  serviceTimes,
  priorities,
  numServers,
  dist
) {
  const servers = Array(numServers).fill(null);
  const events = Array.from({ length: numServers }, () => []);
  const serverServiceTimes = Array(numServers).fill(0);
  let time = 0;

  let QueueCustomers = arrivals.map((arrivalTime, index) => ({
    id: index + 1,
    arrivalTime,
    serviceTime: serviceTimes[index],
    remainingServiceTime: serviceTimes[index],
    priority: priorities[index],
    waitTime: 0,
    turnAroundTime: undefined,
    responseTime: undefined,
    startTime: undefined,
    endTime: undefined,
    isServiceComplete: false,
    serving: false,
    serverId: undefined,
  }));

  while (true) {
    if (QueueCustomers.every((customer) => customer.isServiceComplete)) {
      break;
    }

    // Complete service for any customer whose remaining service time is 0
    servers.forEach((server, index) => {
      if (
        server &&
        server.remainingServiceTime === 0 &&
        !server.isServiceComplete
      ) {
        server.isServiceComplete = true;
        server.serving = false;
        server.endTime = time; // Set endTime when service is completed
        events[index].push({
          time,
          type: "serviceComplete",
          customerId: server.id,
          server: index,
        });
        servers[index] = null;
      }
    });

    // Prepare list of available customers for service
    let availableCustomers = QueueCustomers.filter(
      (customer) =>
        !customer.isServiceComplete &&
        !customer.serving &&
        customer.arrivalTime <= time
    );
    availableCustomers.sort((a, b) => a.priority - b.priority);

    // Allocate service to customers based on priority
    servers.forEach((server, index) => {
      if (!server) {
        const nextCustomer = availableCustomers.shift();
        if (nextCustomer) {
          nextCustomer.startTime = nextCustomer.startTime ?? time;
          nextCustomer.serving = true;
          servers[index] = nextCustomer;
          events[index].push({
            time,
            type: "serviceStart",
            customerId: nextCustomer.id,
            server: index,
          });
        }
      } else {
        const highestPriorityCustomer = availableCustomers[0];
        if (
          highestPriorityCustomer &&
          highestPriorityCustomer.priority < server.priority
        ) {
          availableCustomers.shift();
          // server.remainingServiceTime -= 1; // Decrease remaining service time
          server.serving = false;
          availableCustomers.unshift(server);
          availableCustomers.sort((a, b) => a.priority - b.priority);
          servers[index] = highestPriorityCustomer;
          highestPriorityCustomer.startTime =
            highestPriorityCustomer.startTime ?? time;
          highestPriorityCustomer.serving = true;
          events[index].push({
            time,
            type: "preemption",
            customerId: highestPriorityCustomer.id,
            server: index,
          });
        }
      }
    });

    // Decrement remaining service time for all servers
    servers.forEach((server) => {
      if (server) {
        server.remainingServiceTime -= 1;
        if (server.remainingServiceTime < 0) {
          server.remainingServiceTime = 0;
        }
      }
    });

    servers.forEach((server, index) => {
      if (server) {
        // Ensure it doesn't go below 0
        serverServiceTimes[index] += 1; // Increment service time for the server
      }
    });

    time += 1;
  }
  //calculate server utilization
  const totalSimulationTime = time;
  const serverUtilizations = serverServiceTimes.map(
    (serviceTime) => (serviceTime / totalSimulationTime) * 100
  );
  console.log(serverUtilizations);

  // Calculate turnaround and wait times after simulation ends
  QueueCustomers.forEach((customer) => {
    customer.turnAroundTime = customer.endTime - customer.arrivalTime;
    customer.waitTime = customer.turnAroundTime - customer.serviceTime;
    customer.responseTime = customer.startTime - customer.arrivalTime;
  });

  console.log("events:", events);
  return { QueueCustomers, events, serverUtilizations };
}

export function simulate(
  customersCount,
  serversCount,
  lambda,
  lowestPriority,
  dist,
  mue = 0,
  sd = 0,
  a = 0,
  b = 0
) {
  const interarrivalTimes = generateInterarrivalTimes(lambda);
  const arrivals = interarrivalTimes.reduce((acc, curr, idx) => {
    acc.push((idx === 0 ? 0 : acc[idx - 1]) + curr);
    return acc;
  }, []);
  let serviceTimes;
  if (dist === "exponential") {
    serviceTimes = generateServiceTimes(mue, cplookupGlobal.length);
  } else if (dist === "uniform") {
    serviceTimes = generateUniformServiceTimes(cplookupGlobal.length, a, b);
  } else if (dist === "normal") {
    serviceTimes = generateNormalServiceTimes(cplookupGlobal.length, mue, sd);
  }
  const priorities = generatePriorities(cplookupGlobal.length, 1, 3);
  const { QueueCustomers, events, serverUtilizations } =
    runPreemptiveSimulation(arrivals, serviceTimes, priorities, serversCount);
  return { QueueCustomers, events, serverUtilizations, cpDataArray };
}
