import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {


  loggedUser: any;
  constructor(
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadRole();
     this.cdr.markForCheck();
  }

  loadRole() {

    const userData = localStorage.getItem('user');
    this.loggedUser = JSON.parse(userData!);
   
    console.log(this.loggedUser);
  }







}
