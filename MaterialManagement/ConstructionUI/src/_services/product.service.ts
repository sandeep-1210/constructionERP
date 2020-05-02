import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Product } from '../_models/product';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<any>{
        return this.http.get<Product[]>(`http://localhost:3000/api/product/getAll`);
    } 
    
    get(id:any) : Observable<any>{       
        return this.http.get<Product>(`http://localhost:3000/api/product/get/${id}`);
    } 

    save(value: any) : Observable<any>{        
        return this.http.post<Product[]>(`http://localhost:3000/api/product/add`,value);
    }  

    update(value: any, id:any) : Observable<any>{       
        return this.http.put<Product[]>(`http://localhost:3000/api/product/update/${id}`,value);
    }  

    delete(id:any) : Observable<any>{       
        return this.http.delete<Product>(`http://localhost:3000/api//product/delete/${id}`);
    } 

}