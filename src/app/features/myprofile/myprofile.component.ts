import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  items!: MenuItem[];

  constructor(private cartService: CartService, private router: Router) {}

  details: any;

  ngOnInit(): void {
    this.details = this.cartService.getDetails();

    this.items = [
      {
        items: [
          {
            label: 'My Profile',

            icon: 'pi pi-user',

            routerLink: '/myprofile',
          },
          {
            label: 'My Orders',

            icon: 'pi pi-shopping-bag',

            routerLink: '/myorders',
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
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('customerId');
    this.router.navigateByUrl('/login');
  }
}
