import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../model/department.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

private departmentAPI = environment.apiUrl+"department";

constructor(
  private http: HttpClient
){}

// get Request 
getAllDep(): Observable<DepartmentModel[]>{
  return this.http.get<DepartmentModel[]>(this.departmentAPI);
}


// Post Request
  save(dep: DepartmentModel) {
    return this.http.post<DepartmentModel>(this.departmentAPI, dep);
  }


  // put request
  update(dep: DepartmentModel): Observable<DepartmentModel> {

    return this.http.put<DepartmentModel>(this.departmentAPI + '/' + dep.id, dep);

  }


  // delete request
  delete(id: string): Observable<void> {

    return this.http.delete<void>(this.departmentAPI + '/' + id)

  }


  getById(id: string): Observable<DepartmentModel> {

     return this.http.get<DepartmentModel>(this.departmentAPI+'/'+id);

  }


}
