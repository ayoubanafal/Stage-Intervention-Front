import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization' , 'Bearer ' + StorageService.getToken()
    )
  }

  getAllAvailableRquests(): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/technician/requests" ,
      { headers: this.createAuthorizationHeader()})
  }
  getAllClaimedRquests(technicianId:string): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/technician/requests/"+technicianId ,
      { headers: this.createAuthorizationHeader()})
  }
  searchRequest(title:string): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/technician/requests/search/"+title ,
      { headers: this.createAuthorizationHeader()})
  } 
  getRequestByIdT(requestId:number): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/technician/requestById/" + requestId,
      { headers: this.createAuthorizationHeader()})
  }
  updateRequestStatus(requestId:number,status:string): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/technician/request/update/"+requestId+"/"+status,
      { headers: this.createAuthorizationHeader()})
  }
  archiveRequest(requestId:number): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/technician/request/archive/"+requestId,
      { headers: this.createAuthorizationHeader()})
  }
  generatePDF(requestId: number): Observable<Blob> {
    return this.http.get(BASIC_URL + "api/technician/report/" + requestId, {
      headers: this.createAuthorizationHeader(),
      responseType: 'blob' // This is important to handle binary data
    });
  }
  
  // Comment-related methods
  getCommentsByRequestId(requestId: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/comments/request/" + requestId, {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(comment: { userId: number, requestId: number, text: string, creationDate: Date }): Observable<any> {
    return this.http.post(BASIC_URL + "api/comments/add", comment, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateComment(commentId: number, text: string): Observable<any> {
    return this.http.put(BASIC_URL + "api/comments/" + commentId, { text }, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(BASIC_URL + "api/comments/" + commentId, {
      headers: this.createAuthorizationHeader()
    });
  }
  ///////////////////////////////////////////////////////////////
  claimRequest(requestId:number,technicianId:string): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/technician/request/"+ requestId +"/"+technicianId ,
      { headers: this.createAuthorizationHeader()})
  }
  // UnClaimRequest(requestId:number): Observable<any>
  // {
  //   return this.http.put(BASIC_URL + "api/technician/request/"+ requestId ,
  //     { headers: this.createAuthorizationHeader()})
  // }
}
