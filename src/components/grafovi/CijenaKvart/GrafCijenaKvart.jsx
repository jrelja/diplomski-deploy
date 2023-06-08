import React from "react";
import {
  scaleBand,
  scaleLinear,
  max,
  ascending,
  group,
  median,
  descending,
} from "d3";
import { useData } from "../useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useWindowSize } from "../windowResize";

export const GrafCijenaKvart = () => {
  let { height, width } = useWindowSize();
  height = height * 0.8;
  width = width * 0.7;
  const margin = { top: 50, right: 20, bottom: 60, left: 120 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xAxisLabelOffset = 45;

  const data = useData();
  if (!Array.isArray(data)) {
    return <pre></pre>;
  }

  const groupedData = group(data, (d) => d.lokacija);
  const medianValues = Array.from(groupedData, ([key, value]) => ({
    lokacija: key,
    cijena_m2: median(value, (d) => d.cijena_m2),
  }));
  medianValues.sort(ascending);

  const yValue = (d) => d.lokacija;
  const xValue = (d) => d.cijena_m2;

  const yScale = scaleBand()
    .domain(
      medianValues
        .sort((a, b) => descending(a.cijena_m2, b.cijena_m2))
        .map((d) => d.lokacija)
    )
    .range([0, innerHeight])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, max(medianValues, (d) => d.cijena_m2)])
    .range([0, innerWidth]);

  return (
    <div className="grupa-graf" height={height} width={width}>
      <svg id="stupci" height={height} width={width}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + xAxisLabelOffset}
          >
            Cijena po metru kvadratnom (€)
          </text>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={-18}
            textAnchor="middle"
          >Srednja cijena po kvartovima
          </text>
          <Marks
            data={medianValues}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </div>
  );
};
