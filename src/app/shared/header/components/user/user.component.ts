import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  localUserData: any = localStorage.getItem('userFullData') || '{}'
  public user: any = {
    name: JSON.parse(this.localUserData).email?(JSON.parse(this.localUserData).email.substring(0,
      JSON.parse(this.localUserData).email.lastIndexOf("@"))):''
  };
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  public signOutEmit(): void {
    this.signOut.emit();
  }
}
