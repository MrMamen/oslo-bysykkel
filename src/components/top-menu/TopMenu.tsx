import * as React from "react";
import {getLangauge} from "../../utils/i18n";

interface Props {
  languages?: string[];
  language: string;
  setLanguage: (lang: string) => void;
  buttonList: ButtonList[];
}

interface ButtonList {
  name: string;
  action: () => void;
}

export const TopMenu: React.FC<Props> = ({languages = [], language, setLanguage, buttonList}) => {

  const byttSprak = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const languageOptions = languages.map((langCode) => {
    return <option value={langCode} key={langCode}>{getLangauge(langCode)}</option>
  });

  const buttons = buttonList.map((btn, i) => {
    return <button onClick={btn.action} key={i}>{btn.name}</button>
  });

  return <header className="App-header">
    <div><h2>Oslo Bysykkel</h2></div>
    <div className="actionrad">
      {buttons}
      {languages.length > 0 && <select onChange={byttSprak} value={language}>
        <option disabled={true}>Velg språk</option>
        {languageOptions}
      </select>}
    </div>
  </header>
};
