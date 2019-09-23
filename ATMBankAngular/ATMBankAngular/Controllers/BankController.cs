using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ATMBankAngular.Helpers;
using ATMBankAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace ATMBankAngular.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BankController : Controller
    {

        [HttpGet]
        public User Get()
        {
            List<User> accounts = CacheHelper.GetFromCache<List<User>>("accountInfo");
            var user = CacheHelper.GetFromCache<User>("CurrentUser");
            foreach (var account in accounts)
            {
                if (account.username == user.username)
                {
                    return account;
                }
            }
            return new User();
        }

        [HttpPost]
        public ActionResult<bool> Register([FromBody]User user)
        {
            try
            {
                var bnkAcc = new User { username = user.username, password = user.password, amountLatest = 0, transactions = new List<string>() };
                List<User> accounts;
                if (CacheHelper.IsIncache("accountInfo"))
                {
                    accounts = CacheHelper.GetFromCache<List<User>>("accountInfo");
                }
                else
                {
                    accounts = new List<User>();
                }
                accounts.Add(bnkAcc);
                CacheHelper.SaveTocache("accountInfo", accounts, new DateTime(2100, 01, 01));
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        public ActionResult<bool> Login([FromBody]User user)
        {
            try
            {
                bool pass = false;
                var users = CacheHelper.GetFromCache<List<User>>("accountInfo");
                User userCur;
                if (CacheHelper.IsIncache("CurrentUser"))
                {
                    userCur = CacheHelper.GetFromCache<User>("CurrentUser");
                }
                else
                {
                    userCur = new User();
                }
                if (CacheHelper.IsIncache("accountInfo"))
                {
                    foreach (var userDetail in users)
                    {
                        if (userDetail.username == user.username && userDetail.password == user.password)
                        {
                            pass = true;
                            userCur.username = user.username;
                            CacheHelper.SaveTocache("CurrentUser", userCur, new DateTime(2100, 01, 01));
                        }
                    }
                }
                return pass;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        public ActionResult<bool> DepositMoney([FromBody]User user)
        {
            try
            {
                double depositAmt = Convert.ToDouble(user.amountLatest);
                if (depositAmt > 0)
                {
                    List<User> accounts = CacheHelper.GetFromCache<List<User>>("accountInfo");
                    var CurrentUser = CacheHelper.GetFromCache<User>("CurrentUser");
                    var account = accounts.Where(x => x.username == CurrentUser.username).FirstOrDefault();
                    if (account != null)
                    {
                        var latestAccountAmt = account.amountLatest;
                        var amountDep = latestAccountAmt + depositAmt;
                        account.amountLatest = amountDep;
                        account.transactions.Add(String.Format("Deposit of {0}{1}", depositAmt, "$"));
                        CacheHelper.SaveTocache("accountInfo", accounts, new DateTime(2100, 01, 01));
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        public ActionResult<Message> WithdrawMoney([FromBody]User user)
        {
            double withdrawAmt = Convert.ToDouble(user.amountLatest);
            var minimumKeptAmt = 20;
            List<User> accounts = CacheHelper.GetFromCache<List<User>>("accountInfo");
            var CurrentUser = CacheHelper.GetFromCache<User>("CurrentUser");
            var account = accounts.Where(x => x.username == CurrentUser.username).FirstOrDefault();
            if (account != null)
            {
                var latestAccountAmt = account.amountLatest;
                var message = new Message();

                if (withdrawAmt > 0)
                {
                    if (withdrawAmt > latestAccountAmt)
                    {
                        message.transactionMessage = String.Format("Insuficient funds {0}{1} \n", "$", withdrawAmt);
                        return Ok(message);
                    }
                    else if ((latestAccountAmt - withdrawAmt) < minimumKeptAmt)
                    {
                        message.transactionMessage = String.Format("Insuficient funds {0}{1} \n", "$", minimumKeptAmt);
                        return Ok(message); ;
                    }
                    else
                    {
                        var amountDep = latestAccountAmt - withdrawAmt;
                        account.amountLatest = amountDep;
                        account.transactions.Add(String.Format("Withdrawal of {0}{1}", withdrawAmt, "$"));
                        CacheHelper.SaveTocache("accountInfo", accounts, new DateTime(2100, 01, 01));
                        message.transactionMessage = "Withdraw Completed";
                        return Ok(message);
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }
        }


        [HttpGet]
        public ActionResult<string> GetBalance()
        {
            List<User> accounts = CacheHelper.GetFromCache<List<User>>("accountInfo");
            var CurrentUser = CacheHelper.GetFromCache<User>("CurrentUser");
            foreach (var account in accounts)
            {
                if (account.username == CurrentUser.username)
                {
                    return account.amountLatest.ToString();
                }
            }
            return string.Empty;
        }

        [HttpGet]
        public ActionResult<List<string>> GetTransactions()
        {
            List<User> accounts = CacheHelper.GetFromCache<List<User>>("accountInfo");
            var CurrentUser = CacheHelper.GetFromCache<User>("CurrentUser");
            foreach (var account in accounts)
            {
                if (account.username == CurrentUser.username)
                {
                    return account.transactions;
                }
            }
            return new List<string>();
        }
    }
}
