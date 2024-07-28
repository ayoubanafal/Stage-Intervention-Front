import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';


const BASE_URL= "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest: any):Observable<any> {
    return this.http.post(BASE_URL +"api/auth/signup", signupRequest);
  }

  login(loginRequest: any):Observable<any> {
    return this.http.post(BASE_URL +"api/auth/login", loginRequest);
  }
//////////////////////////////////////////////////////////////////////////////////profile

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization' , 'Bearer ' + StorageService.getToken()
    )
  }
  getUserById(userId:number): Observable<any>
  {
    return this.http.get(BASE_URL + "api/user/user/" + userId,
      { headers: this.createAuthorizationHeader()})
  }
  updateUser(userId:number,signupRequest: any): Observable<any>
  {
    return this.http.post(BASE_URL + "api/user/update/" + userId,signupRequest,
      { headers: this.createAuthorizationHeader()})
  }

}
