import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {retry, catchError, first} from 'rxjs/operators';
import { Country } from '../models/country';
import { Observable, throwError } from 'rxjs';

HttpClient
@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private _http: HttpClient) { }
  private url_host = "https://api.picovid.com.br";


  getCity(stateName, cityName): Observable<any>{
    return this._http.get<Country>(`${this.url_host}/cities/${stateName}/${cityName}`).pipe(
        retry(1),
        catchError(this.handleError)
    );
  }

  getTimelineCity(stateName, cityName): Observable<any>{
    return this._http.get(`${this.url_host}/timeline/${stateName}/${cityName}`).pipe(
        retry(1),
        catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Erro código: ${error.status}\nMensagem: ${error.message}`;
    }
    window.alert("Por favor, cheque sua conexão à internet!");
    return throwError(errorMessage);
 }
}
