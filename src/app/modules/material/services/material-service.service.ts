import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization' , 'Bearer ' + StorageService.getToken()
    )
  }

  getAllMaterials(): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/admin/all" ,
      { headers: this.createAuthorizationHeader()})
  }
  getMaterialById(id:number): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/admin/material/"+id ,
      { headers: this.createAuthorizationHeader()})
  }
  addMaterial(material:any): Observable<any>
  {
    return this.http.post(BASIC_URL + "api/admin/add" , material ,
      { headers: this.createAuthorizationHeader()})
  }
  updateMaterial(material:any,id:number): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/admin/update/"+id , material ,
      { headers: this.createAuthorizationHeader()})
  }
  deleteMaterial(id:number): Observable<any>
  {
    return this.http.delete(BASIC_URL + "api/admin/delete/"+id ,
      { headers: this.createAuthorizationHeader()})
  }
  searchMaterial(title:string): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/admin/search/"+title ,
      { headers: this.createAuthorizationHeader()})
  }
  archiveMaterial(requestId:number,reason:string): Observable<any>
  {
    return this.http.put(BASIC_URL + "api/admin/material/archive/"+requestId,reason,
      { headers: this.createAuthorizationHeader()})
  }
}
