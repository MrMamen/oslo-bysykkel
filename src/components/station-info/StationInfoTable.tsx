import * as React from "react";
import {StationInfoData} from "../../utils/interface";
import {TableData} from "../generic-tables/TableData";
import {CitybikeMap} from "../map/CitybikeMap";

interface StationInfoTableProps {
  stations: StationInfoData[];
  getTranslation: (key: string) => string;
}

export const StationInfoTable: React.FC<StationInfoTableProps> = ({stations, getTranslation}) => {
  const [mapView, setMapView] = React.useState(false);

  return <>
    <div style={{display: "inline-block"}}>
      <span className="clickable" onClick={() => setMapView(false)}>Se tabell 📋 </span><label
      className="switch">
      <input type="checkbox" checked={mapView}/>
      <span className="slider" onClick={() => setMapView(!mapView)}></span>
    </label><span className="clickable" onClick={() => setMapView(true)}> 🗺️ Se kart</span>
    </div>
    {mapView ? <CitybikeMap stations={stations}/> :
      <TableData data={stations} getTranslation={getTranslation}/>
    }
  </>
};
