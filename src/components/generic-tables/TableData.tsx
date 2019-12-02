import * as React from "react";

interface TableDataProps<T = any> {
  data: T[]
  getTranslation: (key: string) => string;
  onSelectRow?: (data: T) => void
}


export const TableData: React.FC<TableDataProps> = ({data, onSelectRow, getTranslation}) => {
  const headerElements: JSX.Element[] = [];
  const dataRows: JSX.Element[] = [];

  const presentElements: (keyof TableDataProps["data"])[] = [];

  data.forEach((obj, index) => {
    if (presentElements.length === 0) {
      Object.keys(obj).forEach((key) => {
        presentElements.push(key as keyof TableDataProps["data"]);
        headerElements.push(<th key={key}>{getTranslation(key)}</th>)
      })
    }

    const dataRow: JSX.Element[] = [];
    presentElements.forEach((key) => {
      let cellHTML = obj[key];
      if (onSelectRow) {
        const callback = (event: React.FormEvent) => {
          event.preventDefault();
          onSelectRow(obj);
        };

        cellHTML = <a href="#" onClick={callback} className="App-link">{obj[key]}</a>
      }
      dataRow.push(<td key={key}>{cellHTML}</td>);
    });


    dataRows.push(<tr key={index}>
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
};
