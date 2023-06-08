export const AxisBottom = ({ xScale, innerHeight, innerWidth, tickFormat, tickOffset = 3 }) =>
  xScale.ticks().map(tickValue => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text style={{ textAnchor: 'start' }} dy=".71em" 
      transform={`translate(6,${innerHeight + tickOffset}) rotate(90)`}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));