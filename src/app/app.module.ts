import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SandboxComponent } from './sandbox/sandbox.component';
=======
import { FooterComponent } from './footer/footer.component';

>>>>>>> 603e5bcdae6b9cb25dc3b2dec604311cdd2c1ff2

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
=======
    FooterComponent,
>>>>>>> 603e5bcdae6b9cb25dc3b2dec604311cdd2c1ff2
  ],
  imports: [
    NgbCollapseModule,
    SharedModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  exports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
