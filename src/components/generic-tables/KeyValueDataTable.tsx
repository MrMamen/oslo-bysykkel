import * as React from "react";

interface Props {
  data: any
  getTranslation:(key:string) => string;
}


export const KeyValueDataTable: React.FC<Props> = ({data,getTranslation}) => {

  const tableRows: JSX.Element[] = Object.keys(data).map((key) => {
    return <tr key={key}>
      <th>{getTranslation(key)}</th>
      <td>{data[key]}</td>
    </tr>
  });


  return <table>
    <tbody>
    {tableRows}
    </tbody>
  </table>
};
