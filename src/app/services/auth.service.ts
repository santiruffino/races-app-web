import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { User } from '../interfaces/user';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(<string>localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(<string>localStorage.getItem('user'))
      }
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['view-races']);
        });
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      })
  };

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.sendVerificationEmail();
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      })
  }

  sendVerificationEmail() {
    return this.afAuth.currentUser.then(() => {
      this.sendVerificationEmail()
    })
      .then(() => {
        this.router.navigate(['verify-email-address'])
      })
  };

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent. Check your inbox');
      })
      .catch((error) => {
        window.alert(error);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return (user !== null && user.emailVerified);
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
        this.router.navigate(['view-races']);
      })
      .catch((error) => {
        window.alert(error);
      })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {merge: true})
  }

  signOut() {
    return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in'])
      });
  }


}
