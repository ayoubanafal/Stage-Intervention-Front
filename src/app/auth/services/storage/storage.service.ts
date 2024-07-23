import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  static saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  static getToken(): string {
    const token = localStorage.getItem(TOKEN);
    return token !== null ? token : '';
    //return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user !== null ? JSON.parse(user) : null;
    //return JSON.parse(localStorage.getItem(USER));
  }
  static getUserRole():string{
    const user =this.getUser();
    if(user==null)
      return '';
    return user.role;
  }
  static isAdminLoggedIn(): boolean {
    if(this.getToken() === null)
      return false;
    const role: string = this.getUserRole();
    return role == "Admin";
  }
  static isRequesterLoggedIn(): boolean {
    if(this.getToken() === null)
      return false;
    const role: string = this.getUserRole();
    return role == "Requester";
  }
  static isTechnicianLoggedIn(): boolean {
    if(this.getToken() === null)
      return false;
    const role: string = this.getUserRole();
    return role == "Technician";
  }
  static getUserId():string{
    const user=this.getUser();
    if(user == null)
      return "";
    return user.id;
  }
  static logout():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
