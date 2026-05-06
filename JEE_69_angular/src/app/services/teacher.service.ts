import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherModel } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {


  
private teacherAPI = environment.apiUrl+"teacher";

constructor(
  private http: HttpClient
){}

// get Request 
getAllTeacher(): Observable<TeacherModel[]>{
  return this.http.get<TeacherModel[]>(this.teacherAPI);
}


// Post Request
  save(dep: TeacherModel) {
    return this.http.post<TeacherModel>(this.teacherAPI, dep);
  }


  // put request
  update(dep: TeacherModel): Observable<TeacherModel> {

    return this.http.put<TeacherModel>(this.teacherAPI + '/' + dep.id, dep);

  }


  // delete request
  delete(id: string): Observable<void> {

    return this.http.delete<void>(this.teacherAPI + '/' + id)

  }


  getById(id: string): Observable<TeacherModel> {

     return this.http.get<TeacherModel>(this.teacherAPI+'/'+id);

  }



}
