let findWaitingTime = (processes, n,
             bt, wt, quantum) => {
    let rem_bt = [];
    for (let i = 0 ; i < n ; i++){
      rem_bt[i] =  bt[i];
    }

    let t = 0;

    while (1)
    {
        let done = true;

        for (let i = 0 ; i < n; i++)
        {
            if (rem_bt[i] > 0)
            {
                done = false;

                if (rem_bt[i] > quantum)
                {
                    t += quantum;

                    rem_bt[i] -= quantum;
                }

                else
                {
                    t = t + rem_bt[i];

                    wt[i] = t - bt[i];

                    rem_bt[i] = 0;
                }
            }
        }

        if (done == true)
          break;
    }
}

let findTurnAroundTime = (processes, n,
                        bt, wt, tat) =>
{
    for (let i = 0; i < n ; i++){
      tat[i] = bt[i] + wt[i];
    }
}

let findAvgTime = (processes, n, bt, quantum) =>
{
    let wt = [], tat = [], total_wt = 0, total_tat = 0;

    findWaitingTime(processes, n, bt, wt, quantum);

    findTurnAroundTime(processes, n, bt, wt, tat);

    for (let i=0; i<n; i++)
    {
        total_wt = total_wt + wt[i];
        total_tat = total_tat + tat[i];
        console.log(" " + "P" +(i + 1) + "\t\t" + bt[i] +"\t " + wt[i] +"\t\t " + tat[i]);
    }

    console.log("Average waiting time = " + total_wt / n);
    console.log("Average turn around time = " + total_tat / n);
}

let processes = [ 1, 2, 3];

let n = processes.length / processes[0];

let burst_time = [10, 5, 8];

let quantum = 2;
findAvgTime(processes, n, burst_time, quantum);
