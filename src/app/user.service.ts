import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {user} from './user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7174/api/User/get';

  private postUri ="https://localhost:7174/api/User/post";

  private deleteUrl = "https://localhost:7174/api/User"

  constructor(private http: HttpClient) { }

  getUser():Observable<user[]>{
    return this.http.get<user[]>(`${this.apiUrl}`)
  }

  createUser(user: user): Observable<any> {
    return this.http.post<user>(this.postUri, user);
  }

  deleteUser(userId : number):Observable<any>{
    const url = `${this.deleteUrl}/${userId}`;
    return this.http.delete(url);
  }
}
