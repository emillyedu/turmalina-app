import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DateAdapter } from '@angular/material/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { IbgeData } from '../shared/models/ibgenames.model';
import moment from 'moment';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})

export class AvaliacoesComponent implements OnInit, OnDestroy{
  /*** instantiation forms ***/
  city: FormControl = new FormControl();
  date: any;
  cityFilter: FormControl = new FormControl();
  @ViewChild('citySelect') citySelect!: MatSelect;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  protected _onDestroy = new Subject<void>();
  public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<IbgeData[]>(1);
  
  /*** input data ***/
  protected cities: IbgeData[] = this.mapleafservice.resultsIbge
  selectedValue!: string;
  selectedValueData!: string;
  endDate!: Date;
  loading!: boolean;
  miniturmalina: boolean = true;
  result: any;
  colors:any;
  filter:any;
  listDatesApi: any[] = [];
  dateId: any;
  datesApi: any[] = [];

  resultsEvaluation: any;
  relatorioUrl!: string;

  constructor(public mapleafservice: MapleafService, private dateAdapter: DateAdapter<any>){
    this.dateAdapter.setLocale('pt');
  }

  async getDates(selectedValue: string){
    this.listDatesApi = []
    if(selectedValue){
      await this.mapleafservice.getTurmalinaDates(selectedValue.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAcentos));
      for(var i in this.mapleafservice.resultsDates){
        let resultDate = this.mapleafservice.resultsDates[i]
        this.listDatesApi.push([moment(resultDate["end_datetime"]).format("DD/MM/YYYY"), resultDate["id"]])
      }

      return true;
    }
    else{
      return false;
    }
  }

  verifyDates(datesForms:string, datesApi:any[]){
    for(var i in datesApi){
      if(datesForms == datesApi[i][0]){
        return true;
      }
      else{
        continue;
      }
    }
    return false;
  }

  /*** filter dates ***/
  myFilter = (d: Date | null): boolean => {
    const day = moment(d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day?this.verifyDates(day.format("DD/MM/YYYY"), this.listDatesApi):true 
  }
  
  /*** remove accents ***/
  removeAcentos(letra: string) {
    /** Remove letters accents*/
    if ('áàâã'.indexOf(letra) !== -1) {
      return 'a';
    } else if ('ÁÀÂ'.indexOf(letra) !== -1) {
      return 'A';
    } else if ('éê'.indexOf(letra) !== -1) {
      return 'e';
    } else if ('ÉÊ'.indexOf(letra) !== -1) {
      return 'E';
    } else if ('íÍ'.indexOf(letra) !== -1) {
      return 'i';
    } else if ('Í'.indexOf(letra) !== -1) {
      return 'I';
    } else if ('óÓôÔõ'.indexOf(letra) !== -1) {
      return 'o';
    } else if ('ÓÔ'.indexOf(letra) !== -1) {
      return 'O';
    } else if ('úÚü'.indexOf(letra) !== -1) {
      return 'u';
    } else if ('Ú'.indexOf(letra) !== -1) {
      return 'U';
    } else if ('ç'.indexOf(letra) !== -1) {
      return 'c';
    } else if ('\''.indexOf(letra) !== -1) {
      return '';
    } else {
      return letra;
    }
  }

  createTable(){
    this.resultsEvaluation = this.mapleafservice.resultsEvaluationId
    this.datesApi.push([moment(this.resultsEvaluation["start_datetime"]).format("DD/MM/YYYY"), moment(this.resultsEvaluation["end_datetime"]).format("DD/MM/YYYY")])
    let dateFormated = moment(this.datesApi[0][1], 'DD/MM/YYYY').format("YYYY-DD-MM")
    this.relatorioUrl = "https://turmalina-api.herokuapp.com/turmalina_report?management_unit=" + (this.resultsEvaluation["management_unit"]["name"]) + "&date=" + dateFormated
  }

  getDadosApi(id:string){
    this.miniturmalina = false
    this.loading = true
    this.mapleafservice.getTurmalinaEvaluationId(id).then(_ => {
      setTimeout(() => {
        this.loading = false;
      },1000);
      this.createTable();
    })
  }

  correctionDate(date: Date){
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()

    return `${year}-${month+1 < 10? `0${month+1}` : month+1}-${day < 10 ? `0${day}`: day }`
  }

  searchDadosMunicipio(date: any){
    var date = date.format("DD/MM/YYYY");
    var position = '';
    for( var i in this.listDatesApi){
      if(date == this.listDatesApi[i][0]){
        position = i;
        break;
      }
      else{continue}
    }
    this.getDadosApi(this.listDatesApi[Number(position)][1])
  }
  
  filterCities(){
    if(!this.mapleafservice.resultsIbge){
      return;
    }
    // get the search keyword
    let search = this.cityFilter.value;
    if (!search) {
      this.filteredCity.next(this.mapleafservice.resultsIbge.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the cities
    this.filteredCity.next(
      this.mapleafservice.resultsIbge.filter((bank) => bank.public_entity.toLowerCase().indexOf(search) > -1)
    );
  }

  sortCities(cities: IbgeData[]){
    return cities.sort((a, b) => a.public_entity.localeCompare(b.public_entity))
  }

  ngOnInit(): void {
    this.mapleafservice.getIBGE().then(data => {
      this.filteredCity.next(this.sortCities(this.mapleafservice.resultsIbge).slice());
    });
    this.cityFilter.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCities();
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}