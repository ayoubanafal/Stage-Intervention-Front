import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization' , 'Bearer ' + StorageService.getToken()
    )
  }
  getUsers():Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/users",{
        headers: this.createAuthorizationHeader()
    });
  }
  setAsTechnician(userId:number): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/admin/request/setAsTechnician/"+userId,
      { headers: this.createAuthorizationHeader()})
  }
  setAsRequester(userId:number): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/admin/request/setAsRequester/"+userId,
      { headers: this.createAuthorizationHeader()})
  }
  getUsersT():Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/usersT",{
        headers: this.createAuthorizationHeader()
    });
  }

  searchUsers(name:String):Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/users/"+name,{
        headers: this.createAuthorizationHeader()
    });
  }

  assignRequest(requestId:number,technicianId:string): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/admin/request/"+ requestId +"/"+technicianId ,
      { headers: this.createAuthorizationHeader()})
  }
  
  getAllAvailableRquests(): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/admin/requests" ,
      { headers: this.createAuthorizationHeader()})
  }
  getRequestById(requestId:number): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/admin/request/"+requestId,
      { headers: this.createAuthorizationHeader()})
  }

  updateRequestTechnician(requestId:number,technicianId:number): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/admin/request/"+requestId+"/"+technicianId,
      { headers: this.createAuthorizationHeader()})
  }

  searchRequest(title:string): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/admin/requests/search/"+title ,
      { headers: this.createAuthorizationHeader()})
  } 

}
