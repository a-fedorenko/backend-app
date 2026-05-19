import React, { useRef, useEffect } from 'react';
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  const mapInstanceRef = useRef();
  
  const { center, zoom } = props;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) {
      return;
    }

    mapInstanceRef.current = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });

    window.setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.updateSize();
      }
    }, 250);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    const view = mapInstanceRef.current.getView();
    view.setCenter(fromLonLat([center.lng, center.lat]));
    view.setZoom(zoom);
    mapInstanceRef.current.updateSize();
  }, [center.lat, center.lng, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
