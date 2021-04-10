import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticarUserI, CreateUserI } from '../models/user.models';

@Injectable({
    providedIn: 'root'
})

  export class ApiService {

    url:string = "https://localhost:44314"

    constructor(private http:HttpClient) { }
  
    //Loguin Usuario
    authenticateUser(json: AutenticarUserI){
        let direccion = this.url + "/AutenticarUser"
        return this.http.post(direccion,json);
    }

    createUser(json: CreateUserI){
      let direccion = this.url + "/api/User/CreateUser"
      return this.http.post(direccion,json);
    }

    getUser(){
      let direccion = this.url + "/api/User/getUsers"
      return this.http.get(direccion);
    }

    getDocuments(){
      let direccion = this.url + "/api/User/getDocuments"
      return this.http.get(direccion);
    }

    getUserForId(idUser: number){
      let direccion = this.url + "/api/User/getUser/"
      return this.http.get(`${direccion}${idUser}`)
    }

    deleteUser(pidUser:number){
      let direccion = this.url + "/api/User/DeleteUsers/"
      return this.http.delete(`${direccion}${pidUser}`);
    }

  }