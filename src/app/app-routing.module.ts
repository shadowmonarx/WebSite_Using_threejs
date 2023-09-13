import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'adduser/:source', component: AdduserComponent }, // Dynamic route parameter


  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  { 
    path: 'welcome', 
    component: WelcomeComponent 
  },
  { 
    path: '**',
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
