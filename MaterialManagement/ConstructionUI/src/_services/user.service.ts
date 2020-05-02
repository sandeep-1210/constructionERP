import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { User } from '../_models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<any>{
        return this.http.get<User[]>(`http://localhost:3000/api/user/list`);
    }    

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}