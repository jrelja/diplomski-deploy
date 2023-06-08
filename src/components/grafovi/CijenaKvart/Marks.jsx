export const Marks = ({ data, xScale, yScale, xValue, yValue }) =>
  data.map((d) => (
    <rect
      className="mark"
      key={d.id}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
        <title>{xValue(d)}</title>
    </rect>
  ));
