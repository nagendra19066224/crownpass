import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  plus = faPlus;
  loader: boolean = false;
  tableHeader: string[] = ["email", "type", "region"];
  allData: any[] = [];
  constructor(accountService: AccountService,
  ) {
    this.loader = true
    var regionRef: any = accountService.getAllUser().snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      )
      .subscribe(data => {
        console.log(data)
        this.allData = data;
        this.loader = false
      });
  }

  ngOnInit(): void {
  }

}
