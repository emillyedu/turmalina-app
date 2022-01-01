import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalPoints } from 'src/app/shared/models/totalpoints.model';
@Injectable({
  providedIn: 'root'
})
export class MapleafService {

  apiUrl = 'http://localhost:4200/api/turmalina_totalpoints'

  constructor(private http:HttpClient) {
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getTotalPoints(flag:string): Observable<TotalPoints>{
    return this.http.get<TotalPoints>(this.apiUrl + '?city=' + flag)
  }
}
