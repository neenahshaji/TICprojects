import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})

export class VieworderComponent implements OnInit{
  id:number;
  customerId:number;
  getordersdata:any;
  constructor(public activatedRoute: ActivatedRoute ,private apiService: ApiService,) {}
  ngOnInit(): void{
      this.id = Number(this.apiService.getOrderId());
      this.customerId = Number(this.apiService.getCustomerId());
      this.apiService.GetOrder(this.customerId, this.id).subscribe((response) => {
        this.getordersdata = response.order;
        console.log('response:', response);
      });
    }
  
  
}
