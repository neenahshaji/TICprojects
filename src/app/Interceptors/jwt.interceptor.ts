import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService, StateService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private stateService:StateService , private ApiService:ApiService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
     request = this.setHeaders(request);
    return next.handle(request);
  }
  
private setHeaders(request: HttpRequest<any>) {
  
    const token = this.ApiService.getToken();
    console.log("token",token)
    if (token) {
      
        request = request.clone({
            setHeaders: {
                'content-type': 'application/json', 
                 Authorization: `Bearer ${token}`
            }
         });
         console.log(request)
    }
    return request;
}
}
