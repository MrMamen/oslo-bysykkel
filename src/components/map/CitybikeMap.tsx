import * as React from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import {StationInfoData, StationStatusData} from '../../utils/interface';

interface MapProps {
  stationInfo?: StationInfoData[]
  stationStatus?: StationStatusData[]
}

export const CitybikeMap: React.FC<MapProps> = ({stationInfo,stationStatus}) => {
  const markers = stationInfo?.map(s => {
    const statusInfo = stationStatus?.find((element)=>{
       return element.station_id === s.station_id
    })
    let ekstraInfo;
    if (statusInfo){
      ekstraInfo = <>Ledige sykler: {statusInfo?.num_bikes_available}<br/></>
    }
    return <Marker key={s.station_id} position={[s.lat, s.lon]}>
      <Popup>
        <b>{s.address}</b><br/>
        {ekstraInfo}
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
