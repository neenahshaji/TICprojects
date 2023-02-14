import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StateService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private stateService: StateService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let isLoggedIn = this.stateService.isLoggedIn();
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
        }
        return isLoggedIn;
    }
}