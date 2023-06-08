import React, { useState } from "react";
import "./App.css";
import Karta from "./components/Karta";
import OdaberiGrad from "./components/OdaberiGrad";
import Slojevi from "./components/Slojevi";
import Grafovi from "./components/Grafovi";
import OcjenaOpis from "./components/OcjenaOpis";


const App = () => {
  const [selectedGrad, setSelectedGrad] = useState("Split");
  const [activeTileLayer, setActiveTileLayer] = useState("osm");
  const [isOcjenaContainerVisible, setIsOcjenaContainerVisible] =
    useState(false);

  const handleGradChange = (grad) => {
    setSelectedGrad(grad);
  };

  const handleTileLayerChange = (layer) => {
    setActiveTileLayer(layer);
  };

  return (
    <div>
      <div className="sve">
        <Karta
          selectedGrad={selectedGrad}
          activeTileLayer={activeTileLayer}
          isOcjenaContainerVisible={isOcjenaContainerVisible}
          setIsOcjenaContainerVisible={setIsOcjenaContainerVisible}
        />
        <OdaberiGrad onGradChange={handleGradChange} />
        <Grafovi />
        <Slojevi onLayerChange={handleTileLayerChange} />
      </div>
      {isOcjenaContainerVisible && <OcjenaOpis isOcjenaContainerVisible={isOcjenaContainerVisible} />}
    </div>
  );
};

export default App;
