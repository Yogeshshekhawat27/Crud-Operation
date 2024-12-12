import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http: HttpClient) { }

// create data
  addEmploye(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/employes",data)
  
  }
// fetch data
getallemploye():Observable<any>{
  return this.http.get("http://localhost:3000/employes")
}


// delete data
deleteEmployee(id:any):Observable<any>{
  return this.http.delete(`http://localhost:3000/employes/${id}`)
}

// update data
updateEmp(id:number , data:any):Observable<any>{
  return this.http.put(`http://localhost:3000/employes/${id}`,data)
}
}