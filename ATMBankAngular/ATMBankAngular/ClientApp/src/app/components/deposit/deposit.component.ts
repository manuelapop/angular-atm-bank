import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from './../../bank.service';
import { User } from './../../models/user';

const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html'
})
export class DepositComponent implements OnInit {

  depositForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  errormessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService
  ) {
  }

  ngOnInit() {
    this.depositForm = this.formBuilder.group({
      deposit: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.depositForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.depositForm.invalid) {
      return;
    }
    this.loading = true;
    this.errormessage = "";
    this.user = new User();
    this.user.amountLatest = this.depositForm.value.deposit;
    this.bankService.deposit(this.user).subscribe((res) => {
      if (res == true) {
        this.loading = false;
        this.errormessage = "Deposit Completed";
      }
      else {
        this.errormessage = "Deposit Error";
        this.loading = false;
      }
    },
      (err) => { console.log(err), this.loading = false; }
    );
  }
}
