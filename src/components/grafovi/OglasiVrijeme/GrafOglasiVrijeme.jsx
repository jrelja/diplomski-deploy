import React from "react";
import {
  scaleLinear,
  timeFormat,
  scaleTime,
  extent,
  max,
  bin,
  min,
  timeFormatDefaultLocale,
  timeWeeks,
} from "d3";
import { useData } from "../useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useWindowSize } from "../windowResize";

export const GrafOglasiVrijeme = ({data}) => {
  

  const croatianLocale = {
    dateTime: "%A, %e. %B %Y. %X",
    date: "%d.%m.%Y.",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: [
      "Nedjelja",
      "Ponedjeljak",
      "Utorak",
      "Srijeda",
      "Četvrtak",
      "Petak",
      "Subota",
    ],
    shortDays: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
    months: [
      "Siječanj",
      "Veljača",
      "Ožujak",
      "Travanj",
      "Svibanj",
      "Lipanj",
      "Srpanj",
      "Kolovoz",
      "Rujan",
      "Listopad",
      "Studeni",
      "Prosinac",
    ],
    shortMonths: [
      "Sij",
      "Velj",
      "Ožu",
      "Tra",
      "Svi",
      "Lip",
      "Srp",
      "Kol",
      "Ruj",
      "Lis",
      "Stu",
      "Pro",
    ],
  };
  timeFormatDefaultLocale(croatianLocale);

  let { height, width } = useWindowSize();
  height = height * 0.8;
  width = width * 0.7;
  const margin = { top: 50, right: 20, bottom: 100, left: 90 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xAxisLabelOffset = 15;
  const yAxisLabelOffset = 55;
  var data = useData();
  if (!Array.isArray(data)) {
    return <pre></pre>;
  }
  data = data.filter((d) => {
    const date = new Date(d.datum);
    const cutoffDate = new Date("2023-02-15");
    return date > cutoffDate;
  });


  const xValue = (d) => d.datum;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeWeeks(start, stop))(data)
    .map(array => ({
      y: array.length,
      x0: array.x0,
      x1: array.x1
        }));

    const yScale = scaleLinear()
    .domain([min(binnedData, d => d.y), max(binnedData, d => d.y) + 50])
    .range([innerHeight, 0])
    .nice();

  const xAxisTickFormat = timeFormat("%d.%m.%Y.");

  const tickValues = timeWeeks(start, stop);
  console.log(tickValues);

  return (
    <div className="grupa-graf" height={height} width={width}>
      <svg id="stupci" height={height} width={width}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickValues={tickValues}
            tickOffset={7}
            innerWidth={innerWidth}
            
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            Broj oglasa
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={-xAxisLabelOffset}
            textAnchor="middle"
          >Prikaz broja oglasa po tjednima
          </text>
          <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={d => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
        </g>
      </svg>
    </div>
  );
};
