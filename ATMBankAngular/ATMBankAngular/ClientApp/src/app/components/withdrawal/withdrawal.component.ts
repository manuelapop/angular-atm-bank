import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { Message } from './../../models/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from './../../bank.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html'
})
export class WithdrawalComponent implements OnInit {

  withdrawForm: FormGroup;
  loading = false;
  submitted = false;
  errormessage: string;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService) { }

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      withdrawal: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.withdrawForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.withdrawForm.invalid) {
      return;
    }
    this.loading = true;
    this.errormessage = "";
    this.user = new User();
    this.user.amountLatest = this.withdrawForm.value.withdrawal;
    this.bankService.withdraw(this.user).subscribe((res: Message) => {
      this.errormessage = res.transactionMessage;
      this.loading = false;
    },
      (err) => { console.log(err), this.loading = false; this.errormessage = "Withdraw Error"}
    );
  }

}
