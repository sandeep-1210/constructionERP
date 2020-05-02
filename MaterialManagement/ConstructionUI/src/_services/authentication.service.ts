import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { config } from '../_helpers/constant';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // constructor(private httpClient: HttpClient) {
    // }
    private router: Router;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        const value = this.currentUserSubject.value;
        return value;
    }

    login(username, password): Observable<any> {
       
        const data = { username: username, password: password }
        data: User
        return this.httpClient.post<any>('http://localhost:3000/api/auth/login', data)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    user.loginUser = username;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    var d = new Date();
                    var month = d.getMonth();
                    localStorage.setItem('currentMonth', JSON.stringify(month));
                }
                return user;
            }))
            .pipe(catchError(error =>
                of(`Bad Promise Login Failed : ${error}`)
            ))
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentMonth');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}