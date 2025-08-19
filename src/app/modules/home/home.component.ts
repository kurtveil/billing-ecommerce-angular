import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
    { name: 'Ecommerce', route: 'send' },
    { name: 'About me', route: 'drafts' }
  ];
  protected readonly isMobile = signal(true);
  public user: User = {
    picture: '',
    username: '',
    password: '',
    email: '',
    name: '',
  };

  constructor(
    public router: Router,
    public sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
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
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}') as User;
      console.log(this.user);
    }

  }

  signOut() {
    this.sharedService.logout();
    this.router.navigate(['/login']);
  }
}
