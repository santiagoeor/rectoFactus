import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { enviroment } from '../../../env/enviroment';
import { TokenJwt } from '../../interfaces/jsonTokenJwt.interface';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private router = inject(Router);

    public isAuthenticated: boolean = false;
    private baseUrl = enviroment.url_api;

    login(credents: Auth): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/oauth/token`, credents)
            .pipe(
                catchError(this.handleError)
            );
    }

    get getToken() {
        const tokenOb = localStorage.getItem('tokenSysFactus');
        const token: TokenJwt | any = JSON.parse(tokenOb!);
        if (token) {
            return token;
        } else {
            this.router.navigate(['./login']);
        }
    }

    logout() {
        localStorage.removeItem('tokenSysFactus');
        this.isAuthenticated = false;
        this.router.navigate(['./login']);
    }


    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error has occurred:', error.error.message);
        } else {
            console.error(`Error code: ${error.status}, ` + `mensaje: ${error.message}`);
        }
        return throwError('Verify your credentials.');
    }

}
