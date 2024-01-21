import './SimpleMap.css';

import { memo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  GeographyProps,
  ZoomableGroup,
} from 'react-simple-maps';

/**
 * GeoJSON file downloaded from:
 * https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson
 */
import geoJSON from './ne_50m_admin_0_countries.json';
import { MapMouseEvent, SatelliteLayer } from './SatelliteLayer';
import { SimpleMapGeography } from './SimpleMapGeography';

export const getPosition = (e: MapMouseEvent) => {
  return { left: e.nativeEvent.pageX + 10, top: e.nativeEvent.pageY + 10 };
};

export const SimpleMap = memo(() => {
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const [tooltipText, setTooltipText] = useState<string>('');
  return (
    <>
      <ComposableMap projection='geoMercator' className='h-full bg-white'>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <SimpleMapGeography
                  key={geo.rsmKey}
                  geo={geo}
                  width={'100%'}
                  color={`#D6D6DA`}
                  onMouseEnter={(
                    e: MapMouseEvent,
                    geo: GeographyProps['geography']
                  ) => {
                    setTooltipPosition(getPosition(e));
                    setTooltipText(`Country: ${geo.properties.NAME_EN}`);
                  }}
                  onMouseLeave={() => setTooltipText('')}
                  onMouseMove={(e: MapMouseEvent) =>
                    setTooltipPosition(getPosition(e))
                  }
                />
              ))
            }
          </Geographies>
          <SatelliteLayer />
        </ZoomableGroup>
      </ComposableMap>
      <div
        style={tooltipPosition}
        className={tooltipText ? `Tooltip` : `Hidden`}
      >
        <>{tooltipText}</>
      </div>
    </>
  );
});

export default SimpleMap;
