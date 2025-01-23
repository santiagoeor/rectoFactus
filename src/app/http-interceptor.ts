import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { TokenJwt } from "./interfaces/jsonTokenJwt.interface";

export class MyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const tokenOb = localStorage.getItem('tokenSysFactus');
        const token: TokenJwt = JSON.parse(tokenOb!);

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `${token.token_type} ${token.access_token}`
                }
            });
        }

        return next.handle(req);
    }
}