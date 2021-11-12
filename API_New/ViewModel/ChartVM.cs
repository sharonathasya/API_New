using API_New.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;


namespace API_New.ViewModel
{
    public class ChartVM 
    {
        
        [Required]
        public int Salary { get; set; }

        [Newtonsoft.Json.JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        [Required]
        public int RoleId { get; set; }

    }

    public enum Gender1
    {
        Male,
        Female
    }



}
