import { Component } from '@angular/core';
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: 'nav-menu',
  styleUrls: ['./navmenu.component.css'],
  templateUrl: './navmenu.component.html',
})
export class NavMenuComponent {

  constructor(private auth: AuthService) {
    this.auth.handleAuthentication();
  }
}
