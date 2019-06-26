import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {}

  public getJSON() {
    return new Promise(resolve => {
      const file = environment.file;
      this.http.get(`/assets/data/${file}`).subscribe(data => {
        if (data.hasOwnProperty('items')){
          try {
            resolve(data);
          }catch(e){}
        }
      });
    });
  }
}
