import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  serverUrl = 'http://localhost/dev/blogger/';

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService
  ) {}

  loginForm!: FormGroup;
  loginedForm: FormGroup;

  submitted = false;

  ngOnInit() {
    this.createFormGroup();
    this.loginedForm = new FormGroup({
      Email: new FormControl('',  Validators.required),
      password: new FormControl('',Validators.required,Validators.minLength[6]),
    });
    
  }
  createFormGroup() {
    return (this.loginForm = this.fb.group({
      Email: ["", [Validators.required,Validators.email]],
      password: ["", [Validators.required,,Validators.minLength(6),Validators.maxLength(8),]]
   }));
  }
  login() {
    this.apiService
      .Login(this.loginForm.value.Email, this.loginForm.value.password)
      .subscribe((response) => {
        if (response.code !== 200) {
          this.messageService.add({key: 'tl', severity:'error', summary: 'Info', detail: 'Invaild username or password'});
        } else this.router.navigateByUrl('/home');
      });
  }
  get Email() {
    return this.loginForm.get('Email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  validate(){
    debugger
  if (this.loginForm.invalid) {
    for (const control of Object.keys(this.loginForm.controls)) {
      this.loginForm.controls[control].markAsTouched();
    }
    return false;
  } else {
    return true
  }
}

}
// Validators.minLength[6],Validators.maxLength[8]]Validators.email