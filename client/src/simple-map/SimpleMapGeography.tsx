import { memo, MouseEvent, MouseEventHandler } from 'react';
import { Geography, GeographyProps } from 'react-simple-maps';

type SimpleMapGeographyProps = {
  geo: GeographyProps['geography'];
  onMouseEnter: (
    event: MouseEvent<SVGPathElement, globalThis.MouseEvent>,
    geo: GeographyProps['geography']
  ) => void | undefined;
  onMouseMove: MouseEventHandler<SVGPathElement> | undefined;
  onMouseLeave: MouseEventHandler<SVGPathElement> | undefined;
  width: string;
  color: string | undefined;
};

export const SimpleMapGeography = memo(
  ({
    geo,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    width,
    color,
  }: SimpleMapGeographyProps) => (
    <Geography
      geography={geo}
      stroke='#FFF'
      width={width}
      onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, geo)}
      onMouseMove={(e) => onMouseMove && onMouseMove(e)}
      onMouseLeave={(e) => onMouseLeave && onMouseLeave(e)}
      style={{
        default: {
          fill: color,
          outline: `none`,
        },
        hover: {
          fill: `#090`,
          outline: `none`,
        },
        pressed: {
          fill: `#E42`,
          outline: `none`,
        },
      }}
    />
  )
);
