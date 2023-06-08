import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MojMarker from "./MojMarker";
import Kvartovi from "./Kvartovi";

const Karta = ({
  selectedGrad,
  activeTileLayer,
  isOcjenaContainerVisible,
  setIsOcjenaContainerVisible,
}) => {
  const [center, setCenter] = React.useState([43.5147, 16.4435]);
  const [mapKey, setMapKey] = React.useState(Date.now());

  useEffect(() => {
    let newCenter = [43.5147, 16.4435]; // Default location if selectedGrad is invalid

    if (selectedGrad === "Split") {
      newCenter = [43.5147, 16.4435];
    } else if (selectedGrad === "Zagreb") {
      newCenter = [45.815, 15.9819];
    }

    setCenter(newCenter);
    setMapKey(Date.now()); // Update the key to trigger a rerender
  }, [selectedGrad]);

  return (
    <div id="map">
      <MapContainer key={mapKey} center={center} zoom={14} scrollWheelZoom={true}>
        {activeTileLayer === "OSM" && (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />
        )}
        {activeTileLayer === "DOF" && (
          <TileLayer
            url="https://split-gisportal.gdi.net/server/rest/services/ST_DOF_2021/MapServer/tile/{z}/{y}/{x}"
            attribution="GIS Portal Grada Splita"
            maxZoom={19}
          />
        )}
        {activeTileLayer === "cijena-kvart" && 
        <>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
        <Kvartovi /></>}
        <MojMarker
          isOcjenaContainerVisible={isOcjenaContainerVisible}
          setIsOcjenaContainerVisible={setIsOcjenaContainerVisible}
        />
      </MapContainer>
    </div>
  );
};

export default Karta;
