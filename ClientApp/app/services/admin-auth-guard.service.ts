import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuardService extends AuthGuardService {
  constructor(authService: AuthService) {
    super(authService);
  }
  public canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthenticated = super.canActivate(route, state);
    return isAuthenticated ? this.auth.isInRole("Admin") : false;
  }


}
