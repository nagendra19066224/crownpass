import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { DashboardService } from '../service/dashboard.service'
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user: any = ''
  localUserData: any = {}
  public lineChartData: ChartDataSets[] = [];
  public lineChartTRPData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    maintainAspectRatio: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(
    dashboardService: DashboardService
  ) {
    let temp = localStorage.getItem('userFullData') || '{}'
    this.localUserData = JSON.parse(temp)
    // this.user = localStorage.getItem('user')
    // console.log(JSON.parse(this.user))
    var regionRef: any = dashboardService.getAllCovidData().snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      )
      .subscribe(data => {
        console.log(data)
        let dataarray: any[] = []
        let dataarraytrp:any[] =[]
        for (let i = 0; i < 14; i++) {
          this.lineChartLabels[14 - (i+1)] = new Date(new Date().setDate(new Date().getDate() - i)).toDateString();
          for (let each of data) {
            if (each.date.toDate().setHours(0,0,0,0)==new Date(new Date().setDate(new Date().getDate() - i)).setHours(0,0,0,0)) {
              const found = dataarray.some(el => el.label === each.regionName);
              if (!found) dataarray.push({ data: [], label: each.regionName });
              let objIndex = dataarray.findIndex((obj => obj.label === each.regionName));

              dataarray[objIndex].data[14-(i+1)] = each.totalCases

              //trp
              const foundtrp = dataarraytrp.some(el => el.label === each.regionName);
              if (!foundtrp) dataarraytrp.push({ data: [], label: each.regionName });
              let objIndextrp = dataarraytrp.findIndex((obj => obj.label === each.regionName));

              dataarraytrp[objIndextrp].data[14-(i+1)] = (each.totalCases/each.totalTest)*100
            }
          }
        }
        this.lineChartData= dataarray;
        this.lineChartTRPData = dataarraytrp
        console.log('***************8', dataarray)
        // this.allData = data;
        // this.loader = false
      });
  }

  ngOnInit(): void {
  }

}
