import Axios, {AxiosResponse} from "axios"
import {Output} from "./interface";

// export interface Feil {
//   causeId?: string;
//   ok: boolean;
//   status: number;
//   statusText: string;
//   error?: string;
// }
export const getJson = (url: string) => {
  // const requestData = generateRequestData(method, payload);
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Client-Identifier", "mrmamen-oslobysykkel");
  const instance = Axios.create({
    timeout: 1000,
    headers: headers
  });

  try {
    return instance.get(url).then((res: AxiosResponse<Output<any>>) => {
      if (res.status === 200){
        return res.data;
      }
      return Promise.reject({status: res.status, text: res.statusText});
    })
  }catch (e) {
    console.error(e);
    return Promise.reject({text: "En ukjent feil oppstod."});
  }
};
