import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Municipio } from '../municipio.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapleafService {

  constructor(private http:HttpClient) {
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getMetaDadosMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>("./assets/muni.json");
  }
}
