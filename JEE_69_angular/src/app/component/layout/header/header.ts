import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {


   loggedUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }




  ngOnInit(): void {

    // Listen for Login/Logout Changes
    this.authService.currentUser$.subscribe({

      next: (user) => {

        this.loggedUser = user;

      }

    });

  }


  logout() {

    this.authService.logoutUser();

    this.router.navigate(['/login']);

  }


}
