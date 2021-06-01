import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UtilService} from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private utilService: UtilService) {
  }

  get(url: string, secure?: boolean): Observable<any> {
    if (secure) {
      return this.http.get<any>(url, {headers: this.generateHeader()});
    } else {
      return this.http.get<any>(url);
    }
  }

  post(url: string, body: any, secure?: boolean): Observable<any> {
    if (secure) {
      return this.http.post<any>(url, body, {headers: this.generateHeader()});
    } else {
      return this.http.post<any>(url, body);
    }
  }

  put(url: string, body: any, secure?: boolean): Observable<any> {
    if (secure) {
        return this.http.put<any>(url, body, {headers: this.generateHeader()});
      } else {
        return this.http.put<any>(url, body);
      }
  }
  //
  // delete(url: string, secure?: boolean, token?: string): Observable<any> {
  //   if (secure) {
  //     return this.http.delete<any>(url, {headers: this.generateHeader(token)});
  //   } else {
  //     return this.http.delete<any>(url);
  //   }
  // }

  generateHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization',"Bearer "+this.utilService.getCookie("token"));
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

}
