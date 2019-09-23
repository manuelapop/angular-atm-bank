import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from './../../bank.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  errormessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bankService: BankService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.user = new User();
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.user.amountLatest = 0;
    this.user.transactions = [];
    this.errormessage = "";
    this.loading = true;
    this.bankService.saveUser(this.user).subscribe((res) => {
      if (res == true) {
        this.router.navigate(['/login']);
        this.loading = false;
      }
      else {
        this.errormessage = "User Register Error";
        this.loading = false;
      }
    }); 
  }
}
