import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { CovidDataService } from '../service/covid-data.service';


@Component({
  selector: 'app-list-covid-data',
  templateUrl: './list-covid-data.component.html',
  styleUrls: ['./list-covid-data.component.scss']
})
export class ListCovidDataComponent implements OnInit {
  plus = faPlus;
  trash = faTrash
  loader: boolean = false;
  tableHeader: string[] = ["date", "totalCases", "totalTest", 'delete'];
  allData: any[] = [];
  localUserData: any;

  constructor(
    public covidDataService: CovidDataService,
    public dialog: MatDialog
  ) {
    this.loader = true
    let temp = localStorage.getItem('userFullData') || '{}'
    this.localUserData = JSON.parse(temp)

    var covidDataRef: any = covidDataService.getAllCovidData(this.localUserData.regionId).snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map(c =>
          ({
            id: c.payload.doc.id, ...c.payload.doc.data(),
            date: new Date(c.payload.doc.data().date.toDate()).toDateString()
          })
          )
        )
      )
      .subscribe((data: any[]) => {
        console.log(data)
        this.allData = data;
        this.loader = false
      });
  }

  delete(data: any) {
    // console.log(data)
    var covidDataRef: any = this.covidDataService.deleteCovidData(this.localUserData.regionId, data)
  }
  // Delete confirmation popup invoking fn
  openDeleteDialog(e: any): any {
    console.log(e)
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: e.date, id: e.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.delete(result);
      }
    });
  }
  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

