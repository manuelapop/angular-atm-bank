import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BankMenuComponent } from './components/bank-menu/bank-menu.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bankmenu', component: BankMenuComponent },
  {
    path: 'bankmenu',
    component: BankMenuComponent,
    children: [
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'balance',
        component: BalanceComponent
      },
      {
        path: 'deposit',
        component: DepositComponent
      },
      {
        path: 'withdraw',
        component: WithdrawalComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
