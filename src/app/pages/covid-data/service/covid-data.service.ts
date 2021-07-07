import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(
    public afs: AngularFirestore,
    public snackBarService: SnackBarService

  ) { }
  public addCovidData(data: any) {
    return this.afs.collection(`region`)
      .doc(data.regionId)
      .collection('covidData',
        ref => ref.where('date', '==', data.date)).valueChanges().pipe(take(1)).subscribe(item => {
          console.log(item)
          if (item.length) {
            this.snackBarService.errorToastr('Data already exists for the date');
            return;
          } else {
            this.afs.collection(`region`)
              .doc(data.regionId)
              .collection('covidData')
              .add({
                date: data.date,
                totalCases: data.totalCases,
                totalTest: data.totalTest,
                regionId: data.regionId,
                regionName: data.regionName
              }).then(result => {
                this.snackBarService.successToastr('Covid Data Added SuccessFully');
                return;
              })
          }
        });
  }
  public getAllCovidData(regionId: string) {
    return this.afs.collection(`region`)
      .doc(regionId)
      .collection('covidData', ref => ref.orderBy('date'))
  }
  public deleteCovidData(regionId: string, covidDataId: string) {
    return this.afs.collection(`region`)
      .doc(regionId)
      .collection('covidData')
      .doc(covidDataId).delete()
      .then(result => {
        this.snackBarService.successToastr('Covid Data Deleted SuccessFully');
        return;
      })

  }
}
