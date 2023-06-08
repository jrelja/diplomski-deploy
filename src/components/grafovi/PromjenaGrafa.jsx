import React, { useState, useEffect } from "react";

const PromjenaGrafa = ({ handleScrollLeft, handleScrollRight }) => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowButtons(true);
    }, 100); // Adjust the delay time here (in milliseconds)

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {showButtons && (
        <>
          <button className="promjena-grafa-left" onClick={handleScrollLeft}></button>
          <button className="promjena-grafa-right" onClick={handleScrollRight}></button>
        </>
      )}
    </>
  );
};

export default PromjenaGrafa;