import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';

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
            date: "2021-02-11",
            dateView: "11/02/2021"
          },
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
  }

  // getNomeMunicipios(){
  //   this.mapleafservice.getIBGE().subscribe( data =>{
  //     console.log(data);
  //   })   
  // }

  // getDadosMunicipio(nomeDoMunicipio: string, datestamp: string){
  //   this.mapleafservice.getTotalPoints(nomeDoMunicipio, datestamp).subscribe( data =>{
  //     console.log(nomeDoMunicipio, data[0].total_points);
  //   })
  // }

  ngOnInit(): void {
    //  this.getNomeMunicipios();
    this.city.valueChanges.subscribe(() => {
      this.evaluations = [];
      this.changeDetectorRef.detectChanges();
      this.evaluations = this.turmalinaresults.Municipios.find(municipio => {
        return municipio.MunicipioName === this.city.value;
      })?.Evaluations;
    });

  }
  
}
