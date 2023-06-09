import React, { useState, useEffect, useRef } from "react";
import TipkaGraf from './grafovi/TipkaGraf';
import PromjenaGrafa from "./grafovi/PromjenaGrafa";
import { GrafCijenaKvart } from "./grafovi/CijenaKvart/GrafCijenaKvart";
import { GrafCijenaVrijeme } from "./grafovi/CijenaVrijeme/GrafCijenaVrijeme";
import { useData } from "./grafovi/useData";

const Grafovi = () => {
  const [prikaziGraf, setPrikaziGraf] = useState(false);
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0); // Track the current graph index
  const grafoviRef = useRef(null);

  const data = useData();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (grafoviRef.current && !grafoviRef.current.contains(event.target)) {
        setPrikaziGraf(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleScrollLeft = () => {
    setCurrentGraphIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      const totalGraphs = 2; // Total number of existing graphs
  
      // Loop to the last graph if the index becomes negative
      if (newIndex < 0) {
        return totalGraphs - 1;
      }
  
      return newIndex;
    });
  };
  
  const handleScrollRight = () => {
    setCurrentGraphIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      const totalGraphs = 2; // Total number of existing graphs
  
      // Loop to the first graph if the index exceeds the total number of graphs
      if (newIndex >= totalGraphs) {
        return 0;
      }
  
      return newIndex;
    });
  };

  return (
    <div className="grafovi-container" ref={grafoviRef}>
      <TipkaGraf setPrikaziGraf={setPrikaziGraf} />
      {prikaziGraf && (
        <>
          {currentGraphIndex === 0 && <GrafCijenaKvart data={data} />}
          {currentGraphIndex === 1 && <GrafCijenaVrijeme />}
          <div className="promjena-grafa-container">
            <PromjenaGrafa
              handleScrollLeft={handleScrollLeft}
              handleScrollRight={handleScrollRight}
              prikaziGraf={prikaziGraf}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Grafovi;
