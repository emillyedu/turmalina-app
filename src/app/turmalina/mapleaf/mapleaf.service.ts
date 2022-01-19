import { TurmalinaStamp } from './../../shared/models/turmalinastamp.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolve } from 'dns';
import { IbgeData } from 'src/app/shared/models/ibgenames.model';

@Injectable({
  providedIn: 'root'
})

export class MapleafService {

  apiUrl = 'http://turmalina-api.herokuapp.com/'
  ibgeUrl = 'http://servicodados.ibge.gov.br/'
  results: TurmalinaStamp[];
  resultsTotalPoints: TurmalinaStamp[];
  resultsIbge : IbgeData[];

  constructor(private http:HttpClient) {
    this.results = [];
    this.resultsTotalPoints = [];
    this.resultsIbge = [];
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getTurmalinaStamp(municipio:string, firststamp:string, secondstamp:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_timestamp' + '?city=' + municipio + '&first_timestamp=' + firststamp + ' 00:00:00.000' + '&second_timestamp=' + secondstamp + ' 23:59:59.999')
      .toPromise()
      .then(
        data => {
          this.results = data.map(item => {
            return new TurmalinaStamp(
              item.endDateTime,
              item.evaluation,
              item.evaluationId,
              item.logpath,
              item.managementUnit,
              item.startDateTime,
              item.status
            )
          })
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getTotalPoints(municipio:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_latest' + '?city=' + municipio)
      .toPromise()
      .then(
        data => {
          this.resultsTotalPoints = data.map(item => {
            return new TurmalinaStamp(
              item.endDateTime,
              item.evaluation,
              item.evaluationId,
              item.logpath,
              item.managementUnit,
              item.startDateTime,
              item.status
            )
          })
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getIBGE(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<IbgeData[]>(this.ibgeUrl + '/api/v1/localidades/estados/pb/distritos')
      .toPromise()
      .then(
        data => {
          this.resultsIbge = data.map(item => {
            return new IbgeData(
              item.id,
              item.nome,
              item.municipio,
            )
          })
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }
}
