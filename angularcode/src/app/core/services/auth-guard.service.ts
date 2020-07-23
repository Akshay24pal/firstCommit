import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private _router: Router) { }

  /*Check Routing states*/
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (state.url === '/login' || state.url === '/reset-password' || state.url === '/create-agent-profile' || state.url === '/register' || state.url.includes('/change-password')) {
      if (this.isLoggedIn()) {
        this._router.navigate(["dashboard"]);
        return true;
      }
    } else {
      if (this.isLoggedIn()) {
        return true;
      } else {
        this._router.navigate(["login"]);
        return false;
      }
    }
    return true;
  }

  /*Check user is authorized or not*/
  isLoggedIn(): boolean {
    let token = localStorage.getItem('token')
    if (token) {
      return true;
    } else {
      return false;
    }
  }

}
