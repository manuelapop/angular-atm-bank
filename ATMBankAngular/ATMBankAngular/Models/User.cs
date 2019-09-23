using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATMBankAngular.Models
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
        public double amountLatest { get; set; }
        public List<string> transactions { get; set; }
    }
}
