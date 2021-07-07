import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(
    public afs: AngularFirestore,
    public snackBarService: SnackBarService

  ) { }
  public getRegions() {
    return this.afs.collection(`region`);
  }

  public addRegions(regionName: any) {
    return this.afs.collection(`region`).add({
      name: regionName,
      userId: ''
    });
  }
  public addCity(cityName: any, regionId: any, regionName: any) {
    return this.afs.collection(`region`)
      .doc(regionId)
      .collection('city')
      .add({
        name: cityName,
        regionName: regionName,
        regionId: regionId
      });
  }
  public addTown(data: any) {
    return this.afs.collection(`region`)
      .doc(data.regionId)
      .collection('city')
      .doc(data.cityId)
      .collection(`town`).add({
        regionId: data.regionId,
        cityId: data.cityId,
        name: data.townName,
        cityName: data.cityName,
        regionName: data.regionName,
        latitude: data.latitude,
        longitude: data.longitude,
        postalCodes: data.postalCodes
      });
  }

  public getCity(regionId: string | undefined) {
    return this.afs.collection(`region`).doc(regionId).collection("city");
  }
  public getTown(regionId: string | undefined, cityId: string | undefined) {
    return this.afs.collection(`region`).doc(regionId).collection("city").doc(cityId).collection("town");
  }
  public getAllTown() {
    return this.afs.collectionGroup("town");
  }
  public deleteTown(data: any) {
    return this.afs.collection(`region`)
      .doc(data.regionId)
      .valueChanges().pipe(take(1)).subscribe((item: any) => {
        console.log(item)
        if (item.userId != '') {
          this.snackBarService.errorToastr('Region assigned to user. cannot delete');
          return;
        } else {
          return this.afs.collection(`region`)
            .doc(data.regionId)
            .collection(`city`).doc(data.cityId)
            .collection(`town`).doc(data.id).delete()
            .then(result => {
              //********city***** */
              return this.afs.collection(`region`)
                .doc(data.regionId)
                .collection(`city`).doc(data.cityId)
                .collection(`town`)
                .valueChanges().pipe(take(1)).subscribe((town: any) => {
                  console.log('townlength', town)
                  if (town.length !== 0) {
                    this.snackBarService.errorToastr('Town Deleted SuccessFully');
                    return;
                  } else {
                    return this.afs.collection(`region`)
                      .doc(data.regionId)
                      .collection(`city`).doc(data.cityId)
                      .delete()
                      .then(result => {
                        //********region********* */
                        return this.afs.collection(`region`)
                          .doc(data.regionId)
                          .collection(`city`)
                          .valueChanges().pipe(take(1)).subscribe((region: any) => {
                            console.log('regionlength', region)
                            if (region.length !== 0) {
                              this.snackBarService.errorToastr('City and Town Deleted SuccessFully');
                              return;
                            } else {
                              return this.afs.collection(`region`)
                                .doc(data.regionId)
                                .delete()
                                .then(result => {
                                  this.snackBarService.errorToastr('region, City and Town Deleted SuccessFully');
                                })
                            }
                          });
                        //********region******** */
                      })
                  }
                });
              //********city******* */
            })
        }
      });
  }

}
