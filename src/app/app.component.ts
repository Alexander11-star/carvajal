import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AutenticarUserI, AutenticarUserResponseI } from './models/user.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carvajal';
  login: any;
  sesion:any;
  name?: any;
  Userdata?: any;
  idUser?: any;

  UserdataComplete?: any;
  constructor( public router: ActivatedRoute) {
    this.sesion =  sessionStorage.getItem("login");
    this.UserdataComplete = sessionStorage.getItem("UserdataComplete");
}


logintrue(data:AutenticarUserResponseI){
  this.name = data.nombreCompleto;
  this.Userdata = data.email;
  sessionStorage.setItem("login", this.name);
  sessionStorage.setItem("UserdataComplete", this.Userdata);
  sessionStorage.setItem("idUser", this.idUser);
  this.sesion = sessionStorage.getItem("login");
  this.UserdataComplete = sessionStorage.getItem("UserdataComplete");
 // this.reload();
}

loginfalse(){
  this.sesion = sessionStorage.removeItem("login");
  //this.reload();
}


}
