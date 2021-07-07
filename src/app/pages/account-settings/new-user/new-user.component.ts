import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AccountService } from '../service/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  public form: FormGroup;
  regionList: any[] = [];
  loader: boolean = false;
  constructor(
    accountService: AccountService,
    public authService: AuthService,
    public snackBarService: SnackBarService

  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
    });
    this.loader = true
    var regionRef: any = accountService.getUnAssignedRegions().snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      )
      .subscribe(data => {
        console.log(data)
        this.regionList = data;
        this.loader = false
      });
  }

  ngOnInit(): void {
  }
  get f(): any { return this.form.controls; }
  async addUser() {
    if (this.form.invalid)
      return;
    this.loader = true
    await this.authService.SignUp(this.form.value.email,
      this.form.value.password,
      this.form.value.region)
      this.form.controls['email'].setValue('')
      this.form.controls['password'].setValue('')
      this.form.controls['region'].setValue('')

    this.loader = false
  }
}
