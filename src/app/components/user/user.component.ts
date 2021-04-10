import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CreateUserI,getUsersI,getDocumentI } from '../../models/user.models';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  newUser?: CreateUserI;
  users?: any[''];
  documents?: any[''];
  emailRegex?: any;

  nuevoForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    idDocument: new FormControl('',Validators.required),
    idNumber: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(private api:ApiService, private router:Router, private toastr: ToastrService) {

    this.getUser();
    this.getDocument();
   }

  ngOnInit(): void {
  }

  viewform(form: CreateUserI){
    if(form.firstName == "" || form.lastName == "" || Number(form.idDocument) == 0 || form.idNumber == 0 
      || form.email == "" || form.password == ""){
        this.toastr.warning('Por favor ingrese todos los campos!');     
         }else{
          this.emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
          if(this.emailRegex.test(form.email)){
            this.newUser = ({
              firstName: form.firstName,
              lastName:  form.lastName,
              idDocument: Number(form.idDocument),
              idNumber:  form.idNumber,
              email:  form.email,
              password:  form.password
            }); 
            this.api.createUser(this.newUser).subscribe((data:CreateUserI)=>{
              this.toastr.success('Se ha creado el usuario correctamente!');  
            setTimeout(() => {
              window.location.reload(); 
             }, 1000);    
          })
        }else{
          this.toastr.warning('El correo no tiene formato correcto!');   
        }
    }    
  }

  updateUser(idx:number){
    Number(idx);
    this.router.navigate(['/updateUser', idx]);
  }

  getUser(){
      this.api.getUser().subscribe((data: getUsersI) => {
        this.users = data;
    });
  }

  getDocument(){
    this.api.getDocuments().subscribe((data: getDocumentI) => {
      this.documents = data;
    });
  }

  deleteUser(pidUser: number){
    this.api.deleteUser(pidUser).subscribe((data:any)=>{
      this.toastr.info('El usuario fue Eliminado!');  
      setTimeout(() => {
        window.location.reload(); 
       }, 1000); 
    });
  }
}
