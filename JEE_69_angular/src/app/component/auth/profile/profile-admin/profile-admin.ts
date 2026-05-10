import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  imports: [],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css',
})
export class ProfileAdmin {

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
