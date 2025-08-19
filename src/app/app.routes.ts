import { Routes } from '@angular/router';
import  LoginComponent  from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home',
        loadChildren: () =>
            import('./modules/home/home.routes').then((m) => m.homeRoutes),
    },
];
