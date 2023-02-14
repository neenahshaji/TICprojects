import { Injectable } from "@angular/core";
import { CustomerModel } from "../models";

@Injectable({
    providedIn:'root'
})
export class StateService {
    public token? : string;
    public customer? : CustomerModel;

    public isLoggedIn = () => !(this.token === undefined || this.token === '');
    
}