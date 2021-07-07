import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../../shared/services/auth.service";

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean = true;
  @Output() isShowSidebar = new EventEmitter<boolean>();

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public authService: AuthService,
  ) {
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.authService.SignOut()
  }
  public backButton(): void {
    history.back();
  }

}
