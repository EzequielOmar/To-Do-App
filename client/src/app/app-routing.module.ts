import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthenticatedGuardService } from './guards/redirectUnauthenticated';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [redirectUnauthenticatedGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
