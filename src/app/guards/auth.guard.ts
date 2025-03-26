import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterOutlet, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SessionService);
  return authService.GetAuthToken();
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: SessionService) {}

  canActivate(): Observable<boolean> {
    return this.authService.GetAuthToken().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}