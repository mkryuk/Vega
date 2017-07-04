import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { AuthorizeOptions, WebAuth } from 'auth0-js';
import 'rxjs/add/operator/filter';

@Injectable()
export class AuthService {

  private webAuth: WebAuth;
  private roles: string[] = [];

  constructor(public router: Router) {
    this.webAuth = new WebAuth({
      audience: 'https://api.vega.com',
      clientID: 'tmw29cgnYiToVzd2NQ4SFEe1iwAcE64R',
      domain: 'mkryuk.eu.auth0.com',
      redirectUri: 'http://localhost:5000/',
      responseType: 'token id_token',
      scope: 'openid profile email',
    });
  }

  public login(): void {
    const options: AuthorizeOptions = {};
    this.webAuth.authorize(options);
  }

  public handleAuthentication(): void {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getUserProfile();
        this.router.navigate(['/vehicles']);
      } else if (err) {
        this.router.navigate(['/vehicles']);
        // console.log(err);
      }
    });
    this.loadSession();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.roles = [];
    // Go back to the vehicles route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public isInRole(role: string) {
    return this.roles.indexOf(role) > -1;
  }

  private getUserProfile() {
    const accessToken = localStorage.getItem("access_token");
    this.webAuth.client.userInfo(accessToken, (err, profile) => {
      if (!err) {
        localStorage.setItem('profile', JSON.stringify(profile));
      }
    });
  }

  private setRoles(token: string) {
    const jwtHelper = new JwtHelper();
    const decodedToken = jwtHelper.decodeToken(token);
    this.roles = decodedToken['https://vega.com/roles'] || [];
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    this.setRoles(authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  private loadSession(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.setRoles(token);
    }
  }
}
