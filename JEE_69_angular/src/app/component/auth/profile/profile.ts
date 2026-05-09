import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

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
