import React, { useCallback, useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import useSupercluster from "use-supercluster";
import bojaPromijeni from "./promjenaBoje";

const icons = {};

const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      iconSize: 0,
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

const shortenPrice = (cijena) => {
  const num = parseInt(cijena, 10);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K";
  } else {
    return num.toString();
  }
};

const maxZoom = 22;

const MojMarker = ({ isOcjenaContainerVisible, setIsOcjenaContainerVisible }) => {
  const handleButtonClick = () => {
    setIsOcjenaContainerVisible(!isOcjenaContainerVisible);
  };

  const [oglasi, setOglasi] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(14);
  const map = useMap();

  const getOglasi = async () => {
    try {
      const response = await fetch("https://diplomski-api.vercel.app/api/v1/oglasi/prikazoglasi");
      const jsonData = await response.json();
      setOglasi(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateMap = useCallback(() => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    getOglasi();
  }, []);

  useEffect(() => {
    updateMap();
  }, [map, updateMap]);

  useEffect(() => {
    map.on("move", updateMap);
    return () => {
      map.off("move", updateMap);
    };
  }, [map, updateMap]);

  const points = oglasi.map((oglas) => ({
    type: "Feature",
    properties: {
      cluster: false,
      oglasId: oglas.id,
      link: oglas.link,
      povrsina: oglas.povrsina,
      cijena: oglas.cijena,
      cijenam2: oglas.cijena_m2,
      ocjena: oglas.ocjena,
      naslov: oglas.naslov,
      tip: oglas.tip,
      slika: oglas.slika,
    },
    geometry: {
      type: "Point",
      coordinates: [oglas.lon, oglas.lat],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 100, maxZoom: 16 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                30 + (pointCount / points.length) * 60
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        const slika =
          cluster.properties.slika !== "NULL"
            ? cluster.properties.slika
            : "http://s1.rea.global/img/raw/placeholder.png";
        const mojaCijena = cluster.properties.cijena;
        const iconClass =
          cluster.properties.tip === "zemljiste" ? "zemljiste" : "mojmarker";
        const myIcon = L.divIcon({
          iconSize: 0,
          html: `<div class="${iconClass}">${shortenPrice(mojaCijena)}</div>`,
        });
        return (
          <Marker
            key={`oglas-${cluster.properties.oglasId}`}
            position={[latitude, longitude]}
            icon={myIcon}
          >
            <Popup>
              <a
                href={`${cluster.properties.link}`}
                style={{ textDecoration: "none" }}
              >
                <h5
                  style={{
                    maxWidth: "260px",
                    wordWrap: "break-word",
                    textAlign: "left",
                    color: "rgb(92 88 88)",
                  }}
                >
                  {cluster.properties.naslov}
                </h5>
              </a>
              <div style={{ position: "relative" }}>
                <img src={slika} alt="slika" width="260" height="180" /> <br />
                <button
                  className={`boje-ocjena`}
                  style={{
                    backgroundColor: bojaPromijeni(cluster.properties.ocjena),
                  }}
                  onClick={handleButtonClick}
                >
                  Ocjena: {cluster.properties.ocjena}
                </button>
                
              </div>
              <h6>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr style={{ backgroundColor: "#e5e5e5" }}>
                      <th>Površina:</th>
                      <th style={{ paddingRight: "5px" }}>
                        {String(cluster.properties.povrsina).replaceAll(
                          ".",
                          ","
                        )}{" "}
                        m²
                      </th>
                    </tr>
                    <tr>
                      <th>Cijena: </th>
                      <th style={{ paddingRight: "5px" }}>
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "EUR",
                          maximumSignificantDigits: 6,
                        }).format(cluster.properties.cijena)}{" "}
                      </th>
                    </tr>
                    <tr style={{ backgroundColor: "#e5e5e5" }}>
                      <th>Cijena m²: </th>
                      <th style={{ paddingRight: "5px" }}>
                        {cluster.properties.cijenam2} &#8364;
                      </th>
                    </tr>
                  </tbody>
                </table>
              </h6>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MojMarker;
