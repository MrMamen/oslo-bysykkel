import * as React from "react";
import { StationInformation, StationInfoData} from "../../utils/interface";

interface StationInfoDataTableProps{
  data: StationInformation
}


export const StationInfoDataTable: React.FC<StationInfoDataTableProps> = ({data}) => {
  const headerElements: JSX.Element[] = [];
  const dataRows: JSX.Element[] = [];

  const presentElements: (keyof StationInfoData)[] = [];

  data.stations.forEach((station)=>{
    if (presentElements.length === 0 ){
      Object.keys(station).forEach((key)=>{
        presentElements.push(key as keyof StationInfoData)
        headerElements.push(<th key={key}>{key}</th>)
      })
    }

    const dataRow: JSX.Element[] = [];
    presentElements.map((key)=>{
      const text = station[key] as string;
      dataRow.push(<td key={key}>{text}</td>);
    })

    dataRows.push(<tr key={station.station_id}>
      {
        dataRow
      }
    </tr>)

  });

  return <table>
    <thead>
    <tr>{headerElements}</tr>
    </thead>
    <tbody>
    {dataRows}
    </tbody>
  </table>
}
