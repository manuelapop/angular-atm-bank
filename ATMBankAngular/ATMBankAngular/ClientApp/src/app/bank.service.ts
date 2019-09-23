import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  apiURL: string = 'https://localhost:44352/api';
  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getUser() {
    return this.httpClient.get<User>(`${this.apiURL}/Bank`);
  }

  public getTransactions() {
    return this.httpClient.get<string[]>(`${this.apiURL}/Bank/GetTransactions`);
  }

  public getBalance() {
    return this.httpClient.get<any>(`${this.apiURL}/Bank/GetBalance`);
  }

  public saveUser(user: User) {
    return this.httpClient.post(`${this.apiURL}/Bank/Register`, user, this.HttpOptions);
  }

  public deposit(user: User) {
    return this.httpClient.post(`${this.apiURL}/Bank/DepositMoney`, user, this.HttpOptions);
  }

  public withdraw(user: User) {
    return this.httpClient.post(`${this.apiURL}/Bank/WithdrawMoney`, user, this.HttpOptions);
  }

  public loginUser(user: User) {
    return this.httpClient.post(`${this.apiURL}/Bank/Login`, user, this.HttpOptions);
  }
}
