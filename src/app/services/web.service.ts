import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from './api.service';
import {UtilService} from "./util.service";
import {Website} from "../models/website.model";

@Injectable({
    providedIn: 'root'
})
export class WebService {

    private currentUserSubject: BehaviorSubject<number>;
    public currentUser: Observable<number>;

    constructor(private http: HttpClient,
                private utilService:UtilService,
                private apiService: ApiService) {
    }


    create(website:Website): Observable<Website>{
        return this.apiService.post('api/web',website,true);
    }

    getData(id):Observable<Website>{
        return this.apiService.get('api/web/data/'+id,true);
    }

    updateDeployData(website:Website,id):Observable<Website>{
        return this.apiService.put('api/web/deploy/'+id,website,true);
    }

    updateServerData(website:Website,id):Observable<Website>{
        return this.apiService.put('api/web/server/'+id,website,true);
    }

    updatePersonalizedData(website:Website,id):Observable<Website>{
        return this.apiService.put('api/web/peronalized/'+id,website,true);
    }

    getWebsite(id):Observable<Website>{
        return this.apiService.get('api/web/'+id,true);
    }

    getWebsiteList(id):Observable<Array<Website>>{
        return this.apiService.get('api/web/list/'+id,true);
    }

    deployWebsite(id):Observable<Website>{
        return this.apiService.post('api/web/deploy/'+id, {},true);
    }




}
