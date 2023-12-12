import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UrlshortnerComponent } from './urlshortner/urlshortner.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'signUp',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent  
  },
  {
    path: 'urlshortner',
    component: UrlshortnerComponent  
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
