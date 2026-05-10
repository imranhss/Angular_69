import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../model/student.model';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-student',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-student.html',
  styleUrl: './list-student.css',
})
export class ListStudent implements OnInit {


  students: StudentModel[] = [];
  loggedUser: any = null;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  
  ) { }


  ngOnInit(): void {
    this.loadAllStudent();

    this.authService.currentUser$.subscribe({

      next: (user) => {

        this.loggedUser = user;

      }

    });

  }

  loadAllStudent() {
    this.studentService.getAllStudents().subscribe(

      {
        next: (data) => {
          this.students = data;
          this.cdr.markForCheck();
          console.log(this.students);
        },

        error: (err) => {
          console.log(err);
        }
      }
    );
  }


  remove(id: string) {
    this.studentService.deleteStudent(id).subscribe(
      {
        next: () => {
          console.log("Success");
          
          this.loadAllStudent();

        },
        error: (err) => {
          console.log(err);

        }

      }

    );

  }




}
