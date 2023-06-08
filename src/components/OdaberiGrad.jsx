import React, { useState } from "react";

const OdaberiGrad = ({ onGradChange }) => {
  const [grad, setGrad] = useState('Split');
  const [drugiGrad, setDrugiGrad] = useState('Zagreb');

  const handleGradChange = () => {
    const tempGrad = drugiGrad;
    setDrugiGrad(grad);
    setGrad(tempGrad);
    onGradChange(tempGrad);
  };
  

  return (
    <div className="dropdown-center">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {grad}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <button className="dropdown-item" onClick={handleGradChange}>
            {drugiGrad}
          </button>
        </li>
      </div>
    </div>
  );
};

export default OdaberiGrad;