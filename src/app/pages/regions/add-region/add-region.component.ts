import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { RegionsService } from '../services/regions.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit {
  public form: FormGroup;
  regionList: any = [];
  cityList: any = [];
  loader: boolean = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  postalCodes: any[] = [ ];
  constructor(
    public afs: AngularFirestore,
    public regionsService: RegionsService,
    public snackBarService: SnackBarService
  ) {
    this.form = new FormGroup({
      region: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
    });
    this.form.controls.region.valueChanges.subscribe(async value => {
      console.log('gidfjgi')
      this.form.controls['city'].setValue('')
      this.form.controls['town'].setValue('')
      this.form.controls['latitude'].setValue('')
      this.form.controls['longitude'].setValue('')
      this.postalCodes = []
    });
    this.form.controls.city.valueChanges.subscribe(async value => {
      this.form.controls['town'].setValue('')
      this.form.controls['latitude'].setValue('')
      this.form.controls['longitude'].setValue('')
      this.postalCodes = []

    });
    this.getRegionList();
  }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    console.log(event)
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.postalCodes.push( value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  remove(postalcode: any): void {
    const index = this.postalCodes.indexOf(postalcode);

    if (index >= 0) {
      this.postalCodes.splice(index, 1);
    }
  }
  async getRegionList() {
    // this.regionList = await this.afs.collection('items').valueChanges();
    // console.log(this.regionList)
    this.loader = true
    var regionRef: any = this.regionsService.getRegions().snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      )
      .subscribe(data => {
        this.regionList = data;
        this.loader = false
      });
  }
  get f(): any { return this.form.controls; }
  async onRegionSelect(event: any) {
    console.log(event)
    this.loader = true
    this.regionsService.getCity(event.option.value.id).snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      )
      .subscribe(data => {
        this.cityList = data;
        console.log(this.regionList)
      });
    this.loader = false
  }
  async addRegion(): Promise<any> {
    if (this.form.invalid)
      return;
    this.loader = true;

    let regionId;
    let cityId;

    //add region
    if (typeof this.form.value.region == 'string') {
      var regionRef: any = await this.regionsService.addRegions(this.form.value.region);
      regionId = regionRef.id;
    } else {
      if (this.form.value.region.id)
        regionId = this.form.value.region.id
    }
    //add city
    if (typeof this.form.value.city == 'string') {
      var cityRef: any = await this.regionsService.addCity(
        this.form.value.city,
        regionId,
        typeof this.form.value.region == 'string' ? this.form.value.region : this.form.value.region.name
      );
      cityId = cityRef.id;
    } else {
      if (this.form.value.city.id)
        cityId = this.form.value.city.id
      console.log("selected City")
    }

    //add town
    if (typeof this.form.value.town == 'string') {
      var cityRef: any = await this.regionsService.addTown({
        townName: this.form.value.town,
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
        postalCodes: this.postalCodes,
        cityId: cityId,
        regionId: regionId,
        cityName: typeof this.form.value.city == 'string' ? this.form.value.city : this.form.value.city.name,
        regionName: typeof this.form.value.region == 'string' ? this.form.value.region : this.form.value.region.name,
      })
    }
    this.loader = false
    this.snackBarService.successToastr('Region Added SuccessFully');
  }
  autoCompleteDiplay(item: any) {
    return item ? item.name : '';
  }
}
