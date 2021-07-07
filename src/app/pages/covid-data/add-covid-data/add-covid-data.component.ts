import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CovidDataService } from '../service/covid-data.service';
@Component({
  selector: 'app-add-covid-data',
  templateUrl: './add-covid-data.component.html',
  styleUrls: ['./add-covid-data.component.scss']
})
export class AddCovidDataComponent implements OnInit {
  form: FormGroup;
  loader: boolean = false;

  constructor(
    public covidDataService: CovidDataService,
    public snackBarService: SnackBarService

  ) {
    this.form = new FormGroup({
      date: new FormControl('', [Validators.required,]),
      totalCases: new FormControl('', [Validators.required]),
      totalTest: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  get f(): any { return this.form.controls; }
  async addCovidData() {
    if (this.form.invalid)
      return;
    this.loader = true;
    let userData: any = await localStorage.getItem('userFullData')
    let response = await this.covidDataService.addCovidData({
      date: this.form.value.date,
      totalCases: this.form.value.totalCases,
      totalTest: this.form.value.totalTest,
      regionId: JSON.parse(userData).regionId,
      regionName: JSON.parse(userData).regionName
    })
    console.log(response)
    this.loader = false;
    this.form.controls['date'].setValue('')
    this.form.controls['totalCases'].setValue('')
    this.form.controls['totalTest'].setValue('')

  }
}
