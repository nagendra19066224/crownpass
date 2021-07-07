import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  subModules: any = [{
    name:'Dashboard',
    route : "/dashboard",
    icon : "fas fa-user"
  },{
    name:'Regions',
    route : "/regions",
    icon : "fas fa-user"
  },{
    name:'Account Settings',
    route : "/account-settings",
    icon : "fas fa-user"
  }]
  constructor(
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }
  activateClass(subModule: any){
    subModule.active = !subModule.active;    
  }
}
