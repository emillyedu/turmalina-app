import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RankRoutingModule } from './rank-routing.module';
import { RankComponent } from './rank.component';


@NgModule({
  declarations: [
    RankComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RankRoutingModule
  ]
})
export class RankModule { }
