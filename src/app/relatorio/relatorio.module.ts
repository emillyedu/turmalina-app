import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioComponent } from './relatorio.component';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RelatorioComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    RelatorioRoutingModule
  ],
  bootstrap: [
    RelatorioComponent
  ],
  providers: [
    MapleafService
  ]
})
export class RelatorioModule { }
