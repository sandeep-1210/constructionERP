import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../_helpers/constant';
import { Supplier } from '../_models/supplier';
import { Observable } from 'rxjs';
const url = `${config.apiUrl}brand`

@Injectable({ providedIn: 'root' })
export class BrandService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<any>{
        console.log(`${url}/getAll`);
        return this.http.get<Supplier[]>(`${url}/getAll`);
    } 
    
    get(id:any) : Observable<any>{       
        return this.http.get<Supplier>(`${url}/get/${id}`);
    } 

    save(value: any) : Observable<any>{        
        return this.http.post<Supplier[]>(`${url}/add`,value);
    }  

    update(value: any, id:any) : Observable<any>{       
        return this.http.put<Supplier[]>(`${url}/update/${id}`,value);
    }  

    delete(id:any) : Observable<any>{       
        return this.http.delete<Supplier>(`${url}/delete/${id}`);
    } 

}