import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {}

  public getJSON() {
    return new Promise(resolve => {
      this.http.get('/assets/data/options.json').subscribe(data => {
        if (data.hasOwnProperty('items')){
          try {
            resolve(data);
          }catch(e){}
        }
      });
    });
  }
}
