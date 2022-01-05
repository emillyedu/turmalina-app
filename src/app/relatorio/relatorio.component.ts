import { Component, OnInit } from '@angular/core';
import { MapleafService } from './../turmalina/mapleaf/mapleaf.service';

interface Municipio{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent{
  selectedValue!: string;

  municipios: Municipio[] = [
    {value: 'joao pessoa', viewValue: 'João Pessoa'},
    {value: 'campina grande', viewValue: 'Campina Grande'},
  ];

}
