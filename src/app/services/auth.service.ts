import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {LoginRequestModel} from "../models/loginRequest.model";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {UtilService} from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<number>;
  public currentUser: Observable<number>;

  constructor(private http: HttpClient,
              private utilService:UtilService,
              private apiService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<number>(+utilService.getCookie("user"));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): number {
    return this.currentUserSubject.value;
  }

  login(loginRequest: LoginRequestModel): Observable<any> {
    return this.apiService.post(environment.apiUrl+'/api/auth/login', loginRequest, false)
      .pipe(map(response => {
        console.log(response);
        // if (response.user && response.user.userId && response.loginStatus) {
        //   localStorage.setItem('currentUser', JSON.stringify(response.user.userId));
        //   this.currentUserSubject.next(response.user.userId);
        // }
        return response;
      }));
  }

  registerUser(user: User): Observable<any> {
    return this.apiService.post('/api/auth/signup', user, false);
  }


  logout() {
    this.utilService.deleteCookie("user");
    this.currentUserSubject.next(null);
  }

}
