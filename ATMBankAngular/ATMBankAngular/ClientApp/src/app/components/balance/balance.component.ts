import { Component, OnInit } from '@angular/core';
import { BankService } from './../../bank.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {
  balance = '';
  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.bankService.getBalance().subscribe((res) => {
      this.balance = res;
    }); 
  }

}
