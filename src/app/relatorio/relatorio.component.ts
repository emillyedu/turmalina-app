import { Evaluation } from './../shared/models/evaluation.model';
import { Component, OnInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';
import { Chart, registerables, ChartConfiguration, ChartType, ChartOptions} from 'chart.js';
import { reduceEachLeadingCommentRange, reduceEachTrailingCommentRange } from 'typescript';
import { ColorGenerator } from './color-generator.model';
import { get } from 'https';
import { strictEqual } from 'assert';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit{

  city: FormControl = new FormControl();
  date: FormControl = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @ViewChildren('chart', { read: ElementRef }) chartElementRefs!: QueryList<ElementRef>;

  selectedValue!: string;
  selectedValueData!: string;
  datalength!: number;
  result: any[]=[];
  colors:any;
  loading!: boolean;
  chart: Chart[] = [];
  chartOptions: ChartConfiguration[] = [];
  startDate!: Date;
  endDate!: Date;
  categoryValues: number[] = [];
  categoryLabels: string[] = [];

  constructor(public mapleafservice: MapleafService, public changeDetectorRef: ChangeDetectorRef){
    Chart.register(...registerables);
  }

  // getNomeMunicipios(){
  //   this.mapleafservice.getIBGE().subscribe( data =>{
  //     console.log(data);
  //   })   
  // }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public barChartType: ChartType = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: this.categoryValues , label: 'Municipio'},
  ];
  public barChartOptions: ChartOptions = {
    responsive: true
  };
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

  // getDadosMunicipio(nomeDoMunicipio: string, datestamp: string){
  //   let nome = nomeDoMunicipio.replace(/[áàâãéêíóôõúüç']/g, this.removeAcentos);

  // }
  // generateChart(){

  // }

  sumSubCategories(){
    let indexCategory: number = 0;
    console.log(this.mapleafservice.resultsTotalPoints[0].evaluation)
    for (var category in this.mapleafservice.resultsTotalPoints[0].evaluation){
      let count: number = 0;
      Object.entries(this.mapleafservice.resultsTotalPoints[0].evaluation[category]).forEach(([key, value]) => {
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


  createChart(){
    // this.result = this.mapleafservice.results; 
    this.sumSubCategories();
    console.log(this.categoryLabels, this.categoryValues);

      //console.log(this.datalabels)
      // this.datalength = datalabels.length;
      
      // let color = new ColorGenerator();
      // const colorRangeInfo = {
      //   colorStart: 0,
      //   colorEnd: 1,
      //   useEndAsStart: false,
      // };

      // if (this.chart !== null && this.chart !== undefined) {
      //   this.chart.destroy();
      // }

      // this.colors = color.interpolateColors(this.datalength, colorRangeInfo);

      // new Chart({
      //   type:'doughnut',
      //   data:{
      //     labels: categorylabels,
      //     datasets: [
      //       {
      //         data: datalabels,
      //         backgroundColor: this.colors,
      //       },
      //     ],
      //   },
      //   options: {
      //     responsive: false,
      //     plugins: {
      //       legend: {
      //         position: 'top',
      //       },
      //       title: {
      //         display: true,
      //         text: `${category} Donut`
      //       }
      //     }
      //   }        
      // })
    
    
    // this.generateChart();
  }



  getDadosTotalPoints(nome:any){
    this.loading = true
    this.mapleafservice.getTotalPoints(nome).then(_ => {this.loading = false; this.createChart()})
  }


  correctionDate(date: Date){
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()

    return `${year}-${month+1 < 10? `0${month+1}` : month+1}-${day < 10 ? `0${day}`: day }`
  }

  searchDadosMunicipio(nomeDoMunicipio:string){
    let municipio = nomeDoMunicipio.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAcentos);
    this.getDadosTotalPoints(municipio)
  }
  
  ngOnInit(): void {
    this.mapleafservice.getIBGE();
    this.getDadosTotalPoints("Joao Pessoa");
    //  this.getNomeMunicipios();
    // this.chart = this.chartElementRefs.map((chartElementRef, index, ) => {
    //   console.log(this.chartOptions[1])
    //   let config = this.chartOptions[index]
    //   return new Chart(chartElementRef.nativeElement, config);
    // });    
    /** This will get value changes on city selector */
    // this.city.valueChanges.subscribe(() => {
    //   this.evaluations = [];
    //   this.changeDetectorRef.detectChanges();
    //   this.evaluations = this.turmalinaresults.Municipios.find(municipio => {
    //     return municipio.MunicipioName === this.city.value;
    //   })?.Evaluations;
    // });

    /*****************************************************/
    /**************   Chart accomplishment  **************/
    /*****************************************************/


  }

  
}
