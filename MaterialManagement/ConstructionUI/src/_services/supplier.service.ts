import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Supplier } from '../_models/supplier';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SupplierService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<any>{
        return this.http.get<Supplier[]>(`http://localhost:3000/api/supplier/getAll`);
    } 
    
    get(id:any) : Observable<any>{       
        return this.http.get<Supplier>(`http://localhost:3000/api/supplier/get/${id}`);
    } 

    save(value: any) : Observable<any>{        
        return this.http.post<Supplier[]>(`http://localhost:3000/api/supplier/add`,value);
    }  

    update(value: any, id:any) : Observable<any>{       
        return this.http.put<Supplier[]>(`http://localhost:3000/api/supplier/update/${id}`,value);
    }  

    delete(id:any) : Observable<any>{       
        return this.http.delete<Supplier>(`http://localhost:3000/api/supplier/delete/${id}`);
    } 

}