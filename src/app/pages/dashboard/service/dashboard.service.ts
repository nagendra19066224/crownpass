import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    public afs: AngularFirestore,
  ) { }
  public getAllCovidData() {
    return this.afs.collectionGroup("covidData");
  }
}
