import { ApiService } from './../../../shared/services/api.service';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Confirmation } from '../types/confirmation.type';
import { Observable } from 'rxjs';
import { User, Credentials } from '../types/user.type';
import { AuthenticationProfile } from '../types/auth-profile.type';
import { environment } from 'src/environments/environment';

export const AUTH_PROFILE = 'AUTH-PROFILE';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorage
  ) {}

  // not used
  signin({ email }: Credentials): Observable<AuthenticationProfile> {
    return this.apiService.post(`${environment.baseUrl}/auth/signin`, {
      email,
    });
  }

  signup({
    name,
    surname,
    address,
    postalCode,
    email,
    city,
  }: User): Observable<AuthenticationProfile> {
    return this.apiService.post(`${environment.baseUrl}/auth/signup`, {
      name,
      surname,
      address,
      postalCode,
      email,
      city
    });
  }

  checkSignupKey(confirmation: Confirmation): Observable<any> {
    return this.apiService.post(
      `${environment.baseUrl}/auth/signup/check/${confirmation.token}`,
      { ...confirmation }
    );
  }

  checkSigninKey(
    confirmation: Confirmation
  ): Observable<AuthenticationProfile> {
    return this.apiService.get(
      `${environment.baseUrl}/auth/signin/check/${confirmation.token}`
    );
  } 

  logout(): void {
    this.localStorage.removeItem('AUTH-PROFILE').subscribe();
  }
}
