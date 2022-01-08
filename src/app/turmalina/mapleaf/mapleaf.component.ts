import { AgreementModel } from './../../shared/models/agreement.model';
import { TotalPoints } from './../../shared/models/totalpoints.model';

import { Component, OnInit } from '@angular/core';
import { MapleafService } from './mapleaf.service';
import { FormControl } from '@angular/forms';
import 'leaflet';
import { tap, map, filter, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

declare let L: any;

@Component({
  selector: 'app-mapleaf',
  templateUrl: './mapleaf.component.html',
  styleUrls: ['./mapleaf.component.css']
})

export class MapleafComponent implements OnInit {
  private mapa:any;
  public innerWidth: any;
  municipioCtrl: FormControl = new FormControl;
  results$: Observable<any> | undefined;
  paraibaGeoJson: any;
  erro : any;
  totalpoints!: number;
  agreement!: number;

  async getGeoJsonData (){
    return await this.mapService.getParaibaGeoJson().toPromise();
  }

  // getTotalPoints(){
  //   this.mapService.getTotalPoints('Joao Pessoa', '2021-02-11').subscribe(data=>{
  //     this.agreement = data[0].PlanningInstrument.annualBudgetLaw;
  //     console.log(this.agreement);
  //   })
  // }

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

  // public searchMunicipios(nome: string) {
  //   console.log(nome)
  //   return this.municipios.filter(municipio =>
  //     this.simplificaNomes(municipio.nome).indexOf(this.simplificaNomes(nome)) === 0);
  // }

  // public filterMunicipios(nome: string, _ : any) {
  //   return this.municipios.filter(municipio =>
  //     _.isEqual(this.simplificaNomes(municipio.nome), this.simplificaNomes(nome)));
  // }

  private initMap(): void {

    this.mapa = L.map('map', {
      center: [ -7.1311923, -36.8275259 ],
      zoom: 5,
      maxZoom: 15,
      minZoom: 7.4,
      maxBounds: [
        //south west
        [-8.06, -39.13],
        //north east
        [-6, -34]
        ], 
    });

    this.mapa.createPane('labels');

    // This pane is above markers but below popups
    this.mapa.getPane('labels').style.zIndex = 650;
  
    // Layers in this pane are non-interactive and do not obscure mouse/touch events
    this.mapa.getPane('labels').style.pointerEvents = 'none';
    
    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {

    });

    tiles.addTo(this.mapa);

    const tilesPane =  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      pane: 'labels'
    });
    tilesPane.addTo(this.mapa);
  }

  public mapReady(mapa: L.Map, paraibaGeoJson: any) {
    let info = new L.Control();

    info.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props: { NM_MUNICIP: string; }) {
        // let municipio = props ? this.searchMunicipios(props.NM_MUNICIP): null;
        // console.log(municipio);
        this._div.innerHTML = '<h4>Município da Paraíba</h4>' +  (props ?
            '<b>' + props.NM_MUNICIP + '</b><br />'
            : 'Selecione o município');
    };

    function getColor(d : any) {
      return d >= 100 ? '#00F9FF' :
      d > 80 ? '#1CD0D4' :
      d > 60  ? '#2DB6B9' :
      d > 40   ? '#3D9192' :
      d > 20   ? '#945113' :
      d > 0   ? '#62370F' :
                 '#62370F';
    }

    function style(feature : any) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
          fillColor: getColor(feature.properties.pontuation)
        };
    }
  
    function highlightFeature(e : any) {
        var layer = e.target;
  
        layer.setStyle({
          weight: 3,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7
        });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);

    }

    function resetHighlight(e : any) {
      geojson.resetStyle(e.target);
      info.update();
    }
    
    function zoomToFeature(e: any) {
      mapa.fitBounds(e.target.getBounds());
    }

    const onEachFeature = (feature : any, layer : any) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    };

    let geojson = L.geoJSON(paraibaGeoJson, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(mapa);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 20, 40, 60, 80, 100],
            labels = [];

        div.innerHTML += '<div class="legend_text"><h1> Pontuação </h1></div>';
        var divtext = L.DomUtil.create('div', 'legend_box', div);
        
        for (var i = 0; i < grades.length; i++) {
            divtext.innerHTML +=

            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ?'<br>' : '+');              

        }

        return div;
    };

    var legendData = L.control({position: 'bottomright'});

    legend.addTo(mapa);
    info.addTo(mapa);

    this.innerWidth = (window.innerWidth <= 600);
    this.ajusteMapaResolucao(window.innerWidth);

    this.municipioCtrl.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      tap(value => console.log(value)),
    ).subscribe();
    // this.municipioCtrl.valueChanges.subscribe(val => console.log(val));
  }

  constructor(private http: HttpClient, private mapService: MapleafService) {
  }

  ngOnInit(): void{
    this.initMap();   
    // this.getTotalPoints();
    this.getGeoJsonData().then((data: any) =>{
        this.mapReady(this.mapa, data);
    });

  }

}
