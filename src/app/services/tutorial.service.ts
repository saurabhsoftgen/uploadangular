import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
const baseUrl = 'http://localhost/Api/tutorials.php';
const getAllt = 'http://localhost/Api/getAll.php';
const getAllId= 'http://localhost/Api/getAllId.php';
const Delete= 'http://localhost/Api/Delete.php';
const update= 'http://localhost/Api/Update.php';
@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  data:any;
  constructor(private http: HttpClient) { }
  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(getAllt);
  }
  get(id: any): Observable<Tutorial> {
    return this.http.get(`http://localhost/Api/getAllId.php?id=`+id);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl,data,{responseType: 'text'});
    //this.s(data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.post(`http://localhost/Api/Status.php?id=`+id, data,{responseType:'text'});
  }
  updateall(id: any, data: any): Observable<any> {
    return this.http.post(update+'?id='+id, data,{responseType:'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.get(Delete+'?id='+id);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
 
}
