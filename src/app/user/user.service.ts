import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserModel } from './user.model';
import { AuthenticationRequest } from './AuthenticationRequest';
import { AuthenticationResponse } from './AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  logIn(authenticationRequest:AuthenticationRequest):Observable<AuthenticationResponse>{
   
    return this.http.post<AuthenticationResponse>('http://localhost:8909/authenticate', authenticationRequest)
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get('http://localhost:8086/user/id/'+userId);
  }

  getUserList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:8086/user/list');
  }

  saveUserList(model: any) {
    return this.http.post('http://localhost:8086/user/save', model);
  }

  saveEditedData(model: any) {
    return this.http.put('http://localhost:8086/user/update', model);
  }

  deleteSelectedUser(id: any) {
    return this.http.delete('http://localhost:8086/user/delete/' + id);

  }
}
