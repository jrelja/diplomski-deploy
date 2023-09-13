export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickValues, // Receive the tick values as a prop
  tickOffset = 3,
}) => {
  return (
    <>
      {tickValues.map((tickValue) => {
        const xPos = xScale(tickValue);
        return (
          <g className="tick" key={tickValue} transform={`translate(${xPos},0)`}>
            <line y2={innerHeight} />
            <text style={{ textAnchor: 'start' }} dy=".71em" 
      transform={`translate(6,${innerHeight + tickOffset}) rotate(90)`}
      >
        {tickFormat(tickValue)}
      </text>
          </g>
        );
      })}
    </>
  );
};