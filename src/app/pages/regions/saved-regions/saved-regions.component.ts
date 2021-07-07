import { Component, Inject, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { RegionsService } from '../services/regions.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-saved-regions',
  templateUrl: './saved-regions.component.html',
  styleUrls: ['./saved-regions.component.scss']
})
export class SavedRegionsComponent implements OnInit {
  plus = faPlus;
  tableHeader: string[] = ["region", "city", "town", "latitude", "longitude", "postalCodes", "delete"];
  purchases = []
  allData: any[] = [];
  loader: boolean;
  trash = faTrash;
  constructor(
    public regionsService: RegionsService,
    public dialog: MatDialog
  ) {
    this.loader = true
    var regionRef: any = this.regionsService.getAllTown().snapshotChanges()
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
  delete(data: any) {
    // console.log(data)
    var covidDataRef: any = this.regionsService.deleteTown(data)
  }
  // Delete confirmation popup invoking fn
  openDeleteDialog(e: any): any {
    console.log(e)
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: e
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
