import React, { useState, useEffect } from "react";
import "./App.css";
import Karta from "./components/Karta";
// import OdaberiGrad from "./components/OdaberiGrad";
import Slojevi from "./components/Slojevi";
import Grafovi from "./components/Grafovi";
import OcjenaOpis from "./components/OcjenaOpis";
import { getOglasi } from "./apis/getOglasi";


const App = () => {
  // const [selectedGrad, setSelectedGrad] = useState("Split");
  const [activeTileLayer, setActiveTileLayer] = useState("osm");
  const [isOcjenaContainerVisible, setIsOcjenaContainerVisible] =
    useState(false);
  const [oglasi, setOglasi] = useState([]);

  // const handleGradChange = (grad) => {
  //   setSelectedGrad(grad);
  // };

  const handleTileLayerChange = (layer) => {
    setActiveTileLayer(layer);
  };

  useEffect(() => {
    const fetchData = async () => {
      const oglasiData = await getOglasi();
      setOglasi(oglasiData);
    };
  
    fetchData();
  }, []);


  return (
    <div>
      <div className="sve">
        <Karta
          selectedGrad={selectedGrad}
          activeTileLayer={activeTileLayer}
          isOcjenaContainerVisible={isOcjenaContainerVisible}
          setIsOcjenaContainerVisible={setIsOcjenaContainerVisible}
          oglasi={oglasi}
        />
        {/* <OdaberiGrad onGradChange={handleGradChange} /> */}
        <Grafovi />
        <Slojevi onLayerChange={handleTileLayerChange} />
      </div>
      {isOcjenaContainerVisible && <OcjenaOpis isOcjenaContainerVisible={isOcjenaContainerVisible} />}
    </div>
  );
};

export default App;
