import { AgreementComponent } from './../documentation/agreement/agreement.component';
import { Evaluation } from './../shared/models/evaluation.model';
import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';
import { Chart, registerables, ChartConfiguration, ChartType, ChartOptions, ChartDataset, ChartData} from 'chart.js';
import { ColorGenerator } from './color-generator.model';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import moment from 'moment';
import { MatSelect } from '@angular/material/select';
import { IbgeData } from '../shared/models/ibgenames.model';
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit, OnDestroy{
  /*** instantiation forms ***/
  city: FormControl = new FormControl();
  date: FormControl = new FormControl();
  cityFilter: FormControl = new FormControl();
  @ViewChild('citySelect') citySelect!: MatSelect;
  protected _onDestroy = new Subject<void>();
  public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<IbgeData[]>(1);
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  /*** input data ***/
  protected cities: IbgeData[] = this.mapleafservice.resultsIbge
  selectedValue!: string;
  selectedValueData!: string;
  startDate!: Date;
  endDate!: Date;
  loading!: boolean;

  /*** graphics ***/
  datalength!: number;
  result: any[]=[];
  barchart?: Chart;
  linechart?: Chart;
  timechart!: Chart;

  /*** chart data ***/
  categoryValues: number[] = [];
  categoryLabels: string[] = [];
  seriesValues: any[] = [];
  categoryMaxPoints: number[] = [300, 200, 1500, 250, 250, 1000, 1000, 1000, 1000, 10];
  categoryPtLabels: string[] = ["Convênios", "Licitações", "Despesa", "Receita", "Contratos", "Pessoal", "Despesa Extra", "Receita Extra",  "Pagamento",  "Planejamento"];

  /*** graphics configuration ***/
  stroke: number = 5;
  radius: number = 40;
  semicircle: boolean = false;
  rounded: boolean = true;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#037DA6';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  colors:any;
//   @ViewChild('linechart')
//   chartLine !: ElementRef<any>;
//   config !: Highcharts.Options ;
//   chart !: Highcharts.Chart;

  constructor(public mapleafservice: MapleafService, public changeDetectorRef: ChangeDetectorRef){
    Chart.register(...registerables);
  }

  // getNomeMunicipios(){
  //   this.mapleafservice.getIBGE().subscribe( data =>{
  //     console.log(data);
  //   })   
  // }

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

  /*** sum points of categories ***/
  sumSubCategories(){
    let indexCategory: number = 0;
    if(this.mapleafservice.resultsTotalPoints != undefined){
      for (var category in this.mapleafservice.resultsTotalPoints.slice(-1)[0].detailedEvaluation){
        let count: number = 0; 
        Object.entries(this.mapleafservice.resultsTotalPoints.slice(-1)[0].detailedEvaluation[category]).forEach(([key, value]) => {
          if(count == 0){
            this.categoryValues.push(Number(value))
          }
          else{
            this.categoryValues[indexCategory] += Number(value);
          }
          count += 1;
        });
        this.categoryLabels.push(category);
        indexCategory += 1;
      }
    }
  }

  getTimeSeries(){
    if(this.mapleafservice.resultsTotalPoints != undefined){
      for (var i = 0; i < this.mapleafservice.resultsTotalPoints.length; i ++){
        let evaluation = this.mapleafservice.resultsTotalPoints.slice(i)[0]
        for (var item in evaluation.detailedEvaluation){
          if(item == "total_points"){
            this.seriesValues.push([moment(evaluation.endDateTime).locale('pt').format('L'), Number(evaluation.detailedEvaluation[item]),])
          }
        }
      }
    }
  }
  
  /*** colors of the graphics ***/
  generateColors(){
    let datalength = this.categoryLabels.length;
    
    let color = new ColorGenerator();
    const colorRangeInfo = {
      colorStart: 0.5,
      colorEnd: 1,
      useEndAsStart: false,
    };

    this.colors = color.interpolateColors(datalength, colorRangeInfo);
  }

  /*** progress circle chart styles ***/
  getOverlayStyle() {
    const isSemi = this.semicircle;
    const transform = (isSemi ? '' : 'translateY(-40%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '40%',
      bottom: 'auto',
      left: '50%',
      transform,
      'font-size': this.radius / 3.5 + 'px',
    };
  }

  /*** createChart ***/
  createChart(nome: string){
    console.log( this.mapleafservice.resultsTotalPoints); 
    if(this.barchart!==null || this.barchart!==undefined){
      this.barchart?.destroy();
    }
    if(this.timechart!==null || this.timechart!==undefined){
      this.timechart?.destroy();
    }

    this.categoryLabels = [];
    this.categoryValues = [];
    this.seriesValues = [];

    this.sumSubCategories();
    this.generateColors();
    this.getTimeSeries();

    this.barchart = new Chart("barchart", {
      type: "bar",
      data: {
        labels: this.categoryPtLabels,
        datasets: [
          {
            data: this.categoryValues,
            backgroundColor: this.colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `${nome}`
          }
        }
      }
    });

    this.timechart = new Chart("timechart", {
      type: "line",
      data: {
        datasets: [{
          data: this.seriesValues,
          backgroundColor: this.colors,
          borderColor: this.colors,
          borderWidth: 3,
        }],
      },
      options: {
        indexAxis: 'x',
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Histórico de pontuações'
          }
        },
        scales: {
          xAxes: {
              ticks: {
                  autoSkip: false,
                  maxRotation: 0,
                  minRotation: 0
              }
          }
        }
      }
    });
  }

  /*** capture API data ***/
  getDadosTotalPoints(nome:any){
    this.loading = true
    this.mapleafservice.getTotalPoints(nome, "2021-02-10 00:00:00.000").then(_ => {this.loading = false; this.createChart(nome)})
  }

  /*** correction date ***/
  correctionDate(date: Date){
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()
    //if the dates are only one digit, add a leading zero
    return `${year}-${month+1 < 10? `0${month+1}` : month+1}-${day < 10 ? `0${day}`: day }`
  }

  /*** uses the "remove accents" function in searches ***/
  searchDadosMunicipio(nomeDoMunicipio:string){
    let municipio = nomeDoMunicipio.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAcentos);
    this.getDadosTotalPoints(municipio)
  }
 

  filterCities() {
    if (!this.mapleafservice.resultsIbge) {
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
    // filter the banks
    this.filteredCity.next(
      this.mapleafservice.resultsIbge.filter((bank) => bank.nome.toLowerCase().indexOf(search) > -1)
    );

  }
  
  sortCities(cities: IbgeData[]){
    return cities.sort((a, b) => a.nome.localeCompare(b.nome))
  }

  ngOnInit(): void {
    this.mapleafservice.getIBGE().then(data => {
      /** This will get value changes on city selector */
      // load the initial bank list
      this.filteredCity.next(this.sortCities(this.mapleafservice.resultsIbge).slice());
      }
    );


    this.cityFilter.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCities();
    });
    /*****************************************************/
    /**************   Chart accomplishment  **************/
    /*****************************************************/

  }

  /** Search form */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }



  
}
