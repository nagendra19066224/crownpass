import { Component } from '@angular/core';
import {
  faBarcode,
  faTruckMoving,
  faReceipt,
  faHome,
  faArrowRight,
  faFileAlt,
  faMapMarkerAlt,
  faParachuteBox,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public isOpenUiElements = false;
  modules: any[] = [];
  icons: any[] = [{
    name: 'mapMarker',
    icon: faMapMarkerAlt,
  }, {
    name: 'receipt',
    icon: faReceipt,
  }, {
    name: 'truckMoving',
    icon: faTruckMoving,
  }, {
    name: 'barcode',
    icon: faBarcode,
  }, {
    name: 'fileAlt',
    icon: faFileAlt,
  }, {
    name: 'parachuteBox',
    icon: faParachuteBox,
  }];
  arrowRight = faArrowRight;
  home = faHome;
  mapMarker = faMapMarkerAlt;
  receipt = faReceipt;
  truckMoving = faTruckMoving;
  barcode = faBarcode;
  fileAlt = faFileAlt;
  parachuteBox = faParachuteBox;
  user: any;

  constructor() {
    this.modules = [];
    this.user = localStorage.getItem('userFullData');
    let parsedUserData = JSON.parse(this.user || '{}')
    console.log(JSON.parse(this.user) || '{}')
    if (parsedUserData?.regionId) {
      this.modules.push({
        icon: 'fileAlt',
        path: 'covid-data',
        name: 'Covid Data'
      })
    }
    if (parsedUserData?.userType == 'admin')  {
      this.modules.push({
        icon: 'mapMarker',
        path: 'regions',
        name: 'Region'
      }, {
        icon: 'receipt',
        path: 'account-settings',
        name: 'Account Settings'
      })
    }
  }

  public openUiElements(): any {
    this.isOpenUiElements = !this.isOpenUiElements;
  }

  getIcon(icon: any): any {
    return this.icons.find(eachIcon => eachIcon.name === icon).icon;
  }
}
