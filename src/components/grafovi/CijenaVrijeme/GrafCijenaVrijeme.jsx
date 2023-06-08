import React from "react";
import {
  scaleLinear,
  ascending,
  group,
  median,
  timeFormat,
  scaleTime,
  extent,
  max,
  bin,
  timeMonths,
  min,
  timeFormatDefaultLocale,
} from "d3";
import { useData } from "../useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useWindowSize } from "../windowResize";

export const GrafCijenaVrijeme = () => {

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
  const margin = { top: 50, right: 20, bottom: 120, left: 90 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xAxisLabelOffset = 15;
  const yAxisLabelOffset = 55;
  const data = useData();
  if (!Array.isArray(data)) {
    return <pre></pre>;
  }

  const groupedData = group(data, (d) => d.datum);
  const medianValues = Array.from(groupedData, ([key, value]) => ({
    datum: key,
    cijena_m2: median(value, (d) => d.cijena_m2),
  }));
  medianValues.sort(ascending);

  const xValue = (d) => d.datum;
  const yValue = (d) => d.cijena_m2;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: median(array, yValue),
      x0: array.x0,
      x1: array.x1
        }));

    const yScale = scaleLinear()
    .domain([min(binnedData, d => d.y) - 500, max(binnedData, d => d.y) + 500])
    .range([innerHeight, 0])
    .nice();

  const xAxisTickFormat = timeFormat("%Y, %B");

  return (
    <div className="grupa-graf" height={height} width={width}>
      <svg id="stupci" height={height} width={width}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
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
            Cijena po metru kvadratnom (€)
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={-xAxisLabelOffset}
            textAnchor="middle"
          >Promjena srednje cijene kroz vrijeme
          </text>
          <Marks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={d => d}
            circleRadius={4}
            // innerHeight={innerHeight}
            // innerWidth={innerWidth}
          />
        </g>
      </svg>
    </div>
  );
};
