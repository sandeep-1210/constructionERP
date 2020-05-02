import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Customer } from '../_models/customer';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<any>{
        return this.http.get<Customer[]>(`http://localhost:3000/api/customer/getAll`);
    } 
    
    get(id:any) : Observable<any>{       
        return this.http.get<Customer>(`http://localhost:3000/api/customer/get/${id}`);
    } 

    getbyMobile(id:any) : Observable<any>{       
        return this.http.get<Customer>(`http://localhost:3000/api/customer/getbyMobile/${id}`);
    } 

    save(value: any) : Observable<any>{        
        return this.http.post<Customer[]>(`http://localhost:3000/api/customer/add`,value);
    }  

    update(value: any, id:any) : Observable<any>{       
        return this.http.put<Customer[]>(`http://localhost:3000/api/customer/update/${id}`,value);
    }  

    delete(id:any) : Observable<any>{       
        return this.http.delete<Customer>(`http://localhost:3000/api/customer/delete/${id}`);
    } 

}