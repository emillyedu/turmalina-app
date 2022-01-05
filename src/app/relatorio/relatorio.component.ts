import { Component, OnInit } from '@angular/core';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';

interface Municipio{
  value: string;
  viewValue: string;
}

interface Data{
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit{
  selectedValue!: string;
  selectedValueData!: string;

  municipios: Municipio[] = [
    {value: 'joao pessoa', viewValue: 'João Pessoa'},
    {value: 'campina grande', viewValue: 'Campina Grande'},
  ];

  datas: Data[] = [
      {value: '10-10-2021', viewValue: '11/11/2021'},
  ]

  constructor(public mapleafservice: MapleafService){
  }

  getNomeMunicipios(){
    this.mapleafservice.getIBGE().subscribe( data =>{
      console.log(data);
    })   
  }

  ngOnInit(): void {
      this.getNomeMunicipios();
    }
  
}
