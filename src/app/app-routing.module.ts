import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { authUsuarioGuard } from './guards/auth-usuario.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'mensajes', component: MensajesComponent, canActivate: [ authUsuarioGuard]},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
