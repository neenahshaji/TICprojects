import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface Product {
  brandId: string;
  categoryId: string;
  description: string;
  partNumber: string;
  rates?: rate[];
  stock: number;
  quantity:number;
  selectedUom:string;
}
export interface rate {
  uomCode: string;
  rate: number;
  discountPercent1: number;
  discountPercent2: number;
  discountPercent3: number;
  discountPercent4: number;
  discountPercent5: number;
  qtyBreak1: number;
  qtyBreak2: number;
  qtyBreak3: number;
  qtyBreak4: number;
  qtyBreak5: number;
  unitPrice1: number;
  unitPrice2: number;
  unitPrice3: number;
  unitPrice4: number;
  unitPrice5: number;
}

export class cartItemList {
  public item: Product | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];

  public data: any;

  public datas: any;

  detail: any;

  details: any;

  public productList = new BehaviorSubject<any>([]);

  constructor() {}

  addtoCart(product: any) {
    this.cartItemList.push(product);

    this.productList.next(this.cartItemList);

    console.log('cartItemList', this.cartItemList);

    localStorage.setItem('cartItemList', JSON.stringify(this.cartItemList));
  }
  

  getProducts() {
    this.data = localStorage.getItem('cartItemList');

    this.datas = JSON.parse(this.data);

    return this.datas;
  }
  getDetails() {
    this.detail = localStorage.getItem('currentUser');

    this.details = JSON.parse(this.detail);

    return this.details;
  }
  Removeall() {
    this.cartItemList=[];
   }
  removeFromCart(index1 : number,index2 :number){
       this.cartItemList.splice(index1, index2);
     }
  RepeatOrder() {
       this.data = localStorage.getItem('RepeatOrder');
       this.datas = JSON.parse(this.data)
        return this.datas
      }
}
