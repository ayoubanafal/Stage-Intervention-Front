import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class RequesterService {
  
  constructor(private http: HttpClient) { }///change is needed

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization' , 'Bearer ' + StorageService.getToken()
    )
  }

  postRequest(requestDto:any): Observable<any>
  {
    return this.http.post(BASIC_URL + "api/requester/request" , requestDto ,
      { headers: this.createAuthorizationHeader()})
  }
  getAllRquests(): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/requester/requests" ,
      { headers: this.createAuthorizationHeader()})
  }
  deleteRequest(requestId:number): Observable<any>
  {
    return this.http.delete(BASIC_URL + "api/requester/request/" + requestId,
      { headers: this.createAuthorizationHeader()})
  }
  getRequestById(requestId:number): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/requester/request/" + requestId,
      { headers: this.createAuthorizationHeader()})
  }
  updateRequest(requestId:number,requestDto:any): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/requester/request/"+requestId , requestDto ,
      { headers: this.createAuthorizationHeader()})
  }
  searchRequest(title:string): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/requester/requests/search/"+title ,
      { headers: this.createAuthorizationHeader()})
  }
}
