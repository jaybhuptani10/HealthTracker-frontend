import React from "react";

const StepCounterComp = () => {
  const [steps, setSteps] = React.useState(0);
  return (
    <div
      className={`h-48 w-48 rounded-full border-5 border-gray-500 border-b-transparent`}
    ></div>
  );
};

export default StepCounterComp;
