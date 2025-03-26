import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard, AuthGuard } from './guards/auth.guard';
import { HeroComponent } from './components/hero/hero.component';
import { HeroService } from './services/hero.service';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'hero',
        component: HeroComponent,
        canActivate: [AuthGuard],
        providers: [HeroService]
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    }
];
