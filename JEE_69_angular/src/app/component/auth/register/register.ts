import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../model/users.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  user: UserModel = {

    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    role: ''

  };

  previewImage: string = '';

  constructor(
    private authService: AuthService,
    private cdr:ChangeDetectorRef
  ) { }


  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {

        this.previewImage = reader.result as string;

        this.user.image = this.previewImage;
        this.cdr.markForCheck();

      };

      reader.readAsDataURL(file);

    }

  }

  saveUser() {

    this.user.role= "Teacher";

    this.authService.save(this.user).subscribe({

      next: (res) => {

        alert("Registration Success");

        console.log(res);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }





}
