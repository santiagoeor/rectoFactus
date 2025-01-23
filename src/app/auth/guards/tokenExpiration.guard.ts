import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../services/auth.service";

export const isTokenExpired = (token: string): boolean => {
    const tokenData: any = jwtDecode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return tokenData.exp < currentTimestamp;
}

export const tokenExpirationGuard = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken;
    const tokenExpired = isTokenExpired(token.access_token);

    if (tokenExpired) {
        router.navigate(['/login']);
        return false;
    }

    return true;

}