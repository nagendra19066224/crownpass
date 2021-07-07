import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase';
import { EmailValidator } from '@angular/forms';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public snackBarService: SnackBarService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  // Sign in with email/password
  async SignIn(email: any, password: any) {
    console.log(email, password)
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async (result: any) => {
        console.log('test')
        await this.getUserData(result.user.uid)
        // this.ngZone.run(() => {
        //   this.router.navigate(['dashboard']);
        // });
        // this.SetUserData(result.user);
      }).catch((error) => {
        this.snackBarService.errorToastr(error.message);
      })
  }

  // Sign up with email/password
  SignUp(email: any, password: any, region: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user, region);
        var regionRef = this.afs.collection(`region`).doc(region.id)
        regionRef.update({
          userId: result.user.uid
        })
        this.snackBarService.successToastr('User Added SuccessFully');
      }).catch((error) => {
        this.snackBarService.errorToastr(error.message);
      })
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.then(u => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User, region: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: true,
      regionId: region.id,
      regionName: region.name,
      userType: 'user'
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  getUserData(uid: any) {
    console.log(uid)
    this.afs.collection(`users`).doc(uid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(item => {
        console.log('fjgifjgdji', item)
        localStorage.setItem('userFullData', JSON.stringify(item || {}))
        this.router.navigate(['dashboard']);
        // If you prefer including itemId back to object
        // return {...item, id: docId}
      });
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userFullData')
      this.router.navigate(['login']);
    })
  }

}
