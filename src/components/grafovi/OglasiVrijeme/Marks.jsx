export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight
}) => {
  // Filter out binnedData points with NaN values in calculations
  const filteredData = binnedData.filter(d => {
    const x0 = xScale(d.x0);
    const x1 = xScale(d.x1);
    const y = yScale(d.y);
    const rectWidth = x1 - x0;
    const rectHeight = innerHeight - y;

    return !isNaN(x0) && !isNaN(x1) && !isNaN(y) && !isNaN(rectWidth) && !isNaN(rectHeight);
  });

  return (
    <g>
      {filteredData.map(d => (
        <rect
          key={`${d.x0}-${d.x1}`}
          className="mark"
          x={xScale(d.x0)}
          y={yScale(d.y)}
          width={xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - yScale(d.y)}
        >
          <title>{tooltipFormat(d.y)}</title>
        </rect>
      ))}
    </g>
  );
};
