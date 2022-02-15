import { AgreementComponent } from './../documentation/agreement/agreement.component';
import { Evaluation } from './../shared/models/evaluation.model';
import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';
import { Chart, registerables} from 'chart.js';
import { ColorGenerator } from './color-generator.model';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import moment from 'moment';
import { MatSelect } from '@angular/material/select';
import { IbgeData } from '../shared/models/ibgenames.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertComponent } from './modal/alert.component';

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
  @ViewChild('graphOneId') barchartid!: ElementRef;
  @ViewChild('graphTwoId') timechartid!: ElementRef;
  // @ViewChild('timechartid') timechartid!: ElementRef;

  protected _onDestroy = new Subject<void>();
  public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<IbgeData[]>(1);

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
  public barchart!: Chart;
  public timechart!: Chart;
  conditionGraph: any = false;
  
  /*** chart data ***/
  categoryValues: number[] = [];
  categoryValuesMean: number[] = [];
  seriesValues: any[] = [];
  categoryMaxPoints: number[] = [45, 150, 120, 45, 40, 50, 70, 15, 60, 30];
  categoryPtLabels: string[] = ["Convênios", "Licitações", "Despesa", "Receita", "Contratos", "Pessoal", "Despesa Extra", "Receita Extra",  "Pagamento",  "Planejamento"];
  scoreTotal!: number;
  lastUpdate!: string;
  nameCity!: string;

  /*** graphics configuration ***/
  stroke: number = 5;
  radius: number = 40;
  semicircle: boolean = false;
  rounded: boolean = true;
  responsive: boolean = true;
  clockwise: boolean = true;
  color: string = '#037DA6';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  colors:any;
  summaryMean: any;
  colorsMean: any;

  constructor(public mapleafservice: MapleafService, public changeDetectorRef: ChangeDetectorRef, private SimpleModalService: SimpleModalService){
    Chart.register(...registerables);
  }

  showAlert2(i:number) {
    console.log(i)
    this.SimpleModalService.addModal(AlertComponent, { 
      message: 'Click outside to close dialog' 
    }, { closeOnClickOutside: true });
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

  /*** sum points of categories ***/
  subCategories(){;
    if(this.mapleafservice.resultsSummaryPoints != undefined){
      for( var i = 0 ; i < this.mapleafservice.resultsSummaryPoints.length; i ++){
        let summary = this.mapleafservice.resultsSummaryPoints[i].summaryEvaluation
        if(summary != undefined ){
          for (var category in summary){
            let value = summary[category]
            this.categoryValues.push(Number(value))
            // this.categoryValuesMean.push(category)
          }
          this.scoreTotal = this.mapleafservice.resultsSummaryPoints[i].score
          break;
        }
      }
    }
  }

  getTimeSeries(){
    if(this.mapleafservice.resultsSummaryPoints != undefined){
      let indexSeries = -1;
      let indexAnterior = 0;
      let dateAnterior = " ";
      let resultsLength = this.mapleafservice.resultsSummaryPoints.length;
      for (var i = resultsLength-1; i >= 0; i=i-1){
        let results = this.mapleafservice.resultsSummaryPoints
        let evaluation = this.mapleafservice.resultsSummaryPoints.slice(i)[0]
        if(evaluation.endDateTime != "undefined"){
          let dateEvaluation = moment(evaluation.endDateTime).locale('pt').format('L');

          if(dateEvaluation != dateAnterior){
            this.seriesValues.push([dateEvaluation, Number(evaluation.score),])
            indexSeries += 1
            indexAnterior = i;
            dateAnterior = dateEvaluation;
          }
          else{
            if(evaluation.score > results.slice(indexAnterior)[0].score){
              this.seriesValues[indexSeries] = [dateEvaluation, Number(evaluation.score),]
            }
            else{
              continue;
            }
          }
        }
        else{
          continue
        }
      }
      this.lastUpdate = this.seriesValues[0][0]
    }
  }
  
  /*** colors of the graphics ***/
  generateColors(){
    let datalength = this.categoryPtLabels.length;
    
    let color = new ColorGenerator();
    const colorRangeInfo = {
      colorStart: 0.5,
      colorEnd: 1,
      useEndAsStart: false,
    };

    const colorRangeInfoMean = {
      colorStart: 1,
      colorEnd: 1.5,
      useEndAsStart: false,
    };


    this.colors = color.interpolateColors(datalength, colorRangeInfo);
    this.colorsMean = color.interpolateColorsMean(datalength, colorRangeInfoMean);
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
    if(this.barchart!==null && this.barchart!==undefined){
      this.barchart.destroy();
    }
    if(this.timechart!==null && this.timechart!==undefined){
      this.timechart.destroy();
    }
    this.categoryValues = [];
    this.seriesValues = [];
    this.summaryMean = Object.entries(this.mapleafservice.summaryMean).map(([k, v]) => v);
    this.subCategories();
    this.generateColors();
    this.getTimeSeries();
    this.conditionGraph = true;
    this.barchart = new Chart(this.barchartid.nativeElement, {
      type: "bar",
      data: {
        labels: this.categoryPtLabels,
        datasets: [
          {
            data: this.categoryValues,
            backgroundColor: this.colors,
            borderWidth: 1,
            label: nome,
          },
          {
            data: this.summaryMean,
            backgroundColor: this.colorsMean,
            borderWidth: 1,
            label: 'Média do Estado'
          }
        ]
      },
      options: {
        indexAxis: 'x',
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Pontuação do município e do Estado'
          }
        }
      }
    });

    this.timechart = new Chart(this.timechartid.nativeElement, {
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
                  maxRotation: 45,
                  minRotation: 45
              }
          }
        }
      }
    });
  }

  /*** capture API data ***/
  getDadosTotalPoints(nome:any){
    this.loading = true
    this.mapleafservice.getSummaryPoints(nome, "12").then(_ => {
      this.mapleafservice.getTurmalinaMean().then(_ => {      
        this.loading = false;
        this.conditionGraph = false;
        this.nameCity = nome;
        this.createChart(nome)
      });
    })
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
