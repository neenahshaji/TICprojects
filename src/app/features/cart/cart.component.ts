import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ApiService } from 'src/app/services';
import {
  cartItemList,
  CartService,
  Product,
} from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CartComponent implements OnInit {
  products: any;
  details: any;
  rates: any;
  cartItems: cartItemList[] | undefined;
  response: any;
  orderForm: FormGroup;
  placeorder: FormGroup;
  Salesorder: any;
  displayModal: boolean;
  displayyModal: boolean;
  t_gross: number;
  t_net: number;
  total_gross: number;
  getordersdata: any;
  visibleSidebar5: any;
  id: number;
  customerId: number;
  isSpinner: boolean;
  len: number;
  repeatOrderDetails:boolean;
  orderdetail:any;
  orderdetails:any;
  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    if (this.products) {
      this.GrossAmount();
      this.len = this.products.length;
      if (this.len == 0) {
        this.products = null;
      }
    } else {
      this.total_gross = 0;
    }
    this.createFormGroup();

    // this.orderForm = new FormGroup({
    //   address: new FormControl('', Validators.required),
    // });

    this.placeorder = new FormGroup({
      crtaddress: new FormControl(''),
      crtrpoNumber: new FormControl(''),
      crtremarks: new FormControl(''),
    });
    this.repeatOrderDetails = this.cartService.RepeatOrder()
     if(this.repeatOrderDetails)
     {
       this.orderdetail = localStorage.getItem('orderdetails')
       this.orderdetails=JSON.parse(this.orderdetail)
       localStorage.setItem('RepeatOrder',JSON.stringify(false))
     }
  }
  get address() {
    return this.orderForm.get('address')!;
  }

  get poNumber() {
    return this.orderForm.get('poNumber')!;
  }
  createFormGroup() {
    return (this.orderForm = this.fb.group({
      address: ['', [Validators.required]],
      poNumber: ['', [Validators.required]],
      remarks: [],
    }));
  }
  validate() {
    debugger;
    if (this.orderForm.invalid) {
      for (const control of Object.keys(this.orderForm.controls)) {
        this.orderForm.controls[control].markAsTouched();
      }
      return false;
    } else {
      return true;
    }
  }
  removeFromCart(product: Product) {
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
      localStorage.setItem('cartItemList', JSON.stringify(this.products));
    }
    console.log('cartItemList', cartItemList);

    this.products = this.cartService.getProducts();
    if (this.products) {
      this.len = this.products.length;
      if (this.len == 0) {
        this.products = [];
      }
    }
    console.log('this.products', this.products);
  }
  showModalDialog() {
    if (this.orderForm.valid) {

    
    this.displayModal = true;
    }
  }
  GrossAmount() {
    this.t_gross = 0;
    this.t_net = 0;
    this.products.forEach((item) => {
      item.grossAmount = item.qty * item.rate;
      item.netAmount = item.grossAmount - item.discount;
      this.t_gross = this.t_gross + item.grossAmount;
      this.t_net = this.t_net + item.netAmount;
      console.log('item.grossAmount:', this.t_gross);
    });
    localStorage.setItem('cartItemList', JSON.stringify(this.products));
  }
  CreateOrder() {
    if (this.validate()) {
    this.isSpinner = true;
    this.customerId = Number(this.apiService.getCustomerId());
    this.GrossAmount();
    let Salesorder = {
      id: 0,
      customerId: this.customerId,
      customerName: '',
      customerCity: '',
      orderDate: new Date(),
      grossAmount: this.t_gross,
      discount: 0,
      vat: 0,
      netAmount: this.t_net,
      remarks: this.orderForm.value.remarks,
      poNumber: this.orderForm.value.poNumber,
      address: this.orderForm.value.address,
      details: this.products,
    };
    console.log('Salesorder:', Salesorder);
    this.apiService
      .CreateOrderService(this.customerId, Salesorder)
      .subscribe((response) => {
        
        this.response = response;
        console.log(this.response)
        if (response.code == 200) {
          this.displayyModal = true;
          this.displayModal = false;
          this.isSpinner = false;
          this.cartService.Removeall();
        } else {
          console.log('erorr');
          
        }
      });
    localStorage.removeItem('cartItemList');
    console.log('cartItemList', cartItemList);
    this.products = this.cartService.getProducts();
    }
  }
  quantityChange(event, i) {
    this.products[i].qty = event.value;
    console.log('this.products[i].qty :', this.products[i].qty);
    this.GrossAmount();
  }
  // display() {
  //   this.displayyModal = false;
  //   this.visibleSidebar5 = true;
  //   this.id = Number(this.apiService.getOrderId());
  //   this.customerId = Number(this.apiService.getCustomerId());
  //   this.apiService.GetOrder(this.customerId, this.id).subscribe((response) => {
  //     this.getordersdata = response.order;
  //     this.router.navigate(['/vieworder', { ordersdata: this.getordersdata }]);
  //     console.log('response:', response);
  //   });
  // }
  Removeall() {
    localStorage.removeItem('cartItemList');
    this.cartService.Removeall();
    this.products = this.cartService.getProducts();
    console.log('products', this.products);
  }
  confirm1(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure want to remove the item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
        const index = this.products.indexOf(product, 0);
        if (index > -1) {
          this.products.splice(index, 1);
          this.cartService.removeFromCart(index, 1);
          localStorage.setItem('cartItemList', JSON.stringify(this.products));
          this.products = this.cartService.getProducts();
          if (this.products) {
            this.GrossAmount();
            this.len = this.products.length;
            if (this.len == 0) {
              this.products = null;
            }
          }
        }
      },
      reject: (type: any) => {},
    });
  }
}
