import { Evaluation } from './../shared/models/evaluation.model';
import { Component, OnInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';
import { Chart, registerables, ChartConfiguration, ChartType, ChartOptions, ChartDataset, ChartData} from 'chart.js';
import { ColorGenerator } from './color-generator.model';

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

  selectedValue!: string;
  selectedValueData!: string;
  datalength!: number;
  result: any[]=[];
  colors:any;
  loading!: boolean;
  barchart!: Chart;
  startDate!: Date;
  endDate!: Date;
  categoryValues: number[] = [];
  categoryLabels: string[] = [];
  categoryMaxPoints: number[] = [300, 200, 1500, 250, 250, 1000, 1000, 1000, 1000, 10];
  categoryPtLabels: string[] = ["Convênios", "Licitações", "Despesa", "Receita", "Contratos", "Pessoal", "Despesa Extra", "Receita Extra",  "Pagamento",  "Planejamento"];
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

  // agreementProgress: number = 0;
  // bidProgress: number = 0;
  // budgetExpenditureProgress: number = 0;
  // budgetRevenueProgress: number = 0;
  // contractProgress: number = 0;
  // employeeInformationProgress: number = 0;
  // extraBudgetExpenditureProgress: number = 0;
  // extraBudgetRevenueProgress: number = 0;
  // paymentDocumentProgress: number = 0;
  // planningInstrumentProgress: number = 0;


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

  generateProgressGraph(index: number){
    // this.agreementProgress = (this.categoryValues[0] / this.categoryMaxPoints[0]) * 100
    // this.bidProgress = (this.categoryValues[1] / this.categoryMaxPoints[1]) * 100
    // this.budgetExpenditureProgress = (this.categoryValues[2] / this.categoryMaxPoints[2]) * 100
    // this.budgetRevenueProgress = (this.categoryValues[3] / this.categoryMaxPoints[3]) * 100
    // this.contractProgress = (this.categoryValues[4] / this.categoryMaxPoints[4]) * 100
    // this.employeeInformationProgress = (this.categoryValues[5] / this.categoryMaxPoints[5]) * 100
    // this.extraBudgetExpenditureProgress = (this.categoryValues[6] / this.categoryMaxPoints[6]) * 100
    // this.extraBudgetRevenueProgress = (this.categoryValues[7] / this.categoryMaxPoints[7]) * 100
    // this.paymentDocumentProgress = (this.categoryValues[8] / this.categoryMaxPoints[8]) * 100
    // this.planningInstrumentProgress = (this.categoryValues[9] / this.categoryMaxPoints[9]) * 100
    return 100*(this.categoryValues[index]/this.categoryMaxPoints[index])

  }

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

  createChart(nome: string){
    // this.result = this.mapleafservice.results; 
    this.sumSubCategories();
    this.generateColors();

    // if ((this.barchart !== null) || (this.barchart !== undefined) || (this.doughnutChart !== null) || (this.doughnutChart !== undefined)) {
    //   this.barchart.destroy();
    //   this.doughnutChart.destroy();
    // }
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
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: `${nome}`
          }
        }
      }
    });

  }



  getDadosTotalPoints(nome:any){
    this.loading = true
    this.mapleafservice.getTotalPoints(nome).then(_ => {this.loading = false; this.createChart(nome)})
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
