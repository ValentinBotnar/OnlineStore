import { ApiService } from './../../../shared/services/api.service';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

export const AUTH_PROFILE = 'AUTH-PROFILE';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorage
  ) {}
}
