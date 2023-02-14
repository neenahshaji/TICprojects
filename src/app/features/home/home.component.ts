import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MenuItem,
  Message,
  MessageService,
  PrimeNGConfig,
  SelectItemGroup,
} from 'primeng/api';
import { ApiService, StateService } from 'src/app/services';
import { CartService, Product } from 'src/app/services/cart.service';
import * as _ from 'lodash';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  visibleSidebar1: boolean = true;
  searchInput: string;
  selectedBoxes: string[] = [];
  selectBoxes: string[] = [];
  searchdata: any;
  displayData: any[] = [];
  dodata: any[] = [];
  branddetails: any;
  branditem: any;
  showbrand: any;
  demo: any;
  group: SelectItemGroup[];
  categoriesdetails: any;
  selectedbrand: string;
  selectedcategorie: string;
  items: MenuItem[];
  items2: MenuItem[];
  displayModal: boolean;
  addItem: FormGroup;
  selecteditem: any;
  selectedCategory: any = null;
  rates: any;
  rateitem: number;
  selectedproduct: any;
  grossAmount: number;
  netAmount: number;
  ob: any;
  cartpop: boolean = false;
  products: any;
  len: number;
  customerId: number;
  uomCodes: string[] = [];
  filterdByBrand: any;
  uomCode: string;
  dodataa: any[] = [];
  initialSearchData: any[] = [];
  categorydodata: never[];
  product: any;
  select: any;
  stock: number;
  total_qty: number;
  msgs: Message[];
  offsetNo:number= 0;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private stateService: StateService,
    private cartService: CartService,
    public fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    if (this.products) {
      this.len = this.products.length;
      if (this.len == 0) {
        this.cartpop = true;
      }
    } else {
      this.cartpop = true;
    }
    this.items2 = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
    ];

    this.primengConfig.ripple = true;
    this.items = [
      {
        items: [
          {
            label: 'My Profile',

            icon: 'pi pi-user',

            routerLink: '/myprofile',
          },

          {
            label: 'Logout',

            icon: 'pi pi-power-off',

            command: () => {
              this.logout();
            },
          },

          {
            label: ' ',

            icon: ' ',
          },
        ],
      },
    ];

    this.createFormGroup();
    this.apiService.Getbrands().subscribe((Response) => {
      this.branddetails = Response.brands;
      // this.branddetails=this.branddetails.splice(1,);
      console.log('this.branddetails:', this.branddetails);
    });

    this.apiService.Getcategories().subscribe((Response) => {
      this.categoriesdetails = Response.categories;
      console.log('this.categoriesdetails:', this.categoriesdetails);
    });
    this.apiService.search(0, '', '', '', this.offsetNo, 25).subscribe((response) => {
      this.searchdata = response.items;
      this.displayData = this.searchdata;
      this.initialSearchData = this.searchdata;
    });
  }
  clearFilter() {
    this.searchInput = '';
    this.apiService.search(0, '', '', '', 1, 100).subscribe((response) => {
      this.searchdata = response.items;
      this.displayData = this.searchdata;
    });
  }

  keyPress(event) {
    debugger;
    if (this.searchInput && this.searchInput.length >= 3) {
      this.apiService
        .search(0, this.searchInput, '', '', 0, 100)
        .subscribe((response) => {
          this.searchdata = response.items;
          this.displayData = this.searchdata;
        });
      // console.log("this.displayData1",this.displayData)
    }
    if (this.selectBoxes) {
      this.dodata = [];
      this.selectBoxes.forEach((element) => {
        var res = this.searchdata.filter((x) => x.brandId == element);
        console.log('res:', res);
        if (res.length >= 1) {
          this.dodata = this.dodata.concat(res);
        }
      });
      this.filterdByBrand = this.dodata;
    }
    if (this.selectedBoxes) {
      this.dodataa = [];
      this.selectedBoxes.forEach((element) => {
        console.log('this.filterdByBrand', this.filterdByBrand);
        var res = this.filterdByBrand.filter((x) => x.categoryId == element);
        if (res.length >= 1) {
          this.dodataa = this.dodataa.concat(res);
        }
      });
      this.displayData = this.dodataa;
    }
    //     this.dodata=[];
    //     this.selectBoxes.forEach((element) => {
    //       console.log("element",element);
    //       var res = this.displayData.filter((x) => x.brandId == element);
    //       if (res.length >= 1) {
    //         this.dodata = this.dodata.concat(res);
    //         console.log("this.dodata",this.dodata);

    //       }
    //     });
    //     this.displayData = this.dodata;
    //   console.log("this.displayData",this.displayData)
    // }

    if (!this.searchInput) {
      this.apiService.search(0, '', '', '', 1, 100).subscribe((response) => {
        this.searchdata = response.items;
        this.displayData = this.searchdata;
      });
    }
  }
  showModalDialog(product) {
    this.selecteditem = product;
    this.uomCodes = [];
    this.rates = this.selecteditem.rates;
    this.rates.forEach((element: { uomCode: any }) => {
      this.uomCode = element.uomCode;
      this.uomCodes.push(this.uomCode);
      this.selectedCategory = this.uomCodes[0];
      console.log('this.uomCodes', this.uomCodes);
    });
    this.displayModal = true;
  }
  show() {
    this.msgs.push({
      severity: 'info',
      summary: 'Info Message',
      detail: 'PrimeNG rocks',
    });
  }
  addToCart() {
    debugger;
    
    this.stock = this.selecteditem.stock;
    if (this.validate()) {
      var itemAvailble = this.checkItemExist(this.selecteditem['partNumber'],this.stock );
      if (itemAvailble == true) 
      {

        
        console.log('again added');
      } 
      else 
      {
        if (this.addItem.value.Quantity < this.stock) 
        {
          this.rates = this.selecteditem.rates;
          console.log('this.rates:', this.rates);
          let obj = {
            itemCode: this.selecteditem['partNumber'],
            itemName: this.selecteditem['description'],
            qty: this.addItem.value.Quantity,
            rate: 0,
            grossAmount: 0,
            discount: 0,
            vat: 0,
            netAmount: 0,
            uom: this.selectedCategory,
          };
          this.ob = this.rates.find((x) => x.uomCode.trim() == obj.uom.trim());
          console.log('this.ob:', this.ob);
          obj.rate = this.ob.rate;
          obj.grossAmount = obj.rate * obj.qty;
          obj.netAmount = obj.grossAmount - obj.discount;
          console.log('ob', this.ob);
          console.log('obj:', obj);
          this.displayModal = false;
          this.addItem.controls['Quantity'].reset();
          this.addItem.controls['myRadio'].reset();
          this.cartService.addtoCart(obj);
          this.cartpop = false;
          this.products = this.cartService.getProducts();
          this.len = this.products.length;
        } else {
          this.addItem.controls['Quantity'].reset();
          this.addItem.controls['myRadio'].reset();
          this.messageService.add({key: 'tl', severity:'error', summary: 'Info', detail: 'Out of stock'});
          
        }
      }
    }
  }
  checkItemExist(partNumber,stock) {
    var itemAvailble = false;
    this.products = this.cartService.getProducts();
    if (this.products != null) {
      this.products.forEach((item) => {
        if (item.itemCode == partNumber) {
          this.total_qty = item.qty + this.addItem.value.Quantity;
          if (stock > this.total_qty) {
            item.qty = this.total_qty;
            localStorage.setItem('cartItemList', JSON.stringify(this.products));
            itemAvailble = true;
            this.addItem.controls['Quantity'].reset();
            this.addItem.controls['myRadio'].reset();
            this.displayModal = false;
          } else {
            itemAvailble = true;
            this.addItem.controls['Quantity'].reset();
            this.addItem.controls['myRadio'].reset();
            this.messageService.add({key: 'tl', severity:'error', summary: 'Info', detail: 'Out of stock'});
            }
        } 
        else {
          itemAvailble = false;
        }
      });
    }
    return itemAvailble;
  }

  logout() {
    localStorage.removeItem('token');

    localStorage.removeItem('currentUser');

    localStorage.removeItem('customerId');

    this.router.navigateByUrl('/login');
  }
  GetBrand(event: any) {
    var res = this.searchdata.filter((x) => x.brandId == event);
    return res;
  }
  GetCategorie(event: any) {
    var res = this.searchdata.filter((x) => x.categoryId == event);
    return res;
  }

  searchByData(event: any, searchType) {
    if (searchType == 'search') {
      debugger;
      if (this.searchInput && this.searchInput.length >= 3) {
        this.apiService
          .search(0, this.searchInput, '', '', this.offsetNo, 25)
          .subscribe((response) => {
            this.searchdata = response.items;
            let currentDisplayData = _.cloneDeep(this.displayData);
            if (currentDisplayData.length && this.searchdata.length)
              this.displayData = this.searchdata.filter((o) =>
                currentDisplayData.some(
                  ({ partNumber }) => o.partNumber != partNumber
                )
              );
            else this.displayData = this.searchdata;
            if (this.selectBoxes.length > 0 || this.selectedBoxes.length > 0) {
              var brandData = [];
              var categoryData = [];
              this.selectBoxes.map((item) => {
                if (_.findIndex(this.branddetails, ['brandId', item]) != -1)
                  brandData = brandData.concat(
                    this.searchdata.filter((x) => x.brandId == item)
                  );
                else
                  categoryData = categoryData.concat(
                    this.searchdata.filter((x) => x.categoryId == item)
                  );
              });
              if (brandData.length>0 && categoryData.length>0)
                this.displayData = _.intersection(brandData, categoryData);
              else if (brandData.length) this.displayData = brandData;
              else this.displayData = categoryData;
            }
          });
        this.initialSearchData = this.searchdata;
      }
      else if (this.searchInput  && this.selectBoxes.length ==0 && this.selectedBoxes.length ==0) {
        this.apiService.search(0, this.searchInput, '', '', this.offsetNo, 25).subscribe((response) => {
          this.searchdata = response.items;
          this.displayData = this.searchdata;
        });
      }
      else if(!this.searchInput && this.selectBoxes.length == 0 && this.selectedBoxes.length == 0){
        this.apiService.search(0, '', '', '', this.offsetNo, 25).subscribe((response) => {
          this.searchdata = response.items;
          this.displayData = this.searchdata;
        });
      }
    }
  }
  searchByBrand(event: any, category: string) {
    if (this.selectBoxes.length > 0 || this.selectedBoxes.length > 0) {
      var brandData = [];
      var categoryData = [];
      debugger;
      event.checked.map((item) => {
        if (_.findIndex(this.branddetails, ['brandId', item]) != -1)
          brandData = brandData.concat(
            this.searchdata.filter((x) => x.brandId == item)
          );
        else
          categoryData = categoryData.concat(
            this.searchdata.filter((x) => x.categoryId == item)
          );
      });
      if (brandData.length && categoryData.length) {
        this.displayData = _.intersection(brandData, categoryData);
        console.log("this.displayData",this.displayData)
      } else if (brandData.length) {
        this.displayData = brandData;
        console.log("this.displayData1",this.displayData)
      } else {
        this.displayData = categoryData;
        console.log("this.displayData2",this.displayData)
      }
    } 
    else if (this.selectBoxes.length == 0 && this.selectedBoxes.length == 0 && this.searchInput) {
      this.apiService.search(0, this.searchInput, '', '', this.offsetNo, 25).subscribe((response) => {
        this.searchdata = response.items;
        this.displayData = this.searchdata;
        console.log("this.displayData3",this.displayData)
      });
    }
    else if (this.selectBoxes.length == 0 && this.selectedBoxes.length == 0 && !this.searchInput) {
      this.apiService.search(0, '', '', '', this.offsetNo, 25).subscribe((response) => {
        this.searchdata = response.items;
        this.displayData = this.searchdata;
        console.log("this.displayData3",this.displayData)
      });
    }
  }
  get Quantity() {
    return this.addItem.get('Quantity')!;
  }

  get myRadio() {
    return this.addItem.get('myRadio')!;
  }

  createFormGroup() {
    return (this.addItem = this.fb.group({
      Quantity: ['', [Validators.required]],
      myRadio: ['', [Validators.required]],
    }));
  }

  validate() {
    debugger;
    if (this.addItem.invalid) {
      for (const control of Object.keys(this.addItem.controls)) {
        this.addItem.controls[control].markAsTouched();
      }
      return false;
    } else {
      return true;
    }
  }


  onScroll(event): void {
    debugger; 
    // this.offsetNo = ++this.offsetNo;
    let searchType;
    if (this.searchInput) {
      searchType = this.searchInput
    } else {
      searchType = "";
    }
    var brandData = [];
    var categoryData = [];
    if (this.selectBoxes.length == 0 && this.selectedBoxes.length == 0){
      this.apiService
      .search(0, searchType, '', '', ++this.offsetNo, 25)
      .subscribe((response) => {
        this.searchdata = response.items; 
        this.displayData = this.displayData.concat(...this.searchdata);
      // console.log("this.displayData ", this.displayData);
      });
    }

    // this.searchByData("",'search');


}
}
