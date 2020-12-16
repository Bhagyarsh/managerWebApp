import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = {
    "token":  "",
    "user": "",
    "expires": "",
  }
  userDatalist = [] 
  
  constructor() { }

  setuserdata(expires:string,user:string,token:string){
    this.userData.expires = expires;
    this.userData.user = user;
    this.userData.token = token ;
  }
  getuserdata(){
    return this.userData
  }
  getusertoken(){
    return this.userData.token
  }
  isuser(){
    if (this.userData.user === "")
      return false;
    return true;
  }
  logdata(){
    console.log(this.userData)
  }
}
