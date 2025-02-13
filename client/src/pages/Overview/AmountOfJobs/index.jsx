import { Gauge } from "@mui/x-charts/Gauge";

const AmountOfJobs = () => {
  const numOfJobsApplied = 55;
  return (
    <div>
      <h3>Congrats you applied to {numOfJobsApplied} of jobs!</h3>
      <Gauge
        value={numOfJobsApplied}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
      />
    </div>
  );
};

export default AmountOfJobs;
