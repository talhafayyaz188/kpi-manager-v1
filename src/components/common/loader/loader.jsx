import React from "react";
import pic1 from "../../../assets/images/media/loader.svg";

const Loader = () => {
  return (
    <div>
      <div id="loader">
        <img src={pic1} className="loader-img" alt="Loader" />
      </div>
    </div>
  );
};
export default Loader;
