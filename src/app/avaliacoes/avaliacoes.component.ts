import { Component, OnInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-Avaliacoes',
  templateUrl: './Avaliacoes.component.html',
  styleUrls: ['./Avaliacoes.component.css']
})
export class AvaliacoesComponent implements OnInit{

  city: FormControl = new FormControl();
  date: FormControl = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
//ELEMENT_DATA
  dataSource = new MatTableDataSource<Element>();
  selectedValue!: string;
  selectedValueData!: string;
  result: any;
  colors:any;
  loading!: boolean;
  startDate!: Date;
  endDate!: Date;

  constructor(public mapleafservice: MapleafService, private dateAdapter: DateAdapter<any>){
    this.dateAdapter.setLocale('pt');
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

  createTable(){

    console.log(this.mapleafservice.results[0].evaluation)

  }

  getDadosApi(nome:any, firststamp:any, secondstamp:any){
    this.loading = true
    this.mapleafservice.getTurmalinaStamp(nome, firststamp, secondstamp).then(_ => {this.loading = false; this.createTable()})
  }


  correctionDate(date: Date){
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()

    return `${year}-${month+1 < 10? `0${month+1}` : month+1}-${day < 10 ? `0${day}`: day }`
  }

  searchDadosMunicipio(nomeDoMunicipio:string){
    let municipio = nomeDoMunicipio.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAcentos);
    this.getDadosApi(municipio, this.correctionDate(this.startDate), this.correctionDate(this.endDate))
  }
  
  ngOnInit(): void {
    this.mapleafservice.getIBGE();
    this.getDadosApi("Joao Pessoa", "2021-02-11", "2021-02-12")
    /*****************************************************/
    /**************   Table accomplishment  **************/
    /*****************************************************/


  }

  
}
