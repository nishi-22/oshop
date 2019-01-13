import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, empty} from 'rxjs';
import * as firebase from 'firebase';
import {ActivatedRoute} from '@angular/router';
import {AppUser} from './models/app-user';
import {switchMap} from 'rxjs/operators';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable <firebase.User > ;
  constructor(private userService: UsersService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;

  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl );
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    localStorage.removeItem('cartId');
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return empty();
      }));
  }


}



