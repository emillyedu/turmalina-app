import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalPoints } from 'src/app/shared/models/totalpoints.model';
import { resolve } from 'dns';
import { IbgeData } from 'src/app/shared/models/ibgenames.model';

@Injectable({
  providedIn: 'root'
})

export class MapleafService {

  apiUrl = 'http://localhost:4200/result/turmalina_totalpoints'
  ibgeUrl = 'http://servicodados.ibge.gov.br/'
  results: TotalPoints[];
  resultsIbge : IbgeData[];

  constructor(private http:HttpClient) {
    this.results = [];
    this.resultsIbge = [];
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }
  
  public getTotalPoints(municipio:string, datestamp:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<TotalPoints[]>(this.apiUrl + '?city=' + municipio + '&first_timestamp=' + datestamp + ' 00:00:00.000' + '&second_timestamp=' + datestamp + ' 23:59:59.999')
      .toPromise()
      .then(
        data => {
          this.results = data.map(item => {
            return new TotalPoints(
              item.Agreement,
              item.Bid,
              item.BudgetExpenditure,
              item.BudgetRevenue,
              item.Contract,
              item.EmployeeInformation,
              item.ExtraBudgetExpenditure,
              item.ExtraBudgetRevenue,
              item.PaymentDocument,
              item.PlanningInstrument,
              item.total_points
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
