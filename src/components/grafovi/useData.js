import { useState, useEffect } from "react";
import graphData from "../../apis/graphData";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await graphData.get("/");
        if (response.data) {
          setData(response.data);
        }
      } catch (err) {
        // Handle the error here if needed
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && !data.some((d) => d.datum instanceof Date)) {
      const updatedData = data.map((d) => {
        d.datum = new Date(d.datum);
        if (
          d.lokacija === "Splitsko-dalmatinska, Split, Zenta" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Firule"
        ) {
          d.lokacija = "Splitsko-dalmatinska, Split, Bačvice";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Zvončac") {
          d.lokacija = "Splitsko-dalmatinska, Split, Meje";
        } else if (
          d.lokacija === "Splitsko-dalmatinska, Split, Pazdigrad" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Duilovo"
        ) {
          d.lokacija = "Splitsko-dalmatinska, Split, Žnjan";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Stinice") {
          d.lokacija = "Splitsko-dalmatinska, Split, Brda";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Dobri") {
          d.lokacija = "Splitsko-dalmatinska, Split, Grad";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Marjan") {
          d.lokacija = "Splitsko-dalmatinska, Split, Varoš";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Poljud") {
          d.lokacija = "Splitsko-dalmatinska, Split, Spinut";
        } else if (
          d.lokacija === "Splitsko-dalmatinska, Split, Table" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Sukoišan" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Skalice" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Brodarica"
        ) {
          d.lokacija = "Splitsko-dalmatinska, Split, Lovret";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Smrdečac") {
          d.lokacija = "Splitsko-dalmatinska, Split, Split 3";
        } else if (
          d.lokacija === "Splitsko-dalmatinska, Split, Lučac" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Manuš" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Radunica"
        ) {
          d.lokacija = "Splitsko-dalmatinska, Split, Lučac-Manuš";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Dujmovača") {
          d.lokacija = "Splitsko-dalmatinska, Split, Neslanovac";
        } else if (
          d.lokacija === "Splitsko-dalmatinska, Split, Dragovode" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Lovrinac" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Kila" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Dračevac" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Smokovik"
        ) {
          d.lokacija = "Splitsko-dalmatinska, Split, Mejaši";
        } else if (d.lokacija === "Splitsko-dalmatinska, Split, Križine") {
          d.lokacija = "Splitsko-dalmatinska, Split, Trstenik";
        } else if (
          d.lokacija === "Splitsko-dalmatinska, Split, Blatine" ||
          d.lokacija === "Splitsko-dalmatinska, Split, Škrape"
        ) {
          d.lokacija = "Splitsko-dalmatinska, Split, Blatine-Škrape";
        }
        return d;
      });

      setData(updatedData);
    }
  }, [data]);
  console.log(data);
  return data;
};
