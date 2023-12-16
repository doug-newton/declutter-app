import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.token$.pipe(
            first(),
            switchMap(token => {
                const authRequest = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                })
                return next.handle(authRequest)
            })
        )
    }
}