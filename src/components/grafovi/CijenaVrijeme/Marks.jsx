import { curveNatural, line } from "d3";

export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  circleRadius,
}) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(d.x0))
        .y((d) => yScale(d.y))
        .curve(curveNatural)(binnedData)}
    />
    {binnedData.map((d) => (
      <circle
        className="mark"
        cx={xScale(d.x0)}
        cy={yScale(d.y)}
        r={circleRadius}
      >
        <title>{tooltipFormat(d.y)}</title>
      </circle>
    ))}
    ;
  </g>
);
