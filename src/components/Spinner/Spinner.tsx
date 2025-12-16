import React from "react";
import type { LoadingProps } from "../../types";

const Spinner: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-lg text-gray-500">{message}</p>
      </div>
    );
  };
  
  export default Spinner;