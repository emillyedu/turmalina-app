import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { PopupComponent } from './component/popup/popup';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
  ],
  declarations: [
    PopupComponent,
  ],
  exports: [
    PopupComponent,
  ]
})
export class PopupModule {
}