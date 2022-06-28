import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  
  //get current user which is current user
  public getCurrentUser(){
    return this.http.get(`${environment.baseUrl}/current-user`);
  }

  //generate Token
public generateToken(loginData:any){

  return this.http.post(`${environment.baseUrl}/generate-token`,loginData)
}

//Login user :set token in local storage
public loginUser(token:any)
{
  localStorage.setItem("token",token);
  return true;
}
//User is login or not
public isLoggedIn(){
  let tokenstr = localStorage.getItem("token")
  if(tokenstr == undefined || tokenstr == ''||tokenstr==null)
  {
    return false;
  }else{
    return true;
  }
}
//Remove token from  localstorage
public logout()
{
  localStorage.removeItem("token");
  return true;
}
//get token 
public gettoken(){
  return localStorage.getItem("token");

}
//set userDeatails
public  setUser(user:any){
  localStorage.setItem("user",JSON.stringify(user));

}
//getuser
public  getUser(){
   let userstr =  localStorage.getItem("user");
  if(userstr!=null){
    return JSON.parse(userstr);
  }else{
    this.logout();
    return  null;
  }
}

//get user role
public getUserRole()
{
  let user = this.getUser();
  return user.authorities[0].authority;
}



}
