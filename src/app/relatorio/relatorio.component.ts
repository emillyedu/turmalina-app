import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';
import { Chart, registerables } from 'chart.js';
import { reduceEachLeadingCommentRange, reduceEachTrailingCommentRange } from 'typescript';
import { ColorGenerator } from './color-generator.model';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit{

  city: FormControl = new FormControl();
  date: FormControl = new FormControl();
  evaluations: any[] | undefined = [];
  selectedValue!: string;
  selectedValueData!: string;
  datalength!: number;
  result: any;
  categorylabels: string[] = [];
  datalabels: any[] = [];
  chart: any;
  chart2:any;
  colors:any;

  turmalinaresults = {
    "Municipios":[
      {
        "id": 0,
        "MunicipioName": "João Pessoa",
        "Evaluations":[
          {
            date: "2021-02-11",
            dateView: "11/02/2021"
          }
        ]
      },
      {
        "id": 1,
        "MunicipioName": "Campina Grande",
        "Evaluations":[
          {
            date: "2021-03-12",
            dateView: "12/03/2021"
          },
          {
            date: "2021-03-13",
            dateView: "13/03/2021"
          }
        ]
      }
    ]
  }

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

  getDadosMunicipio(nomeDoMunicipio: string, datestamp: string){
    let nome = nomeDoMunicipio.replace(/[áàâãéêíóôõúüç']/g, this.removeAcentos);
    this.mapleafservice.getTotalPoints(nome, datestamp).then((res) => {
      this.result = res;
      Object.entries(this.result[0].Agreement).forEach(([key, value]) => {
        this.categorylabels.push(key);
        this.datalabels.push(value);
      });
      console.log(this.datalabels)
    })

    this.datalength = this.datalabels.length;

    let color = new ColorGenerator();
    const colorRangeInfo = {
      colorStart: 0,
      colorEnd: 1,
      useEndAsStart: false,
    };

    this.colors = color.interpolateColors(this.datalength, colorRangeInfo);

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.categorylabels,
        datasets: [
          {
            data: this.datalabels,
            // backgroundColor: this.colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Agreement Donut'
          }
        }
      },
    });

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: this.categorylabels,
        datasets: [
          {
            data: this.datalabels,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Agreement Bar'
          }
        }
      },
    });

  }

  ngOnInit(): void {
    //  this.getNomeMunicipios();

    /** This will get value changes on city selector */
    this.city.valueChanges.subscribe(() => {
      this.evaluations = [];
      this.changeDetectorRef.detectChanges();
      this.evaluations = this.turmalinaresults.Municipios.find(municipio => {
        return municipio.MunicipioName === this.city.value;
      })?.Evaluations;
    });

    /*****************************************************/
    /**************   Chart accomplishment  **************/
    /*****************************************************/


  }
  
}
