import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Municipio } from '../municipio.class';
import { Observable } from 'rxjs';
import { TotalPoints } from 'src/app/shared/models/totalpoints.model';
@Injectable({
  providedIn: 'root'
})
export class MapleafService {

  apiUrl = 'https://turmalina-api.herokuapp.com/turmalina_totalpoints'

  constructor(private http:HttpClient) {
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getMetaDadosMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>("./assets/muni.json");
  }

  public getTotalPoints(flag:string): Observable<TotalPoints>{
    return this.http.get<TotalPoints>(this.apiUrl + '?city=' + flag)
  }
}
