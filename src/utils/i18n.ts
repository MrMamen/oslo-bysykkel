interface LangMaps {
  [langCode: string]: string;
}

const languageMappings: LangMaps = {"nb": "Norsk, bokmål", "en": "English"};
const emojiMappings: LangMaps = {"nb": "🇳🇴", "en": "🇬🇧/🇺🇸"};

export const getLangauge = (langCode: string) => {
  return langCode in languageMappings ? languageMappings[langCode] : langCode;
};

export const getCountryEmoji = (langCode: string) => {
  return langCode in emojiMappings ? emojiMappings[langCode] : langCode;
};

interface TableHeaderTranslations {
  [langCode: string]: {[key: string]: string};
}

const translationMappings: TableHeaderTranslations = {
  "nb": {
    "system_id": "System ID",
    "name": "Navn",
    "station_id": "Stasjonens ID",
    "capacity": "Kapasitet",
    "address": "Adresse",
    "num_bikes_available": "Ledige sykler",
    "num_docks_available": "Ledige stativ",
  }
}

export const getTableHeader=(langCode: string, key: string) =>{
  const translations = translationMappings[langCode];
  if (!translations || !(key in translations)){
    console.log(key+" is missing translation for "+langCode);
    return key;
  }
  return translations[key];
}
