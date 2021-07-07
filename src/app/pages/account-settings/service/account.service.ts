import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    public afs: AngularFirestore,

  ) { }
  public getUnAssignedRegions() {
    return this.afs.collection(`region`, ref => ref.where('userId', '==', ''))
    ;
  }
  public getAllUser(){
    return this.afs.collection(`users`)
  }
}
