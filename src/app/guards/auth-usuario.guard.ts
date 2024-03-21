import { CanActivateFn, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { inject } from '@angular/core';

export const authUsuarioGuard: CanActivateFn = (route, state) => {

   const wsService = inject(WebsocketService);
   const router = inject(Router);
 
  if (wsService.getUsuario()) {
    return true;  
  } else 
  {
    router.navigateByUrl('/');
    return false;
  }
  
};
