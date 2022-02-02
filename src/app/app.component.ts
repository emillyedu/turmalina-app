import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  public colorString!: string
  toggleNavbar = true;


  constructor(private router: Router) { 
  }

  getRoute(){
    return this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationStart) {
          if(event.url.search("/documentation") != -1){
            this.colorString = "gray";
          }
          else{
            this.colorString = "white";
          }
        }
      }
    )
  }
  ngOnInit(){
    this.getRoute()
  }

  ngAfterViewInit(){
    this.getRoute()
  }
  title = 'turmalina';
}
