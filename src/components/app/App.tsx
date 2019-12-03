import * as React from 'react';
import './App.css';
import {
  Feed,
  FeedTypes,
  Gbfs,
  Output,
  StationInformation,
  StationStatus,
  SystemInformation
} from "../../utils/interface";
import {getJson} from "../../utils/fetch";
import {Switcher} from "../switcher/Switcher";
import {TopMenu} from "../top-menu/TopMenu";
import {getTableHeader} from "../../utils/i18n";

export interface DataFeed {
  feed: FeedTypes
  data: unknown
}

interface GbfsFeed extends DataFeed {
  feed: "gbfs"
  data: Gbfs;
}

interface SystemInfoFeed extends DataFeed {
  feed: "system_information"
  data: SystemInformation;
}

interface StationInfoFeed extends DataFeed {
  feed: "station_information"
  data: StationInformation;
}

interface StationStatusFeed extends DataFeed {
  feed: "station_status"
  data: StationStatus;
}

export type CurrentData = GbfsFeed | SystemInfoFeed | StationInfoFeed | StationStatusFeed;

const App: React.FC = () => {
  const [current, setCurrentData] = React.useState<CurrentData>();
  const [languages, setLanguages] = React.useState<string[]>();
  const [selectedLanguage, setLanguage] = React.useState<string>("en");
  const [feedList, setFeedList] = React.useState<Feed[]>([]);
  const hentData = () => {
    getJson("https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json").then((res: Output<Gbfs>) => {
      setCurrentData(
        {
          feed: "gbfs",
          data: res.data
        });
      const langList = [];
      for (const lang in res.data) {
        langList.push(lang);
      }
      setLanguages(langList);
      setLanguage(langList[0]);
      setFeedList(res.data[langList[0]].feeds);
    });
  };

  const getTranslation = (key: string) => {
    return getTableHeader(selectedLanguage, key);
  };
  const knappeListe = [{name: "📡 Vis tilgjengelige datakilder 📡", action: hentData}];

  return (
    <div className="App">
      <TopMenu languages={languages} language={selectedLanguage} setLanguage={setLanguage} buttonList={knappeListe}/>
      <div className="App-content">

        <Switcher currentData={current} feedList={feedList} changeFeed={setCurrentData}
                  getTranslation={getTranslation}/>
      </div>
    </div>
  );
};

export default App;
