import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UsersService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
       .pipe(map(appUser => appUser.isAdmin));
  }
}