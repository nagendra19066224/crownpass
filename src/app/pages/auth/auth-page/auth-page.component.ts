import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public todayDate: Date = new Date();
  public form: FormGroup;
  public username: string = '';
  public password: string = '';
  public stayLoggedIn = false;
  time: string ;
  disable: boolean = false;

  constructor(
    public authService: AuthService,
    ) { 
    this.form = new FormGroup({
      username: new FormControl(this.username, [Validators.required]),
      password: new FormControl(this.password, [Validators.required]),
      stayLoggedIn: new FormControl(this.stayLoggedIn)
    });
    let hour = new Date().getHours()
    if (hour < 12) {
      this.time = 'Morning'
    } else if (hour < 18) {
      this.time = 'Afternoon'
    } else {
      this.time = 'Evening'
    }
    console.log(hour, this.time)
  }

  ngOnInit(): void {
  }
  async submit(){
    this.disable =true;
    await this.authService.SignIn(this.form.value.username, this.form.value.password);
    this.disable = false
  }

}
