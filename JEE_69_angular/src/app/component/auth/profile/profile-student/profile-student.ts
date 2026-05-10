import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-student',
  imports: [],
  templateUrl: './profile-student.html',
  styleUrl: './profile-student.css',
})
export class ProfileStudent {


  loggedUser: any;

  constructor(
    private router: Router

  ) {

  }


  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {

    const userData = localStorage.getItem('user');

    console.log(userData)

    if (userData) {

      this.loggedUser = JSON.parse(userData);

    } else {

      this.router.navigate(['/login']);

    }

  }


  logout() {

    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }




}
