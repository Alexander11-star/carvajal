import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { AppComponent } from 'src/app/app.component';
import { AutenticarUserI, AutenticarUserResponseI } from '../../models/user.models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  atenticateData?: AutenticarUserI;
  login: any;
  name?: any;
  valido?: any;
  sesion:any = "admin.parcial";

  isUserLoggedIn:any;
  nuevoForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
});

  constructor(private http: HttpClient, private router:Router, private toastr: ToastrService,
     private api:ApiService, private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  viewform(e: AutenticarUserI){
    this.atenticateData = ({
     email: e.email,
     password: e.password
   });
    this.api.authenticateUser(this.atenticateData).subscribe((data: AutenticarUserResponseI)=>{ 
       this.name = data.nombreCompleto;
       this.valido =  data.valido;
       if(this.valido){
         this.appComponent.logintrue(data);   
         this.sesion = sessionStorage.setItem("login", this.name); 
         this.router.navigate(['/home']); 
       }
     else{
        this.toastr.warning('Los datos ingresados no son correctos!');   
        }     
   }, (error: any) => {
    this.toastr.warning(error.status + ' - ' + error.error.errors.Email + ' - ' +  error.error.errors.password );   
   })
   ;
  }
}


