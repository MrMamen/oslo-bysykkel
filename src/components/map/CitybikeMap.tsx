import * as React from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import {StationInfoData} from '../../utils/interface';

interface MapProps {
  stations: StationInfoData[]
}

export const CitybikeMap: React.FC<MapProps> = ({stations}) => {
  const markers = stations.map(s => {
    return <Marker key={s.station_id} position={[s.lat, s.lon]}>
      <Popup>
        <b>{s.address}</b><br/>
        Kapasitet: {s.capacity}<br/>
        StasjonsID: {s.station_id}
      </Popup>
    </Marker>
  });

  const position: LatLngExpression = [59.922777, 10.738655];
  return <Map center={position} zoom={14} style={{width: '100vw', height: '76vh'}}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markers}
  </Map>
};
