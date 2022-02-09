import { TurmalinaStampDetail } from './../../shared/models/turmalinastamp_detail.model';
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
  /*** Urls ***/
  apiUrl = 'http://turmalina-api.herokuapp.com/'
  ibgeUrl = 'http://servicodados.ibge.gov.br/'
  
  resultsDetailPoints!: TurmalinaStampDetail[];
  resultsSummaryPoints?: TurmalinaStamp[];
  resultsIbge : IbgeData[];
  resultsDates!: any[];
  resultsEvaluationId!: any;
  summaryMean: any;

  constructor(private http:HttpClient) {
    this.resultsDetailPoints = [];
    this.resultsSummaryPoints = [];
    this.resultsIbge = [];
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getTurmalinaStamp(municipio:string, firststamp:string, secondstamp:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_entitiestimestamp' + '?entity=' + municipio + '&first_timestamp=' + firststamp + ' 00:00:00.000' + '&second_timestamp=' + secondstamp + ' 23:59:59.999')
      .toPromise()
      .then(
        data => {
          this.resultsDetailPoints = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getTurmalinaEvaluationId(id:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_evaluationbyid' + '?id=' + id)
      .toPromise()
      .then(
        data => {
          this.resultsEvaluationId = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getTurmalinaMean(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_summarymean')
      .toPromise()
      .then(
        data => {
          this.summaryMean = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getTurmalinaDates(municipio:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_dates' + '?entity=' + municipio)
      .toPromise()
      .then(
        data => {
          this.resultsDates = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getSummaryPoints(municipio:string, quantity:string){
    this.resultsSummaryPoints = undefined;
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_entitieslatest' + '?entity=' + municipio + '&quantity=' +  quantity)
      .toPromise()
      .then(
        data => {
          this.resultsSummaryPoints = data.map(item => {
            return new TurmalinaStamp(
              item.end_datetime,
              item.id,
              item.log_path,
              item.management_unit,
              item.score,
              item.start_datetime,
              item.status,
              item.summary_evaluation,
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
