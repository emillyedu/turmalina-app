import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioComponent } from './relatorio.component';


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
    RelatorioRoutingModule
  ],
  bootstrap: [
    RelatorioComponent
  ]
})
export class RelatorioModule { }
