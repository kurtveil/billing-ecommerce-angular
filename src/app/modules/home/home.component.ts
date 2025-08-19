import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../core/services/shared.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  protected readonly fillerNav = [
    { name: 'Products', route: "/home/products" },
    { name: 'Transacciones', route: "/home/transactions" },
    { name: 'Send email', route: 'send' },
    { name: 'Drafts', route: 'drafts' }
  ];
  protected readonly isMobile = signal(true);
  public user!: User;
  constructor(
    public router: Router,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.user$.subscribe(user => {
      if (user) {
        // this.user.picture = user.picture;
        console.log('Usuario en Home:', user.picture);
      } else {
        console.log('No hay usuario autenticado');
      }
    });
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}') as User;
    console.log(this.user);
    
  }

  signOut() {
    this.sharedService.logout();
    this.router.navigate(['/login']);
  }
}
