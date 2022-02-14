import { FormGroup } from '@angular/forms';
import { User } from './../shared/models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SandboxService {

  public sandboxUrl:string = 'https://turmalina-api.herokuapp.com/turmalina_sandbox' 
  public registerRequests$: BehaviorSubject<number>;
  constructor(private http: HttpClient) {
    this.registerRequests$ = new BehaviorSubject<number>(0);
  } 

  register(user : FormGroup): any{

    // let body: any = new HttpParams();
    // body = body.append('start_urls', user.start_urls);
    // body = body.append('receiver_address', user.receiver_address);

    let body = JSON.stringify(user.value) 
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post('https://turmalina-api.herokuapp.com/turmalina_sandbox', body, httpOptions).subscribe(res=>{
        console.log(res);
    });
  }
}

