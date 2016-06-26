import {environment} from '../environment';
export class Config {
  public static getBackend() {
    let backend: string;
    if (environment.production) {
      backend = 'https://savannahacademia-api.herokuapp.com/';
    } else {
      backend = 'http://localhost:3000/';
    }
    return backend;
  }
}
