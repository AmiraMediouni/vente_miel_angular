import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './userAuth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  public register(registerData: any){
    return this.httpclient.post(this.PATH_OF_API + '/users/registerNewUser', registerData);
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/users/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/users/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any):boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
          }
        }
      }
    }
    return isMatch;
  }
}