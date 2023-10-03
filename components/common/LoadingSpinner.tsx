import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="w-4/5 max-2-5xl mx-auto my-16 flex justify-center items-center">
      <span className="animate-spin">
        <FaSpinner size={"4rem"} color="gray" />
      </span>
    </div>
  );
}

export default LoadingSpinner;