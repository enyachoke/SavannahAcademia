import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor() {
    super();
  }
  build(): any {
    let xhr = super.build();
    xhr.onprogress = (event) => {
      console.log('Custom xhr=======>');
    };
    return <any>(xhr);
  }
}
