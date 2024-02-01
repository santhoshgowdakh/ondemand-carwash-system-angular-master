import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthenticationResponse } from "../user/AuthenticationResponse";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

   constructor(private router:Router){}
   authenticationResponse!:AuthenticationResponse;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
        if(req.headers.get('No-Auth')=== 'True'){
             return next.handle(req.clone());
        }

     const token: string =this.authenticationResponse.jwt;
      req= this.addToken(req,token)

      return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) =>{
              console.log(err.status);
              if(err.status===401) {
                this.router.navigate(['/login'])
              }else if(err.status===403){
                this.router.navigate(['/forbidden'])
              } 
            return  throwError("something went wrong");
            }
        )
      );
    }

    private addToken(request:HttpRequest<any>,token:any){
        return request.clone(
            {
             setHeaders: {
                Authorization : `Bearer ${token}`
             }   
            }
        );
    }

    
} 