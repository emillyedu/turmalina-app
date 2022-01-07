import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalPoints } from 'src/app/shared/models/totalpoints.model';
import { IbgeContent } from 'src/app/shared/models/ibgecontent.model';

@Injectable({
  providedIn: 'root'
})
export class MapleafService {

  apiUrl = 'http://localhost:4200/result/turmalina_totalpoints'
  ibgeUrl = 'http://servicodados.ibge.gov.br/'

  constructor(private http:HttpClient) {
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getTotalPoints(municipio:string, datestamp:string){
    return this.http.get<TotalPoints[]>(this.apiUrl + '?city=' + municipio + '&first_timestamp=' + datestamp)
  }

  public getIBGE(){
    return this.http.get<any[]>(this.ibgeUrl + '/api/v1/localidades/estados/pb/distritos') 
  }
}
