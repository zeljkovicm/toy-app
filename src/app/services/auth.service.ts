import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SignInRequestModel, SignUpRequestModel, AuthResponse } from '../models/auth-model';
import { UserModel } from '../models/user-model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly API_URL = 'http://localhost:8000/auth'

    signIn(credentials: SignInRequestModel): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
            .pipe(
                tap(response => this.saveAuthData(response))
            );
    }

    signUp(userData: SignUpRequestModel): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData)
            .pipe(
                tap(response => this.saveAuthData(response))
            );
    }

    signOut(): void {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
    }

    getToken(): string | null {
        return localStorage.getItem('accessToken')
    }

    getCurrentUser(): UserModel | null {
        const userJson = localStorage.getItem('user')
        return userJson ? JSON.parse(userJson) : null
    }

    isAuthenticated(): boolean {
        return !!this.getToken()
    }

    private saveAuthData(response: AuthResponse): void {
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('user', JSON.stringify(response.user))
    }
}