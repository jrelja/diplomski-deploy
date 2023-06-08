import React from 'react';

const MapLayerControl = ({ onChange }) => {
  const handleLayerChange = (layer) => {
    onChange(layer);
  };

  return (
    <div className="map-layer-control">
      <div className="map-layer-okvir">
        <div className="layer-button">
          <button onClick={() => handleLayerChange('OSM')} className='layer-OSM'>
            OSM
          </button>
          <span className="layer-name">OSM</span>
        </div>
        <div className="layer-button">
          <button onClick={() => handleLayerChange('DOF')} className='layer-DOF'>
            DOF
          </button>
          <span className="layer-name">DOF</span>
        </div>
        <div className="layer-button">
          <button onClick={() => handleLayerChange('cijena-kvart')} className='layer-cijena-kvart'>
            Cijena/Kvart
          </button>
          <span className="layer-name">Cijena/Kvart</span>
        </div>
      </div>
    </div>
  );
};

export default MapLayerControl;
