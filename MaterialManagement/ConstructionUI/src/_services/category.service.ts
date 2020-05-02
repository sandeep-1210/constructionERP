import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Category } from '../_models/Category';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<any>{
        return this.http.get<Category[]>(`http://localhost:3000/api/category/getAll`);
    } 
    
    get(id:any) : Observable<any>{       
        return this.http.get<Category>(`http://localhost:3000/api/category/get/${id}`);
    } 

    save(value: any) : Observable<any>{        
        return this.http.post<Category[]>(`http://localhost:3000/api/category/add`,value);
    }  

    update(value: any, id:any) : Observable<any>{       
        return this.http.put<Category[]>(`http://localhost:3000/api/category/update/${id}`,value);
    }  

    delete(id:any) : Observable<any>{       
        return this.http.delete<Category>(`http://localhost:3000/api/category/delete/${id}`);
    } 

}