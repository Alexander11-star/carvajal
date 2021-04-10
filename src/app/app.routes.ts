import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeadComponent } from './components/head/head.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './components/user/user.component';
import { ModuserComponent } from './components/moduser/moduser.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes =[
  { path: 'login', component: LoginComponent },
  { path: 'head', component: HeadComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'user', component: UserComponent },
  { path: 'updateUser/:id', component: ModuserComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true});
