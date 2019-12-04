import * as React from 'react';
import './App.css';
import {
  Feed,
  FeedMap,
  Output,
} from "../../utils/interface";
import {getJson} from "../../utils/fetch";
import {Switcher} from "../switcher/Switcher";
import {TopMenu} from "../top-menu/TopMenu";

const App: React.FC = () => {
  const [languages, setLanguages] = React.useState<string[]>();
  const [selectedLanguage, setLanguage] = React.useState<string>("en");
  const [concurrentRequests, setConcurrentRequests] = React.useState<number>(0);
  const [feedList, setFeedList] = React.useState<Feed[]>([]);
  const [allFeedsData, setAllFeedsData] = React.useState<Partial<FeedMap>>({});
  const [errorMessage, setErrorMessage] = React.useState("");

  const hentData = () => {
    setConcurrentRequests(concurrentRequests+1);
    getJson("https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json").then((res: Output<"gbfs">) => {
      setAllFeedsData({gbfs: res.data});
      const langList = [];
      for (const lang in res.data) {
        langList.push(lang);
      }
      setLanguages(langList);
      setLanguage(langList[0]);
      setFeedList(res.data[langList[0]].feeds);
      setConcurrentRequests(concurrentRequests-1);
      setErrorMessage("");
    }).catch((e)=>{
      setErrorMessage(e?.text || "Ukjent feil ved henting av gbfs-listen");
    });
  };

  React.useEffect(() => {
    if (feedList.length > 0) {
      let newFeedData= {}as FeedMap;
        feedList.forEach((feed) => {
          setConcurrentRequests(concurrentRequests+1);
        getJson(feed.url).then((res) => {
          newFeedData[feed.name] = res.data;
          setAllFeedsData({...allFeedsData, ...newFeedData});
          setConcurrentRequests(concurrentRequests-1);
          setErrorMessage("");
        }).catch((e)=>{
          console.error(e);
          setErrorMessage(e?.text || "Ukjent feil ved henting av noen av datakildene");
        });;
      })
    }
  }, [selectedLanguage, feedList])

  const knappeListe = [{name: "📡 Oppfrisk datakilder 📡", action: hentData}];

  return (
    <div className="App">
      <TopMenu languages={languages} language={selectedLanguage} setLanguage={setLanguage} buttonList={knappeListe}/>
      <div className="App-content">
        <Switcher errorMessage={errorMessage} loading={concurrentRequests>0} feedList={feedList} allData={allFeedsData} language={selectedLanguage}/>
      </div>
    </div>
  );
};

export default App;
