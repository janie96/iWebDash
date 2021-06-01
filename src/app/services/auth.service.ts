import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {LoginRequestModel} from "../models/loginRequest.model";
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
    return this.apiService.post('/api/auth/login', loginRequest, false)
      .pipe(map(response => {
        console.log(response);
        this.saveUser(response);
        return response;
      }));
  }

  registerUser(user: User): Observable<any> {
    return this.apiService.post('/api/auth/signup', user, false)
        .pipe(map(response => {
      console.log(response);
      this.saveUser(response);
      return response;
    }));
  }

  saveUser(response){
    if(response && response.accessToken && response.accessToken!==""){
      this.utilService.setCookie("token",response.accessToken,365);
      this.utilService.setCookie("user",response.id,365);
      this.currentUserSubject.next(response.id);
    }
  }

  getUser(id): Observable<any>{
    return this.apiService.get('api/user/'+id,true);
  }


  logout() {
    this.utilService.deleteCookie("user");
    this.currentUserSubject.next(null);
  }

}
