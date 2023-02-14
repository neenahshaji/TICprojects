import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateOrdersRequestModel,
  CreateOrdersResponseModel,
  GetbrandResponseModel,
  GetcategoriesResponseModel,
  getItemRequestModel,
  getItemResponseModel,
  getMyOrdersRequestModel,
  getMyOrdersResponseModel,
  getOrdersRequestModel,
  getOrdersResponseModel,
  LoginRequestModel,
  LoginResponseModel,
} from '../models';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customerId?: string;
  salesOrder: any;
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient, private stateService: StateService) {}

  Login = (email: string, password: string): Observable<LoginResponseModel> => {
    let loginRequest = {
      email: email,
      password: password,
    } as LoginRequestModel;
    return this.http
      .post<LoginResponseModel>(
        `${this.baseURL}api/Customers/Login`,
        loginRequest
      )
      .pipe(
        tap((resp) => {
          console.log('myresponse:', resp);
          if (resp.code === 200) {
            localStorage.setItem('token', resp.token!);
            localStorage.setItem('currentUser', JSON.stringify(resp.customer));
            localStorage.setItem(
              'customerId',
              JSON.stringify(resp.customer?.id)
            );
            this.stateService.customer = resp.customer;
            console.log('customer', this.stateService.customer?.id);
            this.stateService.token = resp.token;
          }
          return resp;
        })
      );
  };

  getToken() {
    return localStorage.getItem('token');
  }

  getCustomerId() {
    return localStorage.getItem('customerId');
  }

  search = (
    CustomerId: number,
    term: string,
    brandId: string,
    categoryId: string,
    offset: number,
    limit: number
  ): Observable<getItemResponseModel> => {
    let getItemRequest = {
      CustomerId: CustomerId,
      term: term,
      brandId: brandId,
      categoryId: categoryId,
      offset: offset,
      limit: limit,
    } as getItemRequestModel;
    return this.http
      .post<getItemResponseModel>(
        `${this.baseURL}api/Master/GetItems`,
        getItemRequest
      )
      .pipe(
        tap((item) => {
          console.log('items:', item);
          // localStorage.setItem('token', resp.token!);
        })
      );
  };
  CreateOrderService = (
    customerId: number,
    salesOrder: any
  ): Observable<CreateOrdersResponseModel> => {
    let CreateOrdersRequest = {
      customerId: customerId,
      salesOrder: salesOrder,
    } as CreateOrdersRequestModel;
    return this.http
      .post<CreateOrdersResponseModel>(
        `${this.baseURL}api/Order/CreateOrder`,
        CreateOrdersRequest
      )
      .pipe(
        tap((respo) => {
          debugger
          if(respo)
          {
          this.salesOrder = respo.salesOrder;
          localStorage.setItem('id', this.salesOrder.id);
          console.log('id:', this.salesOrder.id);
          console.log('respo:', respo);
          }
          else this.salesOrder=null;
        })
      
      );
  };
  getOrderId() {
    return JSON.parse(localStorage.getItem('id')!);
  }
  GetOrder = (
    CustomerId: number,
    id: number
  ): Observable<getOrdersResponseModel> => {
    let getOrdersRequest = {
      customerId: CustomerId,
      id: id,
    } as getOrdersRequestModel;

    return this.http
      .post<getOrdersResponseModel>(
        `${this.baseURL}api/Order/GetOrder`,
        getOrdersRequest
      )

      .pipe(
        tap((item) => {
          console.log("item of order",item);
          
          localStorage.setItem('getorderitems', JSON.stringify(item));
        })
      );
  };
  Getcategories(): Observable<GetcategoriesResponseModel> {
    return this.http
      .get<GetcategoriesResponseModel>(
        `${this.baseURL}api/Master/GetCategories`
      )
      .pipe(
        tap((categories) => {
          localStorage.setItem('categories', JSON.stringify(categories));
          console.log('categories:', categories);
        })
      );
  }
  Getbrands(): Observable<GetbrandResponseModel> {
    return this.http
      .get<GetbrandResponseModel>(`${this.baseURL}api/Master/GetBrands`)
      .pipe(
        tap((brand) => {
          localStorage.setItem('brand', JSON.stringify(brand));
          console.log('Brand:', brand);
        })
      );
  }
  myOrders = (
    CustomerId: number,
    fromDate: string,
    toDate: string,
    offset: number,
    limit: number
  ): Observable<getMyOrdersResponseModel> => {
    let getMyOrdersRequest = {
      CustomerId: CustomerId,
      fromDate: fromDate,
      toDate: toDate,
      offset: offset,
      limit: limit,
    } as getMyOrdersRequestModel;

    return this.http
      .post<getMyOrdersResponseModel>(
        `${this.baseURL}api/Order/GetOrderSummary`,
        getMyOrdersRequest
      )

      .pipe(
        tap((item) => {
          localStorage.setItem('myorderitems', JSON.stringify(item));

          console.log('item:', item);
        })
      );
  };
}
