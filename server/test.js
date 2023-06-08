
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

const MojMarker = () => {
  const [oglasi, setOglasi] = useState([]);
  const getOglasi = async () => {
    try {
      const response = await fetch("http://localhost:4000/prikazoglasi");
      const jsonData = await response.json();
      setOglasi(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOglasi();
  }, []);

  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(14);
  const [isUserMove, setIsUserMove] = useState(true);
  const map = useMap();

  const updateMap = useCallback(() => {
    if (isUserMove) {
      const b = map.getBounds();
      setBounds([
        b.getSouthWest().lng,
        b.getSouthWest().lat,
        b.getNorthEast().lng,
        b.getNorthEast().lat,
      ]);
      setZoom(map.getZoom());
    } else {
      setIsUserMove(true);
    }
  }, [map, isUserMove]);

  useEffect(() => {
    updateMap();
  }, [map, updateMap]);

  useEffect(() => {
    const handleMove = () => {
      setIsUserMove(true);
    };

    map.on("move", handleMove);
    return () => {
      map.off("move", handleMove);
    };
  }, [map]);

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

  const handlePopupOpen = () => {
    setIsUserMove(false);
  };

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

        const mojaCijena = cluster.properties.cijena;
        function shortenPrice(cijena) {
          const num = parseInt(cijena, 10);
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(".0", "") + "K";
          } else {
            return num.toString();
          }
        }

        let myIcon;
        if (cluster.properties.tip === "zemljiste") {
          myIcon = L.divIcon({
            iconSize: 0,
            html: `<div class="zemljiste">${shortenPrice(mojaCijena)}</div>`,
          });
        } else {
          myIcon = L.divIcon({
            iconSize: 0,
            html: `<div class="mojmarker">${shortenPrice(mojaCijena)}</div>`,
          });
        }

        return (
          <Marker
            key={`oglas-${cluster.properties.oglasId}`}
            position={[latitude, longitude]}
            icon={myIcon}
          >
            <Popup onOpen={handlePopupOpen}>
              <a href={cluster.properties.link} style={{ textDecoration: "none" }}>
                <h5>{cluster.properties.naslov}</h5>
              </a>
              <img src={cluster.properties.slika} alt="slika" width="250" height="150" /><br /><br />
              <h6>
                <div
                  className={`boje-ocjena`}
                  style={{
                    backgroundColor: bojaPromijeni(cluster.properties.ocjena),
                  }}
                >
                  Ocjena: {cluster.properties.ocjena}
                </div><br /><br />
                Površina: {cluster.properties.povrsina} m²<br />
                Cijena: {cluster.properties.cijena} €<br />
                Cijena m²: {cluster.properties.cijenam2} &#8364;<br />
              </h6>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MojMarker;