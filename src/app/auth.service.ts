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
    this.afAuth.auth.signOut();
    }

  get appUser$(): Observable<AppUser> {
    console.log(this.user$);
    return this.user$
      .pipe(switchMap((user) => {
        console.log(user)
        if (user) {return this.userService.get(user.uid)};
        return empty();
      }));
  }



}
