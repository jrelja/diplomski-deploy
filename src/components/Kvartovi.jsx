import React, { useState } from "react";
import { GeoJSON } from "react-leaflet";
import kvartovi from "./kvartoviGeoJSON.json";
import { useData } from "./grafovi/useData";
import { group, median } from "d3";
import Legenda from "./Legenda";

const filteredFeatures = kvartovi.features.map((feature) => ({
  type: "Feature",
  geometry: feature.geometry,
  properties: { name: feature.properties.name },
}));

const filteredKvartovi = {
  type: "FeatureCollection",
  name: "kvartoviGeoJSON",
  features: filteredFeatures,
};

const Kvartovi = () => {
  const data = useData();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  if (!Array.isArray(data)) {
    return <pre></pre>;
  }

  const groupedData = group(data, (d) => d.lokacija);
  const medianValues = Array.from(groupedData, ([key, value]) => ({
    lokacija: key,
    cijena_m2: median(value, (d) => d.cijena_m2),
  }));

  const modifiedMedianValues = medianValues.map(({ lokacija, cijena_m2 }) => {
    const splitLokacija = lokacija.split(" ");
    const modifiedLokacija = splitLokacija[splitLokacija.length - 1];
    return { lokacija: modifiedLokacija, cijena_m2 };
  });

  const updatedFeatures = filteredKvartovi.features.map((feature) => {
    const modifiedLokacija = feature.properties.name.split(" ").pop();
    const medianValue = modifiedMedianValues.find(
      (item) => item.lokacija === modifiedLokacija
    );
    const updatedProperties = {
      ...feature.properties,
      cijena_m2: medianValue ? medianValue.cijena_m2 : null,
    };
    return {
      ...feature,
      properties: updatedProperties,
    };
  });

  const updatedFilteredKvartovi = {
    ...filteredKvartovi,
    features: updatedFeatures,
  };

  const highlightFeature = (feature) => {
    if (!hoveredFeature) {
      setHoveredFeature(feature);
    }
  };

  const resetHighlight = () => {
    if (hoveredFeature) {
      setHoveredFeature(null);
    }
  };

  const selectFeature = (feature) => {
    setSelectedFeature(feature);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mousemove: () => {
        highlightFeature(feature);
      },
      mouseout: () => {
        resetHighlight();
      },
      click: () => {
        selectFeature(feature);
      },
    });
  };

  const mapPolygonColorToDensity = (cijena_m2) => {
    return cijena_m2 > 5000
      ? "#a50f15"
      : cijena_m2 > 4500
      ? "#de2d26"
      : cijena_m2 > 4000
      ? "#fb6a4a"
      : cijena_m2 > 3500
      ? "#fc9272"
      : cijena_m2 > 3000
      ? "#fcbba1"
      : "#fee5d9";
  };

  const style = (feature) => {
    const isSelected = feature === selectedFeature;
    const isHovered = feature === hoveredFeature;
    const fillColor = mapPolygonColorToDensity(feature.properties.cijena_m2);

    return {
      fillColor: isSelected || isHovered ? fillColor : fillColor,
      weight: isSelected ? 3 : 0, // Increase border weight for selected feature
      opacity: 1,
      color: isSelected ? "red" : "white", // Set border color to red for selected feature
      dashArray: "2",
      fillOpacity: isSelected || isHovered ? 0.8 : 0.6,
    };
  };

  return (
    <div className="legenda-grupa">
      {!selectedFeature && (
        <div className="census-info">
          <strong>
            Prosječna cijena kvadrata stana u Splitu po kvartovima
          </strong>
          <p>Odaberi kvart za detalje</p>
        </div>
      )}
      {selectedFeature && (
        <ul className="census-info-hover">
          <li>
            <strong>
              Kvart: <h4>{selectedFeature.properties.name}</h4>
            </strong>
          </li>
          <br />
          <li>
            <strong>
              Prosječna cijena kvadrata:{" "}
              <h4>{selectedFeature.properties.cijena_m2} €</h4>{" "}
            </strong>
          </li>
        </ul>
      )}
      {updatedFilteredKvartovi && (
        <GeoJSON
          data={updatedFilteredKvartovi}
          style={style}
          onEachFeature={onEachFeature}
        />
      )}
      <Legenda />
    </div>
  );
};

export default Kvartovi;
