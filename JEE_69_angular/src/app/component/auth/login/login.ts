import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';

  password: string = '';


  constructor(
    private authService: AuthService,
    private cdr:ChangeDetectorRef,
    private router: Router
  ) { }


  login() {

    this.authService.getUserByEmail(this.email).subscribe({

      next: (users) => {

        if (users.length > 0) {

          const user = users[0];

          if (user.password === this.password) {

            alert("Login Success");
            this.router.navigate(['/profile']);

            localStorage.setItem('user', JSON.stringify(user));

          } else {
            alert("Invalid Password");
          }
        } else {
          alert("User Not Found");
        }
      },

      error: (err) => {

        console.log(err);

      }

    });

  }








}
