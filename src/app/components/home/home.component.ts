import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  login: any;
  constructor(private ActivatedRoute:ActivatedRoute) {

    this.ActivatedRoute.params.subscribe( params =>{
        if( window.localStorage )
        {
          if( !localStorage.getItem('firstLoad') )
          {
            localStorage['firstLoad'] = true;
            this.login = localStorage['firstLoad'] ;
             window.location.reload();        
            // this.router.navigate(['home']);
          }  
          else{
            localStorage.removeItem('firstLoad');
          }
        }
      
    })  
    
  }

  ngOnInit(): void {
  }



}
