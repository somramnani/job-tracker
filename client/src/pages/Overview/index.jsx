import AmountOfJobs from "./AmountOfJobs";

const Overview = () => {
  return (
    <div>
      <h1 className="title">Overview </h1>
      <div className="container-border">
        <p>(Currently under construction)</p>

        <p>
          Here you will be able to see data from the jobs you have applied to!
        </p>
        <AmountOfJobs />
      </div>
    </div>
  );
};
export default Overview;
