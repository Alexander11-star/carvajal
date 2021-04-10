import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CreateUserI, getDocumentI, getUsersI } from '../../models/user.models';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-moduser',
  templateUrl: './moduser.component.html',
  styleUrls: []
})
export class ModuserComponent implements OnInit {


  newUser?: CreateUserI;
  typeuser?: any[''];
  documents?: any[''];
  idUser?: number;
  firstName?: string;
  lastName?: string;
  idDocument?: number;
  type?: string;
  users?: any[''];
  idNumber?: number;
  email?: string;
  password?: string;
  emailRegex?: any;

  nuevoForm = new FormGroup({
    idUser: new FormControl('',Validators.required),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    idDocument: new FormControl('',Validators.required),
    idNumber: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(private api:ApiService, private router:Router,private ActivatedRoute:ActivatedRoute, private toastr: ToastrService) {
        this.ActivatedRoute.params.subscribe( params => {
          let idUser = params['id'];
            this.api.getUserForId(idUser).subscribe((data:any)=>{
            this.idUser = data[0].idUser;
            this.firstName = data[0].firstName;
            this.lastName = data[0].lastName;
            this.idDocument = data[0].idDocument;
            this.type = data[0].type;
            this.idNumber = data[0].idNumber;
            this.email = data[0].email;
            this.email = data[0].email;
          });
      });

      this.getDocument();
      this.getUser();
   }

  ngOnInit(): void {
  }

  viewform(form: CreateUserI){
    if(form.firstName == "" || form.lastName == "" || Number(form.idDocument) == 0 || form.idNumber == 0 
      || form.email == "" || form.password =="" ){     
          this.toastr.warning('Por favor ingrese todos los campos!');   
        }else{
          this.emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
          if(this.emailRegex.test(form.email)){
           this.newUser = ({
             idUser: form.idUser,
             firstName: form.firstName,
             lastName:  form.lastName,
             type: form.type,
             idDocument: Number(form.idDocument),
             idNumber:  form.idNumber,
             email:  form.email,
             password:  form.password
           }); 
           this.api.createUser(this.newUser).subscribe((data:CreateUserI)=>{
             this.toastr.success('Se ha actualizado el usuario correctamente!');  
           setTimeout(() => {
             window.location.reload(); 
            }, 1000);    
         }); 
        }else{
          this.toastr.warning('El correo no tiene formato correcto!');   
        }
    }    
  }

    getDocument(){
      this.api.getDocuments().subscribe((data: getDocumentI) => {
        this.documents = data;
    });
  }

  getUser(){
    this.api.getUser().subscribe((data: getUsersI) => {
      this.users = data;
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
