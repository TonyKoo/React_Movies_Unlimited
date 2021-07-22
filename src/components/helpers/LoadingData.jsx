import React from "react";
import { FadeLoader } from "react-spinners";

function LoadingData() {
  return (
    <div className="loader">
      <FadeLoader
        height={50}
        width={20}
        radius={5}
        margin={40}
        color={"#9B9B9B"}
      />
    </div>
  );
}

export default LoadingData;
