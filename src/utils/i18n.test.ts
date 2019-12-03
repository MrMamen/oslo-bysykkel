import {getLangauge, getTableHeader} from "./i18n";

describe("getLanguage", () => {
  test('gives language from code', () => {
    const actual = getLangauge("en");
    expect(actual).toBe("English");
  });

  test('return langcode when translation is missing', () => {
    const actual = getLangauge("dk");
    expect(actual).toBe("dk");
  });
});

describe("getTableHeaders", () => {
  test('Gets translation when defined', () => {
    const actual = getTableHeader("nb", "name");
    expect(actual).toBe("Navn");
  });
  test('Return keycode when key has no translation', () => {
    const actual = getTableHeader("nb", "lat");
    expect(actual).toBe("lat");
  });
  test('Return keycode when langCode has no translations', () => {
    const actual = getTableHeader("en", "name");
    expect(actual).toBe("name");
  });
});
