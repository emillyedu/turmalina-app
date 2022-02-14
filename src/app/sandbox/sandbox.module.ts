import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SandboxComponent } from './sandbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxRoutingModule } from './sandbox-routing.module';


@NgModule({
  declarations: [
    SandboxComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SandboxRoutingModule
  ]
})
export class SandboxModule { }
