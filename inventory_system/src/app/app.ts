import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HaederComponent } from './shared/layout/haeder-component/haeder-component';
import { FooterComponent } from './shared/layout/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HaederComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inventory_system');
}
