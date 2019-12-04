import * as React from 'react';
import {Feed, FeedMap, FeedTypes} from '../../utils/interface';
import {TableData} from '../generic-tables/TableData';
import {KeyValueDataTable} from "../generic-tables/KeyValueDataTable";
import {getTableHeader} from "../../utils/i18n";
import {MapSwitch} from "../map-switch/MapSwitch";
import {CitybikeMap} from "../map/CitybikeMap";

type Props = {
  feedList: Feed[];
  allData: Partial<FeedMap>
  language: string;
  loading: boolean;
  errorMessage: string;
}

type switcherStates = | FeedTypes;

export const Switcher: React.FC<Props> = ({feedList, allData, language, loading,errorMessage}) => {
  const [state, setState] = React.useState<switcherStates>("gbfs");
  const [mapView, setMapView] = React.useState(false);

  React.useEffect(() => {
    setState("gbfs");
  }, [loading]);

  if (errorMessage){
    return <><h3>Noe har gått galt.</h3>
      <p>
        Har du forsøkt å oppfriske datakildene?
      </p>
      <code>{errorMessage}
      </code>
    </>
  }

  if (feedList.length === 0) {
    return <><h3>⛔ Ingen data tilgjengelig. ⛔</h3>
      <p>Forsøke å tykke «Oppfrisk datakilder»</p>
    </>
  }

  if (loading) {
    return <><h3>Innlasting pågår</h3></>
  }

  const getTranslation = (key: string) => {
    return getTableHeader(language, key);
  };

  const onClickFeedType = (feed: Feed) => {
    setState(feed.name);
  };

  switch (state) {
    case "gbfs":
      return <TableData data={feedList} getTranslation={getTranslation} onSelectRow={onClickFeedType}/>;
    case "station_information":
    case "station_status":
      return <> <MapSwitch mapView={mapView} setMapView={setMapView}/>
        {mapView ? <CitybikeMap stationInfo={allData["station_information"]?.stations}
                                stationStatus={allData["station_status"]?.stations}/> :
          <TableData data={allData[state]!.stations} getTranslation={getTranslation}/>
        }
      </>
    case "system_information":
      return <KeyValueDataTable data={allData[state]} getTranslation={getTranslation}/>
  }
  console.warn("Ukjent status", state);
  return <h4>Ukjent status</h4>;
};

