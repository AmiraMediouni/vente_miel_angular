import { Component } from '@angular/core';
import { UserAuthService } from '../_services/userAuth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  constructor(private userAuthService:UserAuthService){}
  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

}
