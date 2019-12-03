import * as React from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon, IconOptions, LatLngExpression} from "leaflet";
import { stationInfoTest } from '../../utils/interface';

// before loading the modules for the first time,
// also lazy load the CSS for the version of
// the script that you're loading from the CDN
export const CitybikeMap: React.FC = () => {
  const markers = stationInfoTest.data.stations.map(s=>{
    return <Marker key={s.station_id} position={[s.lat, s.lon]}>
      <Popup>
        <b>{s.address}</b><br/>
        Kapasitet: {s.capacity}<br/>
        StasjonsID: {s.station_id}
      </Popup>
    </Marker>
  });



  const position: LatLngExpression = [59.91118372188379,10.730034556850455];
  return <Map center={position} zoom={14} style={{width: '100vw', height: '80vh'}}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markers}
  </Map>
};
