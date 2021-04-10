import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from "@angular/router";
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: []
})
export class HeadComponent implements OnInit {
  name: any;
  UserdataComplete: any;

  constructor(private router:Router,public appComponent: AppComponent, private HttpClient: HttpClient, private api:ApiService
    ) {
    this.name =  sessionStorage.getItem("login");
    this.UserdataComplete = sessionStorage.getItem("UserdataComplete");
    console.log(this.UserdataComplete);
   }

  ngOnInit(): void {
  }

  cerrar(){
    this.appComponent.loginfalse();
    this.router.navigate(['login']);
  }

}
