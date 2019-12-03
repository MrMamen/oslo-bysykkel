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
    <div style={{display: "inline-block"}}>Se tabell <label className="switch">
      <input type="checkbox" checked={mapView}/>
      <span className="slider" onClick={() => setMapView(!mapView)}></span>
    </label> Se kart
    </div>
    {mapView ? <CitybikeMap stations={stations}/> :
      <TableData data={stations} getTranslation={getTranslation}/>
    }
  </>
};
