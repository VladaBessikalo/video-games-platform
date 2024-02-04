import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable() 
    export class HttpHeadersInterceptor implements HttpInterceptor {
        constructor() {
        }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': '8fafebf39amsh9fd5a23c529cdfdp14186fjsne2ef786cdb60',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
            },
            setParams: {
                key: '6fc30d1947c343c7ba4bb507ea7ee9b6'
            }
        });

        return next.handle(req);
    }
    }