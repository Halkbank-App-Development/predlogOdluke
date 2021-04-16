using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PredlogOdluke.ENT
{
    public class Entities
    {
        public class AppUser
        {
            public string email { get; set; }
            public string code { get; set; }
            public bool validity { get; set; }
        }
    }
}
