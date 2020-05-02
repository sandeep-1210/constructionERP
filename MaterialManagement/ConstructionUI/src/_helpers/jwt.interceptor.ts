import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../_models/user';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private authenticationService: AuthenticationService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}