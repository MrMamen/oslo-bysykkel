import * as React from 'react';
import {Feed} from '../../utils/interface';
import {TableData} from '../generic-tables/TableData';
import {KeyValueDataTable} from "../generic-tables/KeyValueDataTable";
import {CurrentData} from "../app/App";
import {getJson} from "../../utils/fetch";
import {StationInfoTable} from "../station-info/StationInfoTable";

type Props = {
  currentData?: CurrentData;
  feedList: Feed[];
  changeFeed: (data: CurrentData) => void;
  getTranslation: (key: string) => string;
}

export const Switcher: React.FC<Props> = ({currentData, feedList, changeFeed, getTranslation}) => {
  if (!currentData) {
    return <><h3>⛔ Ingen data tilgjengelig. ⛔</h3>
      <p>Forsøke å tykke «Vis tilgjengelige datakilder»</p>
    </>
  }

  const onClickFeedType = (feed: Feed) => {
    getJson(feed.url).then((res) => {

      const data: CurrentData = {
        feed: feed.name,
        data: res.data
      };
      changeFeed(data);
    })
  };


  switch (currentData.feed) {
    case "gbfs":
      return <TableData data={feedList} getTranslation={getTranslation} onSelectRow={onClickFeedType}/>;
    case "station_information":
      return <StationInfoTable stations={currentData.data.stations} getTranslation={getTranslation}/>
    case "station_status":
      return <TableData data={currentData.data.stations} getTranslation={getTranslation}/>;
    case "system_information":
      return <KeyValueDataTable data={currentData.data} getTranslation={getTranslation}/>
  }
  return <h4>Ukjent feed</h4>;
};

