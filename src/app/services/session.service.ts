import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  private authStatus = new BehaviorSubject<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  public authStatus$ = this.authStatus.asObservable();

  constructor() {
  }

  public GetAuthToken(): Observable<boolean> {
    let loggedOn = this.isSessionValid()
    console.log("Get auth ejecutado, logged on: ", loggedOn);
    return of(loggedOn);
  }

  // Replace expiration with token
  public AuthUser(): boolean {
    let now = new Date();
    now.setMinutes(now.getMinutes() + 30); // 30 minutes to expire

    if (!this.isBrowser) {
      return false;
    }

    localStorage.clear();
    localStorage.setItem('sessionExpire', now.toString());

    return true;
  }

  // Session expire mock (correct usage should check API call for token expiration)
  private isSessionValid(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    let sessionExpireTime = localStorage.getItem('sessionExpire');

    if (!sessionExpireTime) {
      return false;
    }

    let expirationTime = new Date(sessionExpireTime);
    let now = new Date();

    if (now < expirationTime) {
      return true;
    }
    else {
      return false;
    }
  }
}
