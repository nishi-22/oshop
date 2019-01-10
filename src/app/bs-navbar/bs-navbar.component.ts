import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
      this.router.navigate(['/login']);
  }
}
