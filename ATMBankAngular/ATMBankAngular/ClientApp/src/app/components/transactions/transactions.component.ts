import { Component, OnInit } from '@angular/core';
import { BankService } from './../../bank.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  transactions = [];
  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.bankService.getTransactions().subscribe((res) => {
      this.transactions = res;
    }); 
  }

}
