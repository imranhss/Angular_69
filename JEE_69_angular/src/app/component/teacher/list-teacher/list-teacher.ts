import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeacherModel } from '../../../model/teacher.model';
import { TeacherService } from '../../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DepartmentModel } from '../../../model/department.model';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-list-teacher',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-teacher.html',
  styleUrl: './list-teacher.css',
})
export class ListTeacher implements OnInit {

  teachers: TeacherModel[] = [];
  isLoading: boolean = true;
  departments: DepartmentModel[] = [];


  constructor(
    private teacherService: TeacherService,
    private cdr: ChangeDetectorRef,
    private depService: DepartmentService
  ) { }


  ngOnInit(): void {
    this.loadAllTeacher();
    this.loadAllDep();
  }


  loadAllTeacher() {
    this.teacherService.getAllTeacher().subscribe(

      {
        next: (data) => {
          this.teachers = data;
          this.isLoading = false;
          this.cdr.markForCheck();
          console.log(this.teachers);
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      }
    );
  }


  remove(id: string) {
    this.teacherService.delete(id).subscribe(
      {
        next: () => {
          console.log("Success");

          this.loadAllTeacher();

        },
        error: (err) => {
          console.log(err);

        }

      }

    );

  }

  // Get Department Name
  getDepartmentName(depId: string): string {

    const dep = this.departments.find(d => d.id == depId);

    return dep ? dep.name : 'No Department';

  }

  loadAllDep() {
    this.depService.getAllDep().subscribe(
      {
        next: (pk) => {
          this.departments = pk;
          this.cdr.markForCheck();
          console.log(pk);

        },
        error: (err) => {
          console.log(err);

        }

      }
    );

  }



}
