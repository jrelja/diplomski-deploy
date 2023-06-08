import React, { useEffect, useState } from "react";
import parking from "../images/parking.png";
import udaljenost from "../images/udaljenost.png";
import odlagaliste from "../images/odlagaliste.png";
import MojMarker from "./MojMarker";


const OcjenaOpis = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;
    script.onload = () => {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
          processEscapes: true,
        },
      });
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [isOcjenaContainerVisible, setOcjenaContainerVisible] = useState(true);
  const handleCloseClick = () => {
    setOcjenaContainerVisible(false);
  };

  if (!isOcjenaContainerVisible) {
    return null;
  }

  <MojMarker isOcjenaContainerVisible={isOcjenaContainerVisible} />
  return (
    <div className="ocjena-opis-container">
      <button className="ocjena-opis-close" onClick={handleCloseClick} />
      <div className="ocjena-opis-content">
        <h2 style={{ paddingLeft: "4em" }}>Način vrednovanja nekretnine</h2>
        <div className="ocjena-opis">
          {/* Equations */}
          <div className="equations">
            <div className="ocjena">
              <span>
                {
                  "$OCJENA = BOLNICA_O+PLAZA_O+CENTAR_O+PARKING_O-ODLAGALISTE_O-BUKA_O$"
                }
              </span>
            </div>
            <div className="bolnica">
              <span>{"$BOLNICA_O = BOLNICA_W \\cdot (1 - BOLNICA_N)$"}</span>
              <span>
                {
                  "$BOLNICA_N = \\frac{{(UB - UB_{{\\text{min}}})}}{{(UB_{{\\text{max}}} - UB_{{\\text{min}}})}}$"
                }
              </span>
              <span>{"$BOLNICA_W = 0.1$"}</span>
              <span>
                {
                  "$UB - \\text{udaljenost između nekretnine i najbliže bolnice}$"
                }
              </span>
              <span>{"$UB_{{\\text{min}}} = 0$"}</span>
              <span>
                {
                  "$UB_{{\\text{max}}} - \\text{maksimalna vrijednost dobivena određivanjem najkraćih udaljenosti}$"
                }
                <br />
                <span className="tekst-dodatak">
                  {
                    "$\\text{između svih nekretnina i njima najbližih bolnica}$"
                  }
                </span>
              </span>
            </div>
            <div className="plaza">
              <span>{"$PLAZA_O = PLAZA_W \\cdot (1 - PLAZA_N)$"}</span>
              <span>
                {
                  "$PLAZA_N - \\frac{{(UP - UP_{{\\text{min}}})}}{{(UP_{{\\text{max}}} - UP_{{\\text{min}}})}}$"
                }
              </span>
              <span>{"$PLAZA_W = 0.4$"}</span>
              <span>
                {
                  "$UP - \\text{udaljenost između nekretnine i najbliže plaže}$"
                }
              </span>
              <span>{"$UP_{{\\text{min}}} = 0$"}</span>
              <span>
                {
                  "$UP_{{\\text{max}}} - \\text{maksimalna vrijednost dobivena određivanjem najkraćih udaljenosti}$"
                }
              </span>
              <span className="tekst-dodatak">
                {"$\\text{između svih nekretnina i njima najbližih plaža}$"}
              </span>
            </div>
            <div className="centar">
              <span>{"$CENTAR_O = CENTAR_W \\cdot (1 - CENTAR_N)$"}</span>
              <span>
                {
                  "$CENTAR_N = \\frac{{(UC - UC_{{\\text{min}}})}}{{(UC_{{\\text{max}}} - UC_{{\\text{min}}})}}$"
                }
              </span>
              <span>{"$CENTAR_W = 0.5$"}</span>
              <span>
                {
                  "$UC - \\text{udaljenost između nekretnine i stare gradske jezgre}$"
                }
              </span>
              <span>{"$UC_{{\\text{min}}} = 0$"}</span>
              <span>
                {
                  "$UC_{{\\text{max}}} - \\text{maksimalna vrijednost dobivena određivanjem najkraćih udaljenosti}$"
                }
              </span>
              <span className="tekst-dodatak">
                {"$\\text{između svih nekretnina i stare gradske jezgre}$"}
              </span>
              <img
                src={udaljenost}
                alt="udaljenost"
                style={{
                  width: "25em",
                  height: "17em",
                  margin: "10px",
                  marginLeft: "3em",
                }}
              />
              <span style={{ fontFamily: "MJXc-TeX-main-Rw" }}>
                *Korištene su najkraće cestovne udaljenosti između dvije točke
              </span>
            </div>
            <div className="parking">
              <span>{"$PARKING_O = PARKING_W \\cdot PARKING_N$"}</span>
              <span>
                {
                  "$PARKING_N = \\frac{{(PP - PP_{{\\text{min}}})}}{{(PP_{{\\text{max}}} - PP_{{\\text{min}}})}}$"
                }
              </span>
              <span>{"$PARKING_W = 0.6$"}</span>
              <span>
                {
                  "$PP - \\text{suma površina dostupnih parkirnih mjesta u blizini nekretnine}$"
                }
              </span>
              <span>{"$PP_{{\\text{min}}} = 0$"}</span>
              <span>
                {
                  "$PP_{{\\text{max}}} - \\text{maksimalna vrijednost dobivena određivanjem suma površina}$"
                }
              </span>
              <span className="tekst-dodatak">
                {
                  "$\\text{dostupnih parkirnih mjesta u blizini svih nekretnina}$"
                }
              </span>
              <img
                src={parking}
                alt="parking"
                style={{
                  width: "20em",
                  height: "20em",
                  margin: "10px",
                  marginLeft: "5em",
                }}
              />
              <span style={{ fontFamily: "MJXc-TeX-main-Rw" }}>
                *Određena je suma površina dostupnih parkinga u radijusu od
                500 m od nekretnine. Ukoliko je parking definiran točkom njegovog
                atribut broj parking mjesta pomnožen je s prosječnom površinom
                jednog mjesta od 15 m² čime je dobivena njegova ukupna površina.
              </span>
            </div>
            <div className="odlagaliste">
              <span>{"$ODLAGALISTE_O = ODLAGALISTE_W \\cdot (1 - ODLAGALISTE_N)$"}</span>
              <span>
                {
                  "$ODLAGALISTE_N = \\frac{{(UO - UO_{{\\text{min}}})}}{{(UO_{{\\text{max}}} - UO_{{\\text{min}}})}}$"
                }
              </span>
              <span>{"$ODLAGALISTE_W = 0.5$"}</span>
              <span>
                {
                  "$UO - \\text{udaljenost između nekretnine i odlagališta otpada}$"
                }
              </span>
              <span>{"$UO_{{\\text{min}}} = 0$"}</span>
              <span>{"$UO_{{\\text{max}}} = 1000$"}</span>
              <img
                src={odlagaliste}
                alt="odlagaliste"
                style={{
                  width: "25em",
                  height: "17em",
                  margin: "10px",
                  marginLeft: "3em",
                }}
              />
              <span style={{ fontFamily: "MJXc-TeX-main-Rw" }}>
                *Ovaj faktor računa se samo za nekretnine koje se nalaze u radjusu od 1000 m od odlaglaišta otpada.
                Ako se nekretnina nalazi unutar radijusa od 500 m težina faktora se povećava.
                Određene su zračne udaljenosti.
              </span>
            </div>
            <div className="buka">
              <span>{"$BUKA_O = BUKA_W \\cdot BUKA_N$"}</span>
              <span>
                {
                  "$BUKA_N = \\frac{{(RB - RB_{{\\text{min}}})}}{{(RB_{{\\text{max}}} - RB_{{\\text{min}}})}}$"
                }
              </span>
              <span>{"$BUKA_W = 0.1$"}</span>
              <span>{"$RB - \\text{razina buke u blizini nekretnine}$"}</span>
              <span>{"$RB_{{\\text{min}}} = 0$"}</span>
              <span>{"$RB_{{\\text{max}}} = 100$"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcjenaOpis;
