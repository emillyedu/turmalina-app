
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapleafService } from './mapleaf.service';
import { FormControl, FormGroup } from '@angular/forms';
import 'leaflet';
import * as d3 from 'd3';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { latLng, tileLayer, polygon, Polygon } from "leaflet";
import { takeUntil } from 'rxjs/operators';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertMapComponent } from './modal/alertmap.component';
import * as L from 'leaflet';
import * as _ from 'lodash';
import { Municipio } from 'src/app/shared/models/municipio.class';
import { ReplaySubject, Subject } from 'rxjs';
import { IbgeData } from 'src/app/shared/models/ibgenames.model';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-mapleaf',
  templateUrl: './mapleaf.component.html',
  styleUrls: ['./mapleaf.component.css']
})

export class MapleafComponent implements OnInit {
  mapa:any;
  public innerWidth: any;
  
  municipioCtrl!: FormControl;
  protected _onDestroy = new Subject<void>();
  public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<IbgeData[]>(1);
  city: FormControl = new FormControl();
  cityFilter: FormControl = new FormControl();
  @ViewChild('citySelect') citySelect!: MatSelect;
  protected cities: IbgeData[] = this.mapleafservice.resultsIbge
  selectedValue!: string;


  paraibaGeoJson: any;
  municipios: Municipio[] = [];
  private stateTiles: any[] = [];
  private initialZoom: any = 8;
  public layers: any[] = [];
  private color:any;
  escalaCorLegenda: any;
  public maxPontuacaoMunicipios: number = 629;
  public MAX_PONTUACAO = 625;
  municipiosTopDez: Municipio[] = [];
  colorTextRank = "#fffff";
  colorTextRankScale: any;

  ajusteMapaResolucao(tamanhoTela:any) {
    if (tamanhoTela <= 600) {
      this.mapa.setView([+-7.60, -36.75], 7);
    }
  }

  private removeAcentos(letra: string) {
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

  private simplificaNomes(nome: string) {
    return nome.toLowerCase().replace(/[áàâãéêíóôõúüç']/g, this.removeAcentos);
  }

  filterMunicipios(nome: string) {
    return this.municipios.filter(municipio =>
      _.isEqual(this.simplificaNomes(municipio.nome), this.simplificaNomes(nome)));
  }

  public convertJsonObjMunicipio(data: any) {
    let cont = 1
    for (let i in data) {
      let municipio = new Municipio();
      municipio.nome = data[i]["management_unit"]["public_entity"];
      municipio.pontuacao = data[i]["score"];
      municipio.pontuacaoMaxima = this.MAX_PONTUACAO;
      municipio.urlPortal = data[i]["management_unit"]["start_urls"];
      municipio.posicao = cont;
      this.municipios.push(municipio);
      cont = cont + 1;
    }

  }

  public getTilesByZoomLevel() {
    return this.stateTiles;
  }

  public getPontuacaoMunicipio(municipio: string) {
    for (let m of this.municipios) {
      if (this.simplificaNomes(municipio) === this.simplificaNomes(m.nome)) {
        return m.pontuacao;
      }
    }
    return null;
  }

  
  public getColor(pontuacaoMunicipio: any) {
    this.escalaCorLegenda = this.escalaCorLegenda === undefined ? d3.scaleSequential(["#004D66", "#87DED7"])
      .domain([this.MAX_PONTUACAO,0]) : this.escalaCorLegenda;
    return this.escalaCorLegenda(pontuacaoMunicipio);
  }


  public mapReady(map: L.Map) {
      this.mapa = map;
      let legend = new (L.Control.extend({
        options: { position: 'bottomright' }
      }));
  
      this.mapleafservice.getEstadoParaibaGeoJson().subscribe((data: any) => {
        const paraibaLatLon = data.features[0].geometry.coordinates[1].map(
          (coords: any) => new L.LatLng(coords[1], coords[0])
        );
  
        
        L.polygon(
          [
            [
              new L.LatLng(90, -180),
              new L.LatLng(90, 180),
              new L.LatLng(-90, 180),
              new L.LatLng(-90, -180)
            ],
            paraibaLatLon
          ],
          { color: "#3b3b3b3b", weight: 1, fillOpacity: 0.26 }
        ).addTo(map);
       
      });
  
      const vm = this;

      legend.onAdd = (map) => {
  
          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 100, 200, 400, 500, 600],
              labels = [];
  
          div.innerHTML += '<div class="legend_text"><h1> Pontuação </h1></div>';
          var divtext = L.DomUtil.create('div', 'legend_box', div);
          
          for (var i = 0; i < grades.length; i++) {
              divtext.innerHTML +=
  
              '<i style="background:' + vm.getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ?'<br>' : '+');              
  
          }
  
          return div;
      };
  
      legend.addTo(map);
      
      map.on('zoom', (result) => {
        this.layers = [];
        this.zone.run(() => {
          this.layers = this.getTilesByZoomLevel();
        });
      });
      
  }

  public mapOptions = {
    layers: [
      tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', { minZoom: 6, maxZoom: 11, attribution: '...' }),
    ],
    attributionControl: false,
    zoom: this.initialZoom,
    zoomControl: false,
    center: latLng(-7.16554, -36.13779)
  };

  private fetchTiles(tileObject:any) {
    this.mapleafservice.getParaibaGeoJson().subscribe((data: any) => {

      data.features.map((feature:any) => {
        feature.geometry.coordinates.forEach((coordinate: any) => {
          const nomeMunicipio = feature.properties.NM_MUNICIP === "SANTA TERESINHA" ? "SANTA TEREZINHA" : feature.properties.NM_MUNICIP;
          const municipio = this.filterMunicipios(nomeMunicipio)[0];
          const pontuacaoMunicipio = this.getPontuacaoMunicipio(nomeMunicipio);
          const p = polygon(coordinate.map((coords:any) => [coords[1], coords[0]]),
            {
              fillColor: pontuacaoMunicipio !== null ? this.color(pontuacaoMunicipio) : '#3b3b3b3b',
              color: '#ffff',
              weight: 1.5,
              opacity: .75,
              fillOpacity: 0.7
            });
          p.addTo(this.mapa)
          if (pontuacaoMunicipio !== null) {
            this.adicionarPolygonMunicipio(nomeMunicipio, p);
            this.adicionarEventoMouseOverPolygono(p, municipio);
            this.adicionarEventoPolygono(p, municipio);
            this.adicionarEventoClickPolygono(p, municipio);
          }
          tileObject.push(p);

        });
      });

      this.layers = this.getTilesByZoomLevel();
      this.mapa.invalidateSize();
      this.innerWidth = (window.innerWidth <= 600);
      this.ajusteMapaResolucao(window.innerWidth);
      
    });
  }

  
  public adicionarPolygonMunicipio(nomeMunicipio: string, p:any) {
    for (let i in this.municipios) {
      if (this.simplificaNomes(this.municipios[i].nome) === this.simplificaNomes(nomeMunicipio.toLowerCase())) {
        this.municipios[i].polygon = p;
        return;
      }
    }
  }

  public adicionarEventoClickPolygono(p: Polygon, municipio: Municipio) {
    p.addEventListener('click', evt => {
      this.zone.run(() => {
        this.restaraMapaEstadoInicial();
      });
      this.zone.run(() => this.mapa.fitBounds(p.getBounds()));
    });
  }

  public adicionarEventoMouseOverPolygono(p: Polygon, municipio: Municipio) {
    p.addEventListener('mouseover', evt => {
      this.zone.run(() => {
        this.restaraMapaEstadoInicial();
      });
      p.setStyle({
        fillColor: '#469b9c',
        weight: 1,
        opacity: .75,
        fillOpacity: 0.7
      });
      p.bindPopup(this.getConteudoPopUp(municipio)).openPopup();
    });
  }

  public adicionarEventoPolygono(p: Polygon, municipio: Municipio) {
    p.addEventListener('mouseout', evt => {
      this.zone.run(() => {
        this.restaraMapaEstadoInicial();
      });
      p.setStyle({
        fillColor: municipio.pontuacao != null ? this.color(municipio.pontuacao) : '#3b3b3b3b',
        color: '#ffff',
        weight: 1,
        opacity: .75,
        fillOpacity: 0.7
      });
      p.bindPopup(this.getConteudoPopUp(municipio)).closePopup();

    });
  }

  public zoomPolygon(p : Polygon, municipio: Municipio){
    this.restaraMapaEstadoInicial();
    this.mapa.fitBounds(p.getBounds());
    p.bindPopup(this.getConteudoPopUp(municipio)).openPopup();
  }
  
  public restaraMapaEstadoInicial() {
    for (let i in this.municipios) {
      if (this.municipios[i].polygon !== null) {
        this.municipios[i].polygon.setStyle({
          fillColor: this.color(this.municipios[i].pontuacao),
          weight: 1,
          opacity: .75,
          fillOpacity: 0.7
        });
        this.municipios[i].polygon.bindPopup(this.getConteudoPopUp(this.municipios[i])).closePopup();

      }
    }
  }

  public inicializaMunicipiosComponent() {
    this.municipiosTopDez = this.municipios.slice(0, 10);
    return this.municipiosTopDez;
  }

  public getConteudoPopUp(municipio: Municipio) {
    return '<b>' + municipio.nome +
      '</b><br>Pontuação: ' + municipio.pontuacao + '/' + municipio.pontuacaoMaxima
      + '</b><br>Posição no rank: ' + municipio.posicao + "°";
      
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
      this.mapleafservice.resultsIbge.filter((bank) => bank.public_entity.toLowerCase().indexOf(search) > -1)
    );

  }

  sortCities(cities: IbgeData[]){
    return cities.sort((a, b) => a.public_entity.localeCompare(b.public_entity))
  }

  searchDadosMunicipio(nomeDoMunicipio:string){
    let municipio = nomeDoMunicipio.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAcentos);
    const municipioFiltrado = this.filterMunicipios(municipio)[0];
    if(municipioFiltrado.polygon != undefined){
      this.zoomPolygon(municipioFiltrado.polygon, municipioFiltrado)
    }
    else{
      this.showAlert2(municipioFiltrado)
    }
  }

  showAlert2(municipio: Municipio) {
      let messageText = [];
      messageText.push(`Pontuação: ${municipio.pontuacao}/${municipio.pontuacaoMaxima}`)
      messageText.push(`Posição no rank: ${municipio.posicao}°`)
      let imageurl = undefined
      if(this.simplificaNomes(municipio.nome) === "estado da paraiba"){
        imageurl="./bandeira.png"
      }

      this.SimpleModalService.addModal((AlertMapComponent), { 
        title: municipio.nome,
        message: messageText,
        imageurl: imageurl
      }, { closeOnClickOutside: true });
  }

  constructor(private zone: NgZone, private mapleafservice: MapleafService, private SimpleModalService: SimpleModalService) {
  }

  ngOnInit(): void{
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

    this.mapleafservice.getRankingModel().subscribe((data: any) => {
      this.convertJsonObjMunicipio(data);
      this.layers = this.getTilesByZoomLevel();
      this.fetchTiles(this.stateTiles);
      this.mapa.createPane('labels');

      // This pane is above markers but below popups
      this.mapa.getPane('labels').style.zIndex = 650;
    
      // Layers in this pane are non-interactive and do not obscure mouse/touch events
      this.mapa.getPane('labels').style.pointerEvents = 'none';
      
      const tilesPane =  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        pane: 'labels'
      });
      tilesPane.addTo(this.mapa);
      this.inicializaMunicipiosComponent();
      this.maxPontuacaoMunicipios = this.municipiosTopDez[0].pontuacao;
      this.color = d3.scaleSequential(["#004D66", "#87DED7"]).domain([this.MAX_PONTUACAO, 0]);
      //this.color = d3.scaleSequential(d3.interpolateBlues).domain([0, this.MAX_PONTUACAO]);
    })
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
