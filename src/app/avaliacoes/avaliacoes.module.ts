import { MomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvaliacoesRoutingModule } from './avaliacoes-routing.module';
import { AvaliacoesComponent } from './avaliacoes.component';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from './datepicker-formats';

import _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@NgModule({
  declarations: [
    AvaliacoesComponent
  ],
  imports: [
    MatNativeDateModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    AvaliacoesRoutingModule
  ],
  bootstrap: [
    AvaliacoesComponent
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS  },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    MapleafService
  ]
})

export class AvaliacoesModule { }
