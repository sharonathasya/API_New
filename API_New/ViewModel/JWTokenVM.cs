using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_New.ViewModel
{
    public class JWTokenVM
    {
        public string Messages { get; set; }

        public string Token { get; set; }
       
    }
}
