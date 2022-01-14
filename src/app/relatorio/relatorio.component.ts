import { Component, OnInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';
import { Chart, registerables, ChartConfiguration, ChartData } from 'chart.js';
import { reduceEachLeadingCommentRange, reduceEachTrailingCommentRange } from 'typescript';
import { ColorGenerator } from './color-generator.model';
import { get } from 'https';

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

  evaluations: any[] | undefined = [];
  selectedValue!: string;
  selectedValueData!: string;
  datalength!: number;
  result: any;
  colors:any;
  loading!: boolean;
  chart: Chart[] = [];
  chartOptions: ChartConfiguration[] = [];

  constructor(public mapleafservice: MapleafService, public changeDetectorRef: ChangeDetectorRef){
    Chart.register(...registerables);
  }

  // getNomeMunicipios(){
  //   this.mapleafservice.getIBGE().subscribe( data =>{
  //     console.log(data);
  //   })   
  // }

  removeAcentos(letra: string) {
    /** Remove letters accents*/
    if ('áàâã'.indexOf(letra) !== -1) {
      return 'a';
    } else if ('éê'.indexOf(letra) !== -1) {
      return 'e';
    } else if ('í'.indexOf(letra) !== -1) {
      return 'i';
    } else if ('óôõ'.indexOf(letra) !== -1) {
      return 'o';
    } else if ('úü'.indexOf(letra) !== -1) {
      return 'u';
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

  createChart(){
    this.result = this.mapleafservice.results; 
    
    for (var category in this.result[0]){
      let categorylabels: string[] = [];
      let datalabels: any[] = [];
      Object.entries(this.result[0][category]).forEach(([key, value]) => {
        categorylabels.push(key);
        datalabels.push(value);
      });
      //console.log(this.datalabels)
      this.datalength = datalabels.length;
      
      let color = new ColorGenerator();
      const colorRangeInfo = {
        colorStart: 0,
        colorEnd: 1,
        useEndAsStart: false,
      };

      // if (this.chart !== null && this.chart !== undefined) {
      //   this.chart.destroy();
      // }

      this.colors = color.interpolateColors(this.datalength, colorRangeInfo);

      this.chartOptions.push({
        type:'doughnut',
        data:{
          labels: categorylabels,
          datasets: [
            {
              data: datalabels,
              backgroundColor: this.colors,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `${category} Donut`
            }
          }
        }        
      })

      this.generateChart(this.chartOptions);

    }
    
  }

  generateChart(chartOptions: ChartConfiguration[]){
    this.chart = this.chartElementRefs.map((chartElementRef, index) => {
      const config = chartOptions[index]
      return new Chart(chartElementRef.nativeElement, config);
    });
  }

  getDadosTotalPoints(nome:any, datestamp:any){
    this.loading = true
    this.mapleafservice.getTotalPoints(nome, datestamp).then(_ => {this.loading = false; this.createChart()})

  }

  ngOnInit(): void {
    this.mapleafservice.getIBGE();
    //  this.getNomeMunicipios();
    this.getDadosTotalPoints("Joao Pessoa", "2021-02-11")
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
