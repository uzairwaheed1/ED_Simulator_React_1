function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}
function calculateCP(lambda, x) {
    return (Math.pow(lambda, x) * Math.exp(-lambda)) / factorial(x);
}
function calculateLcg(seed, A = 55, B = 9, M = 1994) {
    return (A * seed + B) % M;
}
function generateInterarrivalTimes(lambda, numCustomers) {
    const interarrivalTimes = [0];
    for (let i = 0; i < numCustomers - 1; i++) {
        const rand = Math.random();
        let cumulativeProbability = 0;
        let x = 0;
        while (true) {
            cumulativeProbability += calculateCP(lambda, x);
            if (rand <= cumulativeProbability) {
                interarrivalTimes.push(x);
                break;
            }
            x++;
        }
    }
    return interarrivalTimes;
}
function generateServiceTimes(mu, numCustomers) {
    const serviceTimes = [];
    for (let i = 0; i < numCustomers; i++) {
        const rand = Math.random();
        serviceTimes.push(Math.ceil(-mu * Math.log(rand)));
    }
    return serviceTimes;
}

function generatePriorities(numCustomers, a, b, m = 1994) {
    const priorities = [];
    let seed = Math.pow(1, 7)

    for (let i = 0; i < numCustomers; i++) {
        seed = calculateLcg(seed);
        const xi = seed;
        const priority = a + (b - a) * (xi / m);
        priorities.push(Math.round(priority));
    }
    return priorities;
}

function runPreemptiveSimulation(arrivals, serviceTimes, priorities, numServers) {
    const servers = Array(numServers).fill(null);
    const events = [];
    let time = 0;

    let QueueCustomers = arrivals.map((arrivalTime, index) => ({
        id: index + 1,
        arrivalTime,
        serviceTime : serviceTimes[index],
        remainingServiceTime: serviceTimes[index],
        priority: priorities[index],
        waitTime: 0,
        startTime: undefined,
        endTime: undefined,
        isServiceComplete: false,
        serving: false
    }));

    while (true) {
        if (QueueCustomers.every(customer => customer.isServiceComplete)) {
            break;
        }

        QueueCustomers.forEach(customer => {
            if (customer.arrivalTime === time && !customer.isServiceComplete) {
                events.push({ time, type: "arrival", customerId: customer.id });
            }
        });

        servers.forEach((server, index) => {
            if (server && server.remainingServiceTime === 0) {
                server.isServiceComplete = true;
                server.serving = false;
                server.endTime = time;
                events.push({ time, type: "serviceComplete", customerId: server.id });
                servers[index] = null;
            }
        });

        let availableCustomers = QueueCustomers.filter(
            customer => !customer.isServiceComplete && !customer.serving && customer.arrivalTime <= time
        );
        availableCustomers.sort((a, b) => a.priority - b.priority);

        servers.forEach((server, index) => {
            if (!server) {
                const nextCustomer = availableCustomers.shift();
                if (nextCustomer) {
                    nextCustomer.startTime = nextCustomer.startTime ?? time;
                    nextCustomer.serving = true; 
                    servers[index] = nextCustomer;
                    events.push({ time, type: "serviceStart", customerId: nextCustomer.id, server: index });
                }
            } else {
                const highestPriorityCustomer = availableCustomers[0];
                if (
                    highestPriorityCustomer &&
                    highestPriorityCustomer.priority < server.priority
                ) {
                    availableCustomers.shift();
                    server.remainingServiceTime -= 1;
                    server.serving = false;
                    availableCustomers.unshift(server);
                    availableCustomers.sort((a, b) => a.priority - b.priority);
                    servers[index] = highestPriorityCustomer;
                    highestPriorityCustomer.startTime = highestPriorityCustomer.startTime ?? time;
                    highestPriorityCustomer.serving = true;
                    events.push({ time, type: "preemption", customerId: highestPriorityCustomer.id, server: index });
                }
            }
        });

        servers.forEach(server => {
            if (server) {
                server.remainingServiceTime -= 1;
                if (server.remainingServiceTime < 0) {
                    server.remainingServiceTime = 0;
                }
            }
        });

        time += 1;
    }

    console.log("Simulation complete!");

    console.table(
        QueueCustomers.map(customer => ({
            ID: customer.id,
            "Arrival Time": customer.arrivalTime,
            "Start Time": customer.startTime,
            "End Time": customer.endTime,
            "Service Time" : customer.serviceTime,
            "Wait Time": customer.startTime !== undefined ? customer.startTime - customer.arrivalTime : 0,
            Priority: customer.priority,
            "Service Complete": customer.isServiceComplete
        }))
    );

    console.table(
        events.map(event => ({
            Time: event.time,
            Type: event.type,
            "Customer ID": event.customerId,
            Server: event.server !== undefined ? event.server : "-"
        }))
    );
}

const customersCount = 10;
const interarrivalTimes = generateInterarrivalTimes(2, customersCount)
const arrivals = interarrivalTimes.reduce((acc, curr, idx) => {
    acc.push((idx === 0 ? 0 : acc[idx - 1]) + curr);
    return acc;
}, []);
const serviceTimes = generateServiceTimes(3, customersCount);
const priorities = generatePriorities(customersCount, 1, 3);

runPreemptiveSimulation(arrivals, serviceTimes, priorities, 2)
