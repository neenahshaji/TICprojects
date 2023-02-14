import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-myorders',

  templateUrl: './myorders.component.html',

  styleUrls: ['./myorders.component.scss'],
})
export class MyordersComponent implements OnInit {
  displayData: any[] = [];
  myordersdata: any;
  ordersdata: any;
  Dateform!: FormGroup;
  visibleSidebar5: any;
  details: any;
  rate: any;
  Salesorder: any;
  displayyModal!: boolean;
  id: number;
  customerId: number;
  response: any;
  tdate: any;
  isShowOrder: boolean;
  products:any;
  product:any;
  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.Dateform = new FormGroup({
      st_date1: new FormControl('', Validators.required),
      st_date2: new FormControl('', Validators.required),
    });
    this.customerId = Number(this.apiService.getCustomerId());
    this.tdate = new Date();
    this.apiService
      .myOrders(this.customerId, '2022-10-14', this.tdate, 8, 100)
      .subscribe((response) => {
        this.myordersdata = response.summary;
        console.log('myordersdata', this.myordersdata);
      });
  }

  Summary() {
    this.customerId = Number(this.apiService.getCustomerId());
    this.apiService
      .myOrders(
        this.customerId,
        this.Dateform.value.st_date1,
        this.Dateform.value.st_date2,
        8,
        100
      )
      .subscribe((response) => {
        this.myordersdata = response.summary;
        console.log('myordersdata', this.myordersdata);
      });
  }

  OrderDetails(id: number) {
    this.visibleSidebar5 = true;
    this.isShowOrder = true;
    this.customerId = Number(this.apiService.getCustomerId());
    this.apiService.GetOrder(this.customerId, id).subscribe((response) => {
      this.ordersdata = response.order;
      console.log('this.getordersdata', this.ordersdata);
    });
  }
  checkItemExist(partNumber,qty){ 
    debugger
     var itemAvailble = 0;
     var isItemAvailable =false
     this.products = this.cartService.getProducts();
     if (this.products != null) {
      this.products.forEach((item)=>{
         if(!isItemAvailable) {
           debugger
         if (item.itemCode == partNumber) {
           debugger
           item.qty=item.qty+qty;
           this.cartService.cartItemList = this.products
           localStorage.setItem('cartItemList', JSON.stringify(this.products));
           itemAvailble =  item.qty;
           isItemAvailable = true;
          
         } else {
           itemAvailble = 0
         }
        }
       })
     }
     console.log("carItem",this.products);
     return itemAvailble;
   }
 
  ShowOrder() {
    if (this.isShowOrder == true) {
      this.isShowOrder = false;
    } else {
      this.router.navigateByUrl('/home');
    }
  }
  RepeatOrder() {
    
  
    this.ordersdata.details.forEach((item: any) => {
      this.product=this.checkItemExist(item['itemCode'],item['qty'])
      console.log("item",item);
      
    if(this.product >= 1){
      console.log("sucess")
    } else{
      this.cartService.addtoCart(item);
    }
    });
    localStorage.setItem('orderdetails',JSON.stringify(this.ordersdata))
    localStorage.setItem('RepeatOrder',JSON.stringify(true))
  }

  display() {
    this.displayyModal = false;
    this.visibleSidebar5 = true;
    this.id = Number(this.apiService.getOrderId());
    this.customerId = Number(this.apiService.getCustomerId());
    this.apiService.GetOrder(this.customerId, this.id).subscribe((response) => {
      this.ordersdata = response.order;
      console.log('response:', response);
    });
  }
}
